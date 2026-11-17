"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

/**
 * Dark / light switch. Renders as a pill with a sliding knob; exposed to
 * assistive technologies as a switch with an explicit label.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={mounted ? isDark : undefined}
      aria-label="Dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      className={cn(
        "glass relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:border-primary/50 min-[400px]:w-[4.5rem] min-[400px]:justify-between min-[400px]:px-2.5",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-1 left-1 hidden size-9 rounded-full min-[400px]:block bg-brand-gradient shadow-[0_6px_18px_-6px_var(--glow-strong)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
          isDark ? "translate-x-[1.75rem]" : "translate-x-0",
        )}
      />
      {/* Compact variant (very small screens): a single icon for the current theme. */}
      <span aria-hidden="true" className="text-fg min-[400px]:hidden">
        {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
      </span>
      <Sun aria-hidden="true" className={cn("relative hidden size-4 transition-colors min-[400px]:block", !isDark && "text-on-primary")} />
      <Moon aria-hidden="true" className={cn("relative hidden size-4 transition-colors min-[400px]:block", isDark && "text-on-primary")} />
    </button>
  );
}
