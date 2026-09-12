# Mohammad Ali Nabil — AI Systems Engineer Portfolio

Production portfolio website and interactive Retrieval-Augmented Generation (RAG) agent for **Mohammad Ali Nabil (THENABILMAN)**.

---

## 🏛️ Project Directory Structure

```
.
├── backend/                  # Python FastAPI RAG Service (Conda: nabport)
│   ├── tests/                # Automated backend integration tests
│   │   └── test_rag.py       # Pinecone retrieval & OpenRouter LLM test
│   ├── config.py             # App configuration, models, and .env loader
│   ├── embeddings.py         # Pinecone 1024-dim llama-text-embed-v2 client
│   ├── ingest.py             # Knowledge base & resume vector chunker/upserter
│   ├── main.py               # FastAPI application with REST & SSE endpoints
│   ├── rag_service.py        # Vector retrieval & LLM generation orchestration
│   ├── requirements.txt      # Python dependencies
│   └── README.md             # Backend architecture documentation
│
├── docs/                     # Specifications, Architecture & Design Specs
│   ├── architecture.md       # Full-stack system architecture
│   ├── design.md             # Design tokens, aesthetics & UI guidelines
│   ├── phases.md             # Project implementation phases
│   ├── prd.md                # Product Requirements Document
│   └── rules.md              # Engineering roadmap and guidelines
│
├── public/                   # Static Web Assets & RAG Knowledge Base
│   ├── knowledegebase.md     # Verified profile, projects, and career knowledge
│   ├── resume.pdf            # Official resume for download and indexing
│   └── README.md             # Assets documentation
│
├── scripts/                  # Automated Cross-Platform Launch Scripts
│   ├── run_web.bat           # Windows Command Prompt full-stack runner
│   └── run_web.ps1           # PowerShell full-stack concurrent runner
│
├── src/                      # Next.js 14 App Router Frontend
│   ├── app/                  # Pages, layout, globals.css, and API routes
│   ├── components/           # UI and feature components
│   │   ├── contact/          # Contact section and form
│   │   ├── experience/       # Interactive experience timeline
│   │   ├── projects/         # Featured AI projects showcase
│   │   ├── skills/           # Dynamic skills & technologies matrix
│   │   ├── terminal/         # nabil-cli Interactive RAG Terminal Widget
│   │   ├── ui/               # Reusable UI primitives & wireframe grids
│   │   ├── workflow/         # 4-Step AI Engineering workflow
│   │   ├── ArchitectureGraph.tsx  # Agent architecture visualization
│   │   ├── Hero.tsx          # Hero section with animated typing effect
│   │   ├── ImpactStats.tsx   # Key impact metrics banner
│   │   ├── LenisProvider.tsx # Smooth scrolling provider
│   │   └── Navbar.tsx        # Glassmorphic navigation header
│   ├── data/                 # Centralized resume & portfolio datasets
│   └── lib/                  # Utility functions
│
├── .env                      # Local secret environment variables (ignored by git)
├── .env.example              # Environment variables template
├── .gitignore                # Clean full-stack git ignore rules
├── package.json              # Frontend npm dependencies and scripts
├── run_web.bat               # Root launcher shortcut
├── run_web.ps1               # Root launcher shortcut
└── README.md                 # Project documentation (this file)
```

---

## ⚡ Quick Start

### 1. One-Click Launch (Recommended)
From PowerShell:
```powershell
.\run_web.ps1
```
*(Or double-click `run_web.bat` in File Explorer).*

This launches two independent terminal sessions:
- **FastAPI RAG Backend**: `http://127.0.0.1:8000` (docs at `http://127.0.0.1:8000/docs`)
- **Next.js Frontend**: `http://localhost:3000`

---

### 2. Manual Startup

#### Backend
```powershell
conda activate nabport
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

#### Frontend
```powershell
npm run dev
```

---

## 🧠 RAG Ingestion Pipeline

To re-index changes from `public/knowledegebase.md` or `public/resume.pdf` into Pinecone:

```powershell
conda activate nabport
python backend/ingest.py
```

---

## 🖥️ Interactive Shell Console (`nabil-cli`)

Access the terminal directly at `http://localhost:3000/#terminal`.

### Built-in Commands:
- `nabil --skills`: Core AI/ML, backend, and database stack
- `nabil --projects`: Summary of production deployments (FITMAN, LiveKit MCP, etc.)
- `nabil --run-agent`: Live agent state graph execution simulation
- `nabil --neofetch`: Engineer specifications and system uptime
- `nabil --contact`: Direct communication channels
- `clear`: Wipe terminal scrollback

### Live AI RAG Queries:
Type any question into the terminal, or use the `ask` prefix:
```bash
nabil@ai-engineer:~$ ask "What did Nabil build at The Data Island?"
nabil@ai-engineer:~$ ask "Explain the architecture of FITMAN"
nabil@ai-engineer:~$ ask "What are his strengths in RAG?"
```
The terminal embeds your query with `llama-text-embed-v2`, queries the Pinecone vector database, and generates an answer via OpenRouter `Gemma-4-31B`, complete with cited knowledge sources.
"# NABIL-portfolio" 
