# Evaluation

Automated tests need no network and no API keys, and they ignore any keys in `.env`:

```
python backend/tests/test_rag.py
```

They cover routing, refusals, citations, streaming, LLM outages, and whether the backend can run from `backend/` alone.

`backend/tests/eval_questions.json` holds the question set (identity, projects, skills, adversarial, unknown). The tests check that each question routes to its `expected_entity`.

Live RAG quality isn't covered by these tests. It needs `VLLM_BASE_URL` (or `OPENROUTER_API_KEY`), `MONGODB_URI`, and `HF_TOKEN`, plus a fresh ingest after knowledge changes.
