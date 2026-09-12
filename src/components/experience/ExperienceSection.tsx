"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resumeData } from "@/data/resumeData";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  Building2,
  BookOpen,
  Layers,
  Code2,
  ExternalLink,
} from "lucide-react";

interface TimelineEntry {
  id: string;
  category: "experience" | "education";
  type: string;
  title: string;
  organization: string;
  department?: string;
  period: string;
  location: string;
  status: string;
  summary: string;
  achievements: string[];
  tags: string[];
  accentColor: string;
  icon: typeof Briefcase;
}

const TIMELINE_DATA: TimelineEntry[] = [
  {
    id: "data-island",
    category: "experience",
    type: "Industry Experience",
    title: "AI Engineer Intern",
    organization: "The Data Island",
    department: "GenAI Team",
    period: "Nov 2025 – Jan 2026",
    location: "Remote / Dhaka, Bangladesh",
    status: "Completed",
    summary:
      "Engineered end-to-end AI automation workflows, high-precision structured data extraction pipelines, and agentic reasoning verification frameworks.",
    achievements: [
      "Architected scalable AI automation workflows and LLM API integrations for high-precision structured data extraction.",
      "Engineered robust Python web scraping and validation pipelines with automated data cleaning and normalization routines.",
      "Designed asynchronous batch execution architectures to process heavy data workflows with exponential retry logic.",
      "Debugged and optimized complex agent reasoning loops, reducing hallucinations and improving state machine reliability.",
    ],
    tags: [
      "Python",
      "LLM APIs",
      "LangGraph / LangChain",
      "Structured Extraction",
      "Web Scraping",
      "Batch Pipelines",
      "Agent Debugging",
      "Data Normalization",
    ],
    accentColor: "#800020",
    icon: Briefcase,
  },
  {
    id: "north-south-univ",
    category: "education",
    type: "Academic Foundation",
    title: "BSc in Computer Science & Engineering",
    organization: "North South University (NSU)",
    department: "Department of Electrical & Computer Engineering",
    period: "Undergraduate Program",
    location: "Dhaka, Bangladesh",
    status: "Active Track",
    summary:
      "Comprehensive computer science curriculum balancing rigorous algorithmic theory with modern applied machine intelligence and backend software engineering.",
    achievements: [
      "Core focus on Artificial Intelligence, Machine Learning, Data Structures & Algorithms, and Distributed Systems.",
      "Hands-on research and course projects in Computer Vision, Natural Language Processing, and scalable Python/C++ backends.",
      "Applied theoretical concepts into production-grade systems, agentic architectures, and vector search RAG pipelines.",
      "Targeting future academic trajectory toward advanced research in machine intelligence, deep architectures, and quantum computing.",
    ],
    tags: [
      "Data Structures & Algorithms",
      "Artificial Intelligence",
      "Machine Learning",
      "Distributed Systems",
      "Database Systems",
      "Operating Systems",
      "C++",
      "Object-Oriented Architecture",
    ],
    accentColor: "#2563eb",
    icon: GraduationCap,
  },
];

export default function ExperienceSection() {
  const [filter, setFilter] = useState<"all" | "experience" | "education">("all");

  const filteredEntries = TIMELINE_DATA.filter((entry) => {
    if (filter === "all") return true;
    return entry.category === filter;
  });

  return (
    <section id="experience" className="py-24 relative bg-black border-t border-[#1a1a1f] text-white">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_30%_at_50%_0%,rgba(128,0,32,0.08),rgba(0,0,0,0))]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2A1E1A] bg-[#0c0c0e] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-[#a1a1aa] mb-4">
              <Briefcase className="w-3.5 h-3.5 text-[#ff4d6d]" />
              <span>CAREER &amp; ACADEMIC TIMELINE //</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-mono">
              Experience &amp; Education<span className="text-[#800020]">.</span>
            </h2>

            <p className="mt-3 text-sm md:text-base text-[#a1a1aa] leading-relaxed max-w-xl mx-auto">
              Applied engineering experience in GenAI workflows combined with rigorous foundational computer science training.
            </p>
          </motion.div>

          {/* Quick Metrics Cards with Hover Lift */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left font-mono"
          >
            <motion.div
              whileHover={{ y: -3, borderColor: "#ff4d6d" }}
              transition={{ duration: 0.2 }}
              className="p-3.5 rounded-xl border border-[#23232a] bg-[#09090c] cursor-default"
            >
              <div className="text-[10px] text-[#71717a] uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3 h-3 text-[#ff4d6d]" />
                PRACTICAL TRACK
              </div>
              <div className="mt-1 text-sm font-semibold text-white">GenAI Engineering</div>
              <div className="text-[11px] text-[#a1a1aa]">Production pipelines &amp; agents</div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3, borderColor: "#38bdf8" }}
              transition={{ duration: 0.2 }}
              className="p-3.5 rounded-xl border border-[#23232a] bg-[#09090c] cursor-default"
            >
              <div className="text-[10px] text-[#71717a] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3 h-3 text-[#38bdf8]" />
                ACADEMIC DEGREE
              </div>
              <div className="mt-1 text-sm font-semibold text-white">BSc in CSE</div>
              <div className="text-[11px] text-[#a1a1aa]">North South University</div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3, borderColor: "#22c55e" }}
              transition={{ duration: 0.2 }}
              className="col-span-2 sm:col-span-1 p-3.5 rounded-xl border border-[#23232a] bg-[#09090c] cursor-default"
            >
              <div className="text-[10px] text-[#71717a] uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-[#22c55e]" />
                TECHNICAL FOUNDATION
              </div>
              <div className="mt-1 text-sm font-semibold text-white">Theory + Systems</div>
              <div className="text-[11px] text-[#a1a1aa]">Algorithms, AI &amp; Backends</div>
            </motion.div>
          </motion.div>

          {/* Filter Pills with Micro-Interactions */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                filter === "all"
                  ? "bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                  : "bg-[#111116] border border-[#22222b] text-[#8e8e99] hover:text-white hover:border-[#383844]"
              }`}
            >
              All Milestones ({TIMELINE_DATA.length})
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => setFilter("experience")}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                filter === "experience"
                  ? "bg-[#800020] text-white border border-[#ff4d6d] shadow-[0_0_15px_rgba(128,0,32,0.35)]"
                  : "bg-[#111116] border border-[#22222b] text-[#8e8e99] hover:text-white hover:border-[#383844]"
              }`}
            >
              Industry Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => setFilter("education")}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                filter === "education"
                  ? "bg-[#1e3a8a] text-white border border-[#3b82f6] shadow-[0_0_15px_rgba(30,58,138,0.35)]"
                  : "bg-[#111116] border border-[#22222b] text-[#8e8e99] hover:text-white hover:border-[#383844]"
              }`}
            >
              Academic Foundation
            </motion.button>
          </div>
        </div>

        {/* Vertical Timeline Track */}
        <div className="relative">
          {/* Vertical Center/Side Rail Line */}
          <div className="hidden md:block absolute left-[31px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#800020] via-[#2A1E1A] to-transparent" />

          <div className="space-y-8">
            <AnimatePresence mode="wait">
              {filteredEntries.map((entry, index) => {
                const IconComponent = entry.icon;
                const isExperience = entry.category === "experience";

                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative flex flex-col md:flex-row gap-6 items-start"
                  >
                    {/* Node Dot on Rail with Hover Rotation */}
                    <div className="hidden md:flex flex-col items-center shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center border shadow-xl z-10 cursor-pointer ${
                          isExperience
                            ? "bg-[#12080a] border-[#800020] shadow-[0_0_20px_rgba(128,0,32,0.3)]"
                            : "bg-[#080d1a] border-[#1e3a8a] shadow-[0_0_20px_rgba(30,58,138,0.3)]"
                        }`}
                      >
                        <IconComponent
                          className={`w-7 h-7 ${
                            isExperience ? "text-[#ff4d6d]" : "text-[#38bdf8]"
                          }`}
                        />
                      </motion.div>
                    </div>

                    {/* Timeline Card with Hover Elevation */}
                    <motion.div
                      whileHover={{ y: -4, borderColor: "rgba(255, 77, 109, 0.5)" }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 w-full rounded-2xl border border-[#23232a] bg-[#09090c] p-6 sm:p-8 transition-colors duration-300 hover:bg-[#0d0d12] shadow-2xl"
                    >
                      {/* Card Header Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border ${
                              isExperience
                                ? "bg-[#800020]/20 text-[#ff8da1] border-[#800020]/50"
                                : "bg-[#1e3a8a]/20 text-[#93c5fd] border-[#1e3a8a]/50"
                            }`}
                          >
                            {entry.type}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                            {entry.status}
                          </span>
                        </div>

                        {/* Period & Location Meta */}
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#a1a1aa]">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#111116] border border-[#22222b]">
                            <Calendar className="w-3.5 h-3.5 text-[#ff4d6d]" />
                            {entry.period}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#111116] border border-[#22222b]">
                            <MapPin className="w-3.5 h-3.5 text-[#38bdf8]" />
                            {entry.location}
                          </span>
                        </div>
                      </div>

                      {/* Main Title & Organization */}
                      <div className="mb-4">
                        <h3 className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
                          {entry.title}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm font-mono text-[#d4d4d8]">
                          <span className="text-white font-semibold">{entry.organization}</span>
                          {entry.department && (
                            <>
                              <span className="text-[#52525b]">•</span>
                              <span className="text-[#a1a1aa]">{entry.department}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Summary Paragraph */}
                      <p className="text-sm text-[#a1a1aa] leading-relaxed mb-6">
                        {entry.summary}
                      </p>

                      {/* Achievements / Key Highlights */}
                      <div className="space-y-2.5 mb-6">
                        <div className="font-mono text-xs uppercase tracking-wider text-[#71717a] mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#ff4d6d]" />
                          <span>Key Impact &amp; Contributions:</span>
                        </div>
                        {entry.achievements.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 p-3 rounded-xl bg-[#111116] border border-[#22222b] text-xs text-[#d4d4d8] leading-relaxed transition-colors hover:border-[#383844]"
                          >
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                isExperience ? "text-[#ff4d6d]" : "text-[#38bdf8]"
                              }`}
                            />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Technologies & Domain Tags */}
                      <div className="pt-4 border-t border-[#1f1f26]">
                        <div className="flex items-center gap-2 mb-2.5">
                          <Code2 className="w-3.5 h-3.5 text-[#71717a]" />
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717a]">
                            Core Competencies Applied:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-lg bg-[#14141a] border border-[#22222b] text-[11px] font-mono text-[#a1a1aa] transition-all hover:border-[#800020] hover:text-white"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
