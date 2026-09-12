# System Architecture & Tech Stack

## 1. Tech Stack Overview

| Layer | Technology Selected |
| :--- | :--- |
| **Framework** | Next.js 14+ (App Router) or React + Vite |
| **Styling** | Tailwind CSS + Shadcn UI |
| **Animations** | Framer Motion + Lucide React (Icons) |
| **Deployment** | Vercel or Netlify |
| **Form Handling** | React Hook Form + Zod (Validation) |
| **AI Integration (Optional)** | Vercel AI SDK + Groq / OpenAI API |

## 2. Directory Structure

```text
portfolio/
├── public/
│   ├── resume.pdf
│   └── project-previews/
├── src/
│   ├── components/
│   │   ├── ui/               # Reusable base components (Shadcn)
│   │   ├── hero.tsx          # Hero section with interactive elements
│   │   ├── about.tsx         # Experience & Education
│   │   ├── projects.tsx      # Project grid & detail modals
│   │   ├── skills.tsx        # Interactive skill badges
│   │   ├── ai-widget.tsx     # Custom AI Assistant Chatbot
│   │   └── contact.tsx       # Contact form & footer
│   ├── data/
│   │   ├── portfolioData.ts  # Centralized resume JSON data
│   │   └── projectsData.ts   # Detailed project metadata
│   ├── lib/
│   │   └── utils.ts          # Helper utilities
│   └── app/                  # Next.js Pages / Routes
├── prd.md
├── architecture.md
├── rules.md
├── phases.md
└── design.md