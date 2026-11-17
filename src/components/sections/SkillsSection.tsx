import { skills, tools } from "@/data/skills";
import { iconMap } from "@/components/icons/icon-map";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative scroll-mt-24 py-16 sm:py-20">
      <div className="container-page">
        <Reveal className="noise relative overflow-hidden rounded-[2.2rem] border border-line bg-[linear-gradient(135deg,color-mix(in_oklab,var(--primary)_14%,var(--surface)),var(--surface)_60%)] p-6 card-shadow sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/25 blur-3xl" aria-hidden="true" />
          <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="flex flex-col items-start gap-5">
              <Eyebrow>My Skills</Eyebrow>
              <h2 id="skills-title" className="font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
                The toolkit behind <span className="text-gradient">every campaign</span>
              </h2>
              <p className="text-base leading-relaxed text-muted">
                A balanced mix of creative and analytical skills to plan, produce and improve social media content.
              </p>
            </div>

            <div>
              <ul className="grid gap-3 sm:grid-cols-2" aria-label="Skills">
                {skills.map((skill, index) => {
                  const Icon = iconMap[skill.icon];
                  return (
                    <Reveal
                      as="li"
                      key={skill.name}
                      delay={index * 0.05}
                      className="group glass flex min-h-16 items-center gap-3 rounded-2xl px-4 py-3 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/40"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-gradient text-on-primary transition-transform duration-300 group-hover:rotate-6">
                        <Icon className="size-[1.1rem]" aria-hidden="true" />
                      </span>
                      <span className="font-medium">{skill.name}</span>
                    </Reveal>
                  );
                })}
              </ul>

              {tools.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold tracking-[0.14em] text-subtle uppercase">Tools</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <li key={tool} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
