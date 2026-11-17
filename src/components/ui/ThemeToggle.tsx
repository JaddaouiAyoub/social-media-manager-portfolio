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
        "glass relative inline-flex h-11 w-[4.5rem] shrink-0 items-center justify-between rounded-full px-2.5 text-muted transition-colors hover:border-primary/50",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-1 left-1 size-9 rounded-full bg-brand-gradient shadow-[0_6px_18px_-6px_var(--glow-strong)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
          isDark ? "translate-x-[1.75rem]" : "translate-x-0",
        )}
      />
      <Sun aria-hidden="true" className={cn("relative size-4 transition-colors", !isDark && "text-on-primary")} />
      <Moon aria-hidden="true" className={cn("relative size-4 transition-colors", isDark && "text-on-primary")} />
    </button>
  );
}
