"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, Copy, CornerDownLeft, Loader2 } from "lucide-react";
import { queryDigitalTwin } from "@/lib/api";
import { cliCommands } from "@/lib/canonical";
import type { ChatTurn, TwinResponse } from "@/types/portfolio";

interface HistoryItem {
  id: string;
  command: string;
  output?: React.ReactNode;
  twin?: TwinResponse;
  streaming?: boolean;
  rawText?: string;
}

const COMMANDS = [
  { cmd: "help", note: "list commands" },
  { cmd: "whoami", note: "name and role" },
  { cmd: "projects", note: "every project" },
  { cmd: "skills", note: "skills by area" },
  { cmd: "experience", note: "internship and degree" },
  { cmd: "run-agent", note: "how one answer is made" },
];

const QUESTIONS = ["What is MediMatch AI?", "Does Nabil use FastAPI?", "What did Nabil do at The Data Island?"];

function Block({ children }: { children: React.ReactNode }) {
  return <pre className="whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-ink-2">{children}</pre>;
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
  const refused = !streaming && !data.grounded && data.answer.length > 0;

  return (
    <div className={`border-l-2 pl-4 ${refused ? "border-line-strong" : "border-burgundy"}`}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-muted">
        <span className="flex items-center gap-1.5 text-ink-2">
          portfolio agent
          {streaming && <Loader2 className="h-3 w-3 animate-spin" aria-label="Answering" />}
        </span>
        {!streaming && (
          <>
            <span className={data.grounded ? "text-cyan" : "text-crimson"}>
              {data.grounded ? "sourced" : "outside what I know"}
            </span>
            <span className="truncate">model {data.model}</span>
            <button
              type="button"
              onClick={() => onCopy(data.answer)}
              className="ml-auto inline-flex h-7 items-center gap-1 text-muted transition-colors hover:text-ink"
              aria-label="Copy answer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-cyan" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "copied" : "copy"}</span>
            </button>
          </>
        )}
      </div>

      <div className="mt-2 whitespace-pre-wrap text-[15px] leading-relaxed text-ink" aria-live="polite">
        {data.answer || (streaming ? <span className="caret text-crimson">▌</span> : "")}
      </div>

      {sources.length > 0 && (
        <div className="mt-3 font-mono text-[12px]">
          <span className="text-muted">sources</span>
          <ul className="mt-1 space-y-0.5">
            {sources.map((src, i) => {
              const label = src.title || src.section || src.source_id || src.source_type || src.source;
              if (!label) return null;
              const text = (
                <>
                  {src.source_type && <span className="text-crimson">[{src.source_type}] </span>}
                  {label}
                </>
              );
              return (
                <li key={`${label}-${i}`} className="text-ink-2">
                  {src.url ? (
                    <a href={src.url} target="_blank" rel="noreferrer" className="link hover:text-ink">
                      {text}
                    </a>
                  ) : (
                    text
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

const systemInfo = (
  <Block>
    {`stack      Next.js frontend, FastAPI retrieval service
knowledge  canonical YAML; MongoDB Atlas when ingested
policy     answers come from Nabil's own work, with sources
identity   a portfolio agent that speaks about Nabil, never as him`}
  </Block>
);

export default function InteractiveCLITerminal() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [conversation, setConversation] = useState<ChatTurn[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: "init", command: "system --info", output: systemInfo },
  ]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [typedCommands, setTypedCommands] = useState<string[]>(["system --info"]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextItemId = useRef(0);
  const refocusAfterAnswer = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    // Instant: a smooth scroll per streamed token never catches up.
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, loading]);

  useEffect(() => {
    // The input is disabled while answering, which drops its focus.
    if (!loading && refocusAfterAnswer.current) {
      refocusAfterAnswer.current = false;
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [loading]);

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

    setHistory((prev) => prev.map((item) => (item.id === historyId ? { ...item, twin: empty, streaming: true } : item)));

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
                ? { ...item, twin: { ...(item.twin ?? empty), answer: `${item.twin?.answer ?? ""}${token}` } }
                : item
            )
          );
        },
      });

      setHistory((prev) =>
        prev.map((item) => (item.id === historyId ? { ...item, twin: result, streaming: false, rawText: result.answer } : item))
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
        <p className="border-l-2 border-crimson pl-4 text-[14px] text-ink-2">
          The agent could not be reached. Try again in a minute.
        </p>
      );
      setHistory((prev) =>
        prev.map((item) => (item.id === historyId ? { ...item, output: errorOutput, twin: undefined, streaming: false } : item))
      );
    } finally {
      setLoading(false);
    }
  };

  const pushHistory = (command: string, output: React.ReactNode) => {
    const itemId = `cmd_${nextItemId.current++}`;
    setHistory((prev) => [...prev, { id: itemId, command, output }]);
    setTypedCommands((prev) => [...prev, command]);
    setCmdIndex(-1);
    setInput("");
  };

  const clear = () => {
    setHistory([]);
    setConversation([]);
    setInput("");
  };

  const handleCommand = (cmdToRun?: string) => {
    if (loading) return;
    const command = (cmdToRun || input).trim();
    if (!command) return;
    const lower = command.toLowerCase();

    if (lower === "clear") return clear();

    if (lower === "help" || lower === "--help" || lower === "-h") {
      return pushHistory(
        command,
        <Block>
          {cliCommands.help}
          {"\n\nAnything else is sent to the agent as a question, e.g. What is FITMAN?"}
        </Block>
      );
    }
    if (lower.includes("system --info") || lower === "sysinfo" || lower === "neofetch") {
      return pushHistory(command, systemInfo);
    }
    if (lower === "whoami" || lower === "about") return pushHistory(command, <Block>{cliCommands.bio}</Block>);
    if (lower === "skills" || lower.includes("--skills")) return pushHistory(command, <Block>{cliCommands.skills}</Block>);
    if (lower === "projects" || lower.includes("--projects"))
      return pushHistory(command, <Block>{cliCommands.projects}</Block>);
    if (lower === "experience" || lower.includes("--experience"))
      return pushHistory(command, <Block>{cliCommands.experience}</Block>);
    if (lower === "contact" || lower.includes("--contact")) return pushHistory(command, <Block>{cliCommands.contact}</Block>);
    if (lower === "run-agent" || lower === "agent" || lower.includes("--run-agent")) {
      return pushHistory(
        command,
        <Block>
          {`1  classify the question against the canonical YAML
2  answer structured facts directly, or retrieve matching passages
3  write the answer from the retrieved context
4  cite the sources used`}
        </Block>
      );
    }

    let queryClean = command;
    if (lower.startsWith("ask ")) queryClean = command.slice(4).trim();
    queryClean = queryClean.replace(/^["']|["']$/g, "").trim();

    const itemId = `cmd_${nextItemId.current++}`;
    setHistory((prev) => [...prev, { id: itemId, command, streaming: true }]);
    refocusAfterAnswer.current = !cmdToRun;
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
        const next = cmdIndex + 1;
        setCmdIndex(next);
        setInput(typedCommands[typedCommands.length - 1 - next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIndex > 0) {
        const next = cmdIndex - 1;
        setCmdIndex(next);
        setInput(typedCommands[typedCommands.length - 1 - next]);
      } else if (cmdIndex === 0) {
        setCmdIndex(-1);
        setInput("");
      }
    }
  };

  const railButton =
    "group flex min-h-[44px] w-full items-baseline justify-between gap-3 border-b border-line px-4 py-2.5 text-left font-mono text-[13px] transition-colors hover:bg-raised disabled:opacity-40";

  return (
    <section id="agent" className="section">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="h2 lg:col-span-7">Ask my AI agent about my work</h2>
          <p className="text-base leading-relaxed text-ink-2 lg:col-span-5">
            It knows my projects, skills and experience, and answers with sources.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[4px] border border-line-strong bg-surface">
          <div className="flex h-11 items-center justify-between border-b border-line px-4 font-mono text-[12px] text-muted">
            <span>
              <span className="text-ink-2">guest</span>@portfolio-agent <span className="text-line-strong">~</span>
            </span>
            <button type="button" onClick={clear} className="h-9 px-1 transition-colors hover:text-ink">
              clear
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            <aside className="border-b border-line lg:col-span-4 lg:border-b-0 lg:border-r xl:col-span-3">
              <p className="px-4 pb-2 pt-4 label">Questions</p>
              {QUESTIONS.map((q) => (
                <button key={q} type="button" disabled={loading} onClick={() => handleCommand(q)} className={railButton}>
                  <span className="text-cyan group-hover:text-ink">{q}</span>
                </button>
              ))}
              <p className="hidden px-4 pb-2 pt-6 label sm:block">Commands</p>
              <div className="hidden sm:block">
                {COMMANDS.map((c) => (
                  <button
                    key={c.cmd}
                    type="button"
                    disabled={loading}
                    onClick={() => handleCommand(c.cmd)}
                    className={railButton}
                  >
                    <span className="text-ink">{c.cmd}</span>
                    <span className="truncate text-[11px] text-muted">{c.note}</span>
                  </button>
                ))}
              </div>
            </aside>

            <div
              className="flex min-h-[420px] flex-col lg:col-span-8 lg:h-[560px] xl:col-span-9"
              onClick={() => {
                // Leave text selections alone so answers can be copied by hand.
                if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
              }}
            >
              <div
                ref={scrollRef}
                className="max-h-[480px] flex-1 space-y-6 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6 lg:max-h-none"
              >
                {history.length === 0 && (
                  <p className="font-mono text-[13px] text-muted">Type a question or a command, or pick one on the left.</p>
                )}
                {history.map((item) => (
                  <div key={item.id} className="space-y-2.5">
                    <p className="break-all font-mono text-[13px] text-ink">
                      <span className="mr-2 text-crimson">$</span>
                      {item.command}
                    </p>
                    {item.twin ? (
                      <TwinAnswer
                        data={item.twin}
                        streaming={item.streaming}
                        copied={copiedId === item.id}
                        onCopy={(text) => handleCopyText(text, item.id)}
                      />
                    ) : (
                      item.output
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 border-t border-line px-4 py-2 sm:px-6">
                <span className="font-mono text-[13px] text-crimson" aria-hidden="true">
                  $
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  disabled={loading}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={loading ? "answering…" : "ask about a project, a skill or the internship"}
                  aria-label="Question or command for the portfolio agent"
                  className="min-h-[44px] w-full bg-transparent font-mono text-base text-ink outline-none placeholder:text-[#85858f] disabled:opacity-50 sm:text-[13px]"
                />
                <button
                  type="button"
                  onClick={() => handleCommand()}
                  disabled={loading || !input.trim()}
                  className="btn-primary min-h-[36px] shrink-0 px-3 text-[12px] disabled:pointer-events-none disabled:opacity-30"
                >
                  {loading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-label="Answering" />
                  ) : (
                    <>
                      Send <CornerDownLeft className="h-3 w-3" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
