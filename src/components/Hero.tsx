"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Mail,
  Github,
  Terminal,
  Cpu,
  GraduationCap,
  Briefcase,
  MapPin,
  Code2,
  Sparkles,
  ExternalLink,
  Layers,
  ArrowDown,
  User,
} from "lucide-react";

export default function ProfessionalHero() {
  const [activeTab, setActiveTab] = useState<"profile" | "background" | "stack">("profile");

  return (
    <section className="w-full bg-black text-white min-h-[90vh] flex items-center px-4 sm:px-6 lg:px-12 border-b border-[#1a1a1f] font-sans py-20 relative overflow-hidden">
      {/* Background ambient lighting with subtle pulsation */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-[#800020]/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Personal Intro with staggered entrance */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-6 space-y-6"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0c0c0e] border border-[#2A1E1A] text-[11px] font-mono text-[#a1a1aa] uppercase tracking-[0.18em]"
          >
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span>Available for Software &amp; AI Engineering Roles</span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-sm sm:text-base font-mono uppercase tracking-[0.2em] text-[#ff4d6d] mb-2 font-semibold flex items-center gap-2">
              <span>Hello, I&apos;m</span>
              <motion.span
                animate={{ rotate: [0, 14, -8, 14, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block origin-bottom-right cursor-default"
              >
                👋
              </motion.span>
            </h2>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] font-mono">
              Mohammad <br />
              Ali Nabil<span className="text-[#800020]">.</span>
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-[#d4d4d8] font-mono font-medium">
              Software Developer &amp; AI Systems Engineer
            </p>
          </motion.div>

          {/* Core Personal Summary */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-[#a1a1aa] text-sm sm:text-base max-w-xl leading-relaxed"
          >
            Computer Science undergraduate at <span className="text-white font-medium">North South University</span> and former GenAI intern at <span className="text-white font-medium">The Data Island</span>. I build production-grade software, autonomous multi-agent pipelines, RAG systems, and full-stack web applications with Python, FastAPI, and modern frontend tools.
          </motion.p>

          {/* Key Personal Facts with Hover Micro-Interactions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 font-mono text-xs"
          >
            <motion.div
              whileHover={{ y: -4, borderColor: "#38bdf8" }}
              transition={{ duration: 0.2 }}
              className="p-3 rounded-xl bg-[#09090c] border border-[#22222b] space-y-1 cursor-default"
            >
              <div className="flex items-center gap-1.5 text-[#71717a] text-[10px] uppercase">
                <GraduationCap className="w-3.5 h-3.5 text-[#38bdf8]" />
                Education
              </div>
              <div className="text-white font-semibold truncate">BSc in CSE</div>
              <div className="text-[11px] text-[#a1a1aa] truncate">North South Univ.</div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, borderColor: "#ff4d6d" }}
              transition={{ duration: 0.2 }}
              className="p-3 rounded-xl bg-[#09090c] border border-[#22222b] space-y-1 cursor-default"
            >
              <div className="flex items-center gap-1.5 text-[#71717a] text-[10px] uppercase">
                <Briefcase className="w-3.5 h-3.5 text-[#ff4d6d]" />
                Experience
              </div>
              <div className="text-white font-semibold truncate">The Data Island</div>
              <div className="text-[11px] text-[#a1a1aa] truncate">GenAI Team Intern</div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, borderColor: "#22c55e" }}
              transition={{ duration: 0.2 }}
              className="p-3 rounded-xl bg-[#09090c] border border-[#22222b] space-y-1 cursor-default"
            >
              <div className="flex items-center gap-1.5 text-[#71717a] text-[10px] uppercase">
                <MapPin className="w-3.5 h-3.5 text-[#22c55e]" />
                Location
              </div>
              <div className="text-white font-semibold truncate">Dhaka, Bangladesh</div>
              <div className="text-[11px] text-[#a1a1aa] truncate">Open to Remote</div>
            </motion.div>
          </motion.div>

          {/* Action CTAs with Hover Lift and Tap Feedback */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs sm:text-sm"
          >
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              className="bg-white hover:bg-[#e4e4e7] text-black font-semibold px-5 py-3 rounded-xl transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)] uppercase tracking-wider cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="#terminal"
              className="bg-[#121217] hover:bg-[#1a1a22] text-white border border-[#23232a] hover:border-[#ff4d6d]/50 font-medium px-4 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-[#ff4d6d]" />
              <span>Interactive CLI</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="https://github.com/THENABILMAN"
              target="_blank"
              rel="noreferrer"
              className="bg-[#121217] hover:bg-[#1a1a22] text-white border border-[#23232a] hover:border-white/40 font-medium px-4 py-3 rounded-xl transition-all flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>GitHub ↗</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="/resume.pdf"
              target="_blank"
              className="bg-[#121217] hover:bg-[#1a1a22] text-white border border-[#23232a] hover:border-[#38bdf8]/50 font-medium px-4 py-3 rounded-xl transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#38bdf8]" />
              <span>Resume ↓</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Column: Interactive Developer Profile & Code Window */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-6"
        >
          <motion.div
            whileHover={{ borderColor: "rgba(128, 0, 32, 0.6)" }}
            transition={{ duration: 0.3 }}
            className="bg-[#07070a] border border-[#23232a] rounded-2xl p-5 md:p-6 font-mono text-xs shadow-2xl relative"
          >
            {/* Window Controls & File Tab Bar */}
            <div className="flex items-center justify-between border-b border-[#1f1f26] pb-3.5 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/80" />
                <span className="text-[#a1a1aa] font-medium ml-2 flex items-center gap-1.5 text-[11px]">
                  <Code2 className="w-3.5 h-3.5 text-[#ff4d6d]" />
                  <span>nabil_profile.ts</span>
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-[#22c55e] bg-[#22c55e]/10 px-2 py-0.5 rounded border border-[#22c55e]/20">
                  TypeScript 5.0
                </span>
              </div>
            </div>

            {/* Profile Tab Switcher */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => setActiveTab("profile")}
                className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                  activeTab === "profile"
                    ? "bg-[#14141c] border-[#ff4d6d]/60 text-white shadow-[0_0_12px_rgba(128,0,32,0.25)]"
                    : "bg-[#0b0b0e] border-[#1f1f26] text-[#71717a] hover:text-[#d4d4d8]"
                }`}
              >
                <span className="block text-[11px] font-semibold">01 // Overview</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => setActiveTab("background")}
                className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                  activeTab === "background"
                    ? "bg-[#14141c] border-[#ff4d6d]/60 text-white shadow-[0_0_12px_rgba(128,0,32,0.25)]"
                    : "bg-[#0b0b0e] border-[#1f1f26] text-[#71717a] hover:text-[#d4d4d8]"
                }`}
              >
                <span className="block text-[11px] font-semibold">02 // Experience</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => setActiveTab("stack")}
                className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                  activeTab === "stack"
                    ? "bg-[#14141c] border-[#ff4d6d]/60 text-white shadow-[0_0_12px_rgba(128,0,32,0.25)]"
                    : "bg-[#0b0b0e] border-[#1f1f26] text-[#71717a] hover:text-[#d4d4d8]"
                }`}
              >
                <span className="block text-[11px] font-semibold">03 // Core Stack</span>
              </motion.button>
            </div>

            {/* Code Body with Smooth AnimatePresence transitions */}
            <div className="bg-[#050507] p-4 rounded-xl border border-[#1a1a22] min-h-[220px] overflow-x-auto leading-relaxed">
              <AnimatePresence mode="wait">
                {activeTab === "profile" && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <pre className="text-xs font-mono space-y-1">
                      <span className="text-[#38bdf8]">const</span>{" "}
                      <span className="text-white font-semibold">engineer</span> = &#123;
                      <br />
                      &nbsp;&nbsp;<span className="text-[#a1a1aa]">name</span>:{" "}
                      <span className="text-[#22c55e]">&quot;Mohammad Ali Nabil&quot;</span>,
                      <br />
                      &nbsp;&nbsp;<span className="text-[#a1a1aa]">role</span>:{" "}
                      <span className="text-[#22c55e]">&quot;Software Developer &amp; AI Builder&quot;</span>,
                      <br />
                      &nbsp;&nbsp;<span className="text-[#a1a1aa]">location</span>:{" "}
                      <span className="text-[#22c55e]">&quot;Dhaka, Bangladesh&quot;</span>,
                      <br />
                      &nbsp;&nbsp;<span className="text-[#a1a1aa]">passion</span>:{" "}
                      <span className="text-[#eab308]">
                        &quot;Building hardcore systems, not just calling APIs&quot;
                      </span>
                      ,
                      <br />
                      &nbsp;&nbsp;<span className="text-[#a1a1aa]">focus</span>: [
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-[#ff8da1]">
                        &quot;Autonomous Multi-Agent Systems (LangGraph)&quot;
                      </span>
                      ,
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-[#ff8da1]">
                        &quot;LLM &amp; Large Multimodal (LMM) Fine-Tuning &amp; Model Training&quot;
                      </span>
                      ,
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-[#ff8da1]">
                        &quot;Retrieval-Augmented Generation (Dense/Sparse RAG)&quot;
                      </span>
                      ,
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-[#ff8da1]">
                        &quot;Scalable Full-Stack Web Backends (FastAPI, React)&quot;
                      </span>
                      ,
                      <br />
                      &nbsp;&nbsp;],
                      <br />
                      &#125;;
                    </pre>
                  </motion.div>
                )}

                {activeTab === "background" && (
                  <motion.div
                    key="background"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 text-xs font-mono"
                  >
                    <div className="p-3 rounded-lg bg-[#0b0b0f] border border-[#1f1f26]">
                      <div className="flex items-center justify-between text-[#38bdf8] font-semibold text-[11px] mb-1">
                        <span>THE DATA ISLAND</span>
                        <span className="text-[#71717a]">Nov 2025 – Jan 2026</span>
                      </div>
                      <div className="text-white text-xs">AI Engineer Intern — GenAI Team</div>
                      <p className="text-[#a1a1aa] text-[11px] mt-1">
                        Engineered end-to-end data scraping, web extraction, validation, batch processing, and agent debugging workflows.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-[#0b0b0f] border border-[#1f1f26]">
                      <div className="flex items-center justify-between text-[#22c55e] font-semibold text-[11px] mb-1">
                        <span>NORTH SOUTH UNIVERSITY</span>
                        <span className="text-[#71717a]">Undergraduate</span>
                      </div>
                      <div className="text-white text-xs">BSc in Computer Science &amp; Engineering</div>
                      <p className="text-[#a1a1aa] text-[11px] mt-1">
                        Rigorous coursework in Data Structures, Algorithms, Machine Learning, Database Systems, and Distributed Computing.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "stack" && (
                  <motion.div
                    key="stack"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2.5 text-xs font-mono"
                  >
                    <div>
                      <span className="text-[#ff4d6d] font-semibold block mb-1">
                        AI, Models &amp; Tuning:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {["LLM/LMM Tuning", "LoRA/QLoRA", "Unsloth", "LangGraph", "LangChain", "Pinecone", "Groq LLaMA-3", "LiveKit WebRTC", "PyTorch", "MCP"].map(
                          (tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded bg-[#111116] border border-[#23232a] text-[#d4d4d8] text-[11px]"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="text-[#38bdf8] font-semibold block mb-1">
                        Backend &amp; Database:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {["Python", "FastAPI", "Asyncio", "PostgreSQL", "Supabase", "Docker", "REST APIs"].map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-[#111116] border border-[#23232a] text-[#d4d4d8] text-[11px]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[#22c55e] font-semibold block mb-1">
                        Languages &amp; Tools:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {["Python", "C++", "TypeScript", "React", "Linux", "Git"].map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-[#111116] border border-[#23232a] text-[#d4d4d8] text-[11px]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Status Row */}
            <div className="mt-3 pt-3 border-t border-[#1f1f26] flex items-center justify-between text-[11px] text-[#71717a] font-mono">
              <span className="flex items-center gap-1.5 text-[#22c55e]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                Building practical systems &amp; modern apps
              </span>
              <a
                href="https://github.com/THENABILMAN"
                target="_blank"
                rel="noreferrer"
                className="text-[#a1a1aa] hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>@THENABILMAN</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
