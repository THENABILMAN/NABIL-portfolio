# Portfolio RAG Agent Backend

A production FastAPI service providing Retrieval-Augmented Generation (RAG) for Mohammad Ali Nabil's portfolio.

## Stack & Architecture
- **Framework**: FastAPI (Python 3.11, Conda env `nabport`)
- **Vector Database**: Pinecone Serverless (`nabilprotfolio`, 1024 dimensions, cosine)
- **Embeddings**: `llama-text-embed-v2` via Pinecone Native Inference
- **LLM**: `google/gemma-4-31b-it:free` via OpenRouter with automatic resilient fallbacks
- **Data Sources**: `public/knowledegebase.md` & `public/resume.pdf`

## Directory Structure
```
backend/
├── __init__.py           # Package marker
├── config.py             # Settings, paths, and environment variables
├── embeddings.py         # Pinecone inference embeddings client (1024-dim)
├── ingest.py             # Document parser, chunker, and Pinecone upsert pipeline
├── main.py               # FastAPI server and API endpoints
├── rag_service.py        # Similarity retrieval and LLM response generation
├── requirements.txt      # Python package dependencies
└── tests/
    └── test_rag.py       # Integration test script for RAG pipeline
```

## API Endpoints
- `GET /health`: Health check and system metadata
- `POST /api/chat`: Non-streaming RAG query endpoint (`{ "message": "..." }`)
- `GET /api/chat/stream?query=...`: Server-Sent Events (SSE) streaming endpoint
- `POST /api/ingest`: Trigger re-ingestion of knowledge documents

## Quick Commands
```powershell
# Activate environment
conda activate nabport

# Run ingestion
python backend/ingest.py

# Run backend dev server
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload

# Run tests
python backend/tests/test_rag.py
```
