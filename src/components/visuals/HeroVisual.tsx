"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Heart, Megaphone, Send, Sparkle, TrendingUp } from "lucide-react";
import { useRef } from "react";
import { profile } from "@/data/profile";
import { BrandIcon } from "@/components/icons/BrandIcon";
import { Monogram } from "@/components/ui/Logo";
import { cn, easeOut } from "@/lib/utils";

/**
 * Decorative hero composition: a glowing orb with an orbit ring, floating
 * platform tiles and illustrative analytics cards. Elements follow the
 * pointer with a gentle parallax (disabled with reduced motion).
 *
 * The analytics cards are purely illustrative and intentionally show no
 * figures. If a real portrait is configured in `profile.portrait.src`,
 * it replaces the central monogram.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 60, damping: 18, mass: 0.6 });
  const y = useSpring(pointerY, { stiffness: 60, damping: 18, mass: 0.6 });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto aspect-square w-full max-w-[34rem] select-none"
      aria-hidden="true"
    >
      {/* Ambient glow */}
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,var(--glow-strong),transparent_68%)] blur-2xl" />

      {/* Orbit rings */}
      <Layer depth={10} x={x} y={y} className="absolute inset-[6%]">
        <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-primary/30" />
        <div className="absolute inset-[9%] rounded-full border border-line-strong" />
        <svg viewBox="0 0 400 400" className="absolute inset-0 size-full -rotate-12">
          <defs>
            <linearGradient id="hero-orbit" x1="0" x2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--magenta)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--blue)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <motion.ellipse
            cx="200"
            cy="200"
            rx="198"
            ry="70"
            fill="none"
            stroke="url(#hero-orbit)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.6, ease: easeOut }}
          />
        </svg>
      </Layer>

      {/* Central orb */}
      <Layer depth={18} x={x} y={y} className="absolute inset-[22%]">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: easeOut }}
          className="relative size-full"
        >
          <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_200deg,var(--primary),var(--magenta),var(--blue),var(--primary))] opacity-90 blur-[2px]" />
          <div className="absolute inset-[3px] overflow-hidden rounded-full bg-[radial-gradient(circle_at_30%_25%,color-mix(in_oklab,var(--primary)_55%,var(--surface))_0%,var(--surface)_70%)]">
            {profile.portrait.src ? (
              <Image
                src={profile.portrait.src}
                alt={profile.portrait.alt}
                fill
                priority
                sizes="(min-width: 1024px) 300px, 60vw"
                className="object-cover"
              />
            ) : (
              <div className="grid size-full place-items-center">
                <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
                <Monogram className="relative size-[46%] drop-shadow-[0_10px_30px_var(--glow-strong)]" />
              </div>
            )}
          </div>
        </motion.div>
      </Layer>

      {/* Platform tiles */}
      <Floating depth={34} x={x} y={y} delay={0.7} className="top-[40%] left-[-2%]" float="normal">
        <PlatformTile className="bg-[linear-gradient(45deg,var(--color-brand-instagram-from),var(--color-brand-instagram-via)_50%,var(--color-brand-instagram-to))] -rotate-12">
          <BrandIcon platform="instagram" className="size-7" />
        </PlatformTile>
      </Floating>
      <Floating depth={40} x={x} y={y} delay={0.8} className="top-[6%] right-[20%]" float="slow">
        <PlatformTile className="bg-brand-tiktok rotate-6">
          <BrandIcon platform="tiktok" className="size-6" />
        </PlatformTile>
      </Floating>
      <Floating depth={28} x={x} y={y} delay={0.9} className="top-[30%] right-[4%]" float="normal">
        <PlatformTile className="bg-brand-youtube rotate-12">
          <BrandIcon platform="youtube" className="size-7" />
        </PlatformTile>
      </Floating>
      <Floating depth={46} x={x} y={y} delay={1} className="bottom-[16%] left-[6%]" float="slow">
        <PlatformTile className="bg-brand-linkedin -rotate-6">
          <BrandIcon platform="linkedin" className="size-6" />
        </PlatformTile>
      </Floating>

      {/* Megaphone */}
      <Floating depth={24} x={x} y={y} delay={1.1} className="bottom-[0%] left-[28%]" float="normal">
        <div className="glass grid size-16 -rotate-12 place-items-center rounded-2xl text-primary card-shadow sm:size-[4.5rem]">
          <Megaphone className="size-8" strokeWidth={1.6} />
        </div>
      </Floating>

      {/* Hearts & sparkles */}
      <Floating depth={52} x={x} y={y} delay={1.2} className="top-[16%] right-[2%] hidden sm:block" float="slow">
        <Bubble>
          <Heart className="size-5 fill-current" />
        </Bubble>
      </Floating>
      <Floating depth={36} x={x} y={y} delay={1.3} className="right-[16%] bottom-[8%]" float="normal">
        <Bubble>
          <Heart className="size-5 fill-current" />
        </Bubble>
      </Floating>
      <Floating depth={20} x={x} y={y} delay={1.4} className="top-[2%] left-[30%]">
        <Sparkle className="size-6 animate-pulse-soft fill-primary text-primary" />
      </Floating>
      <Floating depth={20} x={x} y={y} delay={1.5} className="bottom-[2%] left-[52%]">
        <Sparkle className="size-4 animate-pulse-soft fill-magenta text-magenta" />
      </Floating>

      {/* Paper plane trail */}
      <Floating depth={30} x={x} y={y} delay={1.2} className="top-[-2%] right-[-2%] hidden sm:block">
        <div className="relative">
          <svg viewBox="0 0 120 80" className="absolute top-6 right-8 h-16 w-28 text-primary/60">
            <path d="M4 76C30 70 50 50 70 34S104 10 116 6" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" />
          </svg>
          <Send className="size-9 -rotate-6 text-fg/90 drop-shadow-[0_6px_14px_var(--glow-strong)]" strokeWidth={1.5} />
        </div>
      </Floating>

      {/* Illustrative analytics cards (no figures) */}
      <Floating depth={60} x={x} y={y} delay={0.9} className="top-[8%] left-[-4%] w-[46%] sm:left-[-8%]">
        <AnalyticsCard label="Reach" caption="Illustrative trend" />
      </Floating>
      <Floating depth={70} x={x} y={y} delay={1.05} className="right-[-4%] bottom-[16%] w-[52%] sm:right-[-10%]">
        <AnalyticsCard label="Engagement" caption="Illustrative trend" variant="large" />
      </Floating>
    </div>
  );
}

type LayerProps = {
  depth: number;
  x: MotionValue<number>;
  y: MotionValue<number>;
  className?: string;
  children: React.ReactNode;
};

function Layer({ depth, x, y, className, children }: LayerProps) {
  const translateX = useTransform(x, (value) => value * depth);
  const translateY = useTransform(y, (value) => value * depth);
  return (
    <motion.div style={{ x: translateX, y: translateY }} className={className}>
      {children}
    </motion.div>
  );
}

/** Parallax layer > entrance animation > idle CSS float (each on its own element so transforms don't clash). */
function Floating({
  delay,
  className,
  float,
  ...layer
}: LayerProps & { delay: number; float?: "normal" | "slow" }) {
  return (
    <Layer {...layer} className={cn("absolute", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay, ease: easeOut }}
      >
        <div className={cn(float === "normal" && "animate-float", float === "slow" && "animate-float-slow")}>
          {layer.children}
        </div>
      </motion.div>
    </Layer>
  );
}

function PlatformTile({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "grid size-14 place-items-center rounded-2xl text-white shadow-[0_14px_30px_-10px_rgb(0_0_0/0.5),inset_0_1px_0_rgb(255_255_255/0.35)] ring-1 ring-white/15 sm:size-16",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Bubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid size-11 rotate-12 place-items-center rounded-2xl rounded-bl-sm bg-[linear-gradient(135deg,var(--magenta),var(--primary))] text-white shadow-[0_10px_24px_-8px_var(--glow-strong)]">
      {children}
    </div>
  );
}

function AnalyticsCard({
  label,
  caption,
  variant = "small",
}: {
  label: string;
  caption: string;
  variant?: "small" | "large";
}) {
  const path =
    variant === "large"
      ? "M2 62 C18 58 24 40 40 44 S62 60 76 42 98 22 112 30 138 12 158 6"
      : "M2 40 C14 38 22 26 34 30 S52 36 62 24 80 18 98 6";
  return (
    <div className="glass rounded-2xl p-3 card-shadow sm:p-4">
      <div className="flex items-center gap-2">
        <span className="grid size-7 place-items-center rounded-lg bg-primary-soft text-primary">
          <TrendingUp className="size-4" />
        </span>
        <div className="leading-tight">
          <p className="text-xs font-semibold text-fg sm:text-sm">{label}</p>
          <p className="text-[0.65rem] text-subtle sm:text-xs">{caption}</p>
        </div>
      </div>
      <svg viewBox={variant === "large" ? "0 0 160 66" : "0 0 100 44"} className="mt-2 w-full overflow-visible">
        <defs>
          <linearGradient id={`hero-area-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={`${path} L${variant === "large" ? "158 66 L2 66" : "98 44 L2 44"} Z`}
          fill={`url(#hero-area-${variant})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        />
        <motion.path
          d={path}
          fill="none"
          stroke="var(--magenta)"
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 1.2, ease: easeOut }}
        />
      </svg>
      {variant === "large" && (
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
          <motion.div
            className="h-full rounded-full bg-[linear-gradient(90deg,var(--success),var(--cyan))]"
            initial={{ width: "0%" }}
            animate={{ width: "68%" }}
            transition={{ duration: 1.4, delay: 1.6, ease: easeOut }}
          />
        </div>
      )}
    </div>
  );
}
