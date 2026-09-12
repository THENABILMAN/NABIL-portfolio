# Mohammad Ali Nabil — AI Systems Engineer Portfolio

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS_3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-ff4d6d?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Async_Endpoints-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Pinecone](https://img.shields.io/badge/Pinecone-Serverless_1024_dim-000000?style=for-the-badge&logo=pinecone&logoColor=white)](https://www.pinecone.io/)
[![LangGraph](https://img.shields.io/badge/LangGraph-Multi--Agent_DAGs-800020?style=for-the-badge)](https://langchain-ai.github.io/langgraph/)

<br />

**Autonomous Agent Architectures • Sub-Second Hybrid RAG • LLM/LMM Fine-Tuning • High-Throughput Backends**

[Live Website](https://thenabilman.vercel.app/) • [Flagship FITMAN](https://fitmanver.vercel.app/) • [GitHub Profile](https://github.com/THENABILMAN) • [Verified Resume](https://thenabilman.vercel.app/resume.pdf)

</div>

---

## 📌 Overview

This repository houses the personal portfolio website, interactive developer terminal (`nabil-cli`), and autonomous AI digital twin agent for **Mohammad Ali Nabil (THENABILMAN)**.

Engineered with a high-performance **Next.js 14** frontend and a dedicated **FastAPI** backend, the platform showcases production-grade multi-agent architectures, low-latency streaming pipelines, full-stack systems, and a 7-layer technical knowledge graph. Visitors can interact with a live AI digital twin trained on Nabil's verified resume, project architectures, and engineering philosophies.

---

## 🚀 Key Architectural Highlights

- **Dual-Layer Intelligent RAG Pipeline**:
  - **Instant Fast-Path Router (< 30ms)**: Zero-latency regular expression and intent matching engine answering common queries (bio, tech stack, featured projects, fine-tuning, resume download, contact info) instantaneously without vector DB overhead.
  - **Pinecone Serverless Dense Retrieval (1024-dim)**: Employs `llama-text-embed-v2` vector embeddings and cosine distance metrics for semantic similarity search with verified document citations.
  - **Hybrid Search & Fallback**: Combines semantic embeddings with BM25 keyword matching and reciprocal rank scoring.
  - **Resilient LLM Gateway**: OpenRouter API (`google/gemma-4-31b-it`, `meta-llama/llama-3-70b-instruct`) with automatic model fallback hierarchies.

- **LLM & LMM Fine-Tuning & Model Training**:
  - Parameter-Efficient Fine-Tuning (PEFT) with **LoRA** and **QLoRA** on domain-specific datasets.
  - Sub-hour local fine-tuning using **Unsloth** and **Hugging Face TRL**.
  - Multimodal Large Vision-Language Models (LMMs) for document OCR and multimodal tool-use.
  - Alignment via Supervised Fine-Tuning (SFT) and Direct Preference Optimization (DPO).

- **Multi-Agent Orchestration**:
  - Stateful multi-agent Directed Acyclic Graphs (DAGs) using **LangGraph**.
  - Persistent conversation memory across session boundaries.
  - Strict JSON schema validation with **Pydantic v2** and automatic error-correcting retry loops.

- **Real-Time Voice & Multimodal Audio Pipelines**:
  - Full-duplex conversational audio streaming over **WebSockets**.
  - Streaming **Whisper Speech-to-Text (STT)** with Voice Activity Detection (VAD) for natural turn-taking.
  - Low-latency neural **Text-to-Speech (TTS)** voice synthesis with Cartesia / Edge-TTS.
  - Native **Bengali Speech Recognition & Synthesis** pipeline tailored for low-resource NLP.

- **Cybernetic UX & Animations**:
  - Dark-mode aesthetics (#000000 background, #800020 burgundy and #ff4d6d crimson neon accents, #38bdf8 cyan data highlights).
  - Micro-interactions, staggered entrance animations, and ambient glow effects powered by **Framer Motion**.
  - Ultra-responsive, glassmorphic layout optimized for mobile, tablet, and ultra-wide displays.

---

## 🛠️ Featured Systems & Applications

| # | System | Category | Architecture & Stack Highlights | Repository |
| :-: | :--- | :--- | :--- | :-: |
| 1 | **FITMAN** *(Flagship Production)* | Full-Stack & Multi-Agent | • LangGraph agent state machines with multi-turn memory for adaptive workout/macro planning.<br>• Sub-300ms Groq LLaMA-3 streaming inference.<br>• FastAPI async microservices with Supabase PostgreSQL and Row-Level Security (RLS).<br>• Mobile-first React dashboard with interactive habit charts.<br>• *Stack*: LangGraph, FastAPI, Python, Groq, Supabase, PostgreSQL, React, TypeScript, Tailwind | [Repo](https://github.com/thenabilman/fitman) / [Live](https://fitmanver.vercel.app/) |
| 2 | **Autonomous Agent System** | Agentic & RAG | • Multi-step planning loops decomposing ambiguous queries into verifiable sub-tasks.<br>• Pinecone vector memory for long-term semantic retrieval.<br>• Strict Pydantic output validation with self-correcting retry loops.<br>• *Stack*: Python, LangChain, Pinecone, Groq / OpenAI API, Pydantic, FastAPI, Streamlit | [Repo](https://github.com/thenabilman/agent-system) |
| 3 | **AI Resume Analyzer & Matcher** | Agentic & NLP | • Constrained LLM schemas for structured entity extraction from PDF/DOCX resumes.<br>• Dense vector cosine similarity match scoring against job specifications.<br>• Streamlit candidate telemetry dashboard with actionable CV gap analysis.<br>• *Stack*: Python, LLMs, FastAPI, Streamlit, LangChain, NLP, PDF Parsing | [Repo](https://github.com/THENABILMAN/THENABILMAN_AI_Resume-Analyzer) |
| 4 | **Real-Time AI Voice Agent** | Voice & Real-Time | • Streaming audio ingestion over WebSockets with Voice Activity Detection (VAD).<br>• Sub-second full-duplex loop integrating streaming Whisper STT and neural TTS.<br>• Asynchronous frame delivery with jitter buffering.<br>• *Stack*: Python, Whisper STT, Neural TTS, WebSockets, FastAPI, Audio Streaming | [Repo](https://github.com/THENABILMAN/THENABILMAN_AI_Voice_Agent) |
| 5 | **End-to-End Bangla AI Voice Agent** | Voice & Bengali NLP | • Native Bengali Whisper/ASR transcription in noisy environmental recordings.<br>• Context-preserving prompt architectures to prevent Bengali script mixing.<br>• Low-latency Bangla neural speech generation with natural prosody.<br>• *Stack*: Bengali NLP, Bangla STT, Bangla TTS, Python, PyTorch, FastAPI, Voice AI | [Repo](https://github.com/THENABILMAN/THENABILMAN_End-to-End_Bangla_AI_voice-agent) |
| 6 | **LiveKit MCP Voice Assistant** | Voice & Real-Time | • Sub-200ms voice roundtrip latency using LiveKit WebRTC audio transports.<br>• External knowledge bases connected via Anthropic Model Context Protocol (MCP).<br>• Streaming Whisper STT with Cartesia neural TTS.<br>• *Stack*: LiveKit WebRTC, MCP Protocol, Whisper STT, Cartesia TTS, Python, WebSockets | [Repo](https://github.com/thenabilman/livekit-assistant) |
| 7 | **AI Vision & OCR Automation** | Computer Vision | • OpenCV video filtering pipelines for rapid artifact boundary detection.<br>• Hugging Face Vision Transformers for object classification and document OCR.<br>• Structured JSON extraction validated through FastAPI microservices.<br>• *Stack*: OpenCV, Hugging Face, PyTorch, EasyOCR, Python, FastAPI | [Repo](https://github.com/thenabilman/vision-agent) |

---

## 📊 Technical Knowledge Graph

The portfolio features a comprehensive 7-layer engineering knowledge graph visualizing Nabil's technical progression from low-level systems programming to autonomous agent orchestration and fine-tuning:

```
┌────────────────────────────────────────────────────────────────────────┐
│  Layer 7: AI Engineering & LLM/LMM Tuning                              │
│  ├── LLM & LMM Fine-Tuning (LoRA / QLoRA / PEFT)                      │
│  ├── Unsloth & Hugging Face TRL (Sub-Hour LoRA)                       │
│  ├── Dataset Curation & SFT (Instruction Tuning)                      │
│  ├── RAG Architecture (Pinecone Serverless 1024-dim, Hybrid Search)   │
│  ├── LangGraph Multi-Agent DAGs (FITMAN StateGraph)                   │
│  ├── Tool Calling & MCP Schemas                                       │
│  └── Deployment & Serving (vLLM / Ollama)                             │
├────────────────────────────────────────────────────────────────────────┤
│  Layer 6: Deep Learning & Model Training                               │
│  ├── LLM Model Training (Pretraining / SFT / DPO)                      │
│  ├── Distributed Training (DeepSpeed / FSDP)                           │
│  ├── Model Quantization (AWQ / GGUF / bitsandbytes)                   │
│  ├── PyTorch & Transformer Architecture (Multi-Head Self-Attention)   │
│  └── CNNs, Vision Encoders & Backpropagation                          │
├────────────────────────────────────────────────────────────────────────┤
│  Layer 5: Machine Learning & Neural Foundations                        │
│  ├── NumPy Tensor Operations & Vectorized Math                        │
│  ├── Linear Algebra, Calculus & Probability                           │
│  └── Artificial Neural Networks from Scratch                           │
├────────────────────────────────────────────────────────────────────────┤
│  Layer 4: Computer Science & Algorithmic Foundations                   │
│  ├── Data Structures & Graph Algorithms                               │
│  ├── C / C++ Performance & Memory Layout                              │
│  └── Complexity Analysis (Time / Space Big-O)                         │
├────────────────────────────────────────────────────────────────────────┤
│  Layer 3: Distributed Data, Storage & Vector Databases                 │
│  ├── Pinecone Serverless, ChromaDB & FAISS                            │
│  ├── Supabase PostgreSQL, Relational Schemas & RLS Security           │
│  └── Web Scraping (BeautifulSoup, Selenium) & Data Pipelines          │
├────────────────────────────────────────────────────────────────────────┤
│  Layer 2: Backend Architecture & High-Throughput APIs                  │
│  ├── FastAPI Asynchronous Microservices                               │
│  ├── REST, WebSockets & Server-Sent Events (SSE)                      │
│  └── Pydantic v2 Strict Request/Response Schemas                      │
├────────────────────────────────────────────────────────────────────────┤
│  Layer 1: Python Core & Systems Programming                            │
│  ├── Asyncio Event Loops & Coroutines                                 │
│  ├── Typing, Generics & Metaprogramming                               │
│  └── Package Architecture, Virtual Environments & Linux Tooling        │
└────────────────────────────────────────────────────────────────────────┘
```

- **Interactive Modes**: Switch between cybernetic **Tree Graph** hierarchy and modular **Cards View**.
- **Real-Time Search**: Instant filtering across all 7 layers matching skill names and highlight badges (`LoRA`, `QLoRA`, `SFT`, `PEFT`, `LangGraph`, `Unsloth`, etc.).

---

## 💻 Interactive Terminal Widget (`nabil-cli`)

Visitors can operate an interactive developer console directly from the browser:

### Built-in Commands:
- `nabil --skills`: Core technical capabilities categorized across AI/ML, Backend, Data, and Languages.
- `nabil --projects`: Comprehensive overview of all 7 featured systems with status and links.
- `nabil --experience`: Practical industry internship details and academic background.
- `nabil --contact`: Direct communication channels (Email, Phone, WhatsApp, GitHub, LinkedIn).
- `clear`: Clear the terminal scrollback buffer.

### Live AI Digital Twin Q&A:
Ask any natural language question:
```bash
nabil@terminal:~$ ask "How does your RAG pipeline achieve sub-second latency?"
nabil@terminal:~$ ask "Explain how FITMAN coordinates LangGraph agents"
nabil@terminal:~$ ask "What experience do you have with LoRA and fine-tuning?"
nabil@terminal:~$ ask "Tell me about your work at The Data Island"
```

The terminal routes the query through the fast-path router or performs vector retrieval via Pinecone, returning answers with cited sources.

---

## 🏛️ Project Directory Structure

```
.
├── backend/                      # Python FastAPI RAG Service (Conda: nabport)
│   ├── tests/                    # Automated integration & unit tests
│   │   └── test_rag.py           # Pinecone retrieval & OpenRouter LLM test
│   ├── config.py                 # Environment variables, model names & paths
│   ├── embeddings.py             # Pinecone 1024-dim llama-text-embed-v2 client
│   ├── ingest.py                 # Document parser, semantic chunker & vector upsert
│   ├── main.py                   # FastAPI REST and SSE streaming endpoints
│   ├── rag_service.py            # Fast-path router, similarity search & generation
│   ├── requirements.txt          # Python dependencies
│   └── README.md                 # Backend documentation
│
├── docs/                         # Technical Specifications & Design Specs
│   ├── architecture.md           # Full-stack architectural blueprints
│   ├── design.md                 # UI design tokens, aesthetics & color schemes
│   ├── phases.md                 # Implementation roadmap
│   ├── prd.md                    # Product Requirements Document
│   └── rules.md                  # Engineering and coding guidelines
│
├── public/                       # Static Assets & Verified Knowledge Data
│   ├── knowledegebase.md         # Source of truth for Nabil's projects & career data
│   ├── resume.pdf                # Official downloadable resume PDF
│   └── README.md                 # Public assets documentation
│
├── scripts/                      # Automated Launch Scripts
│   ├── run_web.bat               # Windows Command Prompt full-stack runner
│   └── run_web.ps1               # PowerShell concurrent runner
│
├── src/                          # Next.js 14 App Router Frontend
│   ├── app/                      # Pages, layout, globals.css, and API route handlers
│   │   ├── api/chat/route.ts     # Edge fallback API proxy & fast router
│   │   ├── globals.css           # Custom dark aesthetic utilities & glassmorphism
│   │   ├── layout.tsx            # Root layout & Google Fonts (Inter / Outfit)
│   │   └── page.tsx              # Main portfolio landing page
│   ├── components/               # Modular UI feature components
│   │   ├── contact/              # Contact cards, communication channels & resume download
│   │   ├── experience/           # Timeline component (The Data Island & NSU)
│   │   ├── knowledge-graph/      # TechnicalKnowledgeGraph (Tree & Cards views)
│   │   ├── projects/             # Featured Systems showcase (Flagship + 3-col grid)
│   │   ├── terminal/             # TerminalWidget (Interactive nabil-cli console)
│   │   ├── Hero.tsx              # Hero header with animated typing effect & tech tabs
│   │   ├── ImpactStats.tsx       # Key metrics & telemetry HUD
│   │   ├── LenisProvider.tsx     # Smooth momentum scrolling provider
│   │   └── Navbar.tsx            # Glassmorphic top navigation bar
│   ├── data/                     # Centralized datasets
│   │   └── resumeData.ts         # Verified profile, experience, projects & CLI commands
│   └── lib/                      # Helper utilities
│
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore configuration
├── next.config.mjs               # Next.js bundler configuration
├── package.json                  # Frontend dependencies & npm scripts
├── postcss.config.js             # PostCSS Tailwind configuration
├── run_web.bat                   # Root Windows launch shortcut
├── run_web.ps1                   # Root PowerShell launch shortcut
├── tailwind.config.ts            # Tailwind custom colors & typography
├── tsconfig.json                 # TypeScript compiler configuration
└── README.md                     # Project documentation
```

---

## ⚡ Quick Start Guide

### Prerequisites

Ensure the following runtimes are installed:
- **Node.js**: v18.17+ or v20+ (`node -v`)
- **npm**: v9+ (`npm -v`)
- **Python**: v3.10+ or v3.11+ (`python --version`)
- **Conda** *(optional, recommended)*: Anaconda or Miniconda

---

### 1. Clone & Environment Setup

```bash
git clone https://github.com/THENABILMAN/NABIL-portfolio.git
cd NABIL-portfolio
```

#### Copy Environment Variables Template:
```bash
cp .env.example .env
```

Edit `.env` with your API credentials:
```env
# OpenRouter API (LLM Generation)
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Pinecone Serverless (Vector Database)
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_INDEX_NAME=nabilprotfolio

# Models Configuration
LLM_MODEL=google/gemma-4-31b-it:free
EMBEDDING_MODEL=llama-text-embed-v2
```

---

### 2. Backend Setup (FastAPI & Pinecone)

#### Using Conda:
```powershell
conda create -n nabport python=3.11 -y
conda activate nabport
pip install -r backend/requirements.txt
```

#### Ingest Knowledge Base into Pinecone:
```powershell
python backend/ingest.py
```
*This parses `public/knowledegebase.md` and `public/resume.pdf`, chunks the text into semantic sections, generates 1024-dimensional embeddings, and upserts them into Pinecone.*

---

### 3. Frontend Setup (Next.js 14)

```powershell
npm install
```

---

### 4. Running Locally

#### Option A: One-Click Concurrent Runner (Recommended)
From PowerShell:
```powershell
.\run_web.ps1
```
*(Or double-click `run_web.bat` in File Explorer).*

This concurrently starts:
- **FastAPI RAG Backend**: `http://127.0.0.1:8000` (Interactive Swagger docs: `http://127.0.0.1:8000/docs`)
- **Next.js Frontend**: `http://localhost:3000`

#### Option B: Manual Startup

**Terminal 1 — Backend:**
```powershell
conda activate nabport
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

**Terminal 2 — Frontend:**
```powershell
npm run dev
```

Visit `http://localhost:3000` in your web browser.

---

## 🧪 Testing & Validation

### Frontend TypeScript Verification:
```bash
npx tsc --noEmit
```
*Ensures zero type violations across all components and pages.*

### Backend RAG Integration Test:
```powershell
conda activate nabport
python backend/tests/test_rag.py
```
*Tests live Pinecone retrieval and OpenRouter generation.*

### Fast-Path Query Sanity Check:
```bash
python -c "import urllib.request, json; data = json.dumps({'message': 'projects'}).encode(); req = urllib.request.Request('http://127.0.0.1:8000/api/chat', data=data, headers={'Content-Type': 'application/json'}); print(urllib.request.urlopen(req).read().decode())"
```

---

## 📡 Backend API Reference

| Method | Endpoint | Description | Sample Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Service health, model info, and Pinecone status | *None* |
| `POST` | `/api/chat` | Primary RAG and fast-path query endpoint | `{"message": "tell me about FITMAN"}` |
| `GET` | `/api/chat/stream` | Server-Sent Events (SSE) streaming endpoint | Query param: `?query=...` |
| `POST` | `/api/ingest` | Triggers document re-indexing into Pinecone | *None* |

---

## 👤 Contact & Channels

- **Name**: Mohammad Ali Nabil
- **Brand**: `THENABILMAN`
- **Location**: Dhaka, Bangladesh *(Open to global remote & on-site opportunities)*
- **Email**: [thenabilman@gmail.com](mailto:thenabilman@gmail.com)
- **Phone / WhatsApp**: [+8801909315967](tel:+8801909315967)
- **GitHub**: [github.com/THENABILMAN](https://github.com/THENABILMAN)
- **LinkedIn**: [linkedin.com/in/mohammadalinabil](https://www.linkedin.com/in/mohammadalinabil/)
- **Live Portfolio**: [thenabilman.vercel.app](https://thenabilman.vercel.app/)

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.
