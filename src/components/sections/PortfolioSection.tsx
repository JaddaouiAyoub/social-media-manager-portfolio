import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PortfolioGrid } from "./PortfolioGrid";

export function PortfolioSection() {
  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="relative py-20 sm:py-28">
      <div
        className="pointer-events-none absolute bottom-0 left-1/4 -z-10 size-[32rem] rounded-full bg-primary/10 blur-[140px]"
        aria-hidden="true"
      />
      <div className="container-page">
        <SectionHeading
          id="portfolio-title"
          eyebrow="Portfolio"
          title={
            <>
              Selected <span className="text-gradient">work & concepts</span>
            </>
          }
          description="A selection of projects showing how I think and work. Concept projects are clearly labelled: they are self-initiated demonstrations, not client results."
        />
        <Reveal delay={0.1}>
          <PortfolioGrid />
        </Reveal>
      </div>
    </section>
  );
}
