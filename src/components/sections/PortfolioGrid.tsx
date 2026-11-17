"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import { projectCategories, projects, type Project, type ProjectCategory } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { cn, easeOut } from "@/lib/utils";

type Filter = "All" | ProjectCategory;

/** Filterable project grid + quick-view modal. */
export function PortfolioGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  // Only offer filters for categories that actually contain projects.
  const filters: Filter[] = ["All", ...projectCategories.filter((c) => projects.some((p) => p.category === c))];
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  if (projects.length === 0) {
    return (
      <p className="glass mt-14 rounded-3xl p-10 text-center text-muted">
        New projects are being prepared and will be published here soon.
      </p>
    );
  }

  return (
    <>
      <LayoutGroup>
        <div role="group" aria-label="Filter projects by category" className="mt-12 flex flex-wrap gap-2">
          {filters.map((item) => {
            const active = filter === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={active}
                className={cn(
                  "relative min-h-11 rounded-full px-5 text-sm font-medium transition-colors duration-300",
                  active ? "text-on-primary" : "glass text-muted hover:text-fg",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="portfolio-filter"
                    className="absolute inset-0 rounded-full bg-brand-gradient"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative">{item}</span>
              </button>
            );
          })}
        </div>

        <motion.ul layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <motion.li
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: easeOut }}
              >
                <ProjectCard project={project} onOpen={setSelected} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
