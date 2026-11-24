import canonical from "@/data/canonical.json";
import type {
  Education,
  Experience,
  Project,
  ProjectCategoryKey,
  SkillCategory,
  SkillItem,
} from "@/types/portfolio";

type CanonicalProject = (typeof canonical.projects)[number];

/** Resume order; projects not listed keep their place after these. */
const SHOWCASE_ORDER = ["medimatch-ai", "texttosql", "fitman", "jarvis", "rag-agent"];
const rank = (id: string) => (SHOWCASE_ORDER.indexOf(id) + 1 || SHOWCASE_ORDER.length + 1);

const HIDDEN_FROM_SHOWCASE = new Set(["portfolio-digital-twin"]);

const CATEGORY: Record<string, { label: string; key: ProjectCategoryKey }> = {
  "medimatch-ai": { label: "Full-Stack & Agents", key: "fullstack" },
  texttosql: { label: "Agentic & NLP", key: "agentic" },
  jarvis: { label: "Voice & Real-Time", key: "voice" },
  "livekit-vision-agent": { label: "Computer Vision", key: "vision" },
  fitman: { label: "Full-Stack & Multi-Agent", key: "fullstack" },
  "autonomous-agent-system": { label: "Agentic & RAG", key: "agentic" },
  "rag-agent": { label: "Agentic & RAG", key: "agentic" },
  "resume-analyzer": { label: "Agentic & NLP", key: "agentic" },
  "realtime-voice-agent": { label: "Voice & Real-Time", key: "voice" },
  "bangla-voice-agent": { label: "Voice & Bengali NLP", key: "voice" },
  "livekit-mcp-assistant": { label: "Agentic & RAG", key: "agentic" },
  "vision-ocr": { label: "Computer Vision", key: "vision" },
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
  const cat = CATEGORY[p.id] ?? ("category" in p && p.category === "foundations" ? { label: "ML foundations", key: "foundations" as const } : undefined) ?? { label: "Project", key: "agentic" as const };
  const st = statusDisplay(p.status);
  const limitations = asText(p.limitations);
  const architectureText = asText(p.architecture);
  // Only the first sentence is the flow; later sentences are commentary.
  const flowSource =
    typeof p.data_flow === "string" && p.data_flow.includes("→")
      ? p.data_flow
      : architectureText.includes("→")
        ? architectureText.split(/(?<=\.)\s/)[0]
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
    description: asText(p.problem),
    category: cat.label,
    categoryKey: cat.key,
    status: st.label,
    statusType: st.type,
    featured: p.id === "medimatch-ai",
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
    pipelineFlow: pipeline,
    goal: asText(p.goal),
    contribution: asText(p.nabil_contribution),
    limitations: Array.isArray(p.limitations)
      ? p.limitations.filter((l): l is string => typeof l === "string")
      : limitations
        ? [limitations]
        : [],
    results: asText(p.results).startsWith("Not documented") ? "" : asText(p.results),
  };
}

const person = canonical.person;
const educationRaw = canonical.education;
const experienceRaw = canonical.experience;
const skillsRaw = canonical.skills;

export const academicInterests = educationRaw.academic_interests;

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
  resumeUrl: person.links.resume,
  availability: person.availability,
  summary: person.summary.trim(),
};

export const education: Education = {
  degree: educationRaw.degree,
  institution: educationRaw.institution,
  period: educationRaw.period,
  location: educationRaw.location,
  highlights: educationRaw.highlights,
};

export const experience: Experience[] = experienceRaw.map((exp) => ({
  id: exp.id,
  role: exp.role,
  company: exp.company,
  department: `${exp.team} Team`,
  period: exp.period,
  location: exp.location,
  status: exp.status.replaceAll("_", " "),
  summary: exp.summary.trim(),
  bullets: exp.responsibilities,
  skillsUsed: exp.technologies,
  lessons: exp.lessons_learned ?? [],
}));

export const projects: Project[] = canonical.projects
  .filter((p) => !HIDDEN_FROM_SHOWCASE.has(p.id))
  .map(mapProject)
  .sort((a, b) => rank(a.id) - rank(b.id));

/** Showcase order of the project groups; an empty group is not rendered. */
export const projectGroups = (
  [
    { key: "fullstack", title: "Full-stack AI products" },
    { key: "agentic", title: "Agents and RAG" },
    { key: "voice", title: "Voice and real-time" },
    { key: "vision", title: "Computer vision" },
    { key: "foundations", title: "Machine learning foundations" },
  ] as const
)
  .map((g) => ({ ...g, projects: projects.filter((p) => p.categoryKey === g.key && !p.featured) }))
  .filter((g) => g.projects.length > 0);

export const foundations = canonical.foundations;

/** Readable names for the ids the knowledge base cites as skill evidence. */
const EVIDENCE_NAME: Record<string, string> = Object.fromEntries([
  ...canonical.projects.map((p) => [p.id, p.name] as const),
  ...experienceRaw.map((e) => [e.id, `${e.company} internship`] as const),
  ["portfolio-digital-twin", "this site"],
]);

/** Skill id → logo file in public/icons (fetched by the taste skill's icons.mjs). */
const SKILL_ICON: Record<string, { src: string; ink?: boolean }> = {
  python: { src: "/icons/python.svg" },
  fastapi: { src: "/icons/fastapi.svg" },
  typescript: { src: "/icons/typescript.svg" },
  react: { src: "/icons/react.svg" },
  nextjs: { src: "/icons/nextjs.svg" },
  langchain: { src: "/icons/langchain.svg", ink: true },
  pinecone: { src: "/icons/pinecone.svg", ink: true },
  chroma: { src: "/icons/chroma.svg" },
  livekit: { src: "/icons/livekit.svg" },
  pytorch: { src: "/icons/pytorch.svg" },
  supabase: { src: "/icons/supabase.svg" },
  opencv: { src: "/icons/opencv.svg" },
  groq: { src: "/icons/groq.svg" },
  docker: { src: "/icons/docker.svg" },
  ollama: { src: "/icons/ollama.svg", ink: true },
  java: { src: "/icons/java.svg" },
  cpp: { src: "/icons/c-plusplus.svg" },
};

function iconFor(id: string, name: string): SkillItem["icon"] {
  const key = id.toLowerCase();
  if (SKILL_ICON[key]) return SKILL_ICON[key];
  const n = name.toLowerCase();
  if (n.startsWith("next")) return SKILL_ICON.nextjs;
  if (n.includes("supabase")) return SKILL_ICON.supabase;
  if (n.includes("opencv")) return SKILL_ICON.opencv;
  if (n.includes("ollama")) return SKILL_ICON.ollama;
  if (n.includes("selenium")) return { src: "/icons/selenium.svg" };
  if (n.includes("hugging face")) return { src: "/icons/hugging-face.svg" };
  if (n === "c++") return SKILL_ICON.cpp;
  if (n === "java") return SKILL_ICON.java;
  return undefined;
}

function toSkill(s: (typeof skillsRaw)[number]): SkillItem {
  const evidence = Array.isArray(s.evidence) ? (s.evidence as unknown[]) : [];
  return {
    id: s.id,
    name: s.name,
    level: s.level,
    tag: s.status,
    group: s.group,
    usedIn: evidence
      .filter((e): e is string => typeof e === "string")
      .map((e) => EVIDENCE_NAME[e] ?? e),
    icon: iconFor(s.id, s.name),
  };
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Built",
    id: "built",
    skills: skillsRaw.filter((s) => s.status === "BUILT" || s.status === "VERIFIED").map(toSkill),
  },
  {
    title: "Experimental",
    id: "experimental",
    skills: skillsRaw.filter((s) => s.status === "EXPERIMENTAL").map(toSkill),
  },
  {
    title: "Learning",
    id: "learning",
    skills: skillsRaw.filter((s) => s.status === "LEARNING").map(toSkill),
  },
  {
    title: "Unverified",
    id: "unverified",
    skills: skillsRaw.filter((s) => s.status === "UNVERIFIED").map(toSkill),
  },
];

/** The same skills by domain, strongest evidence first inside each. */
const TAG_ORDER = ["VERIFIED", "BUILT", "EXPERIMENTAL", "LEARNING", "UNVERIFIED"];
export const skillGroups = [...new Set(skillsRaw.map((s) => s.group))].map((title) => ({
  title,
  skills: skillsRaw
    .filter((s) => s.group === title)
    .map(toSkill)
    .sort((a, b) => TAG_ORDER.indexOf(a.tag) - TAG_ORDER.indexOf(b.tag)),
}));

export const cliCommands = {
  help: [
    "Available commands:",
    "  whoami         Who Nabil is",
    "  skills         Documented skills by evidence status",
    "  projects       Catalogued projects",
    "  experience     Internship and education",
    "  contact        Public contact channels",
    "  system --info  How this digital twin works",
    "  run-agent      Walk through one answer, step by step",
    "  clear          Clear the terminal",
  ].join("\n"),
  bio: `${personalInfo.name}, ${personalInfo.headline}\n${personalInfo.location}`,
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
