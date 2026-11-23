# CLAUDE.md

Portfolio site for Mohammad Ali Nabil with an evidence-grounded "digital twin". Next.js frontend, FastAPI backend, deployed as two Vercel Services.

## Commands

```bash
npm run dev                                    # frontend on :3000
npm run typecheck
npm run build
python -m uvicorn main:app --app-dir backend --port 8000 --reload --reload-dir backend
python backend/tests/test_rag.py               # offline; run after any backend or knowledge change
python backend/export_canonical.py             # regenerate src/data/canonical.json
python backend/ingest.py                       # re-index MongoDB (writes to the live collection; ask first)
```

The conda env `nabport` has the Python dependencies. `backend/ingest.py` also needs `backend/requirements-ingest.txt`. ESLint is not set up, so there is no lint step.

Port 8000 may be taken by another local project. If so, run the backend elsewhere and set `BACKEND_INTERNAL_URL`.

## Layout

- `backend/knowledge/`: source of truth for every fact (YAML and markdown). `source-notes.md` is unstructured personal notes.
- `backend/knowledge_store.py`: loads the YAML, classifies queries, serves fast-path answers, lexical search.
- `backend/rag_service.py`: retrieval, the system prompt, generation, SSE streaming.
- `backend/main.py`: FastAPI routes and rate limiting.
- `src/data/canonical.json`: generated public subset of the knowledge. Never edit by hand.
- `src/lib/canonical.ts`: maps that JSON into the shapes components use.
- `src/lib/api.ts`: browser client for the twin. `src/lib/backend.ts`: server-side helpers.
- `src/app/api/chat/`: Next.js proxy routes to FastAPI.
- `src/components/`: one component per page section.

## Rules that must hold

**Honesty is the product.** The site publicly promises that missing evidence is refused, not invented.

- Never upgrade a claim status. PLANNED is not built, EXPERIMENTAL is not expert, LEARNING is not professional experience. Don't call FITMAN production, and don't cite the `<300ms` or `<200ms` latency figures: they are unverified (see `docs/claims.md`).
- The twin must refuse rather than guess. A refusal has `grounded: false` and no sources.
- The twin is a portfolio agent, never "I am Mohammad Ali Nabil".
- Never add a fact about Nabil that isn't in the knowledge base. If a project claim seems wrong, flag it for Nabil rather than rewording it.
- `github:` in a project YAML must be a link that resolves publicly. Put unconfirmed URLs in `github_unverified_url`.

**Deployment constraints.** These broke production once.

- Vercel deploys `backend/` alone. Anything the API reads at runtime must live inside it, and modules import each other flat (`import config`, not `from backend import config`). `test_backend_runs_from_its_own_directory` guards this.
- Keep `backend/requirements.txt` to what the API imports. Ingest-only dependencies go in `requirements-ingest.txt`.
- The backend has no public route. Next.js reaches it through the `BACKEND_INTERNAL_URL` binding, which exists at runtime only, so read it inside functions. Trusting `X-Forwarded-For` is only safe while it stays private.
- `src/data/canonical.json` ships in the browser bundle. Add new private fields to the exclusion list in `export_public_dict`.

**Routing.** Use `has_term` for matching in `classify_query`, never `in`: "bangla" must not match "Bangladesh". Project aliases are checked before contact, so "resume analyzer" isn't read as a request for the resume.

**Don't bump these without a plan:** `lucide-react` (newer versions remove the GitHub, LinkedIn, and Instagram icons) and `tailwindcss` (v4 needs a config migration).

## After changing knowledge

1. Edit the YAML.
2. Run `export_canonical.py`.
3. Run the tests.
4. Tell Nabil that `ingest.py` is needed for MongoDB to reflect the change. Lexical search picks it up on its own.

If a change touches routing, add the question to `backend/tests/eval_questions.json`. The test suite checks each `expected_entity`.

## Style

Dark terminal look: black background, burgundy `#800020` and crimson `#ff4d6d` accents, cyan `#38bdf8` for data, JetBrains Mono for headings and labels, Inter for body text. Small muted text uses `#8f8f99` or lighter, because darker greys fail WCAG AA on this background. Animations must respect reduced motion, which `MotionConfig` in `LenisProvider` handles for Framer Motion.
