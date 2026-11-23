"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { personalInfo } from "@/lib/canonical";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Foundations", href: "#foundations" },
  { name: "Agent", href: "#agent" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open ? "border-line bg-black/90 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <a
          href="#main-content"
          className="font-mono text-[14px] text-ink"
          aria-label={`${personalInfo.name}, back to top`}
        >
          <span className="text-crimson">~/</span>nabil
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="link font-mono text-[13px] text-ink-2 hover:text-ink">
              {link.name}
            </a>
          ))}
          <a href={`mailto:${personalInfo.email}`} className="btn-primary min-h-[36px] px-4 text-[12px]">
            Email Nabil
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="fixed inset-x-0 bottom-0 top-16 flex flex-col overflow-y-auto border-t border-line bg-black px-4 pb-8 pt-6 lg:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex min-h-[56px] items-center border-b border-line font-mono text-[22px] text-ink"
            >
              {link.name}
            </a>
          ))}
          <a
            href={`mailto:${personalInfo.email}`}
            onClick={() => setOpen(false)}
            className="btn-primary mt-auto w-full"
          >
            Email Nabil
          </a>
        </nav>
      )}
    </header>
  );
}
