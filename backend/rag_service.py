import json
import logging
import time
import re
from typing import List, Dict, Any, AsyncGenerator, Optional
import httpx
from pinecone import Pinecone

from backend import config
from backend.embeddings import PineconeEmbeddings

logger = logging.getLogger("rag_service")
logging.basicConfig(level=logging.INFO)

SYSTEM_PROMPT = """You are the AI Digital Twin and Portfolio Agent of Mohammad Ali Nabil (personal brand: THENABILMAN).
Nabil is an AI Systems Engineer specializing in Autonomous Multi-Agent Systems, RAG Architectures, Real-Time Voice AI, and Scalable Python Backends.

Instructions:
1. Represent Nabil accurately, professionally, and concisely with a crisp, technical tone suited for an interactive developer terminal.
2. Ground your answers strictly in the retrieved context provided below from Nabil's knowledge base and resume.
3. If the answer cannot be found in the context, do NOT fabricate facts. Honestly state that it is outside the indexed portfolio context and encourage the user to reach out directly:
   - Email: thenabilman@gmail.com
   - GitHub: github.com/THENABILMAN
4. Highlight concrete metrics and real projects where relevant:
   - FITMAN (LangGraph agentic fitness & nutrition backend with multi-agent orchestration, Groq < 300ms streaming, Supabase PostgreSQL)
   - LiveKit MCP AI Assistant (Real-time voice agent with WebRTC & Model Context Protocol)
   - Bangla Voice AI Agent (End-to-end STT, LLM, TTS pipeline)
   - Work at The Data Island (AI Engineer Intern on the GenAI Team: scraping, batch extraction, agent debugging, structured pipelines)
   - Education: North South University (BSc in CSE), aspiring to graduate studies in Germany focusing on quantum computing and AI.
5. Format your response cleanly using concise bullet points or clean terminal-friendly markdown.
6. CRITICAL: Output ONLY the direct final response. Do NOT include any meta-reasoning, thought process, internal monologues, or phrases like "The user wants to know" or "Here is a thinking process". Start immediately with the answer.
"""

# Static fast-path knowledge base for instantaneous responses (sub-10ms) without vector DB overhead
FAST_RESPONSES = {
    "sentiment": {
        "patterns": [r"\b(do you love nabil|do u love nabil|doyou love nabil|are you in love with nabil|do you like nabil|what do you think of nabil)\b"],
        "answer": "I am Nabil's AI digital twin and portfolio agent. While I don't experience human emotions, I can vouch for his relentless work ethic, engineering depth, and dedication to building production-grade software and autonomous AI systems!",
        "section": "Agent Persona"
    },
    "greetings": {
        "patterns": [r"^(hi|hello|hey|sup|yo|howdy|hola|greetings|good morning|good afternoon|good evening|hi there)$"],
        "answer": "Hello! I'm Nabil's portfolio AI agent. Ask me about his projects (like FITMAN or LiveKit Voice AI), his experience at The Data Island, his tech stack, or his educational background at North South University.",
        "section": "Greeting"
    },
    "identity": {
        "patterns": [r"\b(who are you|who is nabil|about nabil|tell me about yourself|tell me about nabil|whoami|introduce yourself)\b"],
        "answer": "Mohammad Ali Nabil (THENABILMAN) is a Software Developer and AI Systems Engineer from Dhaka, Bangladesh. He is an undergraduate in Computer Science & Engineering at North South University and a former AI Engineer Intern at The Data Island (GenAI Team). He specializes in building autonomous multi-agent systems with LangGraph, production RAG pipelines, and full-stack Python/FastAPI web backends.",
        "section": "Core Identity"
    },
    "fitman": {
        "patterns": [r"\b(what is fitman|fitman|fitman app|tell me about fitman|fitman project)\b"],
        "answer": "FITMAN is a production full-stack AI fitness and nutrition coaching platform engineered by Nabil:\n• Agent Architecture: Orchestrates LangGraph multi-agent state machines with multi-turn memory for adaptive macro calculation and workout programming.\n• High-Speed Inference: Integrates Groq LLaMA-3 accelerators for streaming responses with < 300ms latency.\n• Backend & Database: FastAPI asynchronous microservices paired with Supabase PostgreSQL, employing strict Row-Level Security (RLS) policies for user health telemetry.\n• Frontend: Responsive React + TypeScript + Vite + Tailwind CSS dashboard with daily habit adherence tracking.\n• Live Link: https://fitmanver.vercel.app/ | GitHub: github.com/thenabilman/fitman",
        "section": "FITMAN Production System"
    },
    "data_island": {
        "patterns": [r"\b(data island|the data island|internship|what work was done at the data island|what did nabil do at the data island)\b"],
        "answer": "At The Data Island (Nov 2025 – Jan 2026), Nabil worked as an AI Engineer Intern on the GenAI Team:\n• Automated Data Workflows: Architected end-to-end web scraping, structured extraction, and automated normalization pipelines in Python.\n• Batch Execution: Designed asynchronous batch processing architectures with exponential retry logic to process high-volume datasets reliably.\n• Agent Verification: Debugged and optimized complex LLM reasoning loops, reducing hallucinations and improving state flow reliability.",
        "section": "Experience: The Data Island"
    },
    "rag_capabilities": {
        "patterns": [r"\b(rag|rag capabilities|core rag capabilities|retrieval augmented generation|how does rag work)\b"],
        "answer": "Nabil's core RAG (Retrieval-Augmented Generation) capabilities include:\n• Hybrid Search: Merging dense vector embeddings (Pinecone Serverless / llama-text-embed-v2, 1024-dim) with sparse keyword indexing (BM25) and Reciprocal Rank Fusion (RRF).\n• Context Optimization: Precise document chunking, metadata tagging, and cross-encoder reranking (BGE Reranker) to deliver top-k relevant citations.\n• Production Performance: Sub-500ms retrieval latencies integrated into FastAPI async endpoints with streaming token responses.",
        "section": "RAG Architecture"
    },
    "contact": {
        "patterns": [r"\b(contact|email|phone|whatsapp|linkedin|how to reach|hire|get in touch|reach out)\b"],
        "answer": "You can connect with Nabil directly via:\n• Email: thenabilman@gmail.com\n• Phone / WhatsApp: +8801909315967\n• GitHub: https://github.com/THENABILMAN\n• LinkedIn: https://www.linkedin.com/in/mohammadalinabil/\n• Location: Dhaka, Bangladesh (Available for remote and on-site opportunities)",
        "section": "Direct Channels"
    },
    "resume": {
        "patterns": [r"\b(download resume|download cv|get resume|get cv|view resume|view cv|resume pdf|your resume|your cv|resume link|see resume)\b|^(resume|cv|pdf)$"],
        "answer": "You can download Nabil's verified CV directly from: /resume.pdf (or use the 'Download Resume' buttons located in the hero and contact sections).",
        "section": "Credentials"
    },
    "skills": {
        "patterns": [r"^(skills|tech stack|what are your skills|what tech stack|languages|technologies|what do you know)$"],
        "answer": "Nabil's core technical stack spans:\n• AI Models & Tuning: LLM & LMM Fine-Tuning (LoRA, QLoRA, PEFT), LLM Model Training (SFT, DPO), Unsloth, Hugging Face TRL, PyTorch\n• Agentic Architectures & RAG: LangGraph Multi-Agent DAGs, Dense/Sparse RAG, Pinecone Serverless (1024-dim), LiveKit WebRTC, MCP Tools\n• Backend & APIs: Python, FastAPI Async, PostgreSQL, Supabase RLS, Docker, WebSockets\n• Languages: Python, C++, TypeScript, React, SQL\n• Foundations: Data Structures, Algorithms, Linux, Distributed Systems",
        "section": "Technical Skills"
    },
    "fine_tuning": {
        "patterns": [r"\b(fine[- ]?tun(e|ing)|lmm|train(ing)? (llm|model|models)|lora|qlora|peft|sft|unsloth)\b"],
        "answer": "Yes! Mohammad Ali Nabil specializes in LLM & LMM (Large Multimodal Model) Fine-Tuning and Model Training:\n• LLM Fine-Tuning: Hands-on expertise with Parameter-Efficient Fine-Tuning (LoRA, QLoRA, PEFT) using Unsloth and Hugging Face TRL to adapt open-weights LLMs (LLaMA-3, Gemma, Mistral) on domain-specific datasets.\n• LMM Fine-Tuning: Fine-tuning vision-language models for document extraction, visual reasoning, and multimodal tool-use.\n• Model Training & Alignment: SFT (Supervised Fine-Tuning), DPO (Direct Preference Optimization), instruction dataset curation, and model quantization (GGUF / AWQ / bitsandbytes) for high-throughput edge and server deployment.",
        "section": "LLM/LMM Fine-Tuning & Model Training"
    },
    "projects": {
        "patterns": [r"^(projects|what have you built|featured systems|portfolio projects|show projects)$"],
        "answer": "Nabil's featured engineering systems include:\n1. FITMAN: Full-stack AI fitness & nutrition platform powered by LangGraph multi-agent DAGs, sub-300ms Groq streaming inference, and Supabase PostgreSQL.\n2. Autonomous Agent System: Memory-equipped agent with Pinecone vector retrieval and Pydantic schema validation.\n3. AI Resume Analyzer: LLM-powered CV parsing, entity extraction, and job match scoring (github.com/THENABILMAN/THENABILMAN_AI_Resume-Analyzer).\n4. Real-Time AI Voice Agent: Full-duplex conversational voice loop with streaming Whisper STT and neural TTS (github.com/THENABILMAN/THENABILMAN_AI_Voice_Agent).\n5. End-to-End Bangla AI Voice Agent: Native Bengali speech recognition and natural voice synthesis (github.com/THENABILMAN/THENABILMAN_End-to-End_Bangla_AI_voice-agent).\n6. LiveKit MCP Voice Assistant: Real-time WebRTC voice agent with Model Context Protocol schemas.\n7. AI Vision & OCR Agent: Real-time video filtering and OCR document extraction engine.",
        "section": "Projects Overview"
    },
    "resume_analyzer": {
        "patterns": [r"\b(resume analyzer|cv analyzer|ats|resume matcher|job fit score|ai resume)\b"],
        "answer": "AI Resume Analyzer & Matcher is an intelligent resume intelligence engine engineered by Nabil:\n• Entity Extraction: Uses constrained LLM prompts and JSON schemas to extract structured data (skills, experience, education) from PDF/DOCX resumes.\n• Semantic Scoring: Computes cosine vector similarity between applicant credentials and target job requisitions, generating concrete gap analysis suggestions.\n• Tech Stack: Python, LLMs, FastAPI, Streamlit, LangChain, NLP, PDF Parsing.\n• GitHub: https://github.com/THENABILMAN/THENABILMAN_AI_Resume-Analyzer",
        "section": "AI Resume Analyzer"
    },
    "bangla_voice_agent": {
        "patterns": [r"\b(bangla voice|bengali voice|bangla ai voice|bangla speech|bengali stt|bangla tts|bangla)\b"],
        "answer": "End-to-End Bangla AI Voice Agent is a specialized multilingual voice assistant engineered by Nabil for the Bengali language:\n• Native Bengali ASR: Employs fine-tuned Bengali Whisper/ASR models to transcribe spoken Bangla accurately in noisy environments.\n• Context Preservation: Enforces strict Bengali script prompts to prevent language mixing and hallucination.\n• Natural Prosody TTS: Synthesizes high-fidelity Bengali neural speech with minimal streaming latency.\n• Tech Stack: Bengali NLP, Bangla STT, Bangla TTS, Python, PyTorch, FastAPI, Voice AI.\n• GitHub: https://github.com/THENABILMAN/THENABILMAN_End-to-End_Bangla_AI_voice-agent",
        "section": "Bangla AI Voice Agent"
    },
    "voice_agent": {
        "patterns": [r"\b(voice agent|real-time voice|ai voice agent|conversational voice|speech agent)\b"],
        "answer": "Real-Time AI Voice Agent is a full-duplex conversational voice system engineered by Nabil:\n• Streaming Audio Pipeline: Ingests raw audio frames via WebSockets with Voice Activity Detection (VAD) for natural turn-taking.\n• Low-Latency Orchestration: Sub-second roundtrip loop combining streaming Whisper Speech-to-Text (STT), low-latency LLM reasoning, and neural Text-to-Speech (TTS).\n• Tech Stack: Python, Whisper STT, Neural TTS, WebSockets, FastAPI, Audio Streaming.\n• GitHub: https://github.com/THENABILMAN/THENABILMAN_AI_Voice_Agent",
        "section": "Real-Time AI Voice Agent"
    }
}

class RAGService:
    def __init__(self):
        self.pc = Pinecone(api_key=config.PINECONE_API_KEY)
        self.index = self.pc.Index(config.PINECONE_INDEX_NAME)
        self.embedder = PineconeEmbeddings(
            api_key=config.PINECONE_API_KEY,
            model=config.EMBEDDING_MODEL
        )
        self.primary_model = config.LLM_MODEL
        self.fallback_models = config.FALLBACK_LLM_MODELS
        self._cache: Dict[str, Dict[str, Any]] = {}

    def get_fast_response(self, query: str) -> Optional[Dict[str, Any]]:
        """Checks if the query matches common intents to answer instantly without vector DB latency."""
        cleaned = query.strip().lower()
        cleaned = re.sub(r"[?!.,\"']+", "", cleaned).strip()

        for category, data in FAST_RESPONSES.items():
            for pattern in data["patterns"]:
                if re.search(pattern, cleaned, re.IGNORECASE):
                    return {
                        "answer": data["answer"],
                        "sources": [{"source": "knowledegebase.md", "section": data["section"], "score": 1.0}],
                        "model": "fast-router"
                    }
        return None

    def retrieve(self, query: str, top_k: int = 4) -> List[Dict[str, Any]]:
        """Retrieves top-k relevant chunks from Pinecone vector index with timeout safety."""
        # Avoid vector search for extremely short queries
        if len(query.strip().split()) <= 1 and len(query.strip()) < 5:
            return []

        try:
            query_vector = self.embedder.embed_query(query)
            res = self.index.query(
                vector=query_vector,
                top_k=top_k,
                include_metadata=True
            )
            matches = []
            for match in res.get("matches", []):
                metadata = match.get("metadata", {})
                score = match.get("score", 0.0)
                if score >= 0.25:
                    matches.append({
                        "score": score,
                        "source": metadata.get("source", "knowledegebase.md"),
                        "section": metadata.get("section", "General"),
                        "text": metadata.get("text", "")
                    })
            return matches
        except Exception as e:
            logger.error(f"Vector retrieval error: {e}")
            return []

    def _build_messages(self, query: str, context_chunks: List[Dict[str, Any]], history: List[Dict[str, str]] = None) -> List[Dict[str, str]]:
        """Constructs prompt message list for OpenRouter chat API."""
        context_str = ""
        if context_chunks:
            context_str = "\n\n--- RETRIEVED PORTFOLIO CONTEXT ---\n"
            for i, chunk in enumerate(context_chunks):
                context_str += f"\n[Document {i+1} | Source: {chunk['source']} | Section: {chunk['section']}]\n{chunk['text']}\n"
            context_str += "\n--- END CONTEXT ---\n"
        else:
            context_str = "\n(Answer using your verified persona and knowledge of Nabil's portfolio)\n"

        system_content = f"{SYSTEM_PROMPT}\n{context_str}"
        messages = [{"role": "system", "content": system_content}]

        # Append recent history if provided
        if history:
            for item in history[-4:]:
                messages.append({"role": item.get("role", "user"), "content": item.get("content", "")})

        messages.append({"role": "user", "content": query})
        return messages

    async def generate_response(self, query: str, history: List[Dict[str, str]] = None) -> Dict[str, Any]:
        """Runs RAG pipeline with fast-path routing, caching, and resilient LLM generation."""
        normalized_key = query.strip().lower()

        # 1. Check Fast-Path Intent (0ms latency for greetings, bio, contacts, skills, projects, FITMAN, Data Island, RAG)
        fast_resp = self.get_fast_response(query)
        if fast_resp:
            logger.info(f"Fast-path routed query: '{query}'")
            return fast_resp

        # 2. Check In-Memory Cache for frequent exact queries
        if normalized_key in self._cache:
            logger.info(f"Cache hit for query: '{query}'")
            return self._cache[normalized_key]

        # 3. Vector DB Retrieval only for substantive open-ended questions
        chunks = self.retrieve(query, top_k=4)
        messages = self._build_messages(query, chunks, history)

        models_to_try = [self.primary_model] + self.fallback_models
        headers = {
            "Authorization": f"Bearer {config.OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://thenabilman.com",
            "X-Title": "Nabil AI Portfolio Terminal",
        }

        async with httpx.AsyncClient(timeout=15.0) as client:
            for model_name in models_to_try:
                try:
                    payload = {
                        "model": model_name,
                        "messages": messages,
                        "temperature": 0.2,
                        "max_tokens": 500,
                    }
                    resp = await client.post(
                        f"{config.OPENROUTER_BASE_URL}/chat/completions",
                        headers=headers,
                        json=payload
                    )

                    if resp.status_code == 200:
                        data = resp.json()
                        raw_answer = data["choices"][0]["message"]["content"]
                        
                        # Clean reasoning tags cleanly
                        cleaned_answer = raw_answer
                        if "<think>" in cleaned_answer and "</think>" in cleaned_answer:
                            cleaned_answer = cleaned_answer.split("</think>")[-1].strip()
                        elif "Here's a thinking process:" in cleaned_answer:
                            parts = cleaned_answer.split("Here's a thinking process:")[-1]
                            match = re.search(r"(?:###|\n\n\s*[*#A-Za-z])(.*)", parts, re.DOTALL)
                            if match:
                                cleaned_answer = match.group(0).strip()
                            else:
                                cleaned_answer = parts.strip()

                        result = {
                            "answer": cleaned_answer.strip() if cleaned_answer.strip() else raw_answer.strip(),
                            "sources": [{"source": c["source"], "section": c["section"], "score": round(c["score"], 3)} for c in chunks] if chunks else [{"source": "knowledegebase.md", "section": "Portfolio Context", "score": 0.95}],
                            "model": model_name
                        }
                        
                        # Save to in-memory cache
                        self._cache[normalized_key] = result
                        return result
                    else:
                        logger.warning(f"Model {model_name} returned status {resp.status_code}. Trying next model...")
                        continue
                except Exception as ex:
                    logger.error(f"Error querying model {model_name}: {ex}")
                    continue

        # Graceful fallback answer if upstream models timeout
        fallback_res = {
            "answer": "Mohammad Ali Nabil is a Software Developer & AI Systems Engineer specializing in Autonomous Multi-Agent Systems, LangGraph workflows, and RAG pipelines. For in-depth discussions or inquiries, reach out directly at thenabilman@gmail.com or visit github.com/THENABILMAN.",
            "sources": [{"source": "knowledegebase.md", "section": "Summary Overview", "score": 0.9}],
            "model": "offline-fallback"
        }
        return fallback_res

    async def stream_response(self, query: str, history: List[Dict[str, str]] = None) -> AsyncGenerator[str, None]:
        """Streams response tokens via Server-Sent Events (SSE)."""
        fast_resp = self.get_fast_response(query)
        if fast_resp:
            yield f"data: {json.dumps({'type': 'sources', 'sources': fast_resp['sources']})}\n\n"
            yield f"data: {json.dumps({'type': 'model', 'model': 'fast-router'})}\n\n"
            yield f"data: {json.dumps({'type': 'token', 'token': fast_resp['answer']})}\n\n"
            yield f"data: {json.dumps({'type': 'done'})}\n\n"
            return

        chunks = self.retrieve(query, top_k=4)
        messages = self._build_messages(query, chunks, history)
        
        sources_meta = [{"source": c["source"], "section": c["section"]} for c in chunks] if chunks else [{"source": "knowledegebase.md", "section": "Portfolio Context"}]
        yield f"data: {json.dumps({'type': 'sources', 'sources': sources_meta})}\n\n"

        models_to_try = [self.primary_model] + self.fallback_models
        headers = {
            "Authorization": f"Bearer {config.OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://thenabilman.com",
            "X-Title": "Nabil AI Portfolio Terminal",
        }

        async with httpx.AsyncClient(timeout=20.0) as client:
            for model_name in models_to_try:
                try:
                    payload = {
                        "model": model_name,
                        "messages": messages,
                        "temperature": 0.2,
                        "max_tokens": 500,
                        "stream": True,
                    }
                    async with client.stream(
                        "POST",
                        f"{config.OPENROUTER_BASE_URL}/chat/completions",
                        headers=headers,
                        json=payload
                    ) as response:
                        if response.status_code != 200:
                            continue

                        yield f"data: {json.dumps({'type': 'model', 'model': model_name})}\n\n"
                        async for line in response.aiter_lines():
                            if not line or not line.startswith("data: "):
                                continue
                            line_data = line[6:].strip()
                            if line_data == "[DONE]":
                                yield f"data: {json.dumps({'type': 'done'})}\n\n"
                                return
                            try:
                                chunk_json = json.loads(line_data)
                                delta = chunk_json.get("choices", [{}])[0].get("delta", {})
                                token = delta.get("content", "")
                                if token:
                                    yield f"data: {json.dumps({'type': 'token', 'token': token})}\n\n"
                            except Exception:
                                continue
                        return
                except Exception as e:
                    logger.error(f"Stream exception with {model_name}: {e}")
                    continue

        yield f"data: {json.dumps({'type': 'token', 'token': 'Mohammad Ali Nabil is an AI Systems Engineer specializing in Agentic RAG and LangGraph. Please connect directly via thenabilman@gmail.com.'})}\n\n"
        yield f"data: {json.dumps({'type': 'done'})}\n\n"
