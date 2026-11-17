"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Card with a soft radial highlight that follows the pointer.
 * Pure CSS variables — no re-render on mouse move.
 */
export function SpotlightCard({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLElement>(null);

  function onPointerMove(event: React.PointerEvent<HTMLElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <Tag
      ref={ref as React.Ref<never>}
      onPointerMove={onPointerMove}
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface/70 transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_24px_60px_-24px_var(--glow-strong)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 0%), var(--primary-soft), transparent 60%)",
        }}
      />
      {children}
    </Tag>
  );
}
