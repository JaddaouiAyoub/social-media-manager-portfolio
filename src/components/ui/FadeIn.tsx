"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { easeOut } from "@/lib/utils";

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  /** Use "span" inside phrasing content such as headings. */
  as?: "div" | "span";
};

/** Mount-time entrance animation (used above the fold, e.g. in the hero). */
export function FadeIn({ delay = 0, y = 24, as = "div", children, ...rest }: FadeInProps) {
  // Both variants share the same motion props; the cast keeps TypeScript happy.
  const Component = (as === "span" ? motion.span : motion.div) as typeof motion.div;
  return (
    <Component
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: easeOut }}
      {...rest}
    >
      {children}
    </Component>
  );
}
