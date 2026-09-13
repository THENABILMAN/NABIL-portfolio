"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Menu, X, Send } from "lucide-react";
import { resumeData } from "@/data/resumeData";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const name = resumeData.personalInfo.name;

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "CLI TERMINAL", href: "#terminal" },
    { name: "EXPERIENCE", href: "#experience" },
    { name: "PROJECTS", href: "#projects" },
    { name: "KNOWLEDGE GRAPH", href: "#skills" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 py-3.5 border-b border-white/10 backdrop-blur-xl shadow-2xl" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <a href="#main-content" className="flex items-center gap-2.5 group min-w-0">
          <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center transition-all duration-300 ease-out group-hover:border-zinc-500 shrink-0">
            <Cpu className="w-4 h-4 text-white transition-transform duration-300 ease-out group-hover:scale-110" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-mono font-normal tracking-wider text-sm sm:text-base text-white flex items-center gap-1.5 truncate">
              {name}
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />
            </span>
            <span className="font-mono text-[10px] text-[#9a9a9a] uppercase tracking-widest truncate">
              AI Engineer
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-black/60 border border-white/10 rounded-full px-2 lg:px-4 py-1.5 backdrop-blur-md" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-2 lg:px-3.5 py-1 text-[10px] lg:text-xs font-semibold tracking-wider text-[#9a9a9a] hover:text-white rounded-full transition-all whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 lg:px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black transition-all duration-300 ease-out hover:bg-zinc-200"
          >
            <span>Let&apos;s Connect</span>
            <Send className="w-3.5 h-3.5 text-black" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-black border border-white/10 text-[#9a9a9a] hover:text-white"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-b border-white/10 backdrop-blur-xl px-4 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-xs font-mono tracking-wider text-[#9a9a9a] hover:text-white hover:bg-white/5 transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-black transition-all duration-300 ease-out hover:bg-zinc-200"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
