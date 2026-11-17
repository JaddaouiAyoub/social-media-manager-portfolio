"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Project } from "@/data/projects";
import { ProjectCover } from "@/components/visuals/ProjectCover";
import { buttonClasses } from "./Button";
import { ProjectBadge } from "./ProjectBadge";
import { ProjectDetails } from "./ProjectDetails";

/**
 * Quick-view modal built on the native <dialog> element, which provides
 * focus trapping, Escape to close and an inert background for free.
 */
export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!project && dialog.open) dialog.close();
  }, [project]);

  return (
    <dialog
      ref={dialogRef}
      onClose={() => {
        document.body.style.overflow = "";
        onClose();
      }}
      onClick={(event) => {
        // Click on the backdrop (outside the panel) closes the dialog.
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      aria-labelledby="project-modal-title"
      className="m-auto max-h-[min(92dvh,56rem)] w-[min(100%-2rem,52rem)] overflow-hidden rounded-[2rem] border border-line bg-surface p-0 text-fg shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-[dialog-in_.45s_cubic-bezier(.22,1,.36,1)]"
    >
      {project && (
        <div className="max-h-[min(92dvh,56rem)] overflow-y-auto">
          <div className="relative">
            <ProjectCover project={project} className="aspect-[16/7]" />
            <div className="absolute top-4 left-4">
              <ProjectBadge kind={project.kind} />
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close project details"
              className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-black/50 text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-black/70"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <div className="p-6 sm:p-10">
            <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">{project.category}</p>
            <h2 id="project-modal-title" className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {project.title}
            </h2>
            <div className="mt-6">
              <ProjectDetails project={project} />
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={`/projects/${project.slug}`} className={buttonClasses()} onClick={() => dialogRef.current?.close()}>
                Open project page
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="/#contact" className={buttonClasses({ variant: "secondary" })} onClick={() => dialogRef.current?.close()}>
                Discuss a similar project
              </Link>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
