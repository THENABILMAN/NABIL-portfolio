import { academicInterests, education, personalInfo } from "@/lib/canonical";

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <h2 className="h2">About me</h2>
        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="max-w-[58ch] text-[18px] leading-relaxed text-ink sm:text-[20px]">{personalInfo.summary}</p>
            <p className="label mt-10">Academic interests</p>
            <p className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-ink-2">{academicInterests.join(", ")}</p>
          </div>
          <article className="border-t border-line-strong pt-6 lg:col-span-5">
            <p className="font-mono text-[12px] tabular-nums text-crimson">{education.period}</p>
            <h3 className="mt-3 font-mono text-[22px] font-medium leading-snug tracking-tight text-ink">{education.institution}</h3>
            <p className="mt-1 text-[15px] text-ink-2">{education.degree}</p>
            <p className="mt-1 text-[14px] text-muted">{education.location}</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {education.highlights.map((item) => (
                <li key={item} className="py-2.5 text-[15px] leading-relaxed text-ink-2">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
