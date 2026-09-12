"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  CornerDownLeft,
  Trash2,
  Cpu,
  Sparkles,
  Bot,
  Loader2,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Zap,
  Activity,
  Server,
  Layers,
  Search,
} from "lucide-react";

interface SourceItem {
  source: string;
  section: string;
  score?: number;
}

interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  rawText?: string;
}

const renderNeofetch = () => (
  <div className="my-2 p-4 bg-black/60 border border-[#23232a] rounded-xl text-xs font-mono">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
      <div className="md:col-span-4 text-[#ff4d6d] font-semibold space-y-2 border-b md:border-b-0 md:border-r border-[#23232a] pb-3 md:pb-0 md:pr-4">
        <pre className="text-[10px] leading-tight text-[#ff4d6d]">{`  _  _  _   ___ ___ _  
 | \\|  |/_\\  | _ ) _ _| | 
 | .\` / _ \\ | _ \\| || |__
 |_|\\_/_/ \\_\\___/___|____|`}</pre>
        <div className="pt-2">
          <p className="text-white font-bold text-sm">SYSTEM ARCHITECTURE</p>
          <p className="text-[#a1a1aa] text-[11px]">Autonomous RAG &amp; Multi-Agent Runtime</p>
        </div>
      </div>
      <div className="md:col-span-8 space-y-1.5 text-[#d4d4d8]">
        <p>
          <span className="text-[#71717a] w-28 inline-block">OS / KERNEL:</span>
          <span className="text-white font-semibold">Agentic Linux x86_64 (FastAPI + Next.js)</span>
        </p>
        <p>
          <span className="text-[#71717a] w-28 inline-block">VECTOR STORE:</span>
          <span className="text-[#38bdf8]">Pinecone Serverless (1024-dim llama-text-embed-v2)</span>
        </p>
        <p>
          <span className="text-[#71717a] w-28 inline-block">INFERENCE LLM:</span>
          <span className="text-[#22c55e]">Google Gemma-4-31B-IT via OpenRouter</span>
        </p>
        <p>
          <span className="text-[#71717a] w-28 inline-block">AGENT WORKFLOW:</span>
          <span className="text-[#f59e0b]">LangGraph StateGraphs + MCP Tool Schema</span>
        </p>
        <p>
          <span className="text-[#71717a] w-28 inline-block">SYSTEM STATUS:</span>
          <span className="text-[#22c55e] font-semibold">🟢 Online &amp; Responding (&lt; 350ms)</span>
        </p>
      </div>
    </div>
  </div>
);

export default function InteractiveCLITerminal() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "init-neofetch",
      command: "system --info",
      output: renderNeofetch(),
      rawText: "System Information: OS: Agentic Linux x86_64, Vector Store: Pinecone Serverless (1024-dim), Inference: Gemma-4-31B-IT",
    },
  ]);

  const [cmdIndex, setCmdIndex] = useState<number>(-1);
  const [typedCommands, setTypedCommands] = useState<string[]>(["system --info"]);
  const terminalScrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalScrollContainerRef.current) {
      terminalScrollContainerRef.current.scrollTo({
        top: terminalScrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [history, loading]);

  const handleCopyText = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  const queryRAGBackend = async (queryText: string, historyId: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: queryText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const answer: string = data.answer || "No response generated.";
      const sources: SourceItem[] = data.sources || [];
      const model: string = data.model || "google/gemma-4-31b-it:free";

      const output = (
        <div className="my-2 p-4 bg-[#09090e] border border-[#800020]/40 rounded-xl space-y-3 text-xs font-mono shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#23232a] pb-2 text-[11px]">
            <span className="flex items-center gap-1.5 text-white font-semibold">
              <Bot className="w-3.5 h-3.5 text-[#ff4d6d]" />
              RAG Knowledge Agent Response
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#a1a1aa] bg-[#141419] px-2 py-0.5 rounded border border-[#23232a]">
                Model: <code className="text-white">{model}</code>
              </span>
              <button
                type="button"
                onClick={() => handleCopyText(answer, historyId)}
                className="p-1 rounded bg-[#141419] hover:bg-[#23232a] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
                title="Copy answer"
              >
                {copiedId === historyId ? (
                  <Check className="w-3 h-3 text-[#22c55e]" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
          </div>

          <div className="text-[#e4e4e7] leading-relaxed whitespace-pre-wrap">
            {answer}
          </div>

          {sources.length > 0 && (
            <div className="pt-2.5 border-t border-[#23232a] text-[11px] text-[#a1a1aa]">
              <div className="flex items-center gap-1.5 mb-2 text-[#d4d4d8] font-semibold">
                <BookOpen className="w-3.5 h-3.5 text-[#ff4d6d]" />
                Verified Context Citations:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {sources.map((src, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111116] border border-[#23232a] text-[10px] text-[#d4d4d8]"
                  >
                    <span className="text-[#ff4d6d] font-bold">[{src.source}]</span>
                    <span>{src.section}</span>
                    {src.score && <span className="text-[#71717a]">({src.score})</span>}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      );

      setHistory((prev) =>
        prev.map((item) =>
          item.id === historyId ? { ...item, output, rawText: answer } : item
        )
      );
    } catch {
      const errorOutput = (
        <div className="my-2 p-4 bg-[#1a0f12] border border-[#800020]/60 rounded-xl text-xs font-mono space-y-2">
          <div className="flex items-center gap-2 text-rose-400 font-semibold">
            <AlertCircle className="w-4 h-4" />
            RAG Service Notice
          </div>
          <p className="text-[#d4d4d8] leading-relaxed">
            The external endpoint was temporarily unreachable. If testing locally with full vector database retrieval, activate the Conda environment:
          </p>
          <div className="p-2.5 bg-black/60 rounded-lg border border-[#2A1E1A] text-[11px] text-[#a1a1aa] space-y-1">
            <p className="text-[#ff4d6d] select-all">$ conda activate nabport</p>
            <p className="text-[#ff4d6d] select-all">$ python -m uvicorn backend.main:app --port 8000 --reload</p>
          </div>
        </div>
      );

      setHistory((prev) =>
        prev.map((item) =>
          item.id === historyId ? { ...item, output: errorOutput } : item
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCommand = (cmdToRun?: string) => {
    if (loading) return;
    const command = (cmdToRun || input).trim();
    if (!command) return;

    const lower = command.toLowerCase();

    if (lower === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const itemId = `cmd_${Date.now()}`;

    // Available Commands
    if (lower === "help" || lower === "--help" || lower === "-h") {
      const output = (
        <div className="space-y-2 text-[#d4d4d8] my-2 p-3 bg-[#09090c] border border-[#23232a] rounded-xl text-xs">
          <p className="text-[#ff4d6d] font-semibold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            Available Terminal Commands:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] font-mono">
            <p><code className="text-white bg-[#141419] px-1.5 py-0.5 rounded">skills</code> : Full tech stack overview</p>
            <p><code className="text-white bg-[#141419] px-1.5 py-0.5 rounded">projects</code> : Deployed production systems</p>
            <p><code className="text-white bg-[#141419] px-1.5 py-0.5 rounded">run-agent</code> : Live multi-agent simulation</p>
            <p><code className="text-white bg-[#141419] px-1.5 py-0.5 rounded">system --info</code> : System architecture specs</p>
            <p><code className="text-white bg-[#141419] px-1.5 py-0.5 rounded">contact</code> : Verified direct channels</p>
            <p><code className="text-white bg-[#141419] px-1.5 py-0.5 rounded">clear</code> : Wipe terminal scrollback</p>
          </div>
          <div className="pt-2 border-t border-[#23232a] text-[11px] text-[#a1a1aa]">
            <span className="text-[#22c55e]">💡 Natural Language Query:</span> Ask any question directly, e.g. <code className="text-white">What is FITMAN?</code>
          </div>
        </div>
      );
      setHistory((prev) => [...prev, { id: itemId, command, output }]);
      setTypedCommands((prev) => [...prev, command]);
      setCmdIndex(-1);
      setInput("");
      return;
    }

    if (
      lower.includes("system --info") ||
      lower === "sysinfo" ||
      lower.includes("--neofetch") ||
      lower === "neofetch"
    ) {
      const output = renderNeofetch();
      setHistory((prev) => [...prev, { id: itemId, command, output }]);
      setTypedCommands((prev) => [...prev, command]);
      setCmdIndex(-1);
      setInput("");
      return;
    }

    if (lower === "whoami" || lower === "about") {
      const output = (
        <div className="my-2 p-3.5 bg-[#09090c] border border-[#23232a] rounded-xl text-xs space-y-1.5 font-mono">
          <p className="text-white font-semibold">Specialized AI Systems &amp; RAG Engineer</p>
          <p className="text-[#a1a1aa] leading-relaxed">
            Focused on agentic workflows, high-precision retrieval pipelines, and scalable Python/FastAPI backends.
          </p>
          <p className="text-[#71717a] text-[11px]">
            Degree in CSE from North South University. Practical GenAI experience at The Data Island.
          </p>
        </div>
      );
      setHistory((prev) => [...prev, { id: itemId, command, output }]);
      setTypedCommands((prev) => [...prev, command]);
      setCmdIndex(-1);
      setInput("");
      return;
    }

    if (lower.includes("--skills") || lower === "skills") {
      const output = (
        <div className="my-2 p-3.5 bg-[#09090c] border border-[#23232a] rounded-xl space-y-3 text-xs font-mono">
          <div>
            <span className="text-[#ff4d6d] font-semibold">AI Models &amp; Tuning:</span>
            <p className="text-[#d4d4d8] mt-0.5">LLM &amp; LMM Fine-Tuning (LoRA/QLoRA/PEFT), LLM Model Training (SFT/DPO), Unsloth, Hugging Face TRL, PyTorch</p>
          </div>
          <div>
            <span className="text-[#ff8da1] font-semibold">Agentic Architectures &amp; RAG:</span>
            <p className="text-[#d4d4d8] mt-0.5">LangGraph StateGraphs, Dense/Sparse RAG, Pinecone, LiveKit WebRTC, MCP Tools</p>
          </div>
          <div>
            <span className="text-white font-semibold">Backend Infrastructure:</span>
            <p className="text-[#d4d4d8] mt-0.5">Python, FastAPI, Asyncio, WebSockets, PostgreSQL, Supabase RLS, Docker</p>
          </div>
          <div>
            <span className="text-[#38bdf8] font-semibold">Engineering &amp; Tooling:</span>
            <p className="text-[#d4d4d8] mt-0.5">Git, Linux, CI/CD, Pydantic, Beautiful Soup, Selenium, NumPy, Pandas</p>
          </div>
        </div>
      );
      setHistory((prev) => [...prev, { id: itemId, command, output }]);
      setTypedCommands((prev) => [...prev, command]);
      setCmdIndex(-1);
      setInput("");
      return;
    }

    if (lower.includes("--projects") || lower === "projects") {
      const output = (
        <div className="my-2 space-y-2 text-xs font-mono">
          <div className="p-3 bg-[#09090c] border border-[#23232a] rounded-xl flex flex-wrap justify-between items-center gap-2">
            <div>
              <p className="text-white font-semibold">FITMAN AI Platform</p>
              <p className="text-[#a1a1aa] text-[11px]">LangGraph agentic fitness/nutrition backend with multi-agent orchestration</p>
            </div>
            <span className="text-[10px] text-white bg-[#800020] px-2 py-0.5 rounded border border-[#800020]">Production</span>
          </div>
          <div className="p-3 bg-[#09090c] border border-[#23232a] rounded-xl flex flex-wrap justify-between items-center gap-2">
            <div>
              <p className="text-white font-semibold">LiveKit MCP Assistant</p>
              <p className="text-[#a1a1aa] text-[11px]">Real-time WebRTC voice &amp; vector ingestion pipeline</p>
            </div>
            <span className="text-[10px] text-[#38bdf8] bg-[#38bdf8]/10 px-2 py-0.5 rounded border border-[#38bdf8]/20">Voice AI</span>
          </div>
          <div className="p-3 bg-[#09090c] border border-[#23232a] rounded-xl flex flex-wrap justify-between items-center gap-2">
            <div>
              <p className="text-white font-semibold">Bangla AI Voice Agent</p>
              <p className="text-[#a1a1aa] text-[11px]">Low-latency STT, LLM inference, and Bengali speech synthesis</p>
            </div>
            <span className="text-[10px] text-[#22c55e] bg-[#22c55e]/10 px-2 py-0.5 rounded border border-[#22c55e]/20">Deployed</span>
          </div>
        </div>
      );
      setHistory((prev) => [...prev, { id: itemId, command, output }]);
      setTypedCommands((prev) => [...prev, command]);
      setCmdIndex(-1);
      setInput("");
      return;
    }

    if (lower.includes("--run-agent") || lower === "run-agent" || lower === "agent") {
      const output = (
        <div className="my-2 p-3.5 bg-black border border-[#800020]/50 rounded-xl text-xs font-mono space-y-2.5">
          <div className="flex items-center justify-between text-[#ff4d6d] border-b border-[#23232a] pb-2">
            <span className="flex items-center gap-2 font-semibold">
              <Cpu className="w-4 h-4 text-[#ff4d6d] animate-pulse" />
              Autonomous Agent DAG Execution Loop
            </span>
            <span className="text-[10px] text-[#22c55e] bg-[#22c55e]/10 px-2 py-0.5 rounded border border-[#22c55e]/20">
              STATE: RESOLVED
            </span>
          </div>
          <div className="space-y-1 text-[11px]">
            <p className="text-[#71717a]">[0.00s] ⟳ Initializing LangGraph StateMachine DAG...</p>
            <p className="text-[#38bdf8]">[0.04s] 🔍 Executing Dense Vector Retrieval -&gt; Pinecone (1024-dim, k=4)</p>
            <p className="text-[#f59e0b]">[0.11s] ⚙️ Routing payload through MCP Schema Tool verification</p>
            <p className="text-[#a1a1aa]">[0.21s] 🧠 Generating context-grounded response via Gemma-4-31B</p>
            <p className="text-[#22c55e] font-semibold">[0.31s] ✓ State cycle completed with 0 errors (Latency: 310ms)</p>
          </div>
        </div>
      );
      setHistory((prev) => [...prev, { id: itemId, command, output }]);
      setTypedCommands((prev) => [...prev, command]);
      setCmdIndex(-1);
      setInput("");
      return;
    }

    if (lower.includes("--contact") || lower === "contact") {
      const output = (
        <div className="my-2 p-3 bg-[#09090c] border border-[#23232a] rounded-xl space-y-1 text-xs font-mono">
          <p className="text-white font-semibold">Direct Communication:</p>
          <p className="text-[#a1a1aa]">Email: <span className="text-white">thenabilman@gmail.com</span></p>
          <p className="text-[#a1a1aa]">Phone: <span className="text-white">+8801909315967</span></p>
          <p className="text-[#a1a1aa]">GitHub: <span className="text-white">github.com/THENABILMAN</span></p>
        </div>
      );
      setHistory((prev) => [...prev, { id: itemId, command, output }]);
      setTypedCommands((prev) => [...prev, command]);
      setCmdIndex(-1);
      setInput("");
      return;
    }

    // AI Query Route: handles questions directly
    let queryClean = command;
    if (lower.startsWith("ask ")) {
      queryClean = command.substring(4).trim();
    }
    queryClean = queryClean.replace(/^["']|["']$/g, "").trim();

    const loadingPlaceholder = (
      <div className="my-2 p-3.5 bg-black/50 border border-[#23232a] rounded-xl text-xs font-mono space-y-1.5 animate-pulse">
        <div className="flex items-center gap-2 text-[#ff4d6d]">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>Resolving query...</span>
        </div>
        <p className="text-[#71717a] text-[11px] pl-5">
          Searching knowledge context &amp; generating verified response...
        </p>
      </div>
    );

    setHistory((prev) => [...prev, { id: itemId, command, output: loadingPlaceholder }]);
    setTypedCommands((prev) => [...prev, command]);
    setCmdIndex(-1);
    setInput("");

    queryRAGBackend(queryClean, itemId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (typedCommands.length > 0 && cmdIndex < typedCommands.length - 1) {
        const nextIndex = cmdIndex + 1;
        setCmdIndex(nextIndex);
        setInput(typedCommands[typedCommands.length - 1 - nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIndex > 0) {
        const nextIndex = cmdIndex - 1;
        setCmdIndex(nextIndex);
        setInput(typedCommands[typedCommands.length - 1 - nextIndex]);
      } else if (cmdIndex === 0) {
        setCmdIndex(-1);
        setInput("");
      }
    }
  };

  const commandPresets = [
    { label: "system --info", cmd: "system --info", icon: Server },
    { label: "run-agent", cmd: "run-agent", icon: Cpu },
    { label: "skills", cmd: "skills", icon: Layers },
    { label: "projects", cmd: "projects", icon: Activity },
  ];

  const ragQuestions = [
    'What is FITMAN?',
    'What work was done at The Data Island?',
    'What are the core RAG capabilities?',
  ];

  return (
    <section
      id="terminal"
      className="w-full bg-black text-white py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1a1a1f] font-sans relative overflow-hidden"
    >
      {/* Background radial glow with subtle breathing animation */}
      <motion.div
        animate={{
          opacity: [0.08, 0.16, 0.08],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_30%_at_50%_0%,rgba(128,0,32,0.15),rgba(0,0,0,0))]"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0c0c0e] border border-[#2A1E1A] text-xs font-mono text-[#a1a1aa] uppercase tracking-[0.2em]">
            <Terminal className="w-3.5 h-3.5 text-[#ff4d6d]" />
            <span>INTERACTIVE SHELL &amp; RAG //</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-mono">
            Execute Terminal<span className="text-[#800020]">.</span>
          </h2>

          <p className="text-[#a1a1aa] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Query the vector knowledge base directly or run live agent simulations through an interactive developer shell.
          </p>
        </motion.div>

        {/* Telemetry Status Bar with Staggered Entrance and Hover Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs"
        >
          <motion.div
            whileHover={{ y: -3, borderColor: "#ff4d6d" }}
            transition={{ duration: 0.2 }}
            className="p-2.5 rounded-xl bg-[#09090c] border border-[#23232a] flex items-center gap-2 cursor-default"
          >
            <Server className="w-3.5 h-3.5 text-[#ff4d6d]" />
            <div className="truncate">
              <span className="text-[10px] text-[#71717a] block">VECTOR RETRIEVAL</span>
              <span className="text-white text-xs font-medium">Pinecone DB</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -3, borderColor: "#38bdf8" }}
            transition={{ duration: 0.2 }}
            className="p-2.5 rounded-xl bg-[#09090c] border border-[#23232a] flex items-center gap-2 cursor-default"
          >
            <Zap className="w-3.5 h-3.5 text-[#38bdf8]" />
            <div className="truncate">
              <span className="text-[10px] text-[#71717a] block">INFERENCE MODEL</span>
              <span className="text-white text-xs font-medium">Nex-N2.5 Mini</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -3, borderColor: "#eab308" }}
            transition={{ duration: 0.2 }}
            className="p-2.5 rounded-xl bg-[#09090c] border border-[#23232a] flex items-center gap-2 cursor-default"
          >
            <Layers className="w-3.5 h-3.5 text-[#eab308]" />
            <div className="truncate">
              <span className="text-[10px] text-[#71717a] block">EMBEDDINGS</span>
              <span className="text-white text-xs font-medium">1024-dim llama</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -3, borderColor: "#22c55e" }}
            transition={{ duration: 0.2 }}
            className="p-2.5 rounded-xl bg-[#09090c] border border-[#23232a] flex items-center gap-2 cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <div className="truncate">
              <span className="text-[10px] text-[#71717a] block">STATUS</span>
              <span className="text-[#22c55e] text-xs font-medium">Online (&lt; 350ms)</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Command Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono"
        >
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] text-[#71717a] mr-1 uppercase">Commands:</span>
            {commandPresets.map((preset) => {
              const IconComp = preset.icon;
              return (
                <motion.button
                  key={preset.cmd}
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleCommand(preset.cmd)}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111116] hover:bg-[#1a1a22] border border-[#23232a] hover:border-[#ff4d6d]/60 text-[#d4d4d8] hover:text-white transition-all cursor-pointer disabled:opacity-50"
                >
                  <IconComp className="w-3 h-3 text-[#ff4d6d]" />
                  <span>{preset.label}</span>
                </motion.button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] text-[#71717a] mr-1 uppercase">Sample Queries:</span>
            {ragQuestions.map((q) => (
              <motion.button
                key={q}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleCommand(q)}
                disabled={loading}
                className="px-2.5 py-1 rounded-lg bg-[#111116] hover:bg-[#1a1a22] border border-[#23232a] hover:border-[#38bdf8]/60 text-[#38bdf8] hover:text-white transition-all cursor-pointer disabled:opacity-50 text-[11px]"
              >
                &ldquo;{q}&rdquo;
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Terminal Window Container */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          onClick={() => inputRef.current?.focus()}
          className={`bg-[#060608] border border-[#23232a] hover:border-[#800020]/50 rounded-2xl p-4 md:p-6 font-mono text-xs shadow-2xl flex flex-col justify-between cursor-text transition-all duration-300 ${
            isExpanded ? "min-h-[640px]" : "min-h-[460px]"
          }`}
        >
          {/* Window Chrome / Title Bar */}
          <div className="flex items-center justify-between border-b border-[#1f1f26] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/80" />
              <span className="text-[#a1a1aa] font-medium ml-2 text-[11px]">
                guest@runtime: ~/portfolio-rag-agent
              </span>
              <span className="text-[10px] text-[#71717a] border border-[#23232a] px-1.5 py-0.2 rounded hidden sm:inline-block">
                bash
              </span>
            </div>

            <div className="flex items-center gap-3 text-[#71717a]">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="hover:text-white transition-colors cursor-pointer"
                title={isExpanded ? "Collapse height" : "Expand height"}
              >
                {isExpanded ? (
                  <Minimize2 className="w-3.5 h-3.5" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5" />
                )}
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setHistory([]);
                }}
                className="hover:text-white flex items-center gap-1 text-[11px] transition-colors cursor-pointer"
                title="Clear terminal history"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Terminal History Output (Scroll Container) */}
          <div
            ref={terminalScrollContainerRef}
            data-lenis-prevent="true"
            className={`flex-1 overflow-y-auto space-y-3 mb-4 pr-2 overscroll-contain transition-all duration-300 ${
              isExpanded ? "max-h-[500px]" : "max-h-[360px]"
            }`}
            style={{ overscrollBehavior: "contain" }}
          >
            <div className="text-[#71717a] text-[11px] mb-4 space-y-0.5 border-b border-[#1a1a20] pb-2">
              <p className="text-[#a1a1aa]">
                Interactive RAG Shell [Connected to Vector Store &amp; Gemma LLM]
              </p>
              <p>Type any technical question, run commands, or select presets above.</p>
            </div>

            {history.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-1"
              >
                <div className="flex items-center gap-2 text-[#a1a1aa]">
                  <span className="text-[#22c55e] font-semibold">$</span>
                  <span className="text-[#71717a]">guest@runtime:~#</span>
                  <span className="font-semibold text-white">{item.command}</span>
                </div>
                <div>{item.output}</div>
              </motion.div>
            ))}
          </div>

          {/* Terminal Command Input Line */}
          <div className="flex items-center gap-2 border-t border-[#1f1f26] pt-3">
            <span className="text-[#22c55e] font-semibold shrink-0">$</span>
            <span className="text-[#71717a] font-medium shrink-0 hidden sm:inline">
              guest@runtime:~#
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              disabled={loading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                loading
                  ? "Synthesizing RAG response..."
                  : "Ask a question (e.g. What is FITMAN?) or type a command..."
              }
              className="w-full bg-transparent text-white border-none outline-none font-mono text-xs placeholder:text-[#52525b] disabled:opacity-50"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCommand()}
              disabled={loading || !input.trim()}
              className="bg-white hover:bg-[#e4e4e7] text-black px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold font-mono shrink-0 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>RAG...</span>
                </>
              ) : (
                <>
                  <span>RUN</span>
                  <CornerDownLeft className="w-3 h-3" />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
