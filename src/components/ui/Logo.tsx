import Link from "next/link";
import { useId } from "react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/** Stylised "A" monogram drawn in SVG with the brand gradient. */
export function Monogram({ className }: { className?: string }) {
  const gradientId = `monogram-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg viewBox="0 0 48 48" className={cn("size-10", className)} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="55%" stopColor="var(--magenta)" />
          <stop offset="100%" stopColor="var(--blue)" />
        </linearGradient>
      </defs>
      <path
        d="M24 4 6.5 43h8.2l3.6-8.6h11.4l3.6 8.6h8.2L24 4Zm-2.9 23.6L24 20.5l2.9 7.1h-5.8Z"
        fill={`url(#${gradientId})`}
      />
      <path d="M8 34.5c10-4.6 22-5.6 33-2.4" stroke="var(--fg)" strokeOpacity=".9" strokeWidth="2.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/#home"
      className={cn("group inline-flex min-w-0 items-center gap-2.5 rounded-xl sm:gap-3", className)}
      aria-label={`${profile.name}, ${profile.role} — back to top`}
    >
      <span className="relative grid place-items-center transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
        <span className="absolute inset-0 rounded-full bg-primary/30 blur-xl" aria-hidden="true" />
        <Monogram className="relative" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-tight">
          <span className="font-display text-base font-semibold tracking-tight whitespace-nowrap text-fg sm:text-[1.05rem]">{profile.name}</span>
          <span className="text-xs whitespace-nowrap text-muted max-[379px]:hidden">{profile.role}</span>
        </span>
      )}
    </Link>
  );
}
