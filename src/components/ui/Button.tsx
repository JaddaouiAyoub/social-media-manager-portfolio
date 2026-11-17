import Link from "next/link";
import { cn, isExternalUrl } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2.5 rounded-full font-semibold tracking-tight transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-out focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-60 active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-on-primary shadow-[0_10px_30px_-10px_var(--glow-strong)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_var(--glow-strong)]",
  secondary:
    "glass text-fg hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary-soft",
  ghost: "text-fg hover:text-primary",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-13 px-6 text-[0.95rem] sm:px-7",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonLinkProps = CommonProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

/** Link styled as a button. Handles internal anchors and external URLs. */
export function ButtonLink({ href, variant, size, className, children, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });

  if (isExternalUrl(href) || href.startsWith("mailto:") || href.startsWith("tel:")) {
    const external = isExternalUrl(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = CommonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({ variant, size, className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}

/** Round icon bubble used at the end of primary CTAs (as in the reference design). */
export function ButtonIcon({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "-mr-2 grid size-8 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5",
        className,
      )}
    >
      {children}
    </span>
  );
}
