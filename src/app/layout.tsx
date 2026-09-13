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
  title: "Mohammad Ali Nabil | AI Engineer — RAG, FastAPI & LLM workflows",
  description:
    "Portfolio of Mohammad Ali Nabil: RAG systems, FastAPI backends, documented agents, and an evidence-grounded digital twin.",
  keywords: [
    "AI Engineer",
    "LLM",
    "RAG Systems",
    "LangGraph",
    "FastAPI",
    "Mohammad Ali Nabil",
    "Python",
    "Dhaka Bangladesh",
  ],
  authors: [{ name: "Mohammad Ali Nabil", url: "https://github.com/THENABILMAN" }],
  openGraph: {
    title: "Mohammad Ali Nabil | AI Engineer — RAG, FastAPI & LLM workflows",
    description:
      "Portfolio of Mohammad Ali Nabil: RAG systems, FastAPI backends, documented agents, and an evidence-grounded digital twin.",
    type: "website",
    locale: "en_US",
    siteName: "Mohammad Ali Nabil Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Ali Nabil | AI Engineer",
    description: "RAG systems, FastAPI backends, and an evidence-grounded portfolio digital twin.",
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <LenisProvider>
          <WireframeGrid />
          <div className="relative z-10 bg-transparent">{children}</div>
        </LenisProvider>
      </body>
    </html>
  );
}
