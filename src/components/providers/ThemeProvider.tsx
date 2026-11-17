"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { siteConfig } from "@/data/site";
import type { ResolvedTheme } from "@/lib/theme";

type ThemeContextValue = {
  theme: ResolvedTheme;
  /** False during SSR / before hydration, so UI can avoid mismatches. */
  mounted: boolean;
  setTheme: (theme: ResolvedTheme, origin?: { x: number; y: number }) => void;
  toggleTheme: (origin?: { x: number; y: number }) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readTheme(): ResolvedTheme {
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const subscribeNoop = () => () => {};

function applyTheme(theme: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore<ResolvedTheme>(subscribe, readTheme, () => "dark");
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  // Follow the OS preference while the visitor hasn't chosen explicitly
  // (only relevant when the configured default is "system").
  useEffect(() => {
    if (siteConfig.defaultTheme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      try {
        if (localStorage.getItem(siteConfig.themeStorageKey)) return;
      } catch {
        /* storage unavailable: still follow the system */
      }
      applyTheme(media.matches ? "light" : "dark");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback<ThemeContextValue["setTheme"]>((next, origin) => {
    try {
      localStorage.setItem(siteConfig.themeStorageKey, next);
    } catch {
      /* private mode: the choice simply isn't persisted */
    }

    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Circular reveal using the View Transitions API when available.
    if (!reduceMotion && typeof document.startViewTransition === "function") {
      const x = origin?.x ?? window.innerWidth - 40;
      const y = origin?.y ?? 40;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      const transition = document.startViewTransition(() => applyTheme(next));
      transition.ready
        .then(() => {
          root.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
          );
        })
        .catch(() => {});
      return;
    }

    // Fallback: short colour cross-fade.
    if (!reduceMotion) root.classList.add("theme-transition");
    applyTheme(next);
    window.setTimeout(() => root.classList.remove("theme-transition"), 500);
  }, []);

  const toggleTheme = useCallback<ThemeContextValue["toggleTheme"]>(
    (origin) => setTheme(readTheme() === "dark" ? "light" : "dark", origin),
    [setTheme],
  );

  const value = useMemo(() => ({ theme, mounted, setTheme, toggleTheme }), [theme, mounted, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside <ThemeProvider>");
  return context;
}
