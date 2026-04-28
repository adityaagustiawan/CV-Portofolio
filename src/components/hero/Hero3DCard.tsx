import WorkstationCanvas from "@/components/three/WorkstationCanvas";
import Button from "@/components/ui/Button";
import { useState } from "react";
import WorkstationImmersive from "@/components/hero/WorkstationImmersive";

type Hero3DCardProps = {
  reducedMotion: boolean;
};

export default function Hero3DCard({ reducedMotion }: Hero3DCardProps) {
  const [view, setView] = useState<"overview" | "screen">("overview");
  const [tool, setTool] = useState<string>("rag");
  const [immersive, setImmersive] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl">
      <WorkstationImmersive open={immersive} onClose={() => setImmersive(false)} />
      <div className="flex items-start justify-between gap-4 p-5">
        <div>
          <div className="text-sm font-semibold">3D workstation</div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-white/70">
            Explore tools, click a badge to open it on the screen. {reducedMotion ? "Motion reduced." : "Drag / swipe to rotate."}
          </div>
          <div className="mt-2 text-xs text-zinc-500 dark:text-white/60">Selected: <span className="text-zinc-800 dark:text-white/80">{tool.toUpperCase()}</span></div>
        </div>
        <div className="flex items-center gap-2">
          {view === "overview" ? (
            <Button type="button" variant="secondary" size="sm" onClick={() => setView("screen")}>Zoom</Button>
          ) : (
            <Button type="button" variant="secondary" size="sm" onClick={() => setView("overview")}>Back</Button>
          )}
          <Button type="button" variant="ghost" size="sm" onClick={() => setImmersive(true)}>Immersive</Button>
          <div className="rounded-full border border-black/10 bg-black/5 px-2.5 py-1 text-xs font-semibold text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">WebGL</div>
        </div>
      </div>

      <div className="relative h-56 sm:h-64">
        <WorkstationCanvas
          reducedMotion={reducedMotion}
          className="absolute inset-0"
          interactive
          view={view}
          onViewChange={setView}
          selectedTool={tool}
          onSelectedToolChange={setTool}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/10" />
      </div>
    </div>
  );
}
