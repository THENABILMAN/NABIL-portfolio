import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import WireframeGrid from "@/components/ui/WireframeGrid";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammad Ali Nabil | AI Engineer — Agentic Systems, RAG & LLM Workflows",
  description:
    "Portfolio of Mohammad Ali Nabil, AI Engineer specializing in autonomous agents, RAG pipelines, LLM APIs, and scalable Python backends.",
  keywords: [
    "AI Engineer",
    "LLM",
    "RAG Systems",
    "LangGraph",
    "FastAPI",
    "Mohammad Ali Nabil",
    "Autonomous Agents",
    "Python",
    "MCP Protocol",
    "Dhaka Bangladesh",
  ],
  authors: [{ name: "Mohammad Ali Nabil", url: "https://github.com/THENABILMAN" }],
  openGraph: {
    title: "Mohammad Ali Nabil | AI Engineer — Agentic Systems, RAG & LLM Workflows",
    description:
      "Portfolio of Mohammad Ali Nabil, AI Engineer specializing in autonomous agents, RAG pipelines, LLM APIs, and scalable Python backends.",
    type: "website",
    locale: "en_US",
    siteName: "Mohammad Ali Nabil Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Ali Nabil | AI Engineer",
    description: "Architecting Autonomous AI Agents & RAG Workflows.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <body className="relative isolate bg-black text-white antialiased min-h-screen flex flex-col font-sans">
        <LenisProvider>
          <WireframeGrid />
          <div className="relative z-10 bg-transparent">{children}</div>
        </LenisProvider>
      </body>
    </html>
  );
}
