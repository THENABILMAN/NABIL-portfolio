import type { Project } from "@/types/portfolio";

type Status = Project["statusType"] | "BUILT" | "VERIFIED" | "EXPERIMENTAL" | "LEARNING" | "UNVERIFIED";

/** One mark per evidence level, so status reads the same everywhere on the page. */
const STYLE: Record<Status, { glyph: string; className: string }> = {
  active: { glyph: "●", className: "text-crimson" },
  completed: { glyph: "■", className: "text-ink-2" },
  prototype: { glyph: "◆", className: "text-cyan" },
  experimental: { glyph: "◇", className: "text-cyan" },
  BUILT: { glyph: "■", className: "text-ink-2" },
  VERIFIED: { glyph: "■", className: "text-ink-2" },
  EXPERIMENTAL: { glyph: "◇", className: "text-cyan" },
  LEARNING: { glyph: "○", className: "text-muted" },
  UNVERIFIED: { glyph: "○", className: "text-muted" },
};

export function StatusMark({ status, label }: { status: Status; label: string }) {
  const s = STYLE[status] ?? STYLE.completed;
  return (
    <span className={`inline-flex items-center gap-2 whitespace-nowrap font-mono text-[12px] ${s.className}`}>
      <span aria-hidden="true" className="text-[10px]">
        {s.glyph}
      </span>
      {label}
    </span>
  );
}
