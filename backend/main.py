"""FastAPI entrypoint. Private on Vercel: only the Next.js service can reach it."""

import sys
import time
from collections import defaultdict
from pathlib import Path
from typing import Dict, List, Literal

# Vercel loads this file as `main:app` from inside backend/, so sibling modules
# are imported flat. This keeps that working from any other working directory.
sys.path.insert(0, str(Path(__file__).resolve().parent))

from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

import config
from knowledge_store import get_store
from rag_service import RAGService, llm_targets

app = FastAPI(
    title="Nabil Technical Digital Twin",
    description="Evidence-grounded RAG service over canonical portfolio knowledge.",
    version="2.1.0",
)

rag_service = RAGService()

MAX_QUERY_CHARS = 4000
RATE_LIMIT = 30
RATE_WINDOW = 60.0
MAX_TRACKED_CLIENTS = 10_000
_rate_buckets: Dict[str, List[float]] = defaultdict(list)


def _client_ip(request: Request) -> str:
    # The Next.js proxy forwards the visitor's address. Trusting this header is
    # safe because the backend has no public route.
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def enforce_rate_limit(request: Request) -> None:
    now = time.time()
    if len(_rate_buckets) > MAX_TRACKED_CLIENTS:
        stale = [k for k, hits in _rate_buckets.items() if not hits or now - hits[-1] >= RATE_WINDOW]
        for key in stale:
            del _rate_buckets[key]

    ip = _client_ip(request)
    bucket = [t for t in _rate_buckets[ip] if now - t < RATE_WINDOW]
    if len(bucket) >= RATE_LIMIT:
        _rate_buckets[ip] = bucket
        raise HTTPException(status_code=429, detail="Too many requests. Try again shortly.")
    bucket.append(now)
    _rate_buckets[ip] = bucket


def clean_query(raw: str) -> str:
    query = raw.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    if len(query) > MAX_QUERY_CHARS:
        raise HTTPException(status_code=400, detail="Message is too long.")
    return query


class ChatTurn(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(max_length=MAX_QUERY_CHARS)


class ChatRequest(BaseModel):
    message: str
    history: List[ChatTurn] = Field(default_factory=list, max_length=8)


@app.get("/health")
def health_check():
    return {
        "status": "online",
        "service": "portfolio-digital-twin",
        "llm_model": next((t.model for t in llm_targets()), None),
        "embedding_model": config.EMBEDDING_MODEL,
        "knowledge_entities": len(get_store().entities),
    }


@app.get("/api/knowledge/summary")
def knowledge_summary():
    store = get_store()
    return {
        "person": store.person.get("name"),
        "projects": [{"id": p["id"], "name": p["name"], "status": p.get("status")} for p in store.projects],
        "skills": [
            {"id": s["id"], "name": s["name"], "level": s.get("level"), "status": s.get("status")}
            for s in store.skills
        ],
    }


@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest, raw: Request):
    enforce_rate_limit(raw)
    history = [turn.model_dump() for turn in request.history]
    return await rag_service.generate_response(clean_query(request.message), history=history)


@app.get("/api/chat/stream")
async def stream_endpoint(raw: Request, query: str = Query(..., description="Query message")):
    enforce_rate_limit(raw)
    return StreamingResponse(
        rag_service.stream_response(clean_query(query)),
        media_type="text/event-stream",
    )
