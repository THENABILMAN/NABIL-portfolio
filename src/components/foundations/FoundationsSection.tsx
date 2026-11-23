import { ChevronDown } from "lucide-react";
import { foundations } from "@/lib/canonical";

export default function FoundationsSection() {
  return (
    <section id="foundations" className="section">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="h2 lg:col-span-7">Mathematics and machine learning foundations</h2>
          <p className="text-base leading-relaxed text-ink-2 lg:col-span-5">
            Self-study, reported by Nabil and kept apart from professional experience. The projects built along the way
            are listed under machine learning foundations.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 items-start gap-x-8 border-t border-line-strong lg:grid-cols-2">
          {foundations.areas.map((area) => (
            <details key={area.id} className="group border-b border-line">
              <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 py-4 transition-colors hover:bg-raised/60 [&::-webkit-details-marker]:hidden">
                <h3 className="font-mono text-[15px] text-ink">{area.name}</h3>
                <span className="flex items-center gap-4 font-mono text-[12px] tabular-nums text-muted">
                  {area.topics.length} topics
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                </span>
              </summary>
              <ul className="grid grid-cols-1 gap-x-6 gap-y-2 pb-6 sm:grid-cols-2">
                {area.topics.map((t) => (
                  <li key={t} className="text-[14px] leading-relaxed text-ink-2">
                    {t}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
