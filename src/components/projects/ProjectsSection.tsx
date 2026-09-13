"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Code2,
  Layers,
  CheckCircle2,
  Activity,
  Sparkles,
} from "lucide-react";
import { resumeData } from "@/data/resumeData";
import type { Project, ProjectCategoryKey } from "@/types/portfolio";

function statusClasses(statusType: Project["statusType"]): string {
  switch (statusType) {
    case "active":
      return "text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/20";
    case "experimental":
      return "text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/20";
    case "prototype":
      return "text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/20";
    default:
      return "text-[#a1a1aa] bg-[#111116] border-[#23232a]";
  }
}

export default function FixedProjectsShowcase() {
  const [filter, setFilter] = useState<"all" | ProjectCategoryKey>("all");
  const catalog = resumeData.projects;

  const filtered = catalog.filter((p) => filter === "all" || p.categoryKey === filter);
  const flagship = filtered.find((p) => p.featured);
  const secondary = filtered.filter((p) => !p.featured);

  return (
    <section id="projects" className="w-full bg-black text-white py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1a1a1f] font-sans relative">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_30%_at_50%_0%,rgba(128,0,32,0.08),rgba(0,0,0,0))]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 text-[11px] font-mono tracking-[0.2em] text-[#a1a1aa] bg-[#0c0c0e] border border-[#2A1E1A] rounded-full uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#ff4d6d]" />
              <span>FEATURED_PORTFOLIO //</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-mono">
              Featured Systems &amp; Applications<span className="text-[#800020]">.</span>
            </h2>
            <p className="mt-3 text-sm md:text-base text-[#a1a1aa] max-w-xl leading-relaxed">
              Documented systems with honest status: built, experimental, prototype, or active development — not marketing copy.
            </p>
          </div>

          <div
            className="flex flex-wrap gap-2 bg-[#09090c] border border-[#23232a] p-1.5 rounded-xl font-mono text-xs self-start md:self-auto"
            role="tablist"
            aria-label="Filter projects"
          >
            {(
              [
                { key: "all" as const, label: `All Systems (${catalog.length})` },
                { key: "fullstack" as const, label: "Full-Stack" },
                { key: "agentic" as const, label: "Agentic & RAG" },
                { key: "voice" as const, label: "Voice & Vision" },
              ]
            ).map(({ key, label }) => (
              <motion.button
                key={key}
                type="button"
                role="tab"
                aria-selected={filter === key}
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

        {flagship && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3, borderColor: "rgba(255, 77, 109, 0.7)" }}
            transition={{ duration: 0.3 }}
            className="mb-10 bg-[#07070a] border border-[#23232a] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl transition-colors duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#800020] to-transparent opacity-70" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs mb-4">
                  <span className="px-3 py-1 bg-[#800020]/20 border border-[#800020]/50 rounded-lg text-[#ff8da1] text-[11px] font-semibold">
                    ★ FLAGSHIP SYSTEM
                  </span>
                  <span className="px-2.5 py-1 bg-[#111116] border border-[#23232a] rounded-lg text-[#d4d4d8] text-[11px]">
                    {flagship.category}
                  </span>
                  <span className={`flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-full border ml-auto ${statusClasses(flagship.statusType)}`}>
                    {flagship.statusType === "active" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-ping" />
                    )}
                    {flagship.status}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-5xl font-bold text-white mb-2 font-mono tracking-tight">
                  {flagship.title}
                </h3>
                <p className="text-[#38bdf8] font-mono text-xs sm:text-sm mb-4">{flagship.subtitle}</p>
                <p className="text-[#a1a1aa] text-sm leading-relaxed mb-6">{flagship.description}</p>

                {flagship.highlights.length > 0 && (
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717a] flex items-center gap-1.5">
                      <Code2 className="w-3 h-3 text-[#38bdf8]" />
                      CORE ARCHITECTURE DELIVERABLES
                    </span>
                    {flagship.highlights.map((item) => (
                      <motion.div
                        key={item}
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

              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                {flagship.pipelineFlow && flagship.pipelineFlow.length > 0 && (
                  <div className="p-5 rounded-xl bg-[#0b0b0f] border border-[#1f1f26]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717a] mb-3 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#ff4d6d]" />
                      END-TO-END EXECUTION PIPELINE
                    </span>
                    <div className="flex flex-col gap-2 font-mono text-xs">
                      {flagship.pipelineFlow.map((step, idx) => (
                        <div key={step} className="flex items-center gap-2">
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

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717a] block mb-2">
                    TECHNOLOGY STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {flagship.techStack.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#111116] text-[#a1a1aa] font-mono text-[10px] px-2.5 py-1 rounded-lg border border-[#23232a]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1f1f26] flex flex-wrap items-center gap-3">
                  {flagship.demoUrl && (
                    <motion.a
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      href={flagship.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white hover:bg-[#e4e4e7] text-black font-semibold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 font-mono uppercase tracking-wider cursor-pointer shadow-lg"
                    >
                      <span>Live demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </motion.a>
                  )}
                  {flagship.githubUrl && (
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
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          <AnimatePresence mode="popLayout">
            {secondary.map((project, idx) => (
              <motion.article
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
                  <div className="flex items-center justify-between font-mono text-xs mb-3 gap-2">
                    <span className="px-2.5 py-1 bg-[#111116] border border-[#23232a] rounded-lg text-[#38bdf8] text-[10px]">
                      {project.category}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${statusClasses(project.statusType)}`}>
                      {project.status}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1 font-mono group-hover:text-[#ff4d6d] transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-[#a1a1aa] font-mono text-[11px] mb-3">{project.subtitle}</p>
                  <p className="text-[#8e8e99] text-xs leading-relaxed mb-4">{project.description}</p>
                  {project.highlights[0] && (
                    <div className="mb-4 p-3 rounded-xl bg-[#0b0b0f] border border-[#1f1f26] text-[11px] font-mono text-[#d4d4d8] flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ff4d6d] shrink-0 mt-0.5" />
                      <span className="leading-snug">{project.highlights[0]}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#1f1f26]">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#111116] text-[#71717a] font-mono text-[10px] px-2 py-0.5 rounded border border-[#22222b]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono text-[#d4d4d8] hover:text-white flex items-center gap-1.5 transition-colors bg-[#121218] hover:bg-[#1a1a24] px-3 py-1.5 rounded-lg border border-[#23232a]"
                      >
                        <Github className="w-3.5 h-3.5 text-[#ff4d6d]" />
                        <span>Source Code</span>
                      </a>
                    ) : (
                      <span className="text-[10px] font-mono text-[#71717a]">No dedicated repo verified here</span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
