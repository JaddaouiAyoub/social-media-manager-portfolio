import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-fg",
        className,
      )}
    >
      <span className="size-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" aria-hidden="true" />
      {children}
    </span>
  );
}

type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex max-w-2xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="font-display text-3xl leading-[1.1] font-bold tracking-tight text-balance text-fg sm:text-4xl lg:text-[2.8rem]">
        {title}
      </h2>
      {description && <p className="text-base leading-relaxed text-pretty text-muted sm:text-lg">{description}</p>}
    </Reveal>
  );
}
