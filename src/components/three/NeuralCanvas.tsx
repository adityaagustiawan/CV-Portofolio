import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import NeuralScene from "@/components/three/NeuralScene";
import WebGLFallback from "@/components/three/WebGLFallback";

type NeuralCanvasProps = {
  reducedMotion: boolean;
  variant?: "hero" | "intro";
  className?: string;
};

export default function NeuralCanvas({ reducedMotion, variant = "hero", className }: NeuralCanvasProps) {
  const supported = useWebGLSupport();

  const camera = useMemo(() => {
    if (variant === "intro") {
      return { position: [0, 0.15, 3.6] as [number, number, number], fov: 42 };
    }
    return { position: [0, 0.1, 3.2] as [number, number, number], fov: 38 };
  }, [variant]);

  if (!supported) {
    return <WebGLFallback className={className} label="3D hero" description="WebGL is unavailable, showing a lightweight fallback." />;
  }

  return (
    <div className={className}>
      <Canvas
        camera={camera}
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <NeuralScene reducedMotion={reducedMotion} variant={variant} />
      </Canvas>
    </div>
  );
}

