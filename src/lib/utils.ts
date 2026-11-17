/** Joins class names, ignoring falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Returns true for URLs that should open in a new tab. */
export function isExternalUrl(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/** Shared easing curve used across animations. */
export const easeOut = [0.22, 1, 0.36, 1] as const;
