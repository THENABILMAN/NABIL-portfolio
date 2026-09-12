"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Code2,
  ExternalLink,
  Layers,
  Cpu,
  Radio,
  Eye,
  CheckCircle2,
  Activity,
  Terminal,
  Sparkles,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  categoryKey: "agentic" | "voice" | "fullstack";
  status: string;
  statusType: "production" | "completed" | "prototype";
  subtitle: string;
  description: string;
  architectureHighlights: string[];
  pipelineFlow?: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: "fitman",
    title: "FITMAN",
    category: "Full-Stack & Multi-Agent",
    categoryKey: "fullstack",
    status: "Active Production",
    statusType: "production",
    featured: true,
    subtitle: "Full-Stack AI Fitness & Nutrition Coaching Platform",
    description:
      "Production-deployed fitness and nutrition platform orchestrating LangGraph multi-agent state machines, Groq streaming inference, and real-time FastAPI backends for personalized daily coaching and health telemetry adherence.",
    pipelineFlow: [
      "Client UI (React/Vite)",
      "FastAPI Gateway",
      "LangGraph Multi-Agent DAG",
      "Groq LLaMA-3 (Sub-300ms)",
      "Supabase PostgreSQL",
    ],
    architectureHighlights: [
      "Engineered LangGraph agent state machines with multi-turn memory for adaptive workout & macro planning.",
      "Integrated Groq LLaMA-3 for low-latency streaming responses (< 300ms Time-to-First-Token).",
      "Designed Supabase PostgreSQL schema with strict Row-Level Security (RLS) policies and health telemetry tracking.",
      "Developed a glassmorphic mobile-first React frontend with real-time interactive charting and habit tracking.",
    ],
    tags: [
      "LangGraph",
      "FastAPI",
      "Python",
      "Groq LLaMA-3",
      "Supabase",
      "PostgreSQL",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],
    liveUrl: "https://fitmanver.vercel.app/",
    githubUrl: "https://github.com/thenabilman/fitman",
  },
  {
    id: "agent-system",
    title: "End-to-End Autonomous Agent",
    category: "Agentic & RAG",
    categoryKey: "agentic",
    status: "Completed",
    statusType: "completed",
    subtitle: "Self-Reflective Multi-Step Reasoning Engine",
    description:
      "Autonomous agent framework equipped with persistent Pinecone vector memory, dynamic tool calling capabilities, web retrieval, and self-correcting evaluation loops.",
    architectureHighlights: [
      "Built multi-step planning loops that decompose ambiguous user queries into verifiable sub-tasks.",
      "Integrated Pinecone vector memory for long-term semantic retrieval across session boundaries.",
      "Enforced strict output guarantees using Pydantic schema validation with automatic retry on format failures.",
    ],
    tags: ["Python", "LangChain", "Pinecone", "Groq / OpenAI API", "Pydantic", "FastAPI", "Streamlit"],
    githubUrl: "https://github.com/thenabilman/agent-system",
  },
  {
    id: "resume-analyzer",
    title: "AI Resume Analyzer",
    category: "Agentic & NLP",
    categoryKey: "agentic",
    status: "Completed",
    statusType: "completed",
    subtitle: "LLM-Powered Semantic Parsing & Job Fit Scoring",
    description:
      "Intelligent resume parsing and ATS optimization engine using LLMs, vector embeddings, and semantic similarity scoring to evaluate candidate skills, match job descriptions, and deliver actionable CV insights.",
    architectureHighlights: [
      "Engineered structured JSON entity extraction from complex multi-page PDF/DOCX resumes using constrained LLM schemas.",
      "Computed vector similarity and semantic match scores against target job specifications with gap analysis recommendations.",
    ],
    tags: ["Python", "LLMs", "FastAPI", "Streamlit", "LangChain", "NLP", "PDF Parsing"],
    githubUrl: "https://github.com/THENABILMAN/THENABILMAN_AI_Resume-Analyzer",
  },
  {
    id: "ai-voice-agent",
    title: "Real-Time AI Voice Agent",
    category: "Voice & Real-Time",
    categoryKey: "voice",
    status: "Completed",
    statusType: "completed",
    subtitle: "Low-Latency Conversational Voice Pipeline",
    description:
      "Full-duplex conversational voice agent integrating real-time streaming Speech-to-Text (STT), low-latency LLM reasoning, and natural neural Text-to-Speech (TTS) for human-like auditory interaction.",
    architectureHighlights: [
      "Implemented streaming audio pipeline with Voice Activity Detection (VAD) for fluid turn-taking.",
      "Orchestrated sub-second conversational response loops bridging STT, LLM inference, and TTS audio synthesis.",
    ],
    tags: ["Python", "Whisper STT", "Neural TTS", "WebSockets", "FastAPI", "Audio Streaming"],
    githubUrl: "https://github.com/THENABILMAN/THENABILMAN_AI_Voice_Agent",
  },
  {
    id: "bangla-voice-agent",
    title: "Bangla AI Voice Agent",
    category: "Voice & Bengali NLP",
    categoryKey: "voice",
    status: "Completed",
    statusType: "completed",
    subtitle: "Bengali Speech Recognition & Speech Synthesis",
    description:
      "Native Bengali conversational AI agent supporting end-to-end Bangla Speech-to-Text, contextual LLM inference in Bengali, and low-latency Bangla neural speech generation for localized verbal assistance.",
    architectureHighlights: [
      "Integrated specialized Bengali ASR/STT models for accurate native speech recognition.",
      "Engineered context-preserving Bengali prompt architectures with natural prosody TTS synthesis.",
    ],
    tags: ["Bengali NLP", "Bangla STT", "Bangla TTS", "Python", "PyTorch", "FastAPI", "Voice AI"],
    githubUrl: "https://github.com/THENABILMAN/THENABILMAN_End-to-End_Bangla_AI_voice-agent",
  },
  {
    id: "livekit-assistant",
    title: "LiveKit MCP Voice Assistant",
    category: "Voice & Real-Time",
    categoryKey: "voice",
    status: "Active Prototype",
    statusType: "prototype",
    subtitle: "Bidirectional WebRTC Voice Assistant with MCP",
    description:
      "Voice-first AI assistant utilizing LiveKit WebRTC for full-duplex speech communication, Model Context Protocol (MCP) server tools, and low-latency neural speech synthesis.",
    architectureHighlights: [
      "Achieved sub-200ms voice roundtrip latency using LiveKit WebRTC audio transports.",
      "Connected external knowledge bases and server utilities via Anthropic Model Context Protocol (MCP).",
      "Implemented streaming Whisper STT with Voice Activity Detection (VAD) and Cartesia neural TTS.",
    ],
    tags: ["LiveKit WebRTC", "Model Context Protocol", "Whisper STT", "Cartesia TTS", "Python", "WebSockets"],
    githubUrl: "https://github.com/thenabilman/livekit-assistant",
  },
  {
    id: "vision-agent",
    title: "AI Vision & OCR Automation",
    category: "Computer Vision",
    categoryKey: "voice",
    status: "Completed",
    statusType: "completed",
    subtitle: "Real-Time Video Stream & Document Extraction Engine",
    description:
      "Computer vision automation pipeline leveraging OpenCV video filtering, Hugging Face vision transformers, and OCR models for real-time document extraction and object classification.",
    architectureHighlights: [
      "Processed live video streams through OpenCV filtering pipelines for rapid artifact boundary detection.",
      "Leveraged Hugging Face Transformers for fine-tuned object detection and automated data classification.",
      "Structured extracted document text into JSON payloads with validation through FastAPI microservices.",
    ],
    tags: ["OpenCV", "Hugging Face", "PyTorch", "EasyOCR", "Python", "FastAPI"],
    githubUrl: "https://github.com/thenabilman/vision-agent",
  },
];

export default function FixedProjectsShowcase() {
  const [filter, setFilter] = useState<"all" | "agentic" | "voice" | "fullstack">("all");

  const filtered = PROJECTS.filter((p) => filter === "all" || p.categoryKey === filter);
  const flagship = filtered.find((p) => p.featured);
  const secondary = filtered.filter((p) => !p.featured);

  return (
    <section id="projects" className="w-full bg-black text-white py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1a1a1f] font-sans relative">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_30%_at_50%_0%,rgba(128,0,32,0.08),rgba(0,0,0,0))]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header & Filters with Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 text-[11px] font-mono tracking-[0.2em] text-[#a1a1aa] bg-[#0c0c0e] border border-[#2A1E1A] rounded-full uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#ff4d6d]" />
              <span>FEATURED_PORTFOLIO //</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-mono">
              Featured Systems &amp; Applications<span className="text-[#800020]">.</span>
            </h2>
            <p className="mt-2 text-sm md:text-base text-[#a1a1aa] max-w-xl">
              Production-grade agentic architectures, low-latency streaming pipelines, and full-stack software deployments.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 bg-[#09090c] border border-[#23232a] p-1.5 rounded-xl font-mono text-xs self-start md:self-auto">
            {(
              [
                { key: "all", label: `All Systems (${PROJECTS.length})` },
                { key: "fullstack", label: "Full-Stack" },
                { key: "agentic", label: "Agentic & RAG" },
                { key: "voice", label: "Voice & Vision" },
              ] as const
            ).map(({ key, label }) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setFilter(key)}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filter === key
                    ? "bg-[#800020] text-white font-semibold shadow-[0_0_12px_rgba(128,0,32,0.35)]"
                    : "text-[#8e8e99] hover:text-white"
                }`}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Flagship Card (Shown if matches current filter) */}
        {flagship && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3, borderColor: "rgba(255, 77, 109, 0.7)" }}
            transition={{ duration: 0.3 }}
            className="mb-10 bg-[#07070a] border border-[#23232a] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl transition-colors duration-300 relative overflow-hidden"
          >
            {/* Top gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#800020] to-transparent opacity-70" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Title, Description, Architecture Deliverables */}
              <div className="lg:col-span-7">
                {/* Status & Badge Row */}
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs mb-4">
                  <span className="px-3 py-1 bg-[#800020]/20 border border-[#800020]/50 rounded-lg text-[#ff8da1] text-[11px] font-semibold">
                    ★ FLAGSHIP SYSTEM
                  </span>
                  <span className="px-2.5 py-1 bg-[#111116] border border-[#23232a] rounded-lg text-[#d4d4d8] text-[11px]">
                    {flagship.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-mono text-[#22c55e] bg-[#22c55e]/10 px-2.5 py-1 rounded-full border border-[#22c55e]/20 ml-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-ping" />
                    {flagship.status}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-3xl sm:text-5xl font-bold text-white mb-2 font-mono tracking-tight">
                  {flagship.title}
                </h3>
                <p className="text-[#38bdf8] font-mono text-xs sm:text-sm mb-4">{flagship.subtitle}</p>

                {/* Description */}
                <p className="text-[#a1a1aa] text-sm leading-relaxed mb-6">
                  {flagship.description}
                </p>

                {/* Architecture Highlights */}
                {flagship.architectureHighlights && (
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717a] block flex items-center gap-1.5">
                      <Code2 className="w-3 h-3 text-[#38bdf8]" />
                      CORE ARCHITECTURE DELIVERABLES
                    </span>
                    {flagship.architectureHighlights.map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-start gap-2.5 text-xs text-[#d4d4d8] bg-[#0c0c10] border border-[#1f1f26] p-3 rounded-xl font-mono leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#ff4d6d] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Execution Pipeline, Tags & CTAs */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                {/* Pipeline Flow */}
                {flagship.pipelineFlow && (
                  <div className="p-5 rounded-xl bg-[#0b0b0f] border border-[#1f1f26]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717a] block mb-3 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#ff4d6d]" />
                      END-TO-END EXECUTION PIPELINE
                    </span>
                    <div className="flex flex-col gap-2 font-mono text-xs">
                      {flagship.pipelineFlow.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-[#181822] text-[#ff4d6d] text-[10px] font-bold flex items-center justify-center border border-[#2a2a35] shrink-0">
                            {idx + 1}
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-[#14141c] border border-[#23232a] text-[#d4d4d8] text-[11px] flex-1">
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717a] block mb-2">
                    TECHNOLOGY STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {flagship.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#111116] text-[#a1a1aa] font-mono text-[10px] px-2.5 py-1 rounded-lg border border-[#23232a]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-4 border-t border-[#1f1f26] flex flex-wrap items-center gap-3">
                  {flagship.liveUrl && (
                    <motion.a
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      href={flagship.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white hover:bg-[#e4e4e7] text-black font-semibold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 font-mono uppercase tracking-wider cursor-pointer shadow-lg"
                    >
                      <span>Live System</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </motion.a>
                  )}
                  <motion.a
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    href={flagship.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#111116] hover:bg-[#1a1a22] text-white border border-[#23232a] hover:border-[#ff4d6d]/50 text-xs font-medium px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 font-mono"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Repository ↗</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Section Divider when Flagship is shown and secondary projects exist */}
        {flagship && secondary.length > 0 && (
          <div className="flex items-center gap-3 my-10">
            <div className="h-px bg-gradient-to-r from-transparent via-[#2a2a35] to-transparent flex-1" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#71717a] px-3.5 py-1 bg-[#0c0c10] border border-[#1f1f26] rounded-full flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#ff4d6d]" />
              <span>ENGINEERING REPOSITORIES &amp; AGENT SYSTEMS ({secondary.length})</span>
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-[#2a2a35] to-transparent flex-1" />
          </div>
        )}

        {/* Secondary Systems Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          <AnimatePresence mode="popLayout">
            {secondary.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -5, borderColor: "rgba(255, 77, 109, 0.6)" }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-[#07070a] border border-[#23232a] rounded-2xl p-6 flex flex-col justify-between shadow-xl transition-colors duration-300 hover:bg-[#0c0c10] group"
              >
                <div>
                  {/* Card Header: Category & Status */}
                  <div className="flex items-center justify-between font-mono text-xs mb-3">
                    <span className="px-2.5 py-1 bg-[#111116] border border-[#23232a] rounded-lg text-[#38bdf8] text-[10px]">
                      {project.category}
                    </span>
                    <span className="text-[10px] text-[#22c55e] font-mono bg-[#22c55e]/10 px-2 py-0.5 rounded border border-[#22c55e]/20">
                      {project.status}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="text-lg font-bold text-white mb-1 font-mono group-hover:text-[#ff4d6d] transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-[#a1a1aa] font-mono text-[11px] mb-3">{project.subtitle}</p>

                  {/* Description */}
                  <p className="text-[#8e8e99] text-xs leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Architecture Highlight Bullet */}
                  {project.architectureHighlights && project.architectureHighlights.length > 0 && (
                    <div className="mb-4 p-3 rounded-xl bg-[#0b0b0f] border border-[#1f1f26] text-[11px] font-mono text-[#d4d4d8] flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ff4d6d] shrink-0 mt-0.5" />
                      <span className="leading-snug">{project.architectureHighlights[0]}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#1f1f26]">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#111116] text-[#71717a] font-mono text-[10px] px-2 py-0.5 rounded border border-[#22222b]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Links / Action Button */}
                  <div className="flex items-center justify-between pt-1">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-[#d4d4d8] hover:text-white flex items-center gap-1.5 transition-colors bg-[#121218] hover:bg-[#1a1a24] px-3 py-1.5 rounded-lg border border-[#23232a]"
                    >
                      <Github className="w-3.5 h-3.5 text-[#ff4d6d]" />
                      <span>Source Code</span>
                      <ArrowUpRight className="w-3 h-3 text-[#71717a]" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
