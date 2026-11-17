"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { easeOut } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Vertical offset in px before reveal. */
  y?: number;
  as?: "div" | "li" | "article";
};

/**
 * Fades and slides its content in once it enters the viewport.
 * With reduced motion, MotionConfig strips the transform and keeps the fade.
 */
export function Reveal({ children, delay = 0, y = 28, as = "div", ...rest }: RevealProps) {
  const Component = (as === "li" ? motion.li : as === "article" ? motion.article : motion.div) as typeof motion.div;
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.75, delay, ease: easeOut }}
      {...rest}
    >
      {children}
    </Component>
  );
}
