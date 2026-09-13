import type { Project, SkillCategory } from "@/types/portfolio";
import {
  cliCommands,
  education,
  experience,
  impactMetrics,
  personalInfo,
  projects,
  skillCategories,
} from "@/lib/canonical";

export type { Project, SkillCategory } from "@/types/portfolio";
export type { Experience, Education } from "@/types/portfolio";

export const resumeData = {
  personalInfo,
  impactMetrics,
  experience,
  education,
  projects,
  skillCategories: skillCategories as SkillCategory[],
  cliCommands,
};

export type ResumeProject = Project;
