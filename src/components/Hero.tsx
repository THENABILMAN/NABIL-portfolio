"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { education, experience, foundations, personalInfo, projects, skillGroups } from "@/lib/canonical";

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const record = [
  { value: projects.length, label: "projects documented" },
  { value: skillGroups.reduce((n, g) => n + g.skills.length, 0), label: "tools and skills listed" },
  { value: foundations.areas.length, label: "foundation areas studied" },
];

export default function Hero({ publicRepos }: { publicRepos: number | null }) {
  const stats = publicRepos === null ? record : [...record, { value: publicRepos, label: "public GitHub repositories" }];
  const intern = experience[0];
  const internEnd = intern?.period.split(/[–-]/).pop()?.trim();

  // As the hero scrolls away, the text drifts up and fades, and the record
  // trails it a little slower, so the two columns separate with the scroll.
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const listY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center pb-16 pt-28 sm:pt-32">
      <div className="wrap grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
        <motion.div className="lg:col-span-7" style={reduce ? undefined : { y: textY, opacity: fade }}>
          <motion.p {...enter(0)} className="font-mono text-[13px] text-ink-2">
            {personalInfo.name}
            <span className="mx-2 text-line-strong">/</span>
            {personalInfo.location}
          </motion.p>

          <motion.h1
            {...enter(0.06)}
            className="mt-6 max-w-[18ch] font-mono text-[40px] font-medium leading-[1.04] tracking-tight text-ink sm:text-[60px] lg:text-[68px]"
          >
            AI engineer for RAG systems and Python backends
          </motion.h1>

          <motion.p {...enter(0.14)} className="mt-7 max-w-[52ch] text-[17px] leading-relaxed text-ink-2">
            Computer science undergraduate at {education.institution}.
            {intern && internEnd
              ? ` Until ${internEnd}, ${intern.role} on the ${intern.department?.replace(/ Team$/, "")} team at ${intern.company}.`
              : ""}{" "}
            Builds LLM automation, retrieval pipelines and FastAPI services.
          </motion.p>

          <motion.div {...enter(0.22)} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={`mailto:${personalInfo.email}`} className="btn-primary">
              Email Nabil
            </a>
            <a href="#projects" className="btn-ghost">
              View projects
            </a>
            <a href={personalInfo.resumeUrl} download="Mohammad_Ali_Nabil_Resume.pdf" className="btn-ghost">
              Download the resume
            </a>
          </motion.div>

          <motion.p {...enter(0.3)} className="mt-8 flex items-center gap-2.5 font-mono text-[12px] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson" aria-hidden="true" />
            {personalInfo.availability}
          </motion.p>
        </motion.div>

        <motion.div className="lg:col-span-5 lg:self-center lg:pl-6" style={reduce ? undefined : { y: listY, opacity: fade }}>
          <motion.dl {...enter(0.2)} className="grid grid-cols-2 border-t border-line-strong lg:grid-cols-1">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-1 border-b border-line py-4 lg:flex-row-reverse lg:items-baseline lg:justify-between">
                <dt className="font-mono text-[12px] text-ink-2">{s.label}</dt>
                <dd className="font-mono text-[32px] font-medium tabular-nums leading-none text-ink">{s.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
