# Portfolio digital twin backend

Evidence-grounded RAG over canonical YAML (`knowledge/`), with optional MongoDB Atlas dense retrieval, lexical overlap, and vLLM generation (OpenRouter fallback).

Vercel deploys this directory alone, so anything read at runtime must stay inside it, and modules import each other flat.

## API

- `GET /health`
- `GET /api/knowledge/summary`
- `POST /api/chat`: `{ message, history? }` returns the grounded payload
- `GET /api/chat/stream?query=`: the same payload as server-sent events

The service is private in production. Requests arrive through the Next.js proxy.

## Commands

Run from the repository root:

```
python -m uvicorn main:app --app-dir backend --port 8000 --reload --reload-dir backend
python backend/tests/test_rag.py
python backend/export_canonical.py
python backend/ingest.py
```

`ingest.py` also needs `requirements-ingest.txt`, and reads `public/resume.pdf` from a full checkout.
