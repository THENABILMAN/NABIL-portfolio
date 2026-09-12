"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Search,
  CheckCircle2,
  Workflow,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Filter,
  Eye,
} from "lucide-react";

interface SkillItem {
  name: string;
  level?: "Core" | "Advanced" | "Production";
  highlight?: string;
}

interface DomainData {
  id: number;
  name: string;
  tag: string;
  summary: string;
  color: string;
  icon: typeof Code2;
  skills: SkillItem[];
}

const DOMAINS: DomainData[] = [
  {
    id: 1,
    name: "Python",
    tag: "CORE RUNTIME & OOP",
    summary: "Deep mastery of the Python runtime, metaprogramming, OOP design patterns, and package tooling.",
    color: "#ff4d6d",
    icon: Code2,
    skills: [
      { name: "syntax", level: "Core" },
      { name: "functions", level: "Core" },
      { name: "classes / objects", level: "Core" },
      { name: "modules / imports", level: "Core" },
      { name: "exceptions", level: "Core" },
      { name: "files", level: "Core" },
      { name: "iterators / generators", level: "Advanced" },
      { name: "decorators", level: "Advanced" },
      { name: "typing", level: "Advanced" },
      { name: "package management", level: "Production" },
    ],
  },
  {
    id: 2,
    name: "Backend",
    tag: "ASYNC SERVICES & APIS",
    summary: "Asynchronous microservices, high-concurrency API design, and network protocol routing.",
    color: "#38bdf8",
    icon: Server,
    skills: [
      { name: "HTTP", level: "Core" },
      { name: "REST", level: "Core" },
      { name: "JSON", level: "Core" },
      { name: "APIs", level: "Production" },
      { name: "FastAPI", level: "Production", highlight: "Used in FITMAN" },
      { name: "async / await", level: "Advanced" },
      { name: "authentication", level: "Production" },
      { name: "middleware", level: "Advanced" },
    ],
  },
  {
    id: 3,
    name: "Databases",
    tag: "PERSISTENCE & SCHEMAS",
    summary: "ACID transactions, relational schemas, indexing strategies, and Supabase / PostgreSQL optimization.",
    color: "#22c55e",
    icon: Database,
    skills: [
      { name: "SQL", level: "Core" },
      { name: "PostgreSQL", level: "Production", highlight: "Supabase RLS" },
      { name: "relationships", level: "Core" },
      { name: "joins", level: "Core" },
      { name: "indexes", level: "Advanced" },
      { name: "transactions", level: "Advanced" },
      { name: "ORM", level: "Production" },
    ],
  },
  {
    id: 4,
    name: "Software Engineering",
    tag: "RIGOR & PRODUCTION CRAFT",
    summary: "Systems engineering best practices, Linux environments, testing suites, and clean architecture.",
    color: "#eab308",
    icon: Terminal,
    skills: [
      { name: "Git", level: "Production" },
      { name: "Linux", level: "Production" },
      { name: "project architecture", level: "Advanced" },
      { name: "testing", level: "Production" },
      { name: "debugging", level: "Production", highlight: "Agent Debugging" },
      { name: "logging", level: "Production" },
      { name: "environment variables", level: "Core" },
      { name: "dependency management", level: "Core" },
      { name: "clean code", level: "Production" },
    ],
  },
  {
    id: 5,
    name: "AI Fundamentals",
    tag: "MATH & MACHINE LEARNING",
    summary: "Mathematical foundations of machine learning, tensor algebra, probability, and classical modeling.",
    color: "#a855f7",
    icon: Cpu,
    skills: [
      { name: "NumPy", level: "Production" },
      { name: "Linear Algebra", level: "Core" },
      { name: "Probability", level: "Core" },
      { name: "Calculus", level: "Core" },
      { name: "Machine Learning", level: "Advanced" },
      { name: "Neural Networks", level: "Advanced" },
    ],
  },
  {
    id: 6,
    name: "Deep Learning & Model Training",
    tag: "NEURAL ARCHITECTURES & TRAINING",
    summary: "PyTorch tensor operations, backprop calculus, sequence models, multi-head attention, and LLM model training workflows.",
    color: "#ec4899",
    icon: Layers,
    skills: [
      { name: "Backpropagation", level: "Core" },
      { name: "PyTorch", level: "Production" },
      { name: "Transformers Architecture", level: "Production" },
      { name: "LLM Model Training", level: "Production", highlight: "Pretraining / SFT / DPO" },
      { name: "CNN & Vision Encoders", level: "Advanced" },
      { name: "RNN/LSTM", level: "Advanced" },
      { name: "Attention Mechanisms", level: "Advanced" },
      { name: "Model Quantization", level: "Production", highlight: "AWQ / GGUF / bitsandbytes" },
      { name: "Distributed Training", level: "Advanced", highlight: "DeepSpeed / FSDP" },
    ],
  },
  {
    id: 7,
    name: "AI Engineering & LLM/LMM Tuning",
    tag: "AGENTIC SYSTEMS, RAG & FINE-TUNING",
    summary: "Autonomous state graph agents, dense/sparse vector retrieval, LLM & LMM (multimodal) fine-tuning (LoRA/QLoRA), and model alignment.",
    color: "#ff4d6d",
    icon: Sparkles,
    skills: [
      { name: "LLM & LMM Fine-Tuning", level: "Production", highlight: "LoRA / QLoRA / PEFT" },
      { name: "Unsloth & Hugging Face TRL", level: "Production", highlight: "Sub-Hour LoRA" },
      { name: "Dataset Curation & SFT", level: "Production", highlight: "Instruction Tuning" },
      { name: "RAG Architecture", level: "Production", highlight: "Pinecone 1024-dim" },
      { name: "embeddings", level: "Production" },
      { name: "tool calling", level: "Production", highlight: "MCP Schema" },
      { name: "agents", level: "Production" },
      { name: "LangGraph", level: "Production", highlight: "FITMAN DAG" },
      { name: "evaluation & benchmarking", level: "Production" },
      { name: "deployment & serving", level: "Production", highlight: "vLLM / Ollama" },
      { name: "multimodal / vision", level: "Production", highlight: "LiveKit & OpenCV" },
    ],
  },
];

export default function TechnicalKnowledgeGraph() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomainId, setSelectedDomainId] = useState<number | "all">("all");
  const [activeView, setActiveView] = useState<"tree" | "cards">("tree");
  const [expandedDomains, setExpandedDomains] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
  });

  const totalSkills = DOMAINS.reduce((acc, d) => acc + d.skills.length, 0);

  const toggleDomain = (id: number) => {
    setExpandedDomains((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const allExpanded = Object.keys(expandedDomains).reduce(
      (acc, key) => ({ ...acc, [Number(key)]: true }),
      {}
    );
    setExpandedDomains(allExpanded);
  };

  const collapseAll = () => {
    const allCollapsed = Object.keys(expandedDomains).reduce(
      (acc, key) => ({ ...acc, [Number(key)]: false }),
      {}
    );
    setExpandedDomains(allCollapsed);
  };

  const filteredDomains = useMemo(() => {
    return DOMAINS.filter((d) => {
      if (selectedDomainId !== "all" && d.id !== selectedDomainId) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const domainMatches = d.name.toLowerCase().includes(q) || d.summary.toLowerCase().includes(q) || d.tag.toLowerCase().includes(q);
      const skillMatches = d.skills.some((s) => s.name.toLowerCase().includes(q) || (s.highlight && s.highlight.toLowerCase().includes(q)));
      return domainMatches || skillMatches;
    });
  }, [selectedDomainId, searchQuery]);

  const isMatch = (name: string, highlight?: string) => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase().trim();
    return name.toLowerCase().includes(q) || (highlight ? highlight.toLowerCase().includes(q) : false);
  };

  return (
    <section id="skills" className="w-full bg-black text-white py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1a1a1f] font-sans relative">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_30%_at_50%_0%,rgba(128,0,32,0.08),rgba(0,0,0,0))]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0c0c0e] border border-[#2A1E1A] text-[11px] font-mono uppercase tracking-[0.2em] text-[#a1a1aa] mb-4">
              <Workflow className="w-3.5 h-3.5 text-[#ff4d6d]" />
              <span>KNOWLEDGE_ARCHITECTURE // SYSTEM SKILLS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3 font-mono">
              Technical Knowledge Graph<span className="text-[#800020]">.</span>
            </h2>
            <p className="text-[#a1a1aa] text-sm md:text-base max-w-2xl leading-relaxed">
              Complete engineering hierarchy: from foundational Python runtime, asynchronous backends, and databases to tensor calculus, deep neural transformers, autonomous state graphs, and LLM/LMM fine-tuning.
            </p>
          </div>

          {/* Search & View Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717a]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills (e.g. LLM Fine-Tuning, LoRA, LangGraph)..."
                className="bg-[#09090c] border border-[#23232a] rounded-xl pl-9 pr-8 py-2.5 text-xs font-mono text-white placeholder:text-[#52525b] outline-none focus:border-[#800020] transition-colors w-full sm:w-76"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#71717a] hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Switcher */}
            <div className="flex items-center bg-[#09090c] p-1 rounded-xl border border-[#23232a] font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveView("tree")}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeView === "tree"
                    ? "bg-[#800020] text-white font-semibold shadow-md"
                    : "text-[#71717a] hover:text-white"
                }`}
              >
                TREE GRAPH
              </button>
              <button
                type="button"
                onClick={() => setActiveView("cards")}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeView === "cards"
                    ? "bg-[#800020] text-white font-semibold shadow-md"
                    : "text-[#71717a] hover:text-white"
                }`}
              >
                CARDS VIEW
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats Strip with Staggered Entrance and Hover Lift */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 text-xs font-mono"
        >
          <motion.div
            whileHover={{ y: -3, borderColor: "#ff4d6d" }}
            transition={{ duration: 0.2 }}
            className="p-3.5 bg-[#09090c] border border-[#23232a] rounded-xl cursor-default"
          >
            <span className="text-[#71717a] block mb-1 text-[10px]">CORE DOMAINS</span>
            <span className="text-white text-base sm:text-lg font-bold">7 Engineering Layers</span>
          </motion.div>
          <motion.div
            whileHover={{ y: -3, borderColor: "#38bdf8" }}
            transition={{ duration: 0.2 }}
            className="p-3.5 bg-[#09090c] border border-[#23232a] rounded-xl cursor-default"
          >
            <span className="text-[#71717a] block mb-1 text-[10px]">TECHNICAL SKILLS</span>
            <span className="text-white text-base sm:text-lg font-bold">{totalSkills} Verified Competencies</span>
          </motion.div>
          <motion.div
            whileHover={{ y: -3, borderColor: "#eab308" }}
            transition={{ duration: 0.2 }}
            className="p-3.5 bg-[#09090c] border border-[#23232a] rounded-xl cursor-default"
          >
            <span className="text-[#71717a] block mb-1 text-[10px]">SPECTRUM</span>
            <span className="text-white text-base sm:text-lg font-bold">Theory + Production RAG</span>
          </motion.div>
          <motion.div
            whileHover={{ y: -3, borderColor: "#22c55e" }}
            transition={{ duration: 0.2 }}
            className="p-3.5 bg-[#09090c] border border-[#23232a] rounded-xl cursor-default"
          >
            <span className="text-[#71717a] block mb-1 text-[10px]">EXECUTION STATUS</span>
            <span className="text-[#22c55e] text-base sm:text-lg font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Production Tested
            </span>
          </motion.div>
        </motion.div>

        {/* Domain Filter Pills */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex flex-wrap gap-1.5">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => setSelectedDomainId("all")}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                selectedDomainId === "all"
                  ? "bg-white text-black font-semibold border-white"
                  : "bg-[#0c0c10] text-[#71717a] border-[#1f1f26] hover:text-white"
              }`}
            >
              All Layers ({totalSkills})
            </motion.button>
            {DOMAINS.map((d) => (
              <motion.button
                key={d.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => setSelectedDomainId(d.id)}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  selectedDomainId === d.id
                    ? "bg-[#800020] text-white font-semibold border-[#ff4d6d]"
                    : "bg-[#0c0c10] text-[#71717a] border-[#1f1f26] hover:text-white"
                }`}
              >
                {d.name} ({d.skills.length})
              </motion.button>
            ))}
          </div>

          {activeView === "tree" && (
            <div className="flex items-center gap-2 text-[11px] text-[#71717a]">
              <button
                type="button"
                onClick={expandAll}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Expand All
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={collapseAll}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          )}
        </div>

        {/* VIEW 1: TREE GRAPH VIEW (Cybernetic Hierarchical Flow) */}
        {activeView === "tree" && (
          <div className="bg-[#07070a] border border-[#23232a] rounded-2xl p-5 sm:p-8 font-mono shadow-2xl relative">
            {/* Terminal Chrome Header */}
            <div className="flex items-center justify-between border-b border-[#1f1f26] pb-3.5 mb-8 text-xs text-[#71717a]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/80" />
                <span className="text-[#a1a1aa] ml-2 font-semibold">
                  system@runtime:~$ tree --skills --hierarchy
                </span>
              </div>
              <span className="text-[11px] text-[#22c55e] bg-[#22c55e]/10 px-2 py-0.5 rounded border border-[#22c55e]/20">
                GRAPH_ONLINE
              </span>
            </div>

            {/* Tree Nodes List */}
            <div className="space-y-6">
              {filteredDomains.map((domain, idx) => {
                const Icon = domain.icon;
                const isExpanded = expandedDomains[domain.id] ?? true;
                const isLast = idx === filteredDomains.length - 1;
                const hasMatch = domain.skills.some((s) => isMatch(s.name, s.highlight));

                return (
                  <div key={domain.id} className="relative">
                    {/* Domain Header Card */}
                    <motion.div
                      whileHover={{ x: 3, borderColor: "rgba(255, 77, 109, 0.6)" }}
                      transition={{ duration: 0.2 }}
                      onClick={() => toggleDomain(domain.id)}
                      className={`p-4 rounded-xl border transition-colors duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer ${
                        hasMatch
                          ? "bg-[#14080a] border-[#800020] shadow-lg shadow-[#800020]/20"
                          : "bg-[#0b0b0f] border-[#1f1f26] hover:bg-[#0e0e13]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 transition-transform duration-200 group-hover:scale-105"
                          style={{
                            backgroundColor: `${domain.color}15`,
                            borderColor: `${domain.color}40`,
                            color: domain.color,
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                              {domain.name}
                            </span>
                            <span className="text-[10px] text-[#71717a] font-normal">
                              ({domain.skills.length} skills)
                            </span>
                          </div>
                          <p className="text-[11px] text-[#71717a] mt-0.5 max-w-xl">
                            {domain.summary}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-start sm:self-auto">
                        <span className="text-[10px] text-[#a1a1aa] bg-[#111116] px-2.5 py-1 rounded-lg border border-[#23232a]">
                          {domain.tag}
                        </span>
                        <div className="text-[#71717a] hover:text-white p-1">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Expandable Skills Rail */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-6 sm:pl-8 pt-3 pb-2 border-l-2 border-[#1f1f26] ml-4 sm:ml-6 space-y-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
                              {domain.skills.map((skill, skillIdx) => {
                                const isLastItem = skillIdx === domain.skills.length - 1;
                                const highlighted = isMatch(skill.name, skill.highlight);

                                return (
                                  <motion.div
                                    key={skill.name}
                                    whileHover={{ x: 2, scale: 1.01 }}
                                    transition={{ duration: 0.15 }}
                                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-colors cursor-default ${
                                      highlighted
                                        ? "bg-[#800020] border-white text-white font-semibold shadow-md"
                                        : "bg-[#09090c] border-[#1a1a20] text-[#d4d4d8] hover:border-[#800020]/60 hover:bg-[#111116]"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 truncate">
                                      <span className="text-[#800020] text-[11px] font-mono select-none">
                                        {isLastItem ? "└──" : "├──"}
                                      </span>
                                      <span className="capitalize truncate">{skill.name}</span>
                                    </div>

                                    {skill.highlight ? (
                                      <span className="text-[9px] font-mono bg-[#800020]/20 text-[#ff8da1] px-1.5 py-0.5 rounded border border-[#800020]/40 shrink-0">
                                        {skill.highlight}
                                      </span>
                                    ) : skill.level ? (
                                      <span className="text-[9px] font-mono text-[#52525b] shrink-0">
                                        [{skill.level}]
                                      </span>
                                    ) : null}
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Branch Connection Line to Next Domain */}
                    {!isLast && (
                      <div className="h-4 border-l-2 border-[#1f1f26] ml-4 sm:ml-6 my-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: MODULAR CARDS VIEW (Clean 3-Column Grid) */}
        {activeView === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDomains.map((domain) => {
              const Icon = domain.icon;
              const hasMatch = domain.skills.some((s) => isMatch(s.name, s.highlight));

              return (
                <motion.div
                  key={domain.id}
                  whileHover={{ y: -5, borderColor: "rgba(255, 77, 109, 0.7)" }}
                  transition={{ duration: 0.25 }}
                  className={`bg-[#07070a] border rounded-2xl p-6 flex flex-col justify-between transition-colors duration-300 hover:bg-[#0c0c10] shadow-xl ${
                    hasMatch ? "border-[#800020] shadow-lg shadow-[#800020]/20" : "border-[#23232a]"
                  }`}
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex items-center justify-between border-b border-[#1f1f26] pb-3.5 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center border"
                          style={{
                            backgroundColor: `${domain.color}15`,
                            borderColor: `${domain.color}40`,
                            color: domain.color,
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-sm font-mono font-bold text-white uppercase block">
                            {domain.name}
                          </span>
                          <span className="text-[10px] text-[#71717a] font-mono">
                            {domain.tag}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-[#71717a] bg-[#111116] px-2 py-0.5 rounded-md border border-[#22222b]">
                        {domain.skills.length} skills
                      </span>
                    </div>

                    <p className="text-xs text-[#a1a1aa] mb-4 leading-relaxed">
                      {domain.summary}
                    </p>

                    {/* Skill Pills */}
                    <div className="space-y-1.5 font-mono text-xs">
                      {domain.skills.map((skill, idx) => {
                        const isLast = idx === domain.skills.length - 1;
                        const highlighted = isMatch(skill.name, skill.highlight);

                        return (
                          <div
                            key={skill.name}
                            className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-[11px] transition-all ${
                              highlighted
                                ? "bg-[#800020] border-white text-white font-semibold"
                                : "bg-[#0b0b0f] border-[#1a1a20] text-[#d4d4d8] hover:border-[#800020]/40"
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="text-[#800020] text-[10px] select-none">
                                {isLast ? "└──" : "├──"}
                              </span>
                              <span className="truncate">{skill.name}</span>
                            </div>

                            {skill.highlight ? (
                              <span className="text-[9px] font-mono text-[#ff8da1] bg-[#800020]/20 px-1.5 py-0.5 rounded border border-[#800020]/30 shrink-0">
                                {skill.highlight}
                              </span>
                            ) : (
                              <span className="text-[9px] text-[#52525b] shrink-0">
                                {skill.level}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#1a1a20] flex items-center justify-between text-[10px] font-mono text-[#71717a]">
                    <span>STATUS: VALIDATED</span>
                    <span className="text-[#22c55e] font-semibold">PRODUCTION GRADE</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
