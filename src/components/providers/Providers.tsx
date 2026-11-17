"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./ThemeProvider";

/** Client-side providers. `reducedMotion="user"` honours prefers-reduced-motion. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
