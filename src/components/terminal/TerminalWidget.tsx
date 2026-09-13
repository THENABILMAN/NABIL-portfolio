"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  CornerDownLeft,
  Trash2,
  Cpu,
  Bot,
  Loader2,
  BookOpen,
  AlertCircle,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Layers,
  Activity,
  Server,
} from "lucide-react";
import { queryDigitalTwin } from "@/lib/api";
import { resumeData } from "@/data/resumeData";
import type { ChatTurn, TwinResponse } from "@/types/portfolio";

interface HistoryItem {
  id: string;
  command: string;
  output?: React.ReactNode;
  twin?: TwinResponse;
  streaming?: boolean;
  rawText?: string;
}

function TwinAnswer({
  data,
  streaming,
  onCopy,
  copied,
}: {
  data: TwinResponse;
  streaming?: boolean;
  onCopy: (text: string) => void;
  copied: boolean;
}) {
  const sources = data.grounded ? data.sources : [];

  return (
    <div className="my-2 p-4 bg-[#09090e] border border-[#800020]/40 rounded-xl space-y-3 text-xs font-mono shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#23232a] pb-2 text-[11px]">
        <span className="flex items-center gap-1.5 text-white font-semibold">
          <Bot className="w-3.5 h-3.5 text-[#ff4d6d]" />
          Digital Twin
          {streaming && <Loader2 className="w-3 h-3 animate-spin text-[#a1a1aa]" />}
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] text-[#a1a1aa] bg-[#141419] px-2 py-0.5 rounded border border-[#23232a]">
            Confidence: <code className="text-white">{data.confidence}</code>
          </span>
          <span className="text-[10px] text-[#a1a1aa] bg-[#141419] px-2 py-0.5 rounded border border-[#23232a]">
            Grounded:{" "}
            <code className={data.grounded ? "text-[#22c55e]" : "text-[#f59e0b]"}>
              {data.grounded ? "YES" : "NO"}
            </code>
          </span>
          <span className="text-[10px] text-[#a1a1aa] bg-[#141419] px-2 py-0.5 rounded border border-[#23232a]">
            Model: <code className="text-white">{data.model}</code>
          </span>
          <button
            type="button"
            onClick={() => onCopy(data.answer)}
            className="p-1 rounded bg-[#141419] hover:bg-[#23232a] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
            title="Copy answer"
          >
            {copied ? <Check className="w-3 h-3 text-[#22c55e]" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>

      <div className="text-[#e4e4e7] leading-relaxed whitespace-pre-wrap" aria-live="polite">
        {data.answer || (streaming ? "…" : "")}
      </div>

      {data.claims.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {data.claims.slice(0, 6).map((claim, i) => (
            <span
              key={`${claim.status ?? "claim"}-${i}`}
              className="px-2 py-0.5 rounded bg-[#141419] border border-[#23232a] text-[10px] text-[#d4d4d8]"
              title={claim.claim}
            >
              {claim.status || "CLAIM"}
            </span>
          ))}
        </div>
      )}

      {sources.length > 0 && (
        <div className="pt-2.5 border-t border-[#23232a] text-[11px] text-[#a1a1aa]">
          <div className="flex items-center gap-1.5 mb-2 text-[#d4d4d8] font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-[#ff4d6d]" />
            Sources
          </div>
          <div className="flex flex-wrap gap-1.5">
            {sources.map((src, i) => {
              const label = src.title || src.section || src.source_id || src.source_type || src.source;
              if (!label) return null;
              const chip = (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111116] border border-[#23232a] text-[10px] text-[#d4d4d8]">
                  {src.source_type && <span className="text-[#ff4d6d] font-bold">[{src.source_type}]</span>}
                  <span>{label}</span>
                </span>
              );
              return src.url ? (
                <a key={`${src.url}-${i}`} href={src.url} target="_blank" rel="noreferrer">
                  {chip}
                </a>
              ) : (
                <span key={`${label}-${i}`}>{chip}</span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
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
          <p className="text-[#a1a1aa] text-[11px]">Evidence-grounded portfolio digital twin</p>
        </div>
      </div>
      <div className="md:col-span-8 space-y-1.5 text-[#d4d4d8]">
        <p>
          <span className="text-[#71717a] w-28 inline-block">STACK:</span>
          <span className="text-white font-semibold">Next.js frontend + FastAPI retrieval</span>
        </p>
        <p>
          <span className="text-[#71717a] w-28 inline-block">KNOWLEDGE:</span>
          <span className="text-[#38bdf8]">Canonical YAML; Pinecone when ingested</span>
        </p>
        <p>
          <span className="text-[#71717a] w-28 inline-block">POLICY:</span>
          <span className="text-[#22c55e]">Grounded answers only — refuse without evidence</span>
        </p>
        <p>
          <span className="text-[#71717a] w-28 inline-block">IDENTITY:</span>
          <span className="text-[#f59e0b]">Portfolio agent, not a personal impersonation</span>
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
  const [conversation, setConversation] = useState<ChatTurn[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "init-neofetch",
      command: "system --info",
      output: renderNeofetch(),
      rawText: "Evidence-grounded digital twin: canonical YAML, refuse without evidence.",
    },
  ]);
  const [cmdIndex, setCmdIndex] = useState(-1);
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

  const queryTwin = async (queryText: string, historyId: string) => {
    setLoading(true);
    const empty: TwinResponse = {
      answer: "",
      grounded: false,
      confidence: "NONE",
      sources: [],
      claims: [],
      entity: null,
      model: "…",
    };

    setHistory((prev) =>
      prev.map((item) => (item.id === historyId ? { ...item, twin: empty, streaming: true } : item))
    );

    try {
      const result = await queryDigitalTwin(queryText, conversation, {
        onMeta: (meta) => {
          setHistory((prev) =>
            prev.map((item) =>
              item.id === historyId
                ? {
                    ...item,
                    twin: {
                      answer: item.twin?.answer ?? "",
                      grounded: meta.grounded,
                      confidence: meta.confidence,
                      sources: meta.grounded ? meta.sources : [],
                      claims: meta.claims,
                      entity: meta.entity,
                      model: meta.model,
                    },
                  }
                : item
            )
          );
        },
        onToken: (token) => {
          setHistory((prev) =>
            prev.map((item) =>
              item.id === historyId
                ? {
                    ...item,
                    twin: {
                      ...(item.twin ?? empty),
                      answer: `${item.twin?.answer ?? ""}${token}`,
                    },
                  }
                : item
            )
          );
        },
      });

      setHistory((prev) =>
        prev.map((item) =>
          item.id === historyId
            ? { ...item, twin: result, streaming: false, rawText: result.answer }
            : item
        )
      );
            setConversation((prev) =>
        [
          ...prev,
          { role: "user" as const, content: queryText },
          { role: "assistant" as const, content: result.answer },
        ].slice(-8)
      );
    } catch {
      const errorOutput = (
        <div className="my-2 p-4 bg-[#1a0f12] border border-[#800020]/60 rounded-xl text-xs font-mono space-y-2">
          <div className="flex items-center gap-2 text-rose-400 font-semibold">
            <AlertCircle className="w-4 h-4" />
            Twin unreachable
          </div>
          <p className="text-[#d4d4d8] leading-relaxed">
            The chat API failed. Start the FastAPI backend locally if you are developing, then try again.
          </p>
        </div>
      );
      setHistory((prev) =>
        prev.map((item) => (item.id === historyId ? { ...item, output: errorOutput, streaming: false } : item))
      );
    } finally {
      setLoading(false);
    }
  };

  const pushHistory = (command: string, output: React.ReactNode) => {
    const itemId = `cmd_${Date.now()}`;
    setHistory((prev) => [...prev, { id: itemId, command, output }]);
    setTypedCommands((prev) => [...prev, command]);
    setCmdIndex(-1);
    setInput("");
  };

  const handleCommand = (cmdToRun?: string) => {
    if (loading) return;
    const command = (cmdToRun || input).trim();
    if (!command) return;
    const lower = command.toLowerCase();

    if (lower === "clear") {
      setHistory([]);
      setConversation([]);
      setInput("");
      return;
    }

    if (lower === "help" || lower === "--help" || lower === "-h") {
      pushHistory(
        command,
        <div className="space-y-2 text-[#d4d4d8] my-2 p-3 bg-[#09090c] border border-[#23232a] rounded-xl text-xs">
          <p className="text-[#ff4d6d] font-semibold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            Available Terminal Commands:
          </p>
          <pre className="text-[11px] font-mono whitespace-pre-wrap text-[#d4d4d8]">{resumeData.cliCommands.help}</pre>
          <div className="pt-2 border-t border-[#23232a] text-[11px] text-[#a1a1aa]">
            <span className="text-[#22c55e]">Natural language:</span> ask any documented question, e.g.{" "}
            <code className="text-white">What is FITMAN?</code>
          </div>
        </div>
      );
      return;
    }

    if (lower.includes("system --info") || lower === "sysinfo" || lower === "neofetch") {
      pushHistory(command, renderNeofetch());
      return;
    }

    if (lower === "whoami" || lower === "about") {
      pushHistory(
        command,
        <div className="my-2 p-3.5 bg-[#09090c] border border-[#23232a] rounded-xl text-xs space-y-1.5 font-mono whitespace-pre-wrap text-[#d4d4d8]">
          {resumeData.cliCommands.bio}
        </div>
      );
      return;
    }

    if (lower === "skills" || lower.includes("--skills")) {
      pushHistory(
        command,
        <pre className="my-2 p-3.5 bg-[#09090c] border border-[#23232a] rounded-xl text-xs font-mono whitespace-pre-wrap text-[#d4d4d8]">
          {resumeData.cliCommands.skills}
        </pre>
      );
      return;
    }

    if (lower === "projects" || lower.includes("--projects")) {
      pushHistory(
        command,
        <pre className="my-2 p-3.5 bg-[#09090c] border border-[#23232a] rounded-xl text-xs font-mono whitespace-pre-wrap text-[#d4d4d8]">
          {resumeData.cliCommands.projects}
        </pre>
      );
      return;
    }

    if (lower === "experience" || lower.includes("--experience")) {
      pushHistory(
        command,
        <pre className="my-2 p-3.5 bg-[#09090c] border border-[#23232a] rounded-xl text-xs font-mono whitespace-pre-wrap text-[#d4d4d8]">
          {resumeData.cliCommands.experience}
        </pre>
      );
      return;
    }

    if (lower === "contact" || lower.includes("--contact")) {
      pushHistory(
        command,
        <pre className="my-2 p-3 bg-[#09090c] border border-[#23232a] rounded-xl text-xs font-mono whitespace-pre-wrap text-[#d4d4d8]">
          {resumeData.cliCommands.contact}
        </pre>
      );
      return;
    }

    if (lower === "run-agent" || lower === "agent" || lower.includes("--run-agent")) {
      pushHistory(
        command,
        <div className="my-2 p-3.5 bg-black border border-[#800020]/50 rounded-xl text-xs font-mono space-y-2.5">
          <div className="flex items-center justify-between text-[#ff4d6d] border-b border-[#23232a] pb-2">
            <span className="flex items-center gap-2 font-semibold">
              <Cpu className="w-4 h-4 text-[#ff4d6d]" />
              Digital twin retrieval walkthrough
            </span>
          </div>
          <div className="space-y-1 text-[11px] text-[#d4d4d8]">
            <p>1. Classify the query against canonical YAML</p>
            <p>2. Fast-path structured facts, or retrieve overlapping evidence</p>
            <p>3. Refuse if there is no evidence — never invent sources</p>
            <p>4. Generate only from retrieved context</p>
          </div>
        </div>
      );
      return;
    }

    let queryClean = command;
    if (lower.startsWith("ask ")) queryClean = command.slice(4).trim();
    queryClean = queryClean.replace(/^["']|["']$/g, "").trim();

    const itemId = `cmd_${Date.now()}`;
    setHistory((prev) => [...prev, { id: itemId, command, streaming: true }]);
    setTypedCommands((prev) => [...prev, command]);
    setCmdIndex(-1);
    setInput("");
    void queryTwin(queryClean, itemId);
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
    { label: "skills", cmd: "skills", icon: Layers },
    { label: "projects", cmd: "projects", icon: Activity },
    { label: "experience", cmd: "experience", icon: Cpu },
  ];

  const ragQuestions = ["Is FITMAN production?", "Does Nabil use FastAPI?", "What did Nabil do at The Data Island?"];

  return (
    <section
      id="terminal"
      className="w-full bg-black text-white py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1a1a1f] font-sans relative overflow-hidden"
    >
      <motion.div
        animate={{ opacity: [0.08, 0.16, 0.08], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_30%_at_50%_0%,rgba(128,0,32,0.15),rgba(0,0,0,0))]"
      />

      <div className="max-w-5xl mx-auto relative z-10">
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
            Ask the digital twin about documented work. Answers stay grounded; missing evidence is refused, not invented.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs"
        >
          <div className="p-2.5 rounded-xl bg-[#09090c] border border-[#23232a] flex items-center gap-2">
            <Server className="w-3.5 h-3.5 text-[#ff4d6d]" />
            <div className="truncate">
              <span className="text-[10px] text-[#71717a] block">KNOWLEDGE</span>
              <span className="text-white text-xs font-medium">Canonical YAML</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-[#09090c] border border-[#23232a] flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#38bdf8]" />
            <div className="truncate">
              <span className="text-[10px] text-[#71717a] block">RETRIEVAL</span>
              <span className="text-white text-xs font-medium">Fast path + RAG</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-[#09090c] border border-[#23232a] flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-[#eab308]" />
            <div className="truncate">
              <span className="text-[10px] text-[#71717a] block">CITATIONS</span>
              <span className="text-white text-xs font-medium">Only if grounded</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-[#09090c] border border-[#23232a] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
            <div className="truncate">
              <span className="text-[10px] text-[#71717a] block">POLICY</span>
              <span className="text-[#22c55e] text-xs font-medium">Refuse if empty</span>
            </div>
          </div>
        </motion.div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] text-[#71717a] mr-1 uppercase">Commands:</span>
            {commandPresets.map((preset) => {
              const IconComp = preset.icon;
              return (
                <motion.button
                  key={preset.cmd}
                  type="button"
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
            <span className="text-[10px] text-[#71717a] mr-1 uppercase">Sample queries:</span>
            {ragQuestions.map((q) => (
              <motion.button
                key={q}
                type="button"
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={() => inputRef.current?.focus()}
          className={`bg-[#060608] border border-[#23232a] hover:border-[#800020]/50 rounded-2xl p-3 sm:p-6 font-mono text-xs shadow-2xl flex flex-col cursor-text transition-all duration-300 ${
            isExpanded ? "min-h-[520px] sm:min-h-[640px]" : "min-h-[360px] sm:min-h-[460px]"
          }`}
        >
          <div className="flex items-center justify-between border-b border-[#1f1f26] pb-3 mb-4 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/80" />
              <span className="text-[#a1a1aa] font-medium ml-2 text-[11px] truncate">
                guest@runtime: ~/portfolio-twin
              </span>
            </div>
            <div className="flex items-center gap-3 text-[#71717a] shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="hover:text-white transition-colors cursor-pointer"
                aria-label={isExpanded ? "Collapse terminal" : "Expand terminal"}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setHistory([]);
                  setConversation([]);
                }}
                className="hover:text-white flex items-center gap-1 text-[11px] transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>
          </div>

          <div
            ref={terminalScrollContainerRef}
            data-lenis-prevent="true"
            className={`flex-1 overflow-y-auto space-y-3 mb-4 pr-1 sm:pr-2 overscroll-contain ${
              isExpanded ? "max-h-[420px] sm:max-h-[500px]" : "max-h-[280px] sm:max-h-[360px]"
            }`}
          >
            <div className="text-[#71717a] text-[11px] mb-4 space-y-0.5 border-b border-[#1a1a20] pb-2">
              <p className="text-[#a1a1aa]">Interactive RAG shell — citations appear only when the answer is grounded.</p>
              <p>Type a question, run a command, or use the presets above.</p>
            </div>

            {history.map((item) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-[#a1a1aa]">
                  <span className="text-[#22c55e] font-semibold">$</span>
                  <span className="font-semibold text-white break-all">{item.command}</span>
                </div>
                {item.twin ? (
                  <TwinAnswer
                    data={item.twin}
                    streaming={item.streaming}
                    copied={copiedId === item.id}
                    onCopy={(text) => handleCopyText(text, item.id)}
                  />
                ) : (
                  <div>{item.output}</div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="sticky bottom-0 flex items-center gap-2 border-t border-[#1f1f26] pt-3 bg-[#060608]">
            <span className="text-[#22c55e] font-semibold shrink-0">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              disabled={loading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={loading ? "Generating grounded answer…" : "Ask about documented work…"}
              aria-label="Digital twin command input"
              className="w-full bg-transparent text-white border-none outline-none font-mono text-base sm:text-xs placeholder:text-[#52525b] disabled:opacity-50"
            />
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCommand()}
              disabled={loading || !input.trim()}
              className="bg-white hover:bg-[#e4e4e7] text-black px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold font-mono shrink-0 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
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
