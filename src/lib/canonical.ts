import canonical from "@/data/canonical.json";
import type {
  Education,
  Experience,
  Project,
  ProjectCategoryKey,
  SkillCategory,
} from "@/types/portfolio";

type CanonicalProject = (typeof canonical.projects)[number];

const HIDDEN_FROM_SHOWCASE = new Set(["portfolio-digital-twin"]);

const CATEGORY: Record<string, { label: string; key: ProjectCategoryKey }> = {
  fitman: { label: "Full-Stack & Multi-Agent", key: "fullstack" },
  "autonomous-agent-system": { label: "Agentic & RAG", key: "agentic" },
  "rag-agent": { label: "Agentic & RAG", key: "agentic" },
  "resume-analyzer": { label: "Agentic & NLP", key: "agentic" },
  "realtime-voice-agent": { label: "Voice & Real-Time", key: "voice" },
  "bangla-voice-agent": { label: "Voice & Bengali NLP", key: "voice" },
  "livekit-mcp-assistant": { label: "Voice & Real-Time", key: "voice" },
  "vision-ocr": { label: "Computer Vision", key: "voice" },
};

function asText(value: unknown): string {
  if (Array.isArray(value)) return value.filter(Boolean).join(" ");
  if (typeof value === "string") return value.trim();
  return "";
}

function optionalUrl(value: unknown): string | undefined {
  return typeof value === "string" && value.startsWith("http") ? value : undefined;
}

function statusDisplay(status: string): { label: string; type: Project["statusType"] } {
  switch (status) {
    case "active_development":
      return { label: "Active development", type: "active" };
    case "experimental":
      return { label: "Experimental", type: "experimental" };
    case "prototype":
      return { label: "Active prototype", type: "prototype" };
    case "completed":
      return { label: "Completed", type: "completed" };
    default:
      return { label: status.replaceAll("_", " "), type: "completed" };
  }
}

function mapProject(p: CanonicalProject): Project {
  const cat = CATEGORY[p.id] ?? { label: "Project", key: "agentic" as const };
  const st = statusDisplay(p.status);
  const limitations = asText(p.limitations);
  const architectureText = asText(p.architecture);
  const flowSource =
    typeof p.data_flow === "string" && p.data_flow.includes("→")
      ? p.data_flow
      : architectureText.includes("→")
        ? architectureText.split("\n")[0]
        : "";
  const pipeline = flowSource
    ? flowSource
        .split("→")
        .map((s) => s.trim().replace(/\.$/, ""))
        .filter((s) => s.length > 0 && s.length < 80)
    : undefined;

  return {
    id: p.id,
    title: p.name,
    subtitle: p.one_line,
    period: "Documented in portfolio knowledge",
    description: p.one_line,
    detailedDescription: [p.nabil_contribution, p.architecture, limitations]
      .map((s) => asText(s))
      .filter(Boolean)
      .join("\n\n"),
    category: cat.label,
    categoryKey: cat.key,
    status: st.label,
    statusType: st.type,
    featured: p.id === "fitman",
    techStack: p.technologies ?? [],
    githubUrl: optionalUrl(p.github),
    demoUrl: optionalUrl(p.demo),
    highlights: [
      ...asText(p.nabil_contribution)
        .split(/(?<=\.)\s+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 24)
        .slice(0, 4),
      limitations ? `Limitation: ${limitations}` : "",
    ].filter(Boolean),
    architecture: p.architecture ? [asText(p.architecture)] : undefined,
    pipelineFlow: pipeline,
  };
}

export const person = canonical.person;
export const educationRaw = canonical.education;
export const academicInterests = Array.isArray(educationRaw.academic_interests)
  ? educationRaw.academic_interests.filter((item): item is string => typeof item === "string")
  : [];
export const experienceRaw = canonical.experience;
export const skillsRaw = canonical.skills;

export const personalInfo = {
  name: person.name,
  headline: person.headline,
  location: person.location,
  email: person.email,
  phone: person.phone,
  linkedin: person.linkedin,
  github: person.github,
  instagram: person.instagram,
  githubUsername: `@${person.brand}`,
  bookingUrl: person.booking_url,
  resumeUrl: person.links.resume,
  availability: person.availability,
  summary: person.summary.trim(),
};

export const education: Education = {
  degree: educationRaw.degree,
  institution: educationRaw.institution,
  period:
    typeof educationRaw.period === "string" && educationRaw.period.toLowerCase().includes("not independently")
      ? "Undergraduate"
      : educationRaw.period,
  location: educationRaw.location,
  highlights: educationRaw.highlights,
};

export const experience: Experience[] = experienceRaw.map((exp) => ({
  id: exp.id,
  role: exp.role,
  company: exp.company,
  department: "team" in exp && typeof exp.team === "string" ? `${exp.team} Team` : undefined,
  period: exp.period,
  location: exp.location,
  status: typeof exp.status === "string" ? exp.status.replaceAll("_", " ") : "documented",
  summary: exp.summary.trim(),
  bullets: exp.responsibilities,
  skillsUsed: exp.technologies,
}));

export const projects: Project[] = canonical.projects
  .filter((p) => !HIDDEN_FROM_SHOWCASE.has(p.id))
  .map(mapProject)
  .sort((a, b) => Number(b.featured) - Number(a.featured));

export const skillCategories: SkillCategory[] = [
  {
    title: "Built / demonstrated",
    id: "built",
    skills: skillsRaw
      .filter((s) => s.status === "BUILT" || s.status === "VERIFIED")
      .map((s) => ({ name: s.name, level: s.level, tag: s.status })),
  },
  {
    title: "Experimental",
    id: "experimental",
    skills: skillsRaw
      .filter((s) => s.status === "EXPERIMENTAL")
      .map((s) => ({ name: s.name, level: s.level, tag: s.status })),
  },
  {
    title: "Learning / unverified",
    id: "learning",
    skills: skillsRaw
      .filter((s) => s.status === "LEARNING" || s.status === "UNVERIFIED")
      .map((s) => ({ name: s.name, level: s.level, tag: s.status })),
  },
];

export const impactMetrics = [
  {
    label: "Canonical entities",
    value: String(canonical.projects.length + canonical.experience.length + 2),
    description: "Person, education, experience, and projects in knowledge YAML",
  },
  {
    label: "Documented internship",
    value: "1",
    description: `${experience[0]?.role ?? "Intern"}, ${experience[0]?.company ?? ""}`,
  },
  {
    label: "Projects catalogued",
    value: String(projects.length),
    description: "Statuses: built, experimental, prototype, or active development",
  },
  {
    label: "Answer policy",
    value: "Grounded",
    description: "Refuse when the knowledge base has no evidence",
  },
];

export const cliCommands = {
  help: "Available commands:\n  skills      List documented skills by evidence status\n  projects    Show catalogued projects\n  experience  Internship and education\n  contact     Public contact channels\n  clear       Clear terminal",
  bio: `${personalInfo.name} — ${personalInfo.headline}\n${personalInfo.location}`,
  skills: skillCategories
    .map((c) => `${c.title}: ${c.skills.map((s) => `${s.name} [${s.level}]`).join(", ")}`)
    .join("\n"),
  projects: projects.map((p) => `- ${p.title} [${p.status}]: ${p.description}`).join("\n"),
  experience: experience
    .map(
      (e) =>
        `${e.role} @ ${e.company} (${e.period})\n${e.bullets.map((b) => `• ${b}`).join("\n")}`
    )
    .join("\n\n") + `\nEducation: ${education.degree} @ ${education.institution} (${education.period})`,
  contact: `Email: ${personalInfo.email}\nPhone: ${personalInfo.phone}\nGitHub: ${personalInfo.github}\nLinkedIn: ${personalInfo.linkedin}`,
};
