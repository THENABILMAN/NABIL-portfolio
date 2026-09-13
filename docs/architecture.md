# Current architecture

This file describes the **implemented** portfolio stack, not an earlier planning sketch.

## Stack

| Layer | Implementation |
| :--- | :--- |
| Frontend | Next.js 14 App Router, Tailwind, Framer Motion |
| Chat UI | `src/components/terminal/TerminalWidget.tsx` |
| BFF | `src/app/api/chat/route.ts` proxies to FastAPI |
| Digital twin | FastAPI (`backend/main.py`) |
| Canonical knowledge | YAML under `knowledge/` |
| Dense retrieval | Pinecone + `llama-text-embed-v2` (when keys are configured) |
| Lexical retrieval | Token overlap over canonical documents |
| Generation | OpenRouter with ordered model fallbacks |
| Deploy | Vercel Services (`vercel.json`): Next.js + FastAPI |

## Request path

```
Visitor
  → Next.js /api/chat
  → FastAPI /api/chat
  → Query classifier + entity resolver
  → Canonical fast-path (structured facts)
     or dense + lexical retrieve → merge → validate
  → LLM only if evidence exists
  → { answer, grounded, confidence, sources, claims, entity }
```

This backend is **not** a LangGraph/CrewAI multi-agent runtime. It is a retrieval-grounded digital twin. LangGraph appears in Nabil's project catalog (FITMAN writeup), not as the portfolio agent's orchestrator.

## Knowledge

`knowledge/` is the source of truth. `src/data/canonical.json` is the exported snapshot for the frontend. `src/data/resumeData.ts` is aligned to the same statuses.

## Security

- CORS allowlist (no wildcard)
- `/api/ingest` requires `X-Admin-Secret` matching `INGEST_SECRET`
- In-memory rate limit on chat
- Retrieval text is treated as data, not instructions
- Health endpoint does not return API keys
