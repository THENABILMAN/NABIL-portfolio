# Evaluation

Automated unit tests (no live Pinecone/OpenRouter required):

```
set PYTHONPATH=.
python backend/tests/test_rag.py
```

Question set: `backend/tests/eval_questions.json` (identity, projects, skills, adversarial, unknown).

Live RAG still needs `OPENROUTER_API_KEY` and `PINECONE_API_KEY` plus a fresh ingest after knowledge changes.
