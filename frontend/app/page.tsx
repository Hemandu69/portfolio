import ClientChrome from "@/components/ui/ClientChrome";
import FloatingNav from "@/components/navigation/FloatingNav";
import Hero from "@/components/hero/Hero";
import Identity from "@/components/scenes/Identity";
import WhatIBuild from "@/components/scenes/WhatIBuild";
import ProjectsIntro from "@/components/projects/ProjectsIntro";
import ProjectScene from "@/components/projects/ProjectScene";
import TechIndex from "@/components/scenes/TechIndex";
import Experience from "@/components/scenes/Experience";
import Currently from "@/components/scenes/Currently";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/ui/Footer";
import { projects } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <ClientChrome />
      <FloatingNav />
      <main>
        <Hero />
        <Identity />
        <WhatIBuild />
        <ProjectsIntro />
        {projects.map((p, i) => (
          <ProjectScene key={p.id} project={p} flip={i % 2 === 1} />
        ))}
        <TechIndex />
        <Experience />
        <Currently />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
