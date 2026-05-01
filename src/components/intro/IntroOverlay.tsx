import Button from "@/components/ui/Button";
import WorkstationCanvas from "@/components/three/WorkstationCanvas";
import { site } from "@/data/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useSessionFlag } from "@/hooks/useSessionFlag";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export default function IntroOverlay() {
  const reduced = usePrefersReducedMotion();
  const location = useLocation();
  const { get, set } = useSessionFlag("introPlayed");

  const isHome = location.pathname === "/";
  const shouldAnimate = !reduced;

  const initialOpen = useMemo(() => {
    if (!isHome) return false;
    return !get();
  }, [get, isHome]);

  const [open, setOpen] = useState<boolean>(initialOpen);

  const close = useCallback(() => {
    set(true);
    setOpen(false);
  }, [set]);

  useEffect(() => {
    if (!isHome) {
      setOpen(false);
      return;
    }

    const already = get();
    if (already) {
      setOpen(false);
      return;
    }

    setOpen(true);
  }, [get, isHome]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }

      if (e.key === "Enter") {
        e.preventDefault();
        close();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close, open]);

  useEffect(() => {
    if (!open) return;
    if (!shouldAnimate) {
      set(true);
      setOpen(false);
      return;
    }

    const t = window.setTimeout(() => {
      close();
    }, 2800);

    return () => window.clearTimeout(t);
  }, [close, open, set, shouldAnimate]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100]"
          role="dialog"
          aria-modal="true"
          aria-label="Intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-zinc-950/75 backdrop-blur-sm" onClick={close} />

          <div className="absolute inset-0">
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              <motion.div
                className="absolute inset-0 opacity-70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {shouldAnimate ? <WorkstationCanvas reducedMotion={false} variant="intro" interactive={false} className="absolute inset-0" /> : null}
              </motion.div>

              <motion.div
                className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-3xl"
                initial={{ scale: 0.9, opacity: 0.5 }}
                animate={{ scale: 1.08, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/10" />
            </div>

            <div className="mx-auto flex h-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
              <motion.div
                className="w-full"
                initial={{ y: 18, opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ y: 10, opacity: 0, scale: 0.99, filter: "blur(8px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400/80" />
                      Welcome
                    </div>
                    <div className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl pointer-events-auto select-none transform-gpu will-change-transform">
                      <span className="block text-white group-hover:text-blue-400 transition-colors duration-300">{site.name}</span>
                      <span className="block text-white/70 mt-1">{site.role}</span>
                    </div>
                    <div className="mt-3 max-w-xl text-sm leading-6 text-white/70 pointer-events-auto select-none transform-gpu">{site.tagline}</div>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-10 px-0"
                    onClick={close}
                    aria-label="Skip intro"
                    title="Skip"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button type="button" onClick={close}>Enter</Button>
                  <Button type="button" variant="secondary" onClick={close}>
                    Skip
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

