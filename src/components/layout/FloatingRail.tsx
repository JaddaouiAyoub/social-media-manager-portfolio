"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { activeSocialLinks } from "@/data/socials";
import { useScrolled } from "@/hooks/useScrolled";
import { BrandIcon } from "@/components/icons/BrandIcon";
import { scrollToTop } from "./BackToTopButton";

/**
 * Vertical rail fixed on the right (as in the reference design) with the
 * configured social links and a back-to-top button that appears on scroll.
 */
export function FloatingRail() {
  const scrolled = useScrolled(600);

  return (
    <div className="fixed right-4 bottom-6 z-40 flex flex-col items-center gap-3 sm:right-6">
      {activeSocialLinks.length > 0 && (
        <ul className="glass hidden flex-col gap-1 rounded-full p-1.5 xl:flex" aria-label="Social networks">
          {activeSocialLinks.map((link) => (
            <li key={link.platform}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} (opens in a new tab)`}
                className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-primary-soft hover:text-primary"
              >
                <BrandIcon platform={link.platform} className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      )}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 12 }}
            className="grid size-12 place-items-center rounded-full bg-brand-gradient text-on-primary shadow-[0_10px_30px_-8px_var(--glow-strong)] transition-transform hover:-translate-y-1"
          >
            <ArrowUp className="size-5" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
