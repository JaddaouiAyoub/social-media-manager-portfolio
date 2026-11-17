import { siteConfig } from "@/data/site";

export type ResolvedTheme = "dark" | "light";

/**
 * Inline script executed before the first paint (see app/layout.tsx).
 * It reads the persisted choice from localStorage, falls back to the
 * configured default (or the OS preference when the default is "system")
 * and sets the `dark` / `light` class on <html> — preventing any flash.
 */
export function getThemeInitScript(): string {
  const key = JSON.stringify(siteConfig.themeStorageKey);
  const fallback = JSON.stringify(siteConfig.defaultTheme);
  return `(function(){var r=document.documentElement;try{var s=localStorage.getItem(${key});var d=${fallback};var t=(s==="light"||s==="dark")?s:(d==="system"?(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"):d);r.classList.remove("light","dark");r.classList.add(t);r.style.colorScheme=t;}catch(e){r.classList.add("dark");}})();`;
}
