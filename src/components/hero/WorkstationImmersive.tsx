import WorkstationCanvas from "@/components/three/WorkstationCanvas";
import Button from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type WorkstationImmersiveProps = {
  open: boolean;
  onClose: () => void;
};

export default function WorkstationImmersive({ open, onClose }: WorkstationImmersiveProps) {
  const reduced = usePrefersReducedMotion();
  const [tool, setTool] = useState<string>("rag");
  const [view, setView] = useState<"overview" | "screen">("overview");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  useEffect(() => {
    if (!open) return;
    setView("overview");
  }, [open]);

  const shouldAnimate = !reduced;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[200]"
          role="dialog"
          aria-modal="true"
          aria-label="Immersive 3D workstation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldAnimate ? 0.25 : 0 }}
        >
          <div className="absolute inset-0 bg-zinc-950/90" onClick={onClose} />

          <motion.div
            className="absolute inset-0"
            initial={shouldAnimate ? { scale: 0.99, y: 10, opacity: 0 } : {}}
            animate={shouldAnimate ? { scale: 1, y: 0, opacity: 1 } : {}}
            exit={shouldAnimate ? { scale: 0.99, y: 8, opacity: 0 } : {}}
            transition={{ duration: shouldAnimate ? 0.4 : 0, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative h-full w-full">
              <WorkstationCanvas
                reducedMotion={reduced}
                className="absolute inset-0"
                interactive
                view={view}
                onViewChange={setView}
                selectedTool={tool}
                onSelectedToolChange={setTool}
              />

              <div className="pointer-events-none absolute inset-x-0 top-0">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 pt-4 sm:px-6 lg:px-8">
                  <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400/80" />
                    Immersive mode
                    <span className="text-white/60">•</span>
                    <span className="text-white/70">Tap a tab on the monitor</span>
                  </div>

                  <div className="pointer-events-auto flex items-center gap-2">
                    {view === "overview" ? (
                      <Button type="button" variant="secondary" size="sm" onClick={() => setView("screen")}>
                        Zoom to screen
                      </Button>
                    ) : (
                      <Button type="button" variant="secondary" size="sm" onClick={() => setView("overview")}>
                        Back
                      </Button>
                    )}
                    <Button type="button" variant="ghost" size="sm" className="w-10 px-0" onClick={onClose} aria-label="Close">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 pb-4">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                  <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    <span className="font-semibold text-white/80">Selected:</span>
                    {tool.toUpperCase()}
                    <span className="text-white/50">•</span>
                    {reduced ? "Motion reduced" : view === "overview" ? "Drag to rotate • Pinch/scroll to zoom" : "Tap tabs to switch pages"}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
