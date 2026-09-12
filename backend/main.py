import sys
from pathlib import Path
from typing import List, Dict, Optional, Any

# Ensure project root is in sys.path
BASE_DIR = Path(__file__).resolve().parent
ROOT_DIR = BASE_DIR.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
import uvicorn

from backend import config
from backend.rag_service import RAGService
from backend.ingest import run_ingestion

app = FastAPI(
    title="Nabil AI Portfolio RAG Service",
    description="Production RAG backend for Mohammad Ali Nabil (THENABILMAN) powered by Pinecone & OpenRouter.",
    version="1.0.0",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG Service singleton
rag_service = RAGService()

class ChatRequest(BaseModel):
    message: str = Field(..., description="User question or query string")
    history: Optional[List[Dict[str, str]]] = Field(default=[], description="Chat conversation history")
    stream: Optional[bool] = Field(default=False, description="Whether to stream the response via SSE")

class ChatResponse(BaseModel):
    answer: str
    sources: List[Dict[str, Any]]
    model: str

@app.get("/health")
def health_check():
    """Service health check endpoint."""
    return {
        "status": "online",
        "service": "portfolio-rag-backend",
        "llm_model": config.LLM_MODEL,
        "embedding_model": config.EMBEDDING_MODEL,
        "pinecone_index": config.PINECONE_INDEX_NAME
    }

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    """Processes user question using RAG and returns synthesized answer."""
    query = request.message.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    
    result = await rag_service.generate_response(query, history=request.history)
    return result

@app.get("/api/chat/stream")
async def stream_endpoint(query: str = Query(..., description="Query message")):
    """Streams RAG generated response using Server-Sent Events (SSE)."""
    if not query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")
        
    return StreamingResponse(
        rag_service.stream_response(query.strip()),
        media_type="text/event-stream"
    )

@app.post("/api/ingest")
def trigger_ingest():
    """Triggers re-ingestion of knowledge base and resume."""
    try:
        run_ingestion()
        return {"status": "success", "message": "Knowledge ingestion completed successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host=config.HOST, port=config.PORT, reload=True)
