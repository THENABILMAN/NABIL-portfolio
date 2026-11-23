# Mohammad Ali Nabil — AI Engineer Portfolio

A portfolio site with a digital twin you can question. Ask it about my projects, skills, or experience in the on-page terminal, and it answers from a structured knowledge base. If the evidence isn't there, it says so instead of guessing.

**[Live site](https://thenabilman.vercel.app/)** · **[FITMAN demo](https://fitmanver.vercel.app/)** · **[GitHub](https://github.com/THENABILMAN)** · **[Resume](https://thenabilman.vercel.app/resume.pdf)**

## How the twin answers

```
Visitor → Next.js /api/chat → FastAPI
                                │
                     classify the question
                                │
             ┌──────────────────┴──────────────────┐
             ▼                                     ▼
   Known fact (identity, projects,        Open question: retrieve from
   skills, internship, education)         MongoDB + lexical search
             │                                     │
   Answer directly from YAML              No evidence → refuse
                                          Evidence    → LLM, grounded on it
                                                        (quote it if no LLM responds)
```

Every response returns `{ answer, grounded, confidence, sources, claims, entity, model }`, and the terminal displays them, so a visitor can see where an answer came from.

The design rules:

- **One source of truth.** All facts live in YAML under [`backend/knowledge/`](backend/knowledge/). The site and the twin both read from it.
- **Honest status.** Each claim is labelled `VERIFIED`, `BUILT`, `EXPERIMENTAL`, `LEARNING`, `PLANNED`, `ASPIRATIONAL`, or `UNVERIFIED`, and the twin may not upgrade a label. See [docs/claims.md](docs/claims.md).
- **Citations only when grounded.** A refusal never carries sources.
- **A portfolio agent, not an impersonation.** The twin speaks about me in the third person.

This is a retrieval-grounded service, not a multi-agent system. LangGraph appears in the FITMAN project, not here.

## Stack

| Layer | Technology |
| :--- | :--- |
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Lenis |
| Backend | FastAPI, Python 3.11+ |
| Retrieval | MongoDB Atlas Vector Search with Hugging Face `all-mpnet-base-v2` embeddings, plus lexical search over the YAML |
| Generation | Open Hugging Face model on vLLM, with OpenRouter fallbacks |
| Hosting | Vercel Services |

## Projects covered

| Project | Status | Link |
| :--- | :--- | :--- |
| FITMAN: AI fitness and nutrition coaching platform | Active development | [Demo](https://fitmanver.vercel.app/) |
| AI Resume Analyzer & Matcher | Completed | [Repo](https://github.com/THENABILMAN/THENABILMAN_AI_Resume-Analyzer) |
| Real-Time AI Voice Agent | Completed | [Repo](https://github.com/THENABILMAN/THENABILMAN_AI_Voice_Agent) |
| End-to-End Bangla AI Voice Agent | Experimental | [Repo](https://github.com/THENABILMAN/THENABILMAN_End-to-End_Bangla_AI_voice-agent) |
| End-to-End AI Agent System | Completed | |
| RAG Documentation Agent | Completed | |
| LiveKit MCP AI Assistant | Prototype | |
| AI Vision & OCR Agent | Completed | |

Details and limitations for each are in [`backend/knowledge/projects/`](backend/knowledge/projects/).

## Run it locally

You need Node.js 20.9+ and Python 3.11+.

```bash
git clone https://github.com/THENABILMAN/NABIL-portfolio.git
cd NABIL-portfolio
cp .env.example .env        # add your keys
npm install
pip install -r backend/requirements.txt
```

Then start each service in its own terminal:

```bash
python -m uvicorn main:app --app-dir backend --port 8000 --reload --reload-dir backend
npm run dev
```

Open <http://localhost:3000>. On Windows, `.\run_web.ps1` or `run_web.bat` starts both.

All keys are optional. Without both `MONGODB_URI` and `HF_TOKEN`, retrieval is lexical only. Without `VLLM_BASE_URL` or `OPENROUTER_API_KEY`, the twin quotes the best evidence instead of generating an answer.

## Updating the knowledge base

Edit the YAML in `backend/knowledge/`, then run:

```bash
python backend/export_canonical.py              # refresh the JSON the site renders
pip install -r backend/requirements-ingest.txt  # first time only
python backend/ingest.py                        # refresh MongoDB
```

## Tests

```bash
python backend/tests/test_rag.py   # offline, no API keys needed
npm run typecheck
npm run build
```

## Deployment

[`vercel.json`](vercel.json) deploys two Vercel Services. The Next.js frontend is public. FastAPI is private and reachable only through a service binding, which injects `BACKEND_INTERNAL_URL`.

Vercel deploys `backend/` on its own, so anything the API reads at runtime has to stay inside that directory.

Set `VLLM_BASE_URL`, `VLLM_API_KEY`, `VLLM_MODEL`, `MONGODB_URI`, `HF_TOKEN`, and optionally `OPENROUTER_API_KEY` in the Vercel project. vLLM runs on a separate GPU machine: see [infra/vllm](infra/vllm/README.md). See [`.env.example`](.env.example) for the optional settings.

## More documentation

- [docs/architecture.md](docs/architecture.md): how the system fits together
- [docs/agent.md](docs/agent.md): how the twin behaves
- [docs/claims.md](docs/claims.md): claim statuses and evidence priority
- [docs/knowledge-schema.md](docs/knowledge-schema.md): what lives where in the knowledge base
- [docs/evaluation.md](docs/evaluation.md): how answers are tested
- [docs/roadmap.md](docs/roadmap.md): possible future work

## Contact

Mohammad Ali Nabil (`THENABILMAN`), Dhaka, Bangladesh. Open to AI engineering opportunities.

[thenabilman@gmail.com](mailto:thenabilman@gmail.com) · [GitHub](https://github.com/THENABILMAN) · [LinkedIn](https://www.linkedin.com/in/mohammadalinabil/)
