# Current architecture

## Stack

| Layer | Implementation |
| :--- | :--- |
| Frontend | Next.js 16 App Router, Tailwind, Framer Motion |
| Chat UI | `src/components/terminal/TerminalWidget.tsx` |
| Proxy | `src/app/api/chat/route.ts` and `stream/route.ts` forward to FastAPI |
| Digital twin | FastAPI (`backend/main.py`) |
| Canonical knowledge | YAML under `backend/knowledge/` |
| Dense retrieval | MongoDB Atlas Vector Search + `all-mpnet-base-v2` (when keys are configured) |
| Lexical retrieval | Whole-word overlap over canonical documents |
| Generation | vLLM, then OpenRouter with ordered model fallbacks |
| Deploy | Vercel Services (`vercel.json`): public Next.js, private FastAPI |

## Request path

```
Visitor
  → Next.js /api/chat or /api/chat/stream
  → FastAPI (over the service binding)
  → Query classifier + entity resolver
  → Canonical fast path (structured facts)
     or dense + lexical retrieval → merge
  → LLM only if evidence exists; quote the evidence if no model responds
  → { answer, grounded, confidence, sources, claims, entity, model }
```

The first question in a session streams. Follow-ups use the JSON route because the stream endpoint takes no history. History helps retrieval find the topic, but it is never treated as evidence.

If FastAPI is unreachable, Next.js answers simple identity questions from `canonical.json` and reports the outage for anything else.

This backend is **not** a LangGraph or CrewAI multi-agent runtime. It is a retrieval-grounded digital twin. LangGraph appears in Nabil's project catalog (FITMAN), not as this agent's orchestrator.

## Knowledge

`backend/knowledge/` is the source of truth. `src/data/canonical.json` is the exported public subset the frontend renders. Skill levels in `TechnicalKnowledgeGraph.tsx` are currently maintained by hand.

## Security

- FastAPI has no public route, so visitors can only reach it through the Next.js proxy
- Per-visitor rate limit on chat. It is in memory, so each serverless instance counts separately
- Message and history size limits on both layers
- Retrieved text is treated as data, not instructions
- The health endpoint does not return API keys
