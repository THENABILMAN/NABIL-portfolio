# Portfolio digital twin backend

Evidence-grounded RAG over canonical YAML (`knowledge/`), optional Pinecone dense retrieval, lexical overlap, and OpenRouter generation.

## Data
- Canonical: `knowledge/`
- Resume PDF: `public/resume.pdf`
- Legacy notes: `public/knowledgebase.md`

## API
- `GET /health`
- `GET /api/knowledge/summary`
- `POST /api/chat` — `{ message, history? }` → grounded payload
- `GET /api/chat/stream?query=`
- `POST /api/ingest` — requires `X-Admin-Secret`

## Commands
```
python backend/export_canonical.py
python backend/ingest.py
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
python backend/tests/test_rag.py
```
Set `PYTHONPATH` to the repo root when running tests.
