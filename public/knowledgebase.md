Below is the information I currently have that is useful for a public portfolio, organized so you can turn it directly into agent context later.

1. Core Identity
Name: Mohammad Ali Nabil
Preferred name: Nabil
Location: Dhaka, Bangladesh
Field: Computer Science / Artificial Intelligence
Current professional direction: AI Engineer / AI Developer
University: North South University (NSU)
Degree: BSc in Computer Science & Engineering
GitHub: github.com/THENABILMAN
Personal brand: THENABILMAN
Professional positioning

You describe yourself as:

AI Engineer specializing in LLM-powered automation, RAG systems, intelligent data workflows, autonomous agents, structured data pipelines, scalable Python backends, AI-assisted extraction/validation, and real-time voice systems.

Your broader ambition is to become a strong hardcore developer + AI engineer + researcher + entrepreneur rather than someone who only knows how to call APIs.

2. Education
North South University

BSc in Computer Science & Engineering

Currently an undergraduate student.
You have been working through your CSE degree while simultaneously developing practical AI/software engineering skills.
You want to graduate and eventually pursue a Master's in Germany, with particular interest in quantum computing.
You are interested in combining software engineering, AI, research, and eventually deeper technical fields.
Academic interests

You have shown strong interest in:

Artificial Intelligence
Machine Learning
Deep Learning
NLP
LLMs
Transformers
AI agents
RAG
Backend engineering
Distributed/production systems
Computer science fundamentals
C++
Data structures and algorithms
Quantum computing
3. Professional Experience
The Data Island

AI Engineer Intern — GenAI Team

November 2025 – January 2026

You worked on practical GenAI/automation problems.

Relevant experience included:

LLM-powered automation
Data scraping
Data processing
Data extraction
Data cleaning
Data normalization
Data validation
Batch processing
Agent debugging
Working with AI/data workflows
Exploring how LLM-based systems can automate structured workflows

This experience gave you exposure to the gap between AI prototypes and real engineering workflows.

4. Your Main Technical Direction

Your strongest current technical identity is around:

AI Engineering
LLM applications
RAG systems
AI agents
Agent orchestration
LLM automation
NLP
Structured extraction
Intelligent data workflows
AI-assisted validation
Voice AI
Local LLMs
Backend
Python
FastAPI
APIs
HTTP
Backend architecture
Data processing
Environment/configuration management
Async programming
AI frameworks/tools

You've worked with or explored:

LangChain
LangGraph
LiveKit
CrewAI
AutoGen
Hugging Face
PyTorch
Ollama
Pinecone
Chroma
Tavily
Groq
Supabase
MCP
Streamlit
Languages
Python
C++
TypeScript
JavaScript
C

You are currently particularly interested in becoming much stronger with Python and C++ fundamentals, rather than depending on generated code.

5. Your AI Engineering Philosophy

A very important part of your portfolio agent should understand this:

You don't want to merely use AI libraries.

You want to understand:

what is actually happening underneath the libraries.

You've specifically been working toward understanding:

Python
   ↓
Programming fundamentals
   ↓
Backend
   ↓
Machine Learning
   ↓
Neural Networks
   ↓
Transformers
   ↓
LLMs
   ↓
RAG
   ↓
Agents
   ↓
Production AI systems

You're interested in understanding generated code line-by-line, including:

Python syntax
Classes
Objects
Functions
Imports
Files
Exceptions
Iterators
Generators
Decorators
Typing
Package management
Async/await
APIs
How different files connect
How backend systems communicate
How AI components communicate
How agent state flows through a system
6. Current Learning Direction

You're following a fairly deep technical path.

Python fundamentals

You're strengthening:

Syntax
Functions
Classes/objects
Modules/imports
Exceptions
File handling
Iterators/generators
Decorators
Type hints
Package management
Async/await
Backend fundamentals

You're learning:

HTTP
APIs
FastAPI
Async programming
Backend architecture
Service communication
ML/DL

You want to understand neural networks from scratch, including implementing them with NumPy.

You have also been working toward understanding:

Neurons
Weights
Biases
Forward propagation
Activation functions
Neural-network mathematics
Transformers
Attention
LLM architecture

You have specifically expressed interest in implementing a Transformer from scratch after studying Attention Is All You Need.

7. Major Projects
FITMAN

One of your larger planned projects.

Concept: AI-powered fitness and nutrition coach.

Planned stack
React
TypeScript
FastAPI
Supabase
Python
LangChain
LangGraph
RAG
MCP
Local LLMs
Gemma GGUF
Ollama
Planned capabilities
User onboarding
User profile
Workout generation
Nutrition logging
Progress tracking
Progress trends
AI coach chat
Persistent AI memory
Document/content upload
Retrieval-based context
Personalized recommendations
Architecture direction

You were thinking about an agent state similar to:

class CoachState(TypedDict, total=False):
    user_id: str
    message: str
    conversation_id: str
    intent: str

    profile: dict
    workout_context: dict
    nutrition_context: dict
    progress_context: dict

    memory_context: list
    document_context: list
    tool_results: list

    response: str
    messages: list

This reflects your interest in stateful agent architecture, rather than a simple chatbot.

8. RAG Agent

You've built/worked on a LangChain documentation RAG agent.

Technologies involved include:

LangChain
Chroma / Pinecone
Embedding models
Ollama
mxbai-embed-large
Tavily

The purpose was to build an agent capable of retrieving relevant technical documentation and using that context to answer questions.

9. LiveKit MCP Assistant

Another AI project you've worked on.

Stack
LiveKit
MCP
Streamlit
Pinecone
Hugging Face embeddings
Tavily
Groq

This project explored combining:

Voice / realtime interface
        ↓
AI reasoning
        ↓
Retrieval
        ↓
Tools
        ↓
Agent response

You spent roughly 20 hours working on this project.

10. Bangla Voice AI

You've also explored real-time / multilingual voice AI, particularly Bangla.

Technologies you've worked with/explored include:

Deepgram Nova-3
Cartesia Sonic-2
Whisper
Bangla speech recognition
Voice agents
Real-time AI

You tested Bangla Whisper performance, including a test where approximately 10 seconds of speech took around 8.33 seconds in one configuration.

This is relevant because it demonstrates interest in making AI systems work beyond English-centric applications.

11. AI Resume Analyzer & Matcher
GitHub: https://github.com/THENABILMAN/THENABILMAN_AI_Resume-Analyzer
Concept: LLM-powered semantic CV parsing, structured entity extraction, and job match scoring.
Stack: Python, LLMs, FastAPI, Streamlit, LangChain, NLP, PDF Parsing.
Architecture highlights:
- Engineered structured JSON entity extraction from complex multi-page PDF/DOCX resumes using constrained LLM schemas.
- Computed vector similarity and semantic match scores against target job specifications with gap analysis recommendations.
- Built interactive Streamlit dashboard for real-time candidate telemetry and ATS score breakdown.

12. Real-Time AI Voice Agent
GitHub: https://github.com/THENABILMAN/THENABILMAN_AI_Voice_Agent
Concept: Low-latency full-duplex conversational voice pipeline.
Stack: Python, Whisper STT, Neural TTS, WebSockets, FastAPI, Audio Streaming.
Architecture highlights:
- Streaming audio pipeline with Voice Activity Detection (VAD) for fluid turn-taking.
- Sub-second conversational response loops bridging STT, LLM inference, and TTS audio synthesis.
- Asynchronous WebSocket transport with jitter buffer optimization.

13. End-to-End Bangla AI Voice Agent
GitHub: https://github.com/THENABILMAN/THENABILMAN_End-to-End_Bangla_AI_voice-agent
Concept: Dedicated native Bengali speech recognition and speech synthesis pipeline.
Stack: Bengali NLP, Bangla STT, Bangla TTS, Python, PyTorch, FastAPI, Voice AI.
Architecture highlights:
- Native Bengali ASR models for accurate speech transcription in noisy audio feeds.
- Context-preserving prompt architectures to prevent script mixing and hallucination.
- Low-latency neural Bengali speech synthesis with natural acoustic prosody.

14. Local LLM / Hardware Work

You have experimented with running LLMs locally.

Your development machine:

Acer Predator Helios Neo 16
RTX 4050
6 GB VRAM
Intel i7 13th-generation HX
16 GB RAM
1 TB SSD

You've experimented with:

Ollama
Qwen models
GGUF models
CPU/GPU inference
Local coding assistants
Model memory requirements
Quantization

Examples you've worked with include:

qwen2.5-coder:7b
Qwen 3.5 9B GGUF Q4_K_M
Gemma GGUF
other local LLM experiments

This is useful context for your agent because it shows you are interested in running and understanding models locally, not only consuming cloud APIs.

12. AI Agent Architecture Interest

You are particularly interested in the relationship between systems such as:

FastAPI
   ↓
Backend/API layer

LangGraph
   ↓
Agent orchestration/state machine

LiveKit
   ↓
Realtime voice layer

LLM
   ↓
Reasoning/generation

RAG
   ↓
Knowledge retrieval

MCP
   ↓
Tool/context integration

Supabase / Database
   ↓
Persistent data

Frontend
   ↓
User interface

One of your current goals is understanding exactly how these pieces connect through code and files.

13. Developer Philosophy

Your desired identity is not:

"I know how to use ChatGPT."

It's closer to:

"I build and understand the systems behind AI applications."

You want to become capable of:

Building systems from scratch
Debugging without blindly relying on AI
Understanding existing codebases
Designing architectures
Building APIs
Building AI agents
Building RAG systems
Working with LLM internals
Optimizing models
Working with realtime systems
Deploying production systems
Eventually conducting AI research

You have also described yourself as wanting to become a hardcore programmer/developer.

14. Entrepreneurship

Your long-term career ambition isn't limited to getting a normal software job.

You have expressed interest in becoming:

Developer + AI Engineer + Researcher + Entrepreneur

You are interested in:

Building products
AI automation
Outsourcing/development services
High-income technical entrepreneurship
Creating your own AI products
Eventually combining engineering and research
15. Event / Leadership Experience

You have experience organizing gaming/tech events at NSU.

TechFest 2025 — FC25

You were involved in leading an FC25 tournament with approximately:

30+ volunteers
256 players
115+ institutions
25,000+ prize pool

You have also been involved with the NSU CEC and event organization.

This gives your portfolio another dimension:

Technical Engineering
+
AI
+
Leadership
+
Event Management
16. Tutoring / Teaching

You have around 2 years of tutoring experience.

Your preferred teaching methodology is structured:

Diagnostic
    ↓
Concept
    ↓
Example
    ↓
Guided Practice
    ↓
Independent Practice
    ↓
Hints
    ↓
Exam Practice
    ↓
Quiz / Homework

This demonstrates that you don't only like learning—you also have experience breaking concepts down for other people.

17. Your Approach to Learning

You consider yourself a fast learner and problem solver.

But you're also deliberately trying to avoid becoming someone who:

copies generated code without understanding it.

You frequently ask for explanations down to very small details, such as:

What does this keyword mean?
What does this variable contain?
Why is this function here?
How does this file connect to another?
What happens internally?
Why is this syntax necessary?
What happens when this function is called?
How does the data move through the system?

That's an important characteristic for your AI-agent persona.

18. Technologies You Have Mentioned

A consolidated technology list:

Languages

Python
C++
C
JavaScript
TypeScript

Backend

FastAPI
HTTP
APIs
Async Python

AI/ML

PyTorch
Hugging Face
NumPy
Neural Networks
Transformers
LLMs
NLP

LLM

Ollama
GGUF
Qwen
Gemma
Groq

Agent frameworks

LangChain
LangGraph
CrewAI
AutoGen
MCP

RAG

Pinecone
Chroma
Embeddings
mxbai-embed-large
Tavily

Realtime / Voice

LiveKit
Deepgram
Cartesia
Whisper

Backend/data

Supabase
Structured data pipelines
Data extraction
Data validation
Data normalization

Frontend

React
TypeScript
Streamlit

Developer tools

GitHub
Ollama
Claude Code
Google Antigravity
19. Your Portfolio Brand

Your GitHub identity is:

THENABILMAN

GitHub:

THENABILMAN on GitHub

The portfolio should therefore feel like a personal engineering brand, rather than a generic student portfolio.

A useful positioning would be:

Mohammad Ali Nabil — AI Engineer & Builder

or:

Nabil — AI Engineer building intelligent systems, agents, and automation.

20. What Your Portfolio AI Agent Should Know About You

The agent should be able to answer questions such as:

"Who is Nabil?"

Mohammad Ali Nabil is a Computer Science undergraduate at North South University in Bangladesh focused on AI engineering, LLM applications, RAG, autonomous agents, intelligent automation, backend engineering, and voice AI.

"What does Nabil specialize in?"

LLM-powered automation, RAG systems, AI agents, intelligent data workflows, structured extraction/validation, Python backends, and realtime voice AI.

"What projects has Nabil built?"

It should know about:

FITMAN
RAG documentation agent
LiveKit MCP Assistant
Bangla Voice AI
Local LLM experiments
"What technologies does he use?"

It should know the entire stack above.

"Does he have professional experience?"

Yes:

AI Engineer Intern, The Data Island, GenAI Team, November 2025–January 2026.

"What are his future goals?"
Become a stronger AI engineer
Deepen software engineering fundamentals
Understand AI systems from first principles
Build production-grade AI systems
Conduct AI research
Pursue graduate study, potentially in Germany
Explore quantum computing
Build AI products/businesses
21. Things the AI Agent Should NOT Say

This is very important.

Your portfolio agent should not invent:

Jobs you haven't held
Technologies you haven't used
Production deployments you haven't done
Clients you haven't worked with
Research papers you haven't published
Degrees you haven't completed
Awards you haven't received
Metrics you haven't actually measured
Skills you haven't demonstrated

If information isn't in its knowledge base, it should say something like:

"I don't have that information about Nabil yet."

rather than hallucinating.

22. Recommended Agent Persona

I'd make your portfolio agent behave like:

"Nabil's technical representative."

Not a generic chatbot.

Its job:

Visitor
   ↓
Portfolio AI Agent
   ↓
Understands Nabil's:
    ├── Background
    ├── Education
    ├── Experience
    ├── Projects
    ├── Skills
    ├── Architecture
    ├── Technical interests
    ├── Career goals
    └── Personality/professional philosophy
   ↓
Answers accurately

It should be:

Professional
Technically knowledgeable
Concise
Confident
Honest
Helpful
Slightly conversational
Never arrogant
Never fabricate information
23. Your "Story"

There's also a compelling narrative behind your portfolio:

CSE student → practical AI engineering → internships → LLM/RAG/agent systems → deeper software engineering → AI research → entrepreneurship.

The portfolio shouldn't present you as someone who already knows everything.

It should present you as:

A technically ambitious AI engineer who is actively going deeper—from using AI frameworks to understanding and building the underlying systems themselves.

That's actually a stronger story for where you are right now.