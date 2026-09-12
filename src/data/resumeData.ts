export interface Project {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  detailedDescription: string;
  category: "AI Agents/RAG" | "Full Stack" | "Voice/Vision" | "Automation";
  techStack: string[];
  featured: boolean;
  status: string;
  metrics: string;
  githubUrl: string;
  demoUrl?: string;
  highlights: string[];
  architecture?: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  skillsUsed: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface SkillCategory {
  title: string;
  id: "ai-agentic" | "backend-apis" | "data-tools" | "languages";
  skills: { name: string; level: number; tag: string; iconName?: string }[];
}

export interface WorkflowStep {
  step: string;
  title: string;
  codeSnippet: string;
  description: string;
  badge: string;
}

export const resumeData = {
  personalInfo: {
    name: "Mohammad Ali Nabil",
    headline: "AI Engineer | Agentic Systems, RAG Pipelines & Intelligent Workflows",
    location: "Dhaka, Bangladesh",
    email: "thenabilman@gmail.com",
    phone: "+8801909315967",
    linkedin: "https://www.linkedin.com/in/mohammadalinabil/",
    github: "https://github.com/THENABILMAN",
    instagram: "https://www.instagram.com/thenabilman/",
    githubUsername: "@THENABILMAN",
    bookingUrl: "https://calendly.com/thenabilman",
    resumeUrl: "/resume.pdf",
    availability: "Open to AI Engineering Opportunities",
    summary:
      "AI Engineer specializing in LLM-powered automation, RAG systems, and intelligent data workflows. Experienced in building autonomous AI agents, structured data pipelines, and scalable Python backends, with hands-on work across AI-assisted extraction, validation, and real-time voice systems.",
  },

  impactMetrics: [
    { label: "Autonomous AI Pipelines", value: "100%", description: "Fully agentic multi-step reasoning" },
    { label: "RAG Search Latency", value: "< 500ms", description: "Sub-second similarity search retrieval" },
    { label: "Production AI Systems", value: "6+", description: "Full-stack LLM, Voice & Vision agents" },
    { label: "Multi-Modal Support", value: "Voice/Vision", description: "STT/TTS, OpenCV, Vector DBs & MCP" },
  ],

  workflowSteps: [
    {
      step: "01",
      title: "Data Ingestion & Embedding",
      badge: "Vector DB & Scraping",
      codeSnippet: `chunk_docs = text_splitter.split(raw_data)
embeddings = hf_embeddings.embed_documents(chunk_docs)
vector_store.upsert(vectors=embeddings)`,
      description:
        "Harvest raw unstructured data from websites, APIs, and documents. Chunk and compute dense vector embeddings with Pinecone/Chroma.",
    },
    {
      step: "02",
      title: "Cognitive Agent Architecture",
      badge: "LangGraph & MCP",
      codeSnippet: `workflow = StateGraph(AgentState)
workflow.add_node("planner", plan_execution)
workflow.add_node("tool_executor", execute_mcp_tools)
workflow.add_conditional_edges("planner", should_continue)`,
      description:
        "Structure multi-agent DAGs with LangGraph. Define state persistence, dynamic tool call selection, and self-correction loops.",
    },
    {
      step: "03",
      title: "High-Speed Inference & RAG",
      badge: "FastAPI & Groq",
      codeSnippet: `@app.post("/v1/chat")
async def chat_stream(payload: PromptSchema):
    context = await vector_store.query(payload.query)
    return StreamingResponse(llm.stream(context, payload))`,
      description:
        "Deliver sub-second streaming inference using Groq LLaMA-3 accelerators, FastAPI backends, and context-optimized prompt templates.",
    },
    {
      step: "04",
      title: "Production Impact & Monitoring",
      badge: "Real-Time Systems",
      codeSnippet: `metrics = monitor.track_latency(response)
validate_json_schema(response, PydanticModel)
return formatted_ui_response`,
      description:
        "Validate output JSON structure, log tokens/latency, execute failover fallbacks, and present seamless UI feedback to end users.",
    },
  ] as WorkflowStep[],

  experience: [
    {
      id: "exp-1",
      role: "AI Engineer Intern",
      company: "The Data Island",
      period: "Nov 2025 – Jan 2026",
      location: "Remote / Dhaka, Bangladesh",
      summary:
        "Engineered end-to-end AI automation workflows, high-precision extraction pipelines, and agentic reasoning verification frameworks.",
      bullets: [
        "Architected scalable AI automation workflows and LLM API integrations for high-precision structured data extraction.",
        "Engineered robust Python web scraping and validation pipelines with automated data cleaning and normalization routines.",
        "Designed batch execution architectures to process large data workflows asynchronously with retry logic.",
        "Debugged and optimized complex agent reasoning loops, reducing hallucinations and improving state flow reliability.",
      ],
      skillsUsed: ["Python", "LLM APIs", "Structured Extraction", "Data Pipelines", "Agent Debugging", "Batch Execution"],
    },
  ] as Experience[],

  education: {
    degree: "Bachelor of Science in Computer Science & Engineering (CSE)",
    institution: "North South University",
    period: "Graduated / Undergraduate",
    location: "Dhaka, Bangladesh",
    highlights: [
      "Core focus on Artificial Intelligence, Machine Learning, Data Structures & Algorithms.",
      "Hands-on research and course projects in Computer Vision, NLP, and Distributed Backend Systems.",
    ],
  } as Education,

  projects: [
    {
      id: "fitman",
      title: "FITMAN",
      subtitle: "Full-Stack AI Fitness & Nutrition Coaching Platform",
      period: "2024–Present",
      category: "Full Stack",
      status: "Active Production",
      metrics: "LangGraph Multi-Agent Workflows",
      featured: true,
      description:
        "Comprehensive full-stack fitness and nutrition platform powered by LangGraph AI agents, real-time FastAPI backends, and personalized meal/workout reasoning engines.",
      detailedDescription:
        "FITMAN combines multi-agent orchestration via LangGraph with modern frontend reactive design. It features personalized calorie calculation, automated meal plan optimization, adaptive workout generation based on user telemetry, and dynamic Groq LLM inference for instantaneous nutrition advice.",
      techStack: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "FastAPI",
        "Python",
        "Supabase",
        "PostgreSQL",
        "LangGraph",
        "LangChain",
        "Groq",
      ],
      githubUrl: "https://github.com/THENABILMAN",
      demoUrl: "https://github.com/THENABILMAN",
      highlights: [
        "Built LangGraph agent state machines with multi-turn memory for workout & nutrition planning.",
        "Integrated Groq LLaMA-3 for fast response streaming (< 300ms latency).",
        "Designed Supabase PostgreSQL schema with RLS policies and user health telemetry tracking.",
        "Developed clean glassmorphic mobile-first React frontend with real-time progress charts.",
      ],
      architecture: [
        "Frontend: React + Vite + Tailwind CSS",
        "Agent Layer: LangGraph StateGraph with custom tool definitions",
        "Backend: FastAPI async microservices",
        "Database: Supabase PostgreSQL + Auth",
      ],
    },
    {
      id: "agent-system",
      title: "End-to-End AI Agent System",
      subtitle: "Autonomous Agent with Memory, Multi-Step Reasoning & Tools",
      period: "2024",
      category: "AI Agents/RAG",
      status: "Completed",
      metrics: "Autonomous Multi-Step Execution",
      featured: true,
      description:
        "Autonomous AI agent framework equipped with persistent vector memory, tool calling capabilities, web browsing tools, and step-by-step reasoning verification.",
      detailedDescription:
        "An enterprise-grade agent execution system that breaks down user queries into executable sub-tasks, queries vector databases for contextual grounding, executes custom Python search tools, and self-corrects invalid outputs prior to final response delivery.",
      techStack: ["Python", "FastAPI", "Streamlit", "LangChain", "Pinecone", "OpenAI / Groq API", "Pydantic"],
      githubUrl: "https://github.com/THENABILMAN",
      highlights: [
        "Implemented persistent conversation state & short/long-term memory with vector DB retrieval.",
        "Added dynamic tool binding allowing the agent to execute web search, code execution, and CSV analytics.",
        "Constructed fallback loops when tool output returns error schemas.",
        "Built interactive Streamlit control panel for agent state visualization.",
      ],
      architecture: [
        "Reasoning Engine: Custom LangChain ReAct loops",
        "Memory Layer: Vector DB semantic search + windowed message buffers",
        "Execution Interface: FastAPI async endpoints + Streamlit UI",
      ],
    },
    {
      id: "livekit-mcp",
      title: "LiveKit MCP AI Assistant",
      subtitle: "Multi-Client Real-Time Voice & Search Assistant",
      period: "2025",
      category: "Voice/Vision",
      status: "Active Prototype",
      metrics: "Real-Time Vector Ingestion",
      featured: true,
      description:
        "Voice-first multi-client AI assistant powered by LiveKit WebRTC, Model Context Protocol (MCP) server tools, and real-time vector document ingestion.",
      detailedDescription:
        "Combines low-latency WebRTC audio streaming with MCP standard tool interoperability. Enables multi-user real-time voice conversations with live vector document search, web scraping, and instantaneous speech feedback.",
      techStack: ["Python", "LiveKit WebRTC", "MCP Protocol", "Vector DB", "FastAPI", "STT/TTS", "Asyncio"],
      githubUrl: "https://github.com/THENABILMAN",
      highlights: [
        "Integrated Model Context Protocol (MCP) tools for standardized AI client-server communication.",
        "Handled real-time voice streaming with sub-400ms voice-to-voice response loops.",
        "Built automatic document ingestion pipelines into vector storage during active audio calls.",
      ],
      architecture: [
        "Transport: LiveKit WebRTC audio session",
        "Agent Core: MCP Protocol server + LLM pipeline",
        "Knowledge: Vector DB similarity search",
      ],
    },
    {
      id: "rag-docs",
      title: "RAG Documentation Agent",
      subtitle: "Embedding-Based Similarity Search Chatbot",
      period: "2024",
      category: "AI Agents/RAG",
      status: "Deployed",
      metrics: "< 200ms Vector Retrieval",
      featured: false,
      description:
        "High-performance RAG chatbot application capable of indexing technical documentation, code repos, and markdown files for context-aware Q&A.",
      detailedDescription:
        "A lightweight document indexing and retrieval system. Custom recursive text splitters chunk documents into semantic blocks, generate vector embeddings, and inject relevant citations directly into user responses.",
      techStack: ["Python", "LangChain", "Pinecone / Chroma", "Streamlit", "Hugging Face Embeddings", "FastAPI"],
      githubUrl: "https://github.com/THENABILMAN",
      highlights: [
        "Implemented recursive semantic document splitting with metadata tagging.",
        "Integrated hybrid search (BM25 keyword search + Dense Vector Search).",
        "Added explicit source document line citation display in user UI.",
      ],
    },
    {
      id: "bangla-voice",
      title: "Bangla AI Voice Agent",
      subtitle: "Real-Time Bangla Speech STT-LLM-TTS Pipeline",
      period: "2025",
      category: "Voice/Vision",
      status: "Research / Prototype",
      metrics: "Native Bengali Speech Processing",
      featured: false,
      description:
        "End-to-end voice assistant tailored for the Bengali language, integrating fine-tuned STT speech recognition, LLM reasoning, and natural TTS speech synthesis.",
      detailedDescription:
        "Addressed low-resource language processing challenges by building a dedicated speech pipeline for Bangla. Features noise suppression, phoneme mapping, LLM context maintenance, and low-latency audio playback.",
      techStack: ["Python", "Whisper STT", "Groq / LLaMA", "TTS Engine", "PyTorch", "FastAPI", "WebSockets"],
      githubUrl: "https://github.com/THENABILMAN",
      highlights: [
        "Implemented real-time audio chunk processing via WebSockets.",
        "Configured Bengali prompt engineering guidelines to prevent script mixing.",
        "Optimized STT audio preprocessing for noisy environmental recordings.",
      ],
    },
    {
      id: "resume-analyzer",
      title: "AI Resume Analyzer & Matcher",
      subtitle: "LLM-Powered Semantic Parsing & Job Fit Scoring",
      period: "2025",
      category: "AI Agents/RAG",
      status: "Completed",
      metrics: "Semantic Scoring & Entity Extraction",
      featured: true,
      description:
        "Intelligent resume parsing and ATS optimization engine using LLMs, vector embeddings, and semantic similarity scoring to evaluate candidate skills, match job descriptions, and deliver actionable CV insights.",
      detailedDescription:
        "Extracts structured entities from multi-page PDF/DOCX resumes using JSON schemas and LLM prompts. Computes cosine similarity against target job descriptions and provides targeted improvement recommendations.",
      techStack: ["Python", "LLMs", "FastAPI", "Streamlit", "LangChain", "NLP", "PDF Parsing"],
      githubUrl: "https://github.com/THENABILMAN/THENABILMAN_AI_Resume-Analyzer",
      demoUrl: "https://github.com/THENABILMAN/THENABILMAN_AI_Resume-Analyzer",
      highlights: [
        "Engineered structured JSON entity extraction from complex multi-page PDF/DOCX resumes using constrained LLM schemas.",
        "Computed vector similarity and semantic match scores against target job specifications with gap analysis recommendations.",
        "Delivered responsive Streamlit visualization dashboard for real-time candidate telemetry.",
      ],
      architecture: [
        "Parser: PDF/DOCX multi-format text extraction engine",
        "LLM Entity Extractor: LangChain JSON Schema validation",
        "Scoring Layer: Dense embeddings cosine similarity comparison",
      ],
    },
    {
      id: "ai-voice-agent",
      title: "Real-Time AI Voice Agent",
      subtitle: "Low-Latency Conversational Voice Pipeline",
      period: "2025",
      category: "Voice/Vision",
      status: "Completed",
      metrics: "Sub-second Conversational Voice Loop",
      featured: true,
      description:
        "Full-duplex conversational voice agent integrating real-time streaming Speech-to-Text (STT), low-latency LLM reasoning, and natural neural Text-to-Speech (TTS) for human-like auditory interaction.",
      detailedDescription:
        "Combines streaming audio ingestion over WebSockets with Voice Activity Detection (VAD) and fast neural TTS for fluid turn-taking and natural real-time dialogue.",
      techStack: ["Python", "Whisper STT", "Neural TTS", "WebSockets", "FastAPI", "Audio Streaming"],
      githubUrl: "https://github.com/THENABILMAN/THENABILMAN_AI_Voice_Agent",
      demoUrl: "https://github.com/THENABILMAN/THENABILMAN_AI_Voice_Agent",
      highlights: [
        "Implemented streaming audio pipeline with Voice Activity Detection (VAD) for fluid turn-taking.",
        "Orchestrated sub-second conversational response loops bridging STT, LLM inference, and TTS audio synthesis.",
        "Integrated asynchronous WebSocket frame delivery with automatic jitter buffering.",
      ],
      architecture: [
        "Audio Ingestion: WebSockets streaming with VAD segmentation",
        "Inference Loop: Streaming Whisper STT + low-latency LLM gateway",
        "Audio Playback: Neural TTS streaming audio chunk synthesizer",
      ],
    },
    {
      id: "bangla-voice-agent",
      title: "End-to-End Bangla AI Voice Agent",
      subtitle: "Bengali Speech Recognition & Speech Synthesis Pipeline",
      period: "2025",
      category: "Voice/Vision",
      status: "Completed",
      metrics: "Native Bengali Speech Processing",
      featured: true,
      description:
        "Native Bengali conversational AI agent supporting end-to-end Bangla Speech-to-Text, contextual LLM inference in Bengali, and low-latency Bangla neural speech generation for localized verbal assistance.",
      detailedDescription:
        "Overcomes low-resource language barriers by unifying Bengali ASR/STT with context-preserving Bengali prompt architectures and natural prosody TTS synthesis.",
      techStack: ["Bengali NLP", "Bangla STT", "Bangla TTS", "Python", "PyTorch", "FastAPI", "Voice AI"],
      githubUrl: "https://github.com/THENABILMAN/THENABILMAN_End-to-End_Bangla_AI_voice-agent",
      demoUrl: "https://github.com/THENABILMAN/THENABILMAN_End-to-End_Bangla_AI_voice-agent",
      highlights: [
        "Integrated specialized Bengali ASR/STT models for accurate native speech recognition.",
        "Engineered context-preserving Bengali prompt architectures with natural prosody TTS synthesis.",
        "Handled real-time Bengali speech chunk streaming over FastAPI WebSockets.",
      ],
      architecture: [
        "Speech Recognition: Custom Bengali Whisper / ASR pipeline",
        "Reasoning: Multilingual LLM with strict Bengali script enforcement",
        "Speech Generation: Neural Bengali TTS voice synthesizer",
      ],
    },
    {
      id: "ai-vision",
      title: "AI Vision Agent",
      subtitle: "Object Recognition, OCR & Automated Inspection",
      period: "2024",
      category: "Voice/Vision",
      status: "Completed",
      metrics: "Real-time OpenCV & OCR Pipeline",
      featured: false,
      description:
        "Computer vision automation agent utilizing OpenCV image filters and Hugging Face Transformers for live object detection, document OCR, and automated data tagging.",
      detailedDescription:
        "Designed to extract visual information from live camera feeds or uploaded images. Automatically parses text from documents, classifies bounding box regions, and generates structured JSON payloads for downstream backend processing.",
      techStack: ["Python", "OpenCV", "Hugging Face Transformers", "PyTorch", "Tesseract / EasyOCR", "FastAPI"],
      githubUrl: "https://github.com/THENABILMAN",
      highlights: [
        "Implemented custom OpenCV image preprocessing (contour detection, binarization, de-skewing).",
        "Integrated transformer vision models for multi-class object detection.",
        "Built automated JSON metadata extraction from unstructured document scans.",
      ],
    },
  ] as Project[],

  skillCategories: [
    {
      title: "AI / Agentic & RAG",
      id: "ai-agentic",
      skills: [
        { name: "LLMs & Prompt Eng", level: 95, tag: "GPT-4, LLaMA-3, Claude", iconName: "Brain" },
        { name: "LLM & LMM Fine-Tuning", level: 92, tag: "LoRA, QLoRA, PEFT, Unsloth, Vision-Language", iconName: "Layers" },
        { name: "LLM Model Training", level: 90, tag: "Pretraining, SFT, DPO, Hugging Face TRL", iconName: "Cpu" },
        { name: "RAG Architecture", level: 92, tag: "Embeddings, Hybrid Search, Chunking", iconName: "Database" },
        { name: "AI Agents & LangGraph", level: 90, tag: "Multi-Agent DAGs, State Graph", iconName: "Workflow" },
        { name: "MCP Protocol", level: 88, tag: "Model Context Protocol Tools", iconName: "Server" },
        { name: "Transformers & PyTorch", level: 88, tag: "Hugging Face, Distributed Training", iconName: "Layers" },
        { name: "STT & TTS Systems", level: 85, tag: "Whisper, Speech Pipelines", iconName: "Mic" },
        { name: "Computer Vision", level: 82, tag: "OpenCV, OCR, Object Detection", iconName: "Eye" },
      ],
    },
    {
      title: "Backend & APIs",
      id: "backend-apis",
      skills: [
        { name: "FastAPI", level: 95, tag: "Async Backends, Swagger, Pydantic", iconName: "Server" },
        { name: "REST & WebSockets", level: 90, tag: "Real-time Data Streaming", iconName: "Radio" },
        { name: "Supabase & PostgreSQL", level: 88, tag: "Relational Schemas, Vector Extensions", iconName: "Database" },
        { name: "Structured Extraction", level: 92, tag: "JSON Schemas, Pydantic Validation", iconName: "Code" },
        { name: "Streamlit", level: 88, tag: "Rapid AI Prototyping UIs", iconName: "Layout" },
      ],
    },
    {
      title: "Data & Tools",
      id: "data-tools",
      skills: [
        { name: "Python Scraping", level: 95, tag: "BeautifulSoup, Selenium, Requests", iconName: "Globe" },
        { name: "Data Cleaning & Normalization", level: 92, tag: "Pandas, Data Pipelines", iconName: "Filter" },
        { name: "Vector Databases", level: 88, tag: "Pinecone, Chroma, FAISS", iconName: "HardDrive" },
        { name: "Batch Execution Design", level: 88, tag: "Asyncio, Queue Processing", iconName: "Zap" },
        { name: "Git & Version Control", level: 90, tag: "GitHub, Branch Workflows", iconName: "GitBranch" },
      ],
    },
    {
      title: "Languages",
      id: "languages",
      skills: [
        { name: "Python", level: 96, tag: "Primary Language / AI Core", iconName: "FileCode" },
        { name: "TypeScript / JavaScript", level: 88, tag: "Next.js, React, Web Apps", iconName: "Code2" },
        { name: "C", level: 85, tag: "Low-level Concepts & Memory", iconName: "Terminal" },
        { name: "C++", level: 85, tag: "Data Structures & Performance", iconName: "Cpu" },
        { name: "Java", level: 80, tag: "Object-Oriented Programming", iconName: "Coffee" },
      ],
    },
  ] as SkillCategory[],

  cliCommands: {
    help: "Available commands:\n  nabil --skills      List core technical skills\n  nabil --projects    Show featured AI projects\n  nabil --experience  View work experience & education\n  nabil --contact     Get email, phone & github links\n  clear               Clear terminal screen",
    bio: "Mohammad Ali Nabil — AI Engineer\nSpecializing in LLM Automation, RAG Systems & Autonomous AI Agents.\nLocation: Dhaka, Bangladesh | Phone: +8801909315967",
    skills: "Core Skills:\n• AI/ML: LLM & LMM Fine-Tuning (LoRA/QLoRA/PEFT), LLM Model Training (SFT/DPO), RAG Systems, LangGraph Multi-Agent, MCP, PyTorch, STT/TTS, OpenCV\n• Backend: Python, FastAPI, Asyncio, WebSockets, Supabase, PostgreSQL\n• Data & Tools: BeautifulSoup, Selenium, Pinecone, Pandas, Git, Unsloth, Hugging Face\n• Languages: Python, TypeScript, C, C++, Java",
    projects: "Featured Projects:\n1. FITMAN (LangGraph AI Fitness & Nutrition Platform)\n2. Autonomous Agent System (Memory & RAG Reasoning)\n3. AI Resume Analyzer (LLM Semantic Parsing & Job Matching)\n4. Real-Time AI Voice Agent (Low-Latency Full-Duplex Voice Pipeline)\n5. End-to-End Bangla AI Voice Agent (Native Bengali Speech STT-LLM-TTS)\n6. LiveKit MCP Voice Assistant (Real-Time Voice & MCP Protocol)\n7. AI Vision & OCR Agent (OpenCV & Transformer Inspection)",
    experience: "Work Experience:\n• AI Engineer Intern @ The Data Island (Nov 2025 – Jan 2026)\n  - Built AI automation workflows, LLM API extraction, Python scraping/validation, data normalization, batch execution, and agent debugging.\nEducation:\n• B.Sc. in Computer Science & Engineering @ North South University",
    contact: "Contact Information:\n• Email: thenabilman@gmail.com\n• Phone: +8801909315967\n• GitHub: https://github.com/THENABILMAN\n• Location: Dhaka, Bangladesh",
  } as Record<string, string>,
};
