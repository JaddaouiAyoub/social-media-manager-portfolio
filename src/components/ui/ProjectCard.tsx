import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectCover } from "@/components/visuals/ProjectCover";
import { ProjectBadge } from "./ProjectBadge";

/** Clickable project card. `onOpen` opens the quick-view modal. */
export function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface/70 transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_24px_60px_-24px_var(--glow-strong)]">
      <div className="relative">
        <ProjectCover project={project} className="aspect-[16/11]" />
        <div className="absolute top-4 left-4 flex gap-2">
          <ProjectBadge kind={project.kind} />
        </div>
        <span
          className="absolute top-4 right-4 grid size-10 translate-y-2 place-items-center rounded-full bg-white/90 text-black opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
          aria-hidden="true"
        >
          <ArrowUpRight className="size-5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">{project.category}</p>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
          {/* The whole card is clickable through this button's pseudo-element. */}
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="text-left after:absolute after:inset-0 after:rounded-[var(--radius-card)] after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-primary"
            aria-haspopup="dialog"
          >
            {project.title}
          </button>
        </h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{project.summary}</p>
      </div>
    </article>
  );
}
