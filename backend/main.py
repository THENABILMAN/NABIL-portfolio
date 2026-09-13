import sys
import time
from collections import defaultdict
from pathlib import Path
from typing import List, Dict, Optional, Any

BASE_DIR = Path(__file__).resolve().parent
ROOT_DIR = BASE_DIR.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from fastapi import FastAPI, Header, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
import uvicorn

from backend import config
from backend.rag_service import RAGService
from backend.ingest import run_ingestion
from backend.knowledge_store import get_store

app = FastAPI(
    title="Nabil Technical Digital Twin",
    description="Evidence-grounded RAG service over canonical portfolio knowledge.",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

rag_service = RAGService()
_rate_buckets: Dict[str, List[float]] = defaultdict(list)
RATE_LIMIT = 30
RATE_WINDOW = 60.0


def _client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def enforce_rate_limit(request: Request) -> None:
    now = time.time()
    ip = _client_ip(request)
    bucket = [t for t in _rate_buckets[ip] if now - t < RATE_WINDOW]
    if len(bucket) >= RATE_LIMIT:
        raise HTTPException(status_code=429, detail="Too many requests. Try again shortly.")
    bucket.append(now)
    _rate_buckets[ip] = bucket


class ChatRequest(BaseModel):
    message: str = Field(..., description="User question or query string")
    history: Optional[List[Dict[str, str]]] = Field(default=[], description="Session chat history (not facts)")
    stream: Optional[bool] = Field(default=False, description="Whether to stream the response via SSE")


class ChatResponse(BaseModel):
    answer: str
    grounded: bool = True
    confidence: str = "MEDIUM"
    sources: List[Dict[str, Any]] = []
    claims: List[Dict[str, Any]] = []
    entity: Optional[Dict[str, Any]] = None
    model: str


@app.get("/health")
def health_check():
    return {
        "status": "online",
        "service": "portfolio-digital-twin",
        "llm_model": config.LLM_MODEL,
        "embedding_model": config.EMBEDDING_MODEL,
        "knowledge_entities": len(get_store().entities),
    }


@app.get("/api/knowledge/summary")
def knowledge_summary():
    store = get_store()
    return {
        "person": store.person.get("name"),
        "projects": [{"id": p["id"], "name": p["name"], "status": p.get("status")} for p in store.projects],
        "skills": [{"id": s["id"], "name": s["name"], "level": s.get("level"), "status": s.get("status")} for s in store.skills],
    }


@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest, raw: Request):
    enforce_rate_limit(raw)
    query = request.message.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    if len(query) > 4000:
        raise HTTPException(status_code=400, detail="Message is too long.")
    return await rag_service.generate_response(query, history=request.history)


@app.get("/api/chat/stream")
async def stream_endpoint(raw: Request, query: str = Query(..., description="Query message")):
    enforce_rate_limit(raw)
    if not query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")
    return StreamingResponse(
        rag_service.stream_response(query.strip()),
        media_type="text/event-stream",
    )


@app.post("/api/ingest")
def trigger_ingest(x_admin_secret: Optional[str] = Header(default=None, alias="X-Admin-Secret")):
    if not config.INGEST_SECRET:
        raise HTTPException(status_code=403, detail="Ingestion is disabled until INGEST_SECRET is configured.")
    if x_admin_secret != config.INGEST_SECRET:
        raise HTTPException(status_code=403, detail="Invalid admin secret.")
    try:
        run_ingestion()
        return {"status": "success", "message": "Knowledge ingestion completed successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Ingestion failed.") from e


if __name__ == "__main__":
    uvicorn.run("backend.main:app", host=config.HOST, port=config.PORT, reload=True)
