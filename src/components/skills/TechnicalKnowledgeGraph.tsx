/* eslint-disable @next/next/no-img-element */
import { skillGroups } from "@/lib/canonical";
import type { SkillItem } from "@/types/portfolio";

function Logo({ skill }: { skill: SkillItem }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] border border-line bg-raised">
      {skill.icon ? (
        <img
          src={skill.icon.src}
          alt=""
          width={20}
          height={20}
          loading="lazy"
          className={`h-5 w-5 object-contain ${skill.icon.ink ? "ic-ink" : ""}`}
        />
      ) : (
        <span className="font-mono text-[11px] text-muted" aria-hidden="true">
          {skill.name.slice(0, 2)}
        </span>
      )}
    </span>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="h2 lg:col-span-7">Tools and technologies</h2>
          <p className="text-base leading-relaxed text-ink-2 lg:col-span-5">
            Grouped by domain, from tools used in projects to ones still being learned. Ask the agent for the evidence
            behind any of them.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <div key={g.title}>
              <h3 className="border-b border-line-strong pb-3 font-mono text-[14px] font-medium text-ink">{g.title}</h3>
              <ul>
                {g.skills.map((skill) => (
                  <li
                    key={skill.id}
                    title={skill.usedIn.length ? `Used in ${skill.usedIn.join(", ")}` : undefined}
                    className="flex min-h-[56px] items-center gap-4 border-b border-line py-2"
                  >
                    <Logo skill={skill} />
                    <span className="min-w-0 flex-1 text-[14px] text-ink">{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
