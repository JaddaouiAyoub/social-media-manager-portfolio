"use client";

import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/** Scrolls back to the top (instantly with reduced motion) and clears the URL hash. */
export function scrollToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  history.replaceState(null, "", window.location.pathname);
}

export function BackToTopButton({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg",
        className,
      )}
    >
      <span className="glass grid size-11 place-items-center rounded-full transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:text-primary">
        <ArrowUp className="size-4" aria-hidden="true" />
      </span>
      {!compact && <span aria-hidden="true">Back to top</span>}
    </button>
  );
}
