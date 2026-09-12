"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/resumeData";
import {
  X,
  Github,
  ExternalLink,
  CheckCircle2,
  Brain,
  Layers,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-3xl rounded-card border border-zinc-800 p-6 sm:p-8 bg-black z-10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto text-white"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#9a9a9a] hover:text-white transition-colors"
            aria-label="Close Project Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="mb-6 pr-8">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs font-mono font-semibold uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-xs font-mono text-zinc-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                {project.status}
              </span>
              {project.featured && (
                <span className="px-3 py-1 rounded-full bg-white text-black text-[11px] font-mono flex items-center gap-1 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-black" /> Featured Project
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight font-mono text-white mb-1">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm font-mono text-zinc-300">
              {project.subtitle} ({project.period})
            </p>
          </div>

          {/* Detailed Overview */}
          <div className="mb-6 text-xs sm:text-sm text-[#bdbdbd] font-extralight leading-relaxed bg-white/[0.02] p-4 sm:p-5 rounded-xl border border-white/10">
            <h4 className="font-mono text-xs font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-white" /> Project Overview &amp; Objective
            </h4>
            <p>{project.detailedDescription}</p>
          </div>

          {/* Key Accomplishments */}
          <div className="mb-6">
            <h4 className="font-mono text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" /> Key Engineering Accomplishments
            </h4>
            <div className="space-y-2">
              {project.highlights.map((bullet, idx) => (
                <div
                  key={idx}
                  className="text-xs font-mono text-[#bdbdbd] flex items-start gap-2.5 bg-white/[0.02] p-3 rounded-xl border border-white/5"
                >
                  <span className="text-white font-bold mt-0.5">▶</span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Architecture Breakdown */}
          {project.architecture && (
            <div className="mb-6">
              <h4 className="font-mono text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Brain className="w-4 h-4 text-white" /> System Architecture Layers
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.architecture.map((layer, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-zinc-700 text-xs font-mono text-white flex items-center gap-2"
                  >
                    <Layers className="w-4 h-4 text-white shrink-0" />
                    <span>{layer}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Complete Tech Stack Pills */}
          <div className="mb-8">
            <h4 className="font-mono text-xs font-semibold text-[#9a9a9a] uppercase tracking-wider mb-3">
              Technologies &amp; Frameworks Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#9a9a9a]"
                >
                  #{tech}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Footer Link Buttons */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all border border-white/10"
            >
              <Github className="w-4 h-4" /> GitHub Repository
            </a>

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-black transition-all duration-300 ease-out hover:bg-zinc-200"
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
