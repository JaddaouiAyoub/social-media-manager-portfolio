import { processSteps } from "@/data/process";
import { iconMap } from "@/components/icons/icon-map";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-title" className="relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="process-title"
          align="center"
          eyebrow="How I Work"
          title={
            <>
              A clear process, <span className="text-gradient">step by step</span>
            </>
          }
          description="Every collaboration follows the same simple cycle, so you always know what happens next."
        />

        <ol className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* connecting line (desktop) */}
          <span
            className="pointer-events-none absolute top-8 right-[12%] left-[12%] hidden h-px bg-[linear-gradient(90deg,transparent,var(--primary),var(--magenta),transparent)] opacity-50 lg:block"
            aria-hidden="true"
          />
          {processSteps.map((step, index) => {
            const Icon = iconMap[step.icon];
            return (
              <Reveal as="li" key={step.title} delay={index * 0.1} className="group relative">
                <div className="flex flex-col items-center text-center">
                  <span className="relative grid size-16 place-items-center rounded-2xl border border-line bg-surface text-primary card-shadow transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-brand-gradient group-hover:text-on-primary">
                    <Icon className="size-6" aria-hidden="true" />
                    <span className="absolute -top-2 -right-2 grid size-7 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-on-primary ring-4 ring-bg">
                      {index + 1}
                    </span>
                  </span>
                  <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-muted">{step.description}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
