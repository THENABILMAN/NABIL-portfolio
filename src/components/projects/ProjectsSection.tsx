"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { projectGroups, projects } from "@/lib/canonical";
import { StatusMark } from "@/components/StatusMark";
import type { Project } from "@/types/portfolio";

function ProjectLinks({ project }: { project: Project }) {
  const demo = project.demoUrl && project.demoUrl !== project.githubUrl ? project.demoUrl : undefined;
  if (!demo && !project.githubUrl) {
    return <p className="font-mono text-[12px] text-muted">Source not public</p>;
  }
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {demo && (
        <a href={demo} target="_blank" rel="noreferrer" className="btn-primary">
          Open the {project.title} demo
        </a>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-ghost">
          See the code on GitHub
        </a>
      )}
    </div>
  );
}

function Limitations({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="label">Limitations</p>
      <ul className="mt-2 space-y-1.5">
        {items.map((l) => (
          <li key={l} className="flex gap-3 text-[14px] leading-relaxed text-ink-2">
            <span className="mt-[9px] h-px w-3 shrink-0 bg-crimson" aria-hidden="true" />
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Pipeline({ steps }: { steps: string[] }) {
  // The rail fills with the scroll: it starts when the list enters the lower part of
  // the screen and is full when the list's end reaches the middle. Each step lights
  // up as the fill passes it, and goes dark again when scrolling back up.
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] });
  const [reached, setReached] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduce) setReached(Math.round(v * (steps.length - 1)) + (v > 0.02 ? 1 : 0));
  });

  return (
    <div className="relative rounded-[4px] border border-line-strong bg-surface p-6 sm:p-8">
      <p className="label">Request path</p>
      <ol ref={ref} className="relative mt-6">
        {/* The rail, and the fill that the scroll draws down it. */}
        <span className="absolute bottom-8 left-[11px] top-8 w-px bg-line-strong" aria-hidden="true">
          <motion.span
            className="absolute inset-0 block origin-top bg-crimson"
            style={{ scaleY: reduce ? 1 : scrollYProgress }}
          />
        </span>
        {steps.map((step, i) => {
          const lit = reduce || i < reached;
          return (
            <li key={step} className="relative flex h-16 items-center gap-5">
              <span
                className={`relative z-10 flex h-[23px] w-[23px] shrink-0 items-center justify-center rounded-full border bg-surface font-mono text-[10px] transition-colors duration-300 ${
                  lit ? "border-crimson text-crimson" : "border-line-strong text-muted"
                }`}
              >
                {i + 1}
              </span>
              <span className={`font-mono text-[14px] transition-colors duration-300 ${lit ? "text-ink" : "text-ink-2"}`}>
                {step}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Featured({ project }: { project: Project }) {
  return (
    <article id={`project-${project.id}`} className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-7">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <h3 className="font-mono text-[32px] font-medium tracking-tight text-ink sm:text-[44px]">{project.title}</h3>
          <StatusMark status={project.statusType} label={project.status} />
        </div>
        <p className="mt-3 max-w-[56ch] text-[17px] leading-relaxed text-ink">{project.subtitle}</p>
        {project.goal && <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-ink-2">{project.goal}</p>}

        <p className="mt-8 label">Nabil&apos;s part</p>
        <p className="mt-2 max-w-[60ch] text-[14px] leading-relaxed text-ink-2">{project.contribution}</p>

        <div className="mt-8">
          <Limitations items={project.limitations} />
        </div>

        <p className="mt-8 font-mono text-[12px] text-muted">{project.techStack.join("  ·  ")}</p>
        <div className="mt-6">
          <ProjectLinks project={project} />
        </div>
      </div>

      <div className="lg:col-span-5">{project.pipelineFlow && project.pipelineFlow.length > 1 && <Pipeline steps={project.pipelineFlow} />}</div>
    </article>
  );
}

function Row({ project, open, onToggle }: { project: Project; open: boolean; onToggle: () => void }) {
  const panelId = `project-panel-${project.id}`;
  return (
    <li id={`project-${project.id}`} className="border-b border-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="group grid min-h-[64px] w-full grid-cols-[1fr_auto_20px] items-center gap-4 py-4 text-left transition-colors hover:bg-raised/60 md:grid-cols-[minmax(0,4fr)_minmax(0,6fr)_160px_20px] md:gap-8"
      >
        <span className="font-mono text-[15px] text-ink transition-transform duration-200 group-hover:translate-x-1">
          {project.title}
        </span>
        <span className="hidden text-[14px] text-ink-2 md:block">{project.subtitle}</span>
        <StatusMark status={project.statusType} label={project.status} />
        <ChevronDown
          className={`h-4 w-4 text-muted transition-transform duration-200 ${open ? "rotate-180 text-ink" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div id={panelId} className="grid grid-cols-1 gap-8 pb-8 pt-2 md:grid-cols-[minmax(0,4fr)_minmax(0,6fr)_180px] md:gap-8">
          <div className="space-y-5">
            <p className="text-[14px] text-ink-2 md:hidden">{project.subtitle}</p>
            <p className="font-mono text-[12px] leading-relaxed text-muted">{project.techStack.join("  ·  ")}</p>
            <ProjectLinks project={project} />
          </div>
          <div className="space-y-6">
            {project.description && (
              <div>
                <p className="label">Problem</p>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{project.description}</p>
              </div>
            )}
            {project.contribution && (
              <div>
                <p className="label">Nabil&apos;s part</p>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{project.contribution}</p>
              </div>
            )}
            {project.pipelineFlow && project.pipelineFlow.length > 1 && (
              <div>
                <p className="label">How it works</p>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{project.pipelineFlow.join(" → ")}</p>
              </div>
            )}
            <Limitations items={project.limitations} />
          </div>
        </div>
      )}
    </li>
  );
}

const featured = projects.find((p) => p.featured);
const rest = projects.filter((p) => !p.featured);

export default function ProjectsSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  // A hero link to a project row opens that row.
  useEffect(() => {
    const sync = () => {
      const id = window.location.hash.replace(/^#project-/, "");
      if (id && rest.some((p) => p.id === id)) setOpenId(id);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <section id="projects" className="section">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="h2 lg:col-span-7">Projects, labelled by what the evidence shows</h2>
          <p className="text-base leading-relaxed text-ink-2 lg:col-span-5">
            Completed, prototype, experimental or in development: each status comes from the knowledge base, with the
            limits written down beside it.
          </p>
        </div>

        {featured && <Featured project={featured} />}

        {projectGroups.map((g) => (
          <div key={g.key} className="mt-16">
            <h3 className="flex items-baseline justify-between border-b border-line-strong pb-3 font-mono text-[16px] font-medium text-ink">
              {g.title}
              <span className="text-[12px] tabular-nums text-muted">{g.projects.length}</span>
            </h3>
            <ul>
              {g.projects.map((p) => (
                <Row key={p.id} project={p} open={openId === p.id} onToggle={() => setOpenId(openId === p.id ? null : p.id)} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
