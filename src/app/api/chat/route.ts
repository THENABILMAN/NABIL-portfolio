import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BACKEND_FASTAPI_URL = process.env.BACKEND_INTERNAL_URL || "http://127.0.0.1:8000";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";
const LLM_MODEL = process.env.LLM_MODEL || "nex-agi/nex-n2.5-mini:free";
const FALLBACK_MODELS = [
  "liquid/lfm-2.5-2.6b:free",
  "inclusionai/ling-3.0-flash-vl:free",
  "cohere/north-mini-code:free",
];

// In-memory query response cache
const queryCache = new Map<string, any>();

// Read knowledge base from disk for local fallback
let localKnowledgeBase = "";
try {
  const kbPath = path.join(process.cwd(), "public", "knowledegebase.md");
  if (fs.existsSync(kbPath)) {
    localKnowledgeBase = fs.readFileSync(kbPath, "utf-8").slice(0, 8000);
  }
} catch {
  // Ignored
}

// Clean reasoning and chain-of-thought blocks if emitted by upstream models
function sanitizeLLMOutput(raw: string): string {
  let cleaned = raw;
  if (cleaned.includes("<think>") && cleaned.includes("</think>")) {
    cleaned = cleaned.split("</think>").pop() || "";
  }
  if (cleaned.includes("Here's a thinking process:")) {
    const after = cleaned.split("Here's a thinking process:").pop() || "";
    const match = after.match(/(?:###|\n\n\s*[*#A-Za-z])([\s\S]*)/);
    cleaned = match ? match[0] : after;
  }
  return cleaned.trim();
}

// Fast-path routing to answer common queries in sub-5ms with zero vector DB overhead
function getFastPathResponse(query: string) {
  const q = query.trim().toLowerCase().replace(/[?!.,"'`]+/g, "").trim();

  // 0. Personal Sentiment / Playful questions
  if (/\b(do you love nabil|do u love nabil|are you in love with nabil|do you like nabil|what do you think of nabil)\b/i.test(q)) {
    return {
      answer: "I am Nabil's AI digital twin and portfolio agent. While I don't experience human emotions, I can vouch for his relentless work ethic, engineering depth, and dedication to building production-grade software and autonomous AI systems!",
      sources: [{ source: "knowledegebase.md", section: "Agent Persona", score: 1.0 }],
      model: "fast-router",
    };
  }

  // 1. Greetings
  if (/^(hi|hello|hey|sup|yo|howdy|hola|greetings|good morning|good evening|hi there)$/i.test(q)) {
    return {
      answer: "Hello! I'm Nabil's portfolio AI agent. Ask me about his projects (like FITMAN or LiveKit Voice AI), his experience at The Data Island, his tech stack, or his educational background at North South University.",
      sources: [{ source: "knowledegebase.md", section: "Greeting", score: 1.0 }],
      model: "fast-router",
    };
  }

  // 2. Identity / Whoami
  if (/\b(who are you|who is nabil|about nabil|tell me about yourself|tell me about nabil|whoami|introduce yourself)\b/i.test(q)) {
    return {
      answer: "Mohammad Ali Nabil (THENABILMAN) is a Software Developer and AI Systems Engineer from Dhaka, Bangladesh. He is an undergraduate in Computer Science & Engineering at North South University and a former AI Engineer Intern at The Data Island (GenAI Team). He specializes in building autonomous multi-agent systems with LangGraph, production RAG pipelines, and full-stack Python/FastAPI web backends.",
      sources: [{ source: "knowledegebase.md", section: "Core Identity", score: 1.0 }],
      model: "fast-router",
    };
  }

  // 3. FITMAN System
  if (/\b(what is fitman|fitman|fitman app|tell me about fitman|fitman project)\b/i.test(q)) {
    return {
      answer: "FITMAN is a production full-stack AI fitness and nutrition coaching platform engineered by Nabil:\n• Agent Architecture: Orchestrates LangGraph multi-agent state machines with multi-turn memory for adaptive macro calculation and workout programming.\n• High-Speed Inference: Integrates Groq LLaMA-3 accelerators for streaming responses with < 300ms latency.\n• Backend & Database: FastAPI asynchronous microservices paired with Supabase PostgreSQL, employing strict Row-Level Security (RLS) policies for user health telemetry.\n• Frontend: Responsive React + TypeScript + Vite + Tailwind CSS dashboard with daily habit adherence tracking.\n• Live Link: https://fitmanver.vercel.app/ | GitHub: github.com/thenabilman/fitman",
      sources: [{ source: "knowledegebase.md", section: "FITMAN Production System", score: 1.0 }],
      model: "fast-router",
    };
  }

  // 4. The Data Island
  if (/\b(data island|the data island|internship|what work was done at the data island|what did nabil do at the data island)\b/i.test(q)) {
    return {
      answer: "At The Data Island (Nov 2025 – Jan 2026), Nabil worked as an AI Engineer Intern on the GenAI Team:\n• Automated Data Workflows: Architected end-to-end web scraping, structured extraction, and automated normalization pipelines in Python.\n• Batch Execution: Designed asynchronous batch processing architectures with exponential retry logic to process high-volume datasets reliably.\n• Agent Verification: Debugged and optimized complex LLM reasoning loops, reducing hallucinations and improving state flow reliability.",
      sources: [{ source: "knowledegebase.md", section: "Experience: The Data Island", score: 1.0 }],
      model: "fast-router",
    };
  }

  // 5. RAG Capabilities
  if (/\b(rag|rag capabilities|core rag capabilities|retrieval augmented generation|how does rag work)\b/i.test(q)) {
    return {
      answer: "Nabil's core RAG (Retrieval-Augmented Generation) capabilities include:\n• Hybrid Search: Merging dense vector embeddings (Pinecone Serverless / llama-text-embed-v2, 1024-dim) with sparse keyword indexing (BM25) and Reciprocal Rank Fusion (RRF).\n• Context Optimization: Precise document chunking, metadata tagging, and cross-encoder reranking (BGE Reranker) to deliver top-k relevant citations.\n• Production Performance: Sub-500ms retrieval latencies integrated into FastAPI async endpoints with streaming token responses.",
      sources: [{ source: "knowledegebase.md", section: "RAG Architecture", score: 1.0 }],
      model: "fast-router",
    };
  }

  // 6. Contact
  if (/\b(contact|email|phone|whatsapp|linkedin|how to reach|hire|get in touch|reach out)\b/i.test(q)) {
    return {
      answer: "You can connect with Nabil directly via:\n• Email: thenabilman@gmail.com\n• Phone / WhatsApp: +8801909315967\n• GitHub: https://github.com/THENABILMAN\n• LinkedIn: https://www.linkedin.com/in/mohammadalinabil/\n• Location: Dhaka, Bangladesh (Available for remote and on-site opportunities)",
      sources: [{ source: "resumeData.ts", section: "Direct Channels", score: 1.0 }],
      model: "fast-router",
    };
  }

  // 7. Resume Download
  if (/\b(download resume|download cv|get resume|get cv|view resume|view cv|resume pdf|your resume|your cv|resume link|see resume)\b|^(resume|cv|pdf)$/i.test(q)) {
    return {
      answer: "You can download Nabil's verified CV directly from: /resume.pdf (or use the 'Download Resume' buttons in the hero and contact sections).",
      sources: [{ source: "resume.pdf", section: "Credentials", score: 1.0 }],
      model: "fast-router",
    };
  }

  // 8. Skills
  if (/^(skills|tech stack|what are your skills|what tech stack|languages|technologies|what do you know)$/i.test(q)) {
    return {
      answer: "Nabil's core technical stack spans:\n• AI Models & Tuning: LLM & LMM Fine-Tuning (LoRA, QLoRA, PEFT), LLM Model Training (SFT, DPO), Unsloth, Hugging Face TRL, PyTorch\n• Agentic Architectures & RAG: LangGraph Multi-Agent DAGs, Dense/Sparse RAG, Pinecone Serverless (1024-dim), LiveKit WebRTC, MCP Tools\n• Backend & APIs: Python, FastAPI Async, PostgreSQL, Supabase RLS, Docker, WebSockets\n• Languages: Python, C++, TypeScript, React, SQL\n• Foundations: Data Structures, Algorithms, Linux, Distributed Systems",
      sources: [{ source: "knowledegebase.md", section: "Technical Skills", score: 1.0 }],
      model: "fast-router",
    };
  }

  // 9. LLM / LMM Fine-Tuning & Model Training
  if (/\b(fine[- ]?tun(e|ing)|lmm|train(ing)? (llm|model|models)|lora|qlora|peft|sft|unsloth)\b/i.test(q)) {
    return {
      answer: "Yes! Mohammad Ali Nabil specializes in LLM & LMM (Large Multimodal Model) Fine-Tuning and Model Training:\n• LLM Fine-Tuning: Hands-on expertise with Parameter-Efficient Fine-Tuning (LoRA, QLoRA, PEFT) using Unsloth and Hugging Face TRL to adapt open-weights LLMs (LLaMA-3, Gemma, Mistral) on custom domain datasets.\n• LMM Fine-Tuning: Fine-tuning vision-language models for document extraction, visual reasoning, and multimodal tool-use.\n• Model Training & Alignment: SFT (Supervised Fine-Tuning), DPO (Direct Preference Optimization), instruction dataset curation, and model quantization (GGUF / AWQ / bitsandbytes) for high-throughput edge and server deployment.",
      sources: [{ source: "knowledegebase.md", section: "LLM/LMM Fine-Tuning & Model Training", score: 1.0 }],
      model: "fast-router",
    };
  }

  // 10. Projects Overview
  if (/^(projects|what have you built|featured systems|portfolio projects|show projects)$/i.test(q)) {
    return {
      answer: "Nabil's featured engineering systems include:\n1. FITMAN: Full-stack AI fitness & nutrition platform powered by LangGraph multi-agent DAGs, sub-300ms Groq streaming inference, and Supabase PostgreSQL.\n2. Autonomous Agent System: Memory-equipped agent with Pinecone vector retrieval and Pydantic schema validation.\n3. AI Resume Analyzer: LLM-powered CV parsing, entity extraction, and job match scoring (github.com/THENABILMAN/THENABILMAN_AI_Resume-Analyzer).\n4. Real-Time AI Voice Agent: Full-duplex conversational voice loop with streaming Whisper STT and neural TTS (github.com/THENABILMAN/THENABILMAN_AI_Voice_Agent).\n5. End-to-End Bangla AI Voice Agent: Native Bengali speech recognition and natural voice synthesis (github.com/THENABILMAN/THENABILMAN_End-to-End_Bangla_AI_voice-agent).\n6. LiveKit MCP Voice Assistant: Real-time WebRTC voice agent with Model Context Protocol schemas.\n7. AI Vision & OCR Agent: Real-time video filtering and OCR document extraction engine.",
      sources: [{ source: "knowledegebase.md", section: "Projects Overview", score: 1.0 }],
      model: "fast-router",
    };
  }

  // 11. AI Resume Analyzer
  if (/\b(resume analyzer|cv analyzer|ats|resume matcher|job fit score|ai resume)\b/i.test(q)) {
    return {
      answer: "AI Resume Analyzer & Matcher is an intelligent resume intelligence engine engineered by Nabil:\n• Entity Extraction: Uses constrained LLM prompts and JSON schemas to extract structured data (skills, experience, education) from PDF/DOCX resumes.\n• Semantic Scoring: Computes cosine vector similarity between applicant credentials and target job requisitions, generating concrete gap analysis suggestions.\n• Tech Stack: Python, LLMs, FastAPI, Streamlit, LangChain, NLP, PDF Parsing.\n• GitHub: https://github.com/THENABILMAN/THENABILMAN_AI_Resume-Analyzer",
      sources: [{ source: "knowledegebase.md", section: "AI Resume Analyzer", score: 1.0 }],
      model: "fast-router",
    };
  }

  // 12. Bangla AI Voice Agent
  if (/\b(bangla voice|bengali voice|bangla ai voice|bangla speech|bengali stt|bangla tts|bangla)\b/i.test(q)) {
    return {
      answer: "End-to-End Bangla AI Voice Agent is a specialized multilingual voice assistant engineered by Nabil for the Bengali language:\n• Native Bengali ASR: Employs fine-tuned Bengali Whisper/ASR models to transcribe spoken Bangla accurately in noisy environments.\n• Context Preservation: Enforces strict Bengali script prompts to prevent language mixing and hallucination.\n• Natural Prosody TTS: Synthesizes high-fidelity Bengali neural speech with minimal streaming latency.\n• Tech Stack: Bengali NLP, Bangla STT, Bangla TTS, Python, PyTorch, FastAPI, Voice AI.\n• GitHub: https://github.com/THENABILMAN/THENABILMAN_End-to-End_Bangla_AI_voice-agent",
      sources: [{ source: "knowledegebase.md", section: "Bangla AI Voice Agent", score: 1.0 }],
      model: "fast-router",
    };
  }

  // 13. Real-Time AI Voice Agent
  if (/\b(voice agent|real-time voice|ai voice agent|conversational voice|speech agent)\b/i.test(q)) {
    return {
      answer: "Real-Time AI Voice Agent is a full-duplex conversational voice system engineered by Nabil:\n• Streaming Audio Pipeline: Ingests raw audio frames via WebSockets with Voice Activity Detection (VAD) for natural turn-taking.\n• Low-Latency Orchestration: Sub-second roundtrip loop combining streaming Whisper Speech-to-Text (STT), low-latency LLM reasoning, and neural Text-to-Speech (TTS).\n• Tech Stack: Python, Whisper STT, Neural TTS, WebSockets, FastAPI, Audio Streaming.\n• GitHub: https://github.com/THENABILMAN/THENABILMAN_AI_Voice_Agent",
      sources: [{ source: "knowledegebase.md", section: "Real-Time AI Voice Agent", score: 1.0 }],
      model: "fast-router",
    };
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body?.message?.trim();

    if (!message) {
      return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
    }

    const normalizedKey = message.toLowerCase();

    // 1. FAST-PATH: Return immediate answer for greetings, bio, contacts, skills, projects, FITMAN, Data Island
    const fastAnswer = getFastPathResponse(message);
    if (fastAnswer) {
      return NextResponse.json(fastAnswer);
    }

    // 2. CACHE: Return cached response if previously queried
    if (queryCache.has(normalizedKey)) {
      return NextResponse.json(queryCache.get(normalizedKey));
    }

    // 3. Try FastAPI RAG Backend (with 3.5s timeout so user never hangs)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const fastapiRes = await fetch(`${BACKEND_FASTAPI_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (fastapiRes.ok) {
        const data = await fastapiRes.json();
        queryCache.set(normalizedKey, data);
        return NextResponse.json(data);
      }
    } catch {
      // Backend is offline or timed out; fall through to direct fast LLM inference
    }

    // 4. Fast Direct LLM Inference with verified local knowledge
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({
        answer: "Mohammad Ali Nabil (THENABILMAN) is an AI Systems Engineer specializing in Autonomous Agents, RAG, and Voice AI. Connect directly via thenabilman@gmail.com.",
        sources: [{ source: "knowledegebase.md", section: "Profile Overview", score: 1.0 }],
        model: "fast-router",
      });
    }

    const systemPrompt = `You are the AI Digital Twin and Portfolio Agent of Mohammad Ali Nabil (personal brand: THENABILMAN).
Nabil is an AI Systems Engineer specializing in Autonomous Multi-Agent Systems, RAG Architectures, Real-Time Voice AI, and Scalable Python Backends.

Verified Portfolio Information:
${localKnowledgeBase}

Instructions:
1. Represent Nabil accurately, professionally, and concisely with a crisp, technical tone suited for an interactive developer terminal.
2. Ground your answers strictly in the verified portfolio information above.
3. Highlight concrete metrics and real projects where relevant:
   - FITMAN (LangGraph agentic fitness & nutrition backend with multi-agent orchestration)
   - LiveKit MCP AI Assistant (Real-time voice agent with WebRTC & vector retrieval)
   - Bangla Voice AI Agent (End-to-end STT, LLM, TTS pipeline)
   - Work at The Data Island (AI Engineer Intern on the GenAI Team: scraping, batch extraction, agent debugging)
   - Education: North South University (BSc in CSE).
4. Format your response cleanly using concise bullet points or clean terminal-friendly text.
5. CRITICAL: Output ONLY the direct final response. Do NOT include any meta-reasoning, thought process, internal monologues, or phrases like "The user wants to know". Start immediately with the answer.`;

    const modelsToTry = [LLM_MODEL, ...FALLBACK_MODELS];

    for (const model of modelsToTry) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        const resp = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://thenabilman.com",
            "X-Title": "Nabil AI Portfolio Terminal",
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: message },
            ],
            temperature: 0.2,
            max_tokens: 500,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (resp.ok) {
          const data = await resp.json();
          let rawAnswer: string = data.choices?.[0]?.message?.content || "";

          const cleanedAnswer = sanitizeLLMOutput(rawAnswer);

          const result = {
            answer: cleanedAnswer || rawAnswer.trim(),
            sources: [{ source: "knowledegebase.md", section: "Verified Portfolio Knowledge", score: 0.95 }],
            model,
          };

          queryCache.set(normalizedKey, result);
          return NextResponse.json(result);
        }
      } catch {
        continue;
      }
    }

    return NextResponse.json({
      answer: "Mohammad Ali Nabil is an AI Systems Engineer specializing in Agentic RAG, LangGraph, and Voice AI. High upstream traffic on free inference endpoints—please reach out directly at thenabilman@gmail.com.",
      sources: [{ source: "knowledegebase.md", section: "Profile Overview", score: 0.9 }],
      model: "fast-fallback",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
