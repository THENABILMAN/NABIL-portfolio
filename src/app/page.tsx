import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/about/AboutSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import TechnicalKnowledgeGraph from "@/components/skills/TechnicalKnowledgeGraph";
import ProjectsSection from "@/components/projects/ProjectsSection";
import FoundationsSection from "@/components/foundations/FoundationsSection";
import TerminalWidget from "@/components/terminal/TerminalWidget";
import ContactSection from "@/components/contact/ContactSection";
import ScrollProgress from "@/components/motion/ScrollProgress";
import ScrollGlow from "@/components/motion/ScrollGlow";
import CursorDot from "@/components/motion/CursorDot";
import Scrub from "@/components/motion/Scrub";
import { getPublicRepoCount } from "@/lib/github";

export default async function Home() {
  const publicRepos = await getPublicRepoCount();
  return (
    <div className="relative isolate">
      <ScrollGlow />
      <CursorDot />
      <ScrollProgress />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex flex-col outline-none">
        <Hero publicRepos={publicRepos} />
        <Scrub>
          <AboutSection />
        </Scrub>
        <Scrub>
          <ExperienceSection />
        </Scrub>
        <Scrub>
          <TechnicalKnowledgeGraph />
        </Scrub>
        <Scrub>
          <ProjectsSection />
        </Scrub>
        <Scrub>
          <FoundationsSection />
        </Scrub>
        <Scrub>
          <TerminalWidget />
        </Scrub>
      </main>
      <Scrub distance={32}>
        <ContactSection />
      </Scrub>
    </div>
  );
}
