export type ClaimStatus =
  | "VERIFIED"
  | "BUILT"
  | "EXPERIMENTAL"
  | "LEARNING"
  | "PLANNED"
  | "ASPIRATIONAL"
  | "UNVERIFIED";

export type Confidence = "HIGH" | "MEDIUM" | "LOW" | "NONE";

export type ProjectCategoryKey = "agentic" | "voice" | "fullstack";

export interface TwinSource {
  source_id?: string;
  source_type?: string;
  title?: string;
  url?: string | null;
  section?: string;
  relevance?: number;
  source?: string;
  score?: number;
}

export interface TwinClaim {
  claim?: string;
  status?: string;
  confidence?: string;
  source_ids?: string[];
}

export interface TwinEntity {
  type: string | null;
  id: string | null;
}

export interface TwinResponse {
  answer: string;
  grounded: boolean;
  confidence: Confidence | string;
  sources: TwinSource[];
  claims: TwinClaim[];
  entity: TwinEntity | null;
  model: string;
}

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  detailedDescription: string;
  category: string;
  categoryKey: ProjectCategoryKey;
  status: string;
  statusType: "active" | "completed" | "prototype" | "experimental";
  featured: boolean;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  highlights: string[];
  architecture?: string[];
  pipelineFlow?: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  department?: string;
  period: string;
  location: string;
  status: string;
  summary: string;
  bullets: string[];
  skillsUsed: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface SkillItem {
  name: string;
  level: string;
  tag: string;
}

export interface SkillCategory {
  title: string;
  id: string;
  skills: SkillItem[];
}
