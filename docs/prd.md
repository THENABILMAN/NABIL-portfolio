> Historical planning document. Current behavior is described in `docs/architecture.md`.

# Product Requirements Document (PRD) - AI Engineer Portfolio

## 1. Project Overview
A modern, dynamic, high-performance portfolio website for **Mohammad Ali Nabil**, an AI Engineer specializing in LLM automation, autonomous agents, RAG systems, and voice AI. The goal is to highlight technical capabilities, showcase AI projects with interactive elements (or rich media previews), and provide a seamless contact/resume download experience.

## 2. Target Audience
- Tech Recruiters & Talent Acquisition Specialists
- Engineering Managers & AI Leads
- Open-Source Collaborators & Potential Clients

## 3. Core Features & Functional Requirements

### 3.1 Hero & Branding Section
- Interactive terminal or futuristic AI header highlighting Nabil’s headline: **AI Engineer | Agentic Systems, RAG & LLM Workflows**.
- Quick action buttons: `[ View Projects ]`, `[ Download Resume ]`, `[ Contact Me ]`.
- Dynamic status indicator (e.g., "🟢 Open to AI Engineering Opportunities").

### 3.2 About & Experience Timeline
- **Summary**: Concise overview focusing on LLM workflows, autonomous agents, and voice AI.
- **Interactive Experience Timeline**: Highlight work at *The Data Island* (AI Engineer Intern) and education at *North South University*.

### 3.3 Featured Projects Showcase
- **FITMAN**: Full-Stack AI Fitness & Nutrition Platform (React, FastAPI, LangGraph, Supabase).
- **End-to-End AI Agent System**: Multi-step reasoning, memory, RAG.
- **LiveKit MCP AI Assistant**: Real-time voice/multi-client assistant with vector DB.
- **Bangla AI Voice Agent**: STT/LLM/TTS pipeline.
- **RAG Documentation Agent & AI Vision Agent**.
- *Features per project card*: Tech stack tags, interactive demo/video modal, GitHub repo link, key accomplishments bullet points.

### 3.4 Tech Stack & Skills Matrix
- **Categories**: Programming (Python, C++, Java), AI/ML (LLMs, RAG, MCP, LangGraph), Web/Backend (FastAPI, React, Supabase), Data & Tools (Pinecone, PyTorch, Git).
- Filterable or interactive visual pills.

### 3.5 Contact & AI Quick-Chat (Optional / Vibe Feature)
- Clean Contact Form (EmailJS or Web3Forms integration).
- Direct links: GitHub (`@THENABILMAN`), Email (`thenabilman@gmail.com`), Phone.
- *Optional Vibe Feature*: A lightweight AI Chatbot Widget embedded in the corner pre-trained/prompted on Nabil's resume to answer recruiter questions.

## 4. Non-Functional Requirements
- **Performance**: Lighthouse score > 90 across Performance, Accessibility, and SEO.
- **Responsive**: Flawless experience on Mobile, Tablet, and Desktop.
- **Animations**: Smooth micro-interactions (framer-motion) without lag.