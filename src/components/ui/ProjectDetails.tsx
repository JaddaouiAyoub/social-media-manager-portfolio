import { ArrowUpRight, CheckCircle2, Info } from "lucide-react";
import type { Project } from "@/data/projects";
import { socialLinks } from "@/data/socials";
import { BrandIcon } from "@/components/icons/BrandIcon";

/** Project content shared by the quick-view modal and the project page. */
export function ProjectDetails({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const platformLabel = (platform: string) => socialLinks.find((s) => s.platform === platform)?.label ?? platform;

  return (
    <div className="flex flex-col gap-8">
      {project.kind === "concept" && (
        <p className="flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary-soft p-4 text-sm leading-relaxed text-fg">
          <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          This is a self-initiated concept created to illustrate the approach. It is not client work and does not
          report real results.
        </p>
      )}

      <p className="text-base leading-relaxed text-pretty text-muted sm:text-lg">{project.description}</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Heading className="font-display text-sm font-semibold tracking-[0.14em] text-subtle uppercase">Deliverables</Heading>
          <ul className="mt-3 flex flex-col gap-2">
            {project.deliverables.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[0.95rem]">
                <CheckCircle2 className="size-4 shrink-0 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Heading className="font-display text-sm font-semibold tracking-[0.14em] text-subtle uppercase">Platforms</Heading>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.platforms.map((platform) => (
              <li key={platform} className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm">
                <BrandIcon platform={platform} className="size-3.5 text-primary" />
                {platformLabel(platform)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <Heading className="font-display text-sm font-semibold tracking-[0.14em] text-subtle uppercase">Approach</Heading>
        <ol className="mt-3 flex flex-col gap-3">
          {project.approach.map((step, index) => (
            <li key={step} className="flex gap-3 text-[0.95rem] leading-relaxed">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-on-primary">
                {index + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {project.link && (
        <a
          href={project.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 self-start font-semibold text-primary hover:underline"
        >
          {project.link.label}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
