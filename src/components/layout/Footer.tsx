import Link from "next/link";
import { profile } from "@/data/profile";
import { navItems } from "@/data/site";
import { activeSocialLinks } from "@/data/socials";
import { BrandIcon } from "@/components/icons/BrandIcon";
import { Logo } from "@/components/ui/Logo";
import { BackToTopButton } from "./BackToTopButton";
import { CurrentYear } from "./CurrentYear";

export function Footer() {
  return (
    <footer className="relative mt-10 border-t border-line">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--primary),var(--magenta),transparent)] opacity-60" aria-hidden="true" />
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_auto] md:items-start">
        <div className="flex max-w-sm flex-col gap-4">
          <Logo />
          <p className="text-sm leading-relaxed text-muted">{profile.intro}</p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-xs font-semibold tracking-[0.14em] text-subtle uppercase">Navigation</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link href={`/#${item.id}`} className="inline-flex min-h-10 items-center text-sm text-muted transition-colors hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4">
          {activeSocialLinks.length > 0 && (
            <>
              <h2 className="text-xs font-semibold tracking-[0.14em] text-subtle uppercase">Follow</h2>
              <ul className="flex flex-wrap gap-2">
                {activeSocialLinks.map((link) => (
                  <li key={link.platform}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${link.label} (opens in a new tab)`}
                      className="glass grid size-11 place-items-center rounded-full text-muted transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                    >
                      <BrandIcon platform={link.platform} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
          <BackToTopButton />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {profile.name}. All rights reserved.
          </p>
          <p>{profile.role}</p>
        </div>
      </div>
    </footer>
  );
}
