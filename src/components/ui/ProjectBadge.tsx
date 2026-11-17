import { FlaskConical, BadgeCheck } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Makes it explicit whether a project is a concept or real client work. */
export function ProjectBadge({ kind, className }: { kind: Project["kind"]; className?: string }) {
  const isConcept = kind === "concept";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur-md",
        className,
      )}
      title={isConcept ? "Self-initiated concept project, not client work" : "Client project"}
    >
      {isConcept ? <FlaskConical className="size-3.5" aria-hidden="true" /> : <BadgeCheck className="size-3.5" aria-hidden="true" />}
      {isConcept ? "Concept project" : "Client project"}
    </span>
  );
}
