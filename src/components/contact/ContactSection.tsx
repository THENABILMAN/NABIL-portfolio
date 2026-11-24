"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { personalInfo } from "@/lib/canonical";

/** Dhaka time to the minute; isolated so its tick re-renders nothing else. */
function DhakaTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit" });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 15_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time || "--:--"}</span>;
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          setTimeout(() => setDone(false), 2000);
        } catch {
          setDone(false);
        }
      }}
      className="btn-ghost"
      aria-label={`Copy ${label}`}
    >
      {done ? <Check className="h-3.5 w-3.5 text-cyan" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
      {done ? "Copied" : `Copy ${label}`}
    </button>
  );
}

const PROFILES = [
  { name: "GitHub", handle: "THENABILMAN", href: personalInfo.github },
  { name: "LinkedIn", handle: "mohammadalinabil", href: personalInfo.linkedin },
  { name: "Instagram", handle: "thenabilman", href: personalInfo.instagram },
];

export default function ContactSection() {
  return (
    <footer id="contact" className="border-t border-line pt-24 sm:pt-28">
      <div className="wrap">
        <h2 className="h2">Get in touch</h2>
        <p className="lede">{personalInfo.availability}. Email works best for opportunities and collaborations.</p>

        <a
          href={`mailto:${personalInfo.email}`}
          className="link mt-12 inline-block break-all font-mono text-[30px] font-medium leading-tight tracking-tight text-ink hover:text-crimson sm:text-[52px] lg:text-[76px]"
        >
          {personalInfo.email}
        </a>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CopyButton value={personalInfo.email} label="email" />
          <a href={personalInfo.resumeUrl} download="Mohammad_Ali_Nabil_Resume.pdf" className="btn-ghost">
            Download the resume
          </a>
        </div>

        <dl className="mt-20 grid grid-cols-1 border-t border-line-strong sm:grid-cols-2 lg:grid-cols-4">
          {PROFILES.map((p) => (
            <div key={p.name} className="border-b border-line py-5 lg:border-b-0 lg:pr-6">
              <dt className="label">{p.name}</dt>
              <dd className="mt-2">
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="link font-mono text-[14px] text-ink">
                  {p.handle}
                </a>
              </dd>
            </div>
          ))}
          <div className="border-b border-line py-5 lg:border-b-0">
            <dt className="label">Phone and local time</dt>
            <dd className="mt-2 font-mono text-[14px] text-ink">
              <a href={`tel:${personalInfo.phone}`} className="link">
                {personalInfo.phone}
              </a>
              <span className="ml-3 text-muted">
                Dhaka <DhakaTime />
              </span>
            </dd>
          </div>
        </dl>

        <div className="mt-16 flex flex-col gap-2 border-t border-line py-8 font-mono text-[12px] text-muted sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {personalInfo.name}</span>
          <span>Product names and logos are trademarks of their owners.</span>
        </div>
      </div>
    </footer>
  );
}
