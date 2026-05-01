import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import WebGLFallback from "@/components/three/WebGLFallback";
import WorkstationScene from "@/components/three/WorkstationScene";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { cn } from "@/lib/utils";
import CanvasErrorBoundary from "@/components/three/CanvasErrorBoundary";

type WorkstationCanvasProps = {
  reducedMotion: boolean;
  variant?: "hero" | "intro";
  className?: string;
  interactive?: boolean;
  view?: "overview" | "screen";
  onViewChange?: (view: "overview" | "screen") => void;
  selectedTool?: string;
  onSelectedToolChange?: (toolId: string) => void;
};

export default function WorkstationCanvas({
  reducedMotion,
  variant = "hero",
  className,
  interactive = variant === "hero",
  view,
  onViewChange,
  selectedTool,
  onSelectedToolChange,
}: WorkstationCanvasProps) {
  const supported = useWebGLSupport();
  const [didRender, setDidRender] = useState(false);
  const [failed, setFailed] = useState(false);
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(max-width: 640px)")?.matches ?? false;
  }, []);

  const [internalView, setInternalView] = useState<"overview" | "screen">("overview");
  const [internalTool, setInternalTool] = useState<string>("rag");

  const resolvedView = view ?? internalView;
  const resolvedTool = selectedTool ?? internalTool;

  const setView = (next: "overview" | "screen") => {
    onViewChange?.(next);
    if (!onViewChange) setInternalView(next);
  };

  const setTool = (toolId: string) => {
    onSelectedToolChange?.(toolId);
    if (!onSelectedToolChange) setInternalTool(toolId);
  };

  const camera = useMemo(() => {
    if (variant === "intro") {
      return { position: [0, 0.85, 6.2] as [number, number, number], fov: 44 };
    }
    return { position: [0, 0.35, 4.3] as [number, number, number], fov: 40 };
  }, [variant]);

  const dpr = useMemo(() => {
    if (typeof window === "undefined") return [1, 1.5] as [number, number];
    const isMobile = window.matchMedia?.("(max-width: 640px)")?.matches ?? false;
    return isMobile ? ([1, 1.25] as [number, number]) : ([1, 1.5] as [number, number]);
  }, []);

  useEffect(() => {
    if (!supported) return;
    if (didRender) return;

    const t = window.setTimeout(() => {
      if (!didRender) setFailed(true);
    }, isMobile ? 4500 : 2500);

    return () => window.clearTimeout(t);
  }, [didRender, isMobile, supported]);

  if (!supported || failed) {
    return (
      <WebGLFallback
        className={className}
        label="3D workstation"
        description={
          supported
            ? "3D couldn’t start on this device. Showing a lightweight fallback instead."
            : "WebGL is unavailable, showing a lightweight fallback."
        }
      />
    );
  }

  return (
    <div className={cn("relative touch-none select-none", className)}>
      {!didRender ? (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 left-1/2 h-60 w-[26rem] -translate-x-1/2 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-44 w-44 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/10" />
        </div>
      ) : null}
      <CanvasErrorBoundary onError={() => setFailed(true)}>
        <Canvas
          camera={camera}
          dpr={dpr}
          frameloop={reducedMotion ? "demand" : "always"}
          performance={{ min: 0.5 }}
          gl={{ 
            antialias: true, 
            alpha: true, 
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
            preserveDrawingBuffer: false
          }}
          shadows={false}
          style={{ touchAction: "none" }}
          onCreated={({ gl }) => {
            const el = gl.domElement;
            const onLost = () => setFailed(true);
            el.addEventListener("webglcontextlost", onLost, { passive: true } as AddEventListenerOptions);
          }}
        >
          <WorkstationScene
            reducedMotion={reducedMotion}
            variant={variant}
            lite={isMobile}
            interactive={interactive}
            view={resolvedView}
            selectedToolId={resolvedTool}
            onSelectTool={(toolId) => {
              setTool(toolId);
              if (interactive && resolvedView === "screen") setView("screen");
            }}
            onRequestView={(next) => {
              if (!interactive) return;
              setView(next);
            }}
            onFirstFrame={() => setDidRender(true)}
          />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
