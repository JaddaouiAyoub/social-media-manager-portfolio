"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Animated number counter. Only used for verified figures
 * (see `src/data/stats.ts`). The final value is rendered server-side so
 * the number is correct without JavaScript.
 */
export function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!inView || reduceMotion || !node) return;
    const format = (n: number) => `${prefix}${Math.round(n).toLocaleString("en-US")}${suffix}`;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, prefix, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {`${prefix}${value.toLocaleString("en-US")}${suffix}`}
    </span>
  );
}
