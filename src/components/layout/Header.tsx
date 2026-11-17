"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Send } from "lucide-react";
import { navItems } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useScrolled";
import { cn, easeOut } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileNavigation } from "./MobileNavigation";

const sectionIds = navItems.map((item) => item.id);

export function Header() {
  const scrolled = useScrolled();
  const active = useActiveSection(sectionIds) ?? "home";

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: easeOut }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "transition-[background-color,border-color,backdrop-filter,padding] duration-500",
          scrolled
            ? "border-b border-line bg-[color-mix(in_oklab,var(--bg)_72%,transparent)] py-2.5 backdrop-blur-xl"
            : "border-b border-transparent py-4 lg:py-6",
        )}
      >
        <div className="container-page flex items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="glass flex items-center gap-1 rounded-full p-1.5">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={`/#${item.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors duration-300",
                        isActive ? "text-on-primary" : "text-muted hover:text-fg",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-full bg-brand-gradient shadow-[0_6px_20px_-6px_var(--glow-strong)]"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          aria-hidden="true"
                        />
                      )}
                      {item.id === "home" && <Home className="relative size-4" aria-hidden="true" />}
                      <span className="relative">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/#contact" className={buttonClasses({ className: "max-sm:hidden" })}>
              <Send className="size-4" aria-hidden="true" />
              Let&apos;s Talk
            </Link>
            <ThemeToggle />
            <MobileNavigation active={active} />
          </div>
        </div>
      </div>
    </motion.header>
  );
}

