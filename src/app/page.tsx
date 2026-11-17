import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <main id="main" className="overflow-x-clip">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <SkillsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </>
  );
}
