import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TerminalWidget from "@/components/terminal/TerminalWidget";
import ExperienceSection from "@/components/experience/ExperienceSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import TechnicalKnowledgeGraph from "@/components/skills/TechnicalKnowledgeGraph";
import ContactSection from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-[#000000] text-[#ffffff] flex flex-col selection:bg-white selection:text-black">
      {/* Glassmorphic Navigation Header */}
      <Navbar />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Execute nabil-cli Interactive Shell */}
      <TerminalWidget />

      {/* 3. Experience & Education Timeline */}
      <ExperienceSection />

      {/* 4. Featured Systems & Applications */}
      <ProjectsSection />

      {/* 5. Technical Knowledge Graph (All 7 Phases) */}
      <TechnicalKnowledgeGraph />

      {/* 6. Contact Form & Footer */}
      <ContactSection />
    </main>
  );
}
