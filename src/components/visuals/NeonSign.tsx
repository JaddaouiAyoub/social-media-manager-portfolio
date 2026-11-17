import { Laptop, Sprout } from "lucide-react";

/**
 * Mood visual for the About section: a neon "Create · Engage · Grow" sign
 * in a softly lit workspace, built entirely with CSS (no stock photo).
 * The scene always uses the dark tokens (`dark` class) so the neon glows
 * the same way in both themes.
 */
export function NeonSign() {
  return (
    <div
      className="dark noise relative aspect-[4/3.4] w-full overflow-hidden rounded-[2rem] border border-line bg-[linear-gradient(160deg,color-mix(in_oklab,var(--primary)_28%,var(--surface))_0%,var(--surface)_55%,color-mix(in_oklab,var(--magenta)_18%,var(--surface))_100%)] text-fg card-shadow"
      aria-hidden="true"
    >
      {/* wall light */}
      <div className="absolute top-[12%] right-[10%] size-[60%] rounded-full bg-magenta/30 blur-3xl" />
      <div className="absolute inset-0 bg-grid opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />

      {/* neon sign */}
      <div className="absolute top-[10%] right-[8%] flex -rotate-6 flex-col items-end font-script text-[clamp(2rem,6vw,3.4rem)] leading-[1.05] text-[color-mix(in_oklab,var(--magenta)_22%,white)] [text-shadow:0_0_6px_#fff,0_0_14px_var(--magenta),0_0_32px_var(--magenta),0_0_60px_var(--primary)]">
        <span>Create</span>
        <span className="mr-[12%]">Engage</span>
        <span>
          Grow <span className="text-[0.8em]">♡</span>
        </span>
      </div>

      {/* desk */}
      <div className="absolute inset-x-0 bottom-0 h-[24%] bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--fg)_10%,transparent),transparent)]" />
      <div className="absolute inset-x-[6%] bottom-[24%] h-px bg-line-strong" />
      <div className="absolute bottom-[24%] left-[16%] text-fg/80 drop-shadow-[0_0_24px_var(--glow-strong)]">
        <Laptop className="size-[clamp(4rem,12vw,6.5rem)]" strokeWidth={1.1} />
      </div>
      <div className="absolute bottom-[24%] left-[50%] text-success/80">
        <Sprout className="size-[clamp(2rem,6vw,3rem)]" strokeWidth={1.3} />
      </div>
      <div className="absolute bottom-[24%] left-[7%] h-[38%] w-[3px] rounded-full bg-line-strong">
        <span className="absolute -top-2 -left-3 h-4 w-8 rounded-t-full bg-primary/70 shadow-[0_10px_40px_10px_var(--glow-strong)]" />
      </div>
    </div>
  );
}
