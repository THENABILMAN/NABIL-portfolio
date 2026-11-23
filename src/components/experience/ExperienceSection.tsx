import { experience } from "@/lib/canonical";

function List({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="label">{label}</p>
      <ul className="mt-3 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <li key={item} className="py-2.5 text-[15px] leading-relaxed text-ink-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <h2 className="h2">Experience</h2>
        {experience.map((exp) => (
          <article key={exp.id} className="mt-14 grid grid-cols-1 gap-8 border-t border-line-strong pt-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-[12px] tabular-nums text-crimson">{exp.period}</p>
              <h3 className="mt-3 font-mono text-[22px] font-medium leading-snug tracking-tight text-ink sm:text-[26px]">
                {exp.role}
              </h3>
              <p className="mt-1 text-[15px] text-ink-2">
                {exp.company}, {exp.department}
              </p>
              <p className="mt-1 text-[14px] text-muted">{exp.location}</p>
              <p className="mt-6 font-mono text-[12px] leading-relaxed text-muted">{exp.skillsUsed.join("  ·  ")}</p>
            </div>
            <div className="space-y-7 lg:col-span-8">
              <p className="max-w-[60ch] text-[16px] leading-relaxed text-ink">{exp.summary}</p>
              <List label="Responsibilities" items={exp.bullets} />
              <List label="What it taught" items={exp.lessons} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
