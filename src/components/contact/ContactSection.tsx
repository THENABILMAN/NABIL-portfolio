"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { resumeData } from "@/data/resumeData";
import {
  Mail,
  Github,
  FileDown,
  ArrowUp,
  Copy,
  Linkedin,
  Instagram,
  Check,
  Clock,
  MapPin,
  ExternalLink,
  Phone,
} from "lucide-react";

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [localTime, setLocalTime] = useState<string>("");

  // Live Dhaka Time Clock (UTC+6)
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date());
        setLocalTime(timeStr);
      } catch {
        setLocalTime("UTC+06:00");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(resumeData.personalInfo.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(resumeData.personalInfo.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2200);
    } catch {
      setCopiedPhone(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="py-24 relative bg-black border-t border-[#1a1a1f] text-white">
      {/* Subtle Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_40%_at_50%_-20%,rgba(128,0,32,0.12),rgba(0,0,0,0))]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2A1E1A] bg-[#0c0c0e] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-[#a1a1aa]">
              <span className="h-2 w-2 rounded-full bg-[#800020] animate-pulse" />
              <Mail className="w-3.5 h-3.5 text-[#ff4d6d]" />
              <span>CONTACT //</span>
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl font-mono">
              Get in Touch<span className="text-[#800020]">.</span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm md:text-base text-[#a1a1aa] leading-relaxed">
              {resumeData.personalInfo.availability}. Reach out through any of the channels below.
            </p>
          </motion.div>
        </div>

        {/* 4 Primary Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Direct Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, borderColor: "#ff4d6d", boxShadow: "0 12px 30px -10px rgba(128,0,32,0.35)" }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="group flex flex-col justify-between rounded-2xl border border-[#23232a] bg-[#09090c] p-6 transition-colors duration-300 hover:bg-[#0e0e13]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#71717a]">
                  01 // EMAIL
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#800020]/15 border border-[#800020]/30 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#ff4d6d]" />
                </div>
              </div>

              <div>
                <h3 className="font-mono text-base font-semibold text-white">Direct Email</h3>
                <p className="mt-1 text-xs text-[#a1a1aa] leading-relaxed">
                  Best for engineering inquiries, role proposals, and technical discussions.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#111116] border border-[#22222b]">
                <p className="font-mono text-xs text-white truncate">
                  {resumeData.personalInfo.email}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-black transition-all hover:bg-[#e4e4e7] cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={`mailto:${resumeData.personalInfo.email}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#2A1E1A] bg-[#141419] px-3 py-2 text-xs font-medium text-white transition-all hover:border-[#800020] hover:bg-[#1a1417]"
              >
                <span>Mailer</span>
                <ExternalLink className="w-3 h-3 text-[#ff4d6d]" />
              </motion.a>
            </div>
          </motion.div>

          {/* Card 2: Phone & WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, borderColor: "#22c55e", boxShadow: "0 12px 30px -10px rgba(34,197,94,0.25)" }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="group flex flex-col justify-between rounded-2xl border border-[#23232a] bg-[#09090c] p-6 transition-colors duration-300 hover:bg-[#0e0e13]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#71717a]">
                  02 // PHONE
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-[#22c55e]" />
                </div>
              </div>

              <div>
                <h3 className="font-mono text-base font-semibold text-white">Direct Phone</h3>
                <p className="mt-1 text-xs text-[#a1a1aa] leading-relaxed">
                  Available for phone calls, WhatsApp syncs, and direct conversations.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#111116] border border-[#22222b]">
                <p className="font-mono text-xs text-white">
                  {resumeData.personalInfo.phone}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={handleCopyPhone}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-black transition-all hover:bg-[#e4e4e7] cursor-pointer"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={`tel:${resumeData.personalInfo.phone}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#2A1E1A] bg-[#141419] px-3 py-2 text-xs font-medium text-white transition-all hover:border-[#800020] hover:bg-[#1a1417]"
              >
                <span>Call</span>
                <ExternalLink className="w-3 h-3 text-[#22c55e]" />
              </motion.a>
            </div>
          </motion.div>

          {/* Card 3: Location & Timezone Telemetry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, borderColor: "#38bdf8", boxShadow: "0 12px 30px -10px rgba(56,189,248,0.25)" }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="group flex flex-col justify-between rounded-2xl border border-[#23232a] bg-[#09090c] p-6 transition-colors duration-300 hover:bg-[#0e0e13]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#71717a]">
                  03 // AVAILABILITY
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/20 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[#38bdf8]" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-white font-mono text-base font-semibold">
                  <MapPin className="w-4 h-4 text-[#ff4d6d]" />
                  <span>{resumeData.personalInfo.location}</span>
                </div>
                <p className="mt-1 text-xs text-[#a1a1aa] leading-relaxed">
                  Active in Asia/Dhaka timezone with international availability.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#111116] border border-[#22222b] flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#71717a]">LOCAL TIME:</span>
                <span className="font-mono text-xs font-semibold text-[#38bdf8] tabular-nums">
                  {localTime || "—"}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between px-3 py-2 rounded-xl bg-[#141419] border border-[#22222b] text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#22c55e]">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                Open to Roles
              </span>
              <span className="text-[#a1a1aa]">{resumeData.personalInfo.availability}</span>
            </div>
          </motion.div>

          {/* Card 4: Resume & Verified Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, borderColor: "#eab308", boxShadow: "0 12px 30px -10px rgba(234,179,8,0.25)" }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="group flex flex-col justify-between rounded-2xl border border-[#23232a] bg-[#09090c] p-6 transition-colors duration-300 hover:bg-[#0e0e13]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#71717a]">
                  04 // CREDENTIALS
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#eab308]/10 border border-[#eab308]/20 flex items-center justify-center">
                  <FileDown className="w-4 h-4 text-[#eab308]" />
                </div>
              </div>

              <div>
                <h3 className="font-mono text-base font-semibold text-white">Full Resume</h3>
                <p className="mt-1 text-xs text-[#a1a1aa] leading-relaxed">
                  Download the latest verified CV detailing full project history and architectures.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#111116] border border-[#22222b] flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#71717a]">FORMAT:</span>
                <span className="font-mono text-xs text-white">PDF Document</span>
              </div>
            </div>

            <div className="mt-6">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={resumeData.personalInfo.resumeUrl}
                download="Mohammad_Ali_Nabil_Resume.pdf"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-black transition-all hover:bg-[#e4e4e7] cursor-pointer font-mono uppercase tracking-wider"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Download CV (PDF)</span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Verified Social & Code Networks Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mt-6 rounded-2xl border border-[#23232a] bg-[#09090c] p-5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#a1a1aa]">
              Verified Networks & Profiles
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href={resumeData.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#22222b] bg-[#111116] px-4 py-2 text-xs font-mono text-white transition-all hover:border-[#ff4d6d]/40 hover:bg-[#15151c]"
            >
              <Github className="w-3.5 h-3.5 text-[#a1a1aa]" />
              <span>GitHub</span>
              <span className="text-[10px] text-[#71717a]">@THENABILMAN ↗</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href={resumeData.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#22222b] bg-[#111116] px-4 py-2 text-xs font-mono text-white transition-all hover:border-[#38bdf8]/40 hover:bg-[#15151c]"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>LinkedIn</span>
              <span className="text-[10px] text-[#71717a]">Profile ↗</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href={resumeData.personalInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#22222b] bg-[#111116] px-4 py-2 text-xs font-mono text-white transition-all hover:border-[#f43f5e]/40 hover:bg-[#15151c]"
            >
              <Instagram className="w-3.5 h-3.5 text-[#f43f5e]" />
              <span>Instagram</span>
              <span className="text-[10px] text-[#71717a]">@thenabilman ↗</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom Footer Bar */}
        <div className="mt-16 pt-8 border-t border-[#1a1a1f] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#71717a]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
            <span>&copy; {new Date().getFullYear()} Mohammad Ali Nabil. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={resumeData.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {resumeData.personalInfo.githubUsername} ↗
            </a>
            <span>•</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#a1a1aa] hover:text-white transition-colors uppercase tracking-wider font-semibold cursor-pointer"
            >
              Back to top <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
