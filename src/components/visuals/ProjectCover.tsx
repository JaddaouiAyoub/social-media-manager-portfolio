import Image from "next/image";
import { Heart, MessageCircle, Play } from "lucide-react";
import type { CoverTone, CoverVariant, Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const tones: Record<CoverTone, string> = {
  violet: "bg-[linear-gradient(135deg,var(--primary),var(--magenta))]",
  magenta: "bg-[linear-gradient(135deg,var(--magenta),color-mix(in_oklab,var(--magenta)_40%,var(--blue)))]",
  blue: "bg-[linear-gradient(135deg,var(--blue),color-mix(in_oklab,var(--primary)_70%,var(--cyan)))]",
  sunset: "bg-[linear-gradient(135deg,color-mix(in_oklab,var(--magenta)_70%,#ff8a3d),var(--primary))]",
};

/**
 * Project visual. Uses the real image when `cover.image` is provided,
 * otherwise an illustrated cover rendered in code.
 */
export function ProjectCover({ project, className, priority = false }: { project: Project; className?: string; priority?: boolean }) {
  const { cover } = project;

  if (cover.image) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={cover.image}
          alt={cover.imageAlt ?? project.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className={cn("noise relative isolate overflow-hidden text-white", tones[cover.tone], className)} aria-hidden="true">
      <div className="absolute -top-1/3 -right-1/4 size-3/4 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute inset-0 [background-image:radial-gradient(rgb(255_255_255/0.18)_1px,transparent_1px)] [background-size:18px_18px] opacity-60" />
      <div className="absolute inset-0 grid place-items-center p-6 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
        <Illustration variant={cover.variant} />
      </div>
    </div>
  );
}

const glass = "rounded-xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm";

function Illustration({ variant }: { variant: CoverVariant }) {
  switch (variant) {
    case "feed":
      return (
        <div className={cn(glass, "grid aspect-square h-[80%] max-h-48 grid-cols-3 gap-1.5 p-2.5")}>
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className={cn("aspect-square rounded-md", i % 4 === 0 ? "bg-white/70" : i % 3 === 0 ? "bg-white/40" : "bg-white/20")} />
          ))}
        </div>
      );
    case "chart":
      return (
        <div className={cn(glass, "w-[64%] max-w-64 p-4")}>
          <div className="flex h-24 items-end gap-2">
            {[38, 52, 44, 66, 58, 80, 92].map((h, i) => (
              <span key={i} className="flex-1 rounded-t-md bg-white/60" style={{ height: `${h}%`, opacity: 0.45 + i * 0.08 }} />
            ))}
          </div>
          <div className="mt-3 h-1.5 w-2/3 rounded-full bg-white/40" />
          <div className="mt-1.5 h-1.5 w-1/3 rounded-full bg-white/25" />
        </div>
      );
    case "calendar":
      return (
        <div className={cn(glass, "w-[64%] max-w-64 p-3.5")}>
          <div className="mb-3 flex items-center justify-between">
            <span className="h-2 w-16 rounded-full bg-white/60" />
            <span className="h-2 w-6 rounded-full bg-white/30" />
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 28 }, (_, i) => (
              <span
                key={i}
                className={cn("aspect-square rounded-[5px]", [3, 8, 12, 17, 22, 26].includes(i) ? "bg-white/80" : "bg-white/20")}
              />
            ))}
          </div>
        </div>
      );
    case "brand":
      return (
        <div className="flex flex-col items-center gap-4">
          <span className="font-display text-6xl font-bold tracking-tight">Aa</span>
          <div className="flex -space-x-2">
            {["bg-white", "bg-white/70", "bg-white/45", "bg-white/25"].map((c) => (
              <span key={c} className={cn("size-10 rounded-full ring-2 ring-white/40", c)} />
            ))}
          </div>
        </div>
      );
    case "chat":
      return (
        <div className="flex w-[66%] max-w-64 flex-col gap-2.5">
          <div className={cn(glass, "flex items-center gap-2 self-start rounded-bl-sm px-3 py-2")}>
            <MessageCircle className="size-4" />
            <span className="h-2 w-20 rounded-full bg-white/60" />
          </div>
          <div className="flex items-center gap-2 self-end rounded-xl rounded-br-sm bg-white/80 px-3 py-2">
            <span className="h-2 w-24 rounded-full bg-black/25" />
          </div>
          <div className={cn(glass, "flex items-center gap-2 self-start rounded-bl-sm px-3 py-2")}>
            <Heart className="size-4 fill-current" />
            <span className="h-2 w-14 rounded-full bg-white/60" />
          </div>
        </div>
      );
    case "reel":
      return (
        <div className="relative aspect-[9/16] h-[78%] max-h-52 rounded-[1.4rem] bg-black/25 p-1.5 ring-1 ring-white/30">
          <div className="relative grid size-full place-items-center rounded-[1.1rem] bg-white/10">
            <span className="grid size-12 place-items-center rounded-full bg-white/85 text-[var(--magenta)]">
              <Play className="ml-0.5 size-5 fill-current" />
            </span>
            <div className="absolute inset-x-3 bottom-3 h-1 rounded-full bg-white/30">
              <span className="block h-full w-2/5 rounded-full bg-white" />
            </div>
          </div>
        </div>
      );
  }
}
