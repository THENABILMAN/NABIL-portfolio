"use client";

import { motion } from "framer-motion";
import { Database, Brain, Zap, CheckCircle2, ArrowRight } from "lucide-react";

export interface WorkflowCardData {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  codeSnippet: string;
  badge: string;
}

export const workflowCards: WorkflowCardData[] = [
  {
    step: "01",
    title: "Ingestion & Structured Data",
    subtitle: "Python, Scraping, Normalization, Validation Pipelines",
    description:
      "Extracting and cleaning raw unstructured data into clean JSON/CSV schemas with automated normalization and schema validation.",
    codeSnippet: `raw_data = await scraper.extract(url)
clean_json = validator.normalize(raw_data)
db.store_batch(clean_json)`,
    badge: "Ingestion Engine",
  },
  {
    step: "02",
    title: "Agentic Reasoning & Cognitive Architecture",
    subtitle: "LangChain, LangGraph, Memory, MCP",
    description:
      "Structuring multi-step agent reasoning, tool execution, stateful memory graphs, and vector embedding RAG systems.",
    codeSnippet: `workflow = StateGraph(AgentState)
workflow.add_node("reasoner", plan_step)
workflow.add_node("mcp_tools", execute_tools)
graph = workflow.compile()`,
    badge: "Cognitive DAG",
  },
  {
    step: "03",
    title: "High-Speed Inference & Backends",
    subtitle: "FastAPI, Groq, Vector DBs (Pinecone), Pydantic",
    description:
      "Deploying ultra-low latency backend APIs with validation, vector similarity search, and rate-limited LLM inference.",
    codeSnippet: `@app.post("/v1/agent/query")
async def query_pipeline(query: QuerySchema):
    context = await vector_store.search(query)
    return await groq_llm.stream(context)`,
    badge: "Sub-Second API",
  },
  {
    step: "04",
    title: "Production & Multi-Modal Interfaces",
    subtitle: "React, Supabase, Voice (STT/TTS), Vision (OCR)",
    description:
      "Delivering user-facing web applications, real-time voice agents, computer vision OCR pipelines, and secure storage systems.",
    codeSnippet: `const { voiceState } = useLiveKitVoice();
const ocrResults = await visionPipeline.scan(image);
return <ProductionUI state={voiceState} />;`,
    badge: "Production Impact",
  },
];

export default function WorkflowSection() {
  const stepIcons = [Database, Brain, Zap, CheckCircle2];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="workflow" className="py-28 relative overflow-hidden bg-void">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-700/50 text-zinc-300 text-xs font-mono mb-4 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            <span>SYSTEM ARCHITECTURE &amp; PIPELINES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            &ldquo;From Idea to Impact&rdquo; <span className="text-white">AI Workflow</span>.
          </h2>
          <p className="mt-4 text-[#bdbdbd] text-lg font-extralight leading-relaxed">
            The 4-stage engineering process used to transform complex data requirements into autonomous, sub-second AI production systems.
          </p>
        </div>

        {/* 4-Step Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {workflowCards.map((card, index) => {
            const Icon = stepIcons[index % stepIcons.length];
            return (
              <motion.div
                key={card.step}
                variants={cardVariants}
                className="void-card rounded-card p-6 flex flex-col justify-between relative group hover:border-zinc-700/80"
              >
                <div>
                  {/* Top Step Number & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-3xl font-normal text-white">
                      {card.step}
                    </span>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-200">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2.5 rounded-full bg-zinc-900 border border-zinc-700 text-white group-hover:scale-110 transition-all shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-mono text-base font-normal tracking-tight text-white leading-tight">
                        {card.title}
                      </h3>
                      <span className="text-[11px] font-mono text-[#9a9a9a] block mt-1">
                        {card.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#bdbdbd] font-extralight leading-relaxed mb-4">
                    {card.description}
                  </p>
                </div>

                {/* Code Snippet */}
                <div className="mt-2 p-3 rounded-xl bg-black border border-white/10 font-mono text-[11px] text-zinc-200 leading-tight overflow-x-auto">
                  <pre className="whitespace-pre-wrap font-mono">
                    <code>{card.codeSnippet}</code>
                  </pre>
                </div>

                {/* Desktop Connecting Arrow */}
                {index < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                    <div className="w-6 h-6 rounded-full bg-black border border-zinc-700 text-zinc-200 flex items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
