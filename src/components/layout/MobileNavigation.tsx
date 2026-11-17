"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Menu, Send, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { navItems } from "@/data/site";
import { activeSocialLinks } from "@/data/socials";
import { BrandIcon } from "@/components/icons/BrandIcon";
import { buttonClasses } from "@/components/ui/Button";
import { useMounted } from "@/hooks/useMounted";
import { cn, easeOut } from "@/lib/utils";

/**
 * Full-screen mobile menu: keyboard accessible (Escape to close, focus
 * trapped inside while open, focus restored to the toggle when closed) and
 * closed automatically after a link is selected.
 */
export function MobileNavigation({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => desktop.matches && close(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open, close]);

  const panel = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-nav"
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-[color-mix(in_oklab,var(--bg)_94%,transparent)] backdrop-blur-2xl lg:hidden"
        >
          <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-primary/30 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-magenta/20 blur-3xl" aria-hidden="true" />

          <div className="container-page flex items-center justify-between py-4">
            <span className="font-display text-lg font-semibold">Menu</span>
            <button
              type="button"
              onClick={() => close()}
              className="glass grid size-11 place-items-center rounded-full text-fg"
              aria-label="Close menu"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile navigation" className="container-page relative flex flex-1 flex-col justify-center py-8">
            <ul className="flex flex-col gap-1">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.5, ease: easeOut }}
                >
                  <Link
                    href={`/#${item.id}`}
                    onClick={() => close(false)}
                    aria-current={active === item.id ? "true" : undefined}
                    className={cn(
                      "flex min-h-14 items-center justify-between rounded-2xl px-4 font-display text-3xl font-semibold tracking-tight transition-colors sm:text-4xl",
                      active === item.id ? "text-gradient" : "text-fg hover:text-primary",
                    )}
                  >
                    {item.label}
                    <span className="font-sans text-sm font-medium text-subtle" aria-hidden="true">
                      0{index + 1}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: easeOut }}
              className="mt-10 flex flex-col gap-6 px-4"
            >
              <Link href="/#contact" onClick={() => close(false)} className={buttonClasses({ size: "lg", className: "w-full" })}>
                <Send className="size-4" aria-hidden="true" />
                Let&apos;s Talk
              </Link>
              {activeSocialLinks.length > 0 && (
                <ul className="flex flex-wrap gap-3" aria-label="Social networks">
                  {activeSocialLinks.map((link) => (
                    <li key={link.platform}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="glass grid size-11 place-items-center rounded-full text-muted transition-colors hover:text-primary"
                      >
                        <BrandIcon platform={link.platform} className="size-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Open menu"
        className="glass grid size-11 place-items-center rounded-full text-fg transition-colors hover:border-primary/50 lg:hidden"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>
      {mounted && createPortal(panel, document.body)}
    </>
  );
}
