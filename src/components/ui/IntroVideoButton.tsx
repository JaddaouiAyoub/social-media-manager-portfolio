"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useMounted } from "@/hooks/useMounted";

/**
 * "Watch Intro" button + video modal. Rendered only when a real video URL
 * is configured in `profile.introVideoUrl` (YouTube/Vimeo embed or a file).
 */
export function IntroVideoButton({ url }: { url: string }) {
  const [open, setOpen] = useState(false);
  const mounted = useMounted();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isFile = /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const trigger = triggerRef.current;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex min-h-13 items-center gap-3 rounded-full pr-4 font-semibold text-fg"
      >
        <span className="glass grid size-12 place-items-center rounded-full transition-all duration-300 group-hover:scale-105 group-hover:border-primary/60 group-hover:shadow-[0_0_30px_-6px_var(--glow-strong)]">
          <Play className="ml-0.5 size-4 fill-current" aria-hidden="true" />
        </span>
        Watch Intro
      </button>
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Intro video"
                className="fixed inset-0 z-[70] grid place-items-center bg-black/80 p-4 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-3xl bg-black"
                  onClick={(event) => event.stopPropagation()}
                >
                  {isFile ? (
                    <video src={url} controls autoPlay className="size-full" />
                  ) : (
                    <iframe
                      src={url}
                      title="Intro video"
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      allowFullScreen
                      className="size-full"
                    />
                  )}
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close video"
                    className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
                  >
                    <X className="size-5" aria-hidden="true" />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
