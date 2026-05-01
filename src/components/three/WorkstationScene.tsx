import { OrbitControls, RoundedBox, Sparkles } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { CanvasTexture, MathUtils, Vector3 } from "three";
import type { Group } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type WorkstationSceneProps = {
  reducedMotion: boolean;
  variant: "hero" | "intro";
  onFirstFrame?: () => void;
  lite?: boolean;
  interactive?: boolean;
  view?: "overview" | "screen";
  onRequestView?: (view: "overview" | "screen") => void;
  selectedToolId?: string;
  onSelectTool?: (toolId: string) => void;
};

type ToolSpec = {
  id: string;
  label: string;
  accent: string;
  lines: string[];
};

function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function makeLabelTexture(label: string, accent: string) {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#070a12";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  g.addColorStop(0, "rgba(59,130,246,0.18)");
  g.addColorStop(1, "rgba(147,197,253,0.05)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 6;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.75;
  ctx.beginPath();
  ctx.arc(56, 80, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.fillStyle = "rgba(229,231,235,0.92)";
  ctx.font = "600 56px system-ui, -apple-system, Segoe UI, Roboto";
  ctx.textBaseline = "middle";
  ctx.fillText(label, 86, 84);

  ctx.fillStyle = "rgba(229,231,235,0.62)";
  ctx.font = "500 28px system-ui, -apple-system, Segoe UI, Roboto";
  ctx.fillText("Tap to open", 56, 156);

  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function makeScreenTexture(title: string, accent: string, lines: string[]) {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 576;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#05060a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  g.addColorStop(0, "rgba(59,130,246,0.22)");
  g.addColorStop(1, "rgba(2,6,23,0.0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.fillRect(0, 0, canvas.width, 88);

  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.arc(44, 44, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.fillStyle = "rgba(229,231,235,0.95)";
  ctx.font = "700 44px system-ui, -apple-system, Segoe UI, Roboto";
  ctx.textBaseline = "middle";
  ctx.fillText(title, 74, 46);

  ctx.fillStyle = "rgba(229,231,235,0.72)";
  ctx.font = "500 28px system-ui, -apple-system, Segoe UI, Roboto";
  const startY = 150;
  const lineH = 44;
  lines.slice(0, 7).forEach((l, i) => {
    ctx.fillText(`• ${l}`, 74, startY + i * lineH);
  });

  ctx.strokeStyle = "rgba(255,255,255,0.10)";
  ctx.lineWidth = 10;
  ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function makeWindows11Texture(tools: ToolSpec[], selectedId: string, lite: boolean) {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 576;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const selected = tools.find((t) => t.id === selectedId) ?? tools[0];
  const tabs = lite ? ["rag", "llm", "eval", "trae"] : ["rag", "llm", "eval", "trae", "vector", "python", "ts", "docker"];

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const wallpaper = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  wallpaper.addColorStop(0, "#0b1630");
  wallpaper.addColorStop(0.45, "#091025");
  wallpaper.addColorStop(1, "#05060a");
  ctx.fillStyle = wallpaper;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalAlpha = 0.45;
  ctx.fillStyle = "rgba(59,130,246,0.35)";
  ctx.beginPath();
  ctx.ellipse(canvas.width * 0.72, canvas.height * 0.35, 340, 240, -0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  const margin = 46;
  const winX = margin;
  const winY = 52;
  const winW = canvas.width - margin * 2;
  const winH = canvas.height - 128;
  const r = 28;

  ctx.save();
  roundRectPath(ctx, winX, winY, winW, winH, r);
  ctx.clip();

  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.fillRect(winX, winY, winW, winH);
  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.fillRect(winX, winY, winW, 64);

  ctx.fillStyle = "rgba(229,231,235,0.88)";
  ctx.font = "600 26px system-ui, -apple-system, Segoe UI, Roboto";
  ctx.textBaseline = "middle";
  ctx.fillText("AI Workstation", winX + 26, winY + 32);

  const tabAreaLeft = winX + 56;
  const tabAreaRight = winX + winW - 56;
  const tabY = winY + 80;
  const tabH = 44;
  const tabW = (tabAreaRight - tabAreaLeft) / tabs.length;

  ctx.font = "600 18px system-ui, -apple-system, Segoe UI, Roboto";
  tabs.forEach((id, idx) => {
    const t = tools.find((x) => x.id === id);
    if (!t) return;
    const x = tabAreaLeft + idx * tabW;
    const isActive = id === selected.id;

    ctx.fillStyle = isActive ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)";
    roundRectPath(ctx, x + 4, tabY, tabW - 8, tabH, 14);
    ctx.fill();

    ctx.fillStyle = isActive ? "rgba(229,231,235,0.92)" : "rgba(229,231,235,0.68)";
    ctx.fillText(t.label, x + 18, tabY + tabH / 2);

    if (isActive) {
      ctx.fillStyle = t.accent;
      ctx.globalAlpha = 0.9;
      ctx.fillRect(x + 10, tabY + tabH - 4, tabW - 20, 3);
      ctx.globalAlpha = 1;
    }
  });

  const contentX = winX + 26;
  const contentY = tabY + tabH + 22;
  const contentW = winW - 52;
  const contentH = winH - (contentY - winY) - 26;

  ctx.fillStyle = "rgba(2,6,23,0.55)";
  roundRectPath(ctx, contentX, contentY, contentW, contentH, 22);
  ctx.fill();

  ctx.fillStyle = selected.accent;
  ctx.globalAlpha = 0.9;
  ctx.beginPath();
  ctx.arc(contentX + 28, contentY + 34, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.fillStyle = "rgba(229,231,235,0.95)";
  ctx.font = "700 34px system-ui, -apple-system, Segoe UI, Roboto";
  ctx.fillText(selected.label, contentX + 48, contentY + 38);

  ctx.fillStyle = "rgba(229,231,235,0.74)";
  ctx.font = "500 22px system-ui, -apple-system, Segoe UI, Roboto";
  const startY = contentY + 86;
  const lineH = 34;
  selected.lines.slice(0, 10).forEach((l, i) => {
    ctx.fillText(`• ${l}`, contentX + 30, startY + i * lineH);
  });

  ctx.restore();

  const taskbarH = 54;
  const tbY = canvas.height - taskbarH - 18;
  const tbX = canvas.width * 0.18;
  const tbW = canvas.width * 0.64;

  ctx.fillStyle = "rgba(255,255,255,0.08)";
  roundRectPath(ctx, tbX, tbY, tbW, taskbarH, 18);
  ctx.fill();

  const icons = tabs.slice(0, lite ? 4 : 6);
  const iconGap = 46;
  const total = (icons.length - 1) * iconGap;
  let cx = canvas.width / 2 - total / 2;
  icons.forEach((id) => {
    const t = tools.find((x) => x.id === id);
    if (!t) return;
    ctx.fillStyle = id === selected.id ? t.accent : "rgba(229,231,235,0.55)";
    ctx.globalAlpha = id === selected.id ? 0.95 : 0.6;
    roundRectPath(ctx, cx - 14, tbY + 16, 28, 22, 8);
    ctx.fill();
    ctx.globalAlpha = 1;
    cx += iconGap;
  });

  ctx.strokeStyle = "rgba(255,255,255,0.10)";
  ctx.lineWidth = 10;
  ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createScreenCanvas() {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 576;
  return canvas;
}

export default function WorkstationScene({
  reducedMotion,
  variant,
  onFirstFrame,
  lite = false,
  interactive = false,
  view = "overview",
  onRequestView,
  selectedToolId = "rag",
  onSelectTool,
}: WorkstationSceneProps) {
  const { camera } = useThree();
  const rig = useRef<Group>(null);
  const tools = useRef<Group>(null);
  const introStart = useRef<number | null>(null);
  const didSignalFirstFrame = useRef(false);
  const controls = useRef<OrbitControlsImpl | null>(null);
  const [screenCanvas] = useState(() => createScreenCanvas());
  const [screenTexture] = useState(() => (screenCanvas ? new CanvasTexture(screenCanvas) : null));
  const viewRef = useRef<"overview" | "screen">("overview");
  const transitionStart = useRef<number | null>(null);

  const toolsData = useMemo<ToolSpec[]>(
    () => [
      { id: "rag", label: "RAG", accent: "#38bdf8", lines: ["Retrieval + generation", "Citations-first UX", "Chunking strategies", "Vector search", "Latency + cost"] },
      { id: "llm", label: "LLM", accent: "#93c5fd", lines: ["Prompting + orchestration", "Guardrails + safety", "Tool use", "Streaming UX", "Reliability"] },
      { id: "eval", label: "Eval", accent: "#a78bfa", lines: ["Regression tests", "Quality metrics", "Golden datasets", "Error analysis", "Release confidence"] },
      { id: "trae", label: "Trae", accent: "#60a5fa", lines: ["IDE workflow", "Fast iteration", "Code + docs", "Ship features", "Maintainable systems"] },
      { id: "vector", label: "Vector DB", accent: "#22c55e", lines: ["Embeddings", "Hybrid search", "Filters", "Index tuning", "Observability"] },
      { id: "python", label: "Python", accent: "#fbbf24", lines: ["Pipelines", "ETL", "APIs", "Prototyping", "Automation"] },
      { id: "ts", label: "TypeScript", accent: "#3b82f6", lines: ["Web apps", "UI systems", "Typed APIs", "DX", "Performance"] },
      { id: "docker", label: "Docker", accent: "#0ea5e9", lines: ["Deployments", "Reproducibility", "Local stacks", "CI", "Environments"] },
    ],
    [],
  );

  const visibleTools = useMemo(() => {
    if (!interactive) return [];
    if (lite) {
      return toolsData.filter((t) => ["rag", "llm", "eval", "trae"].includes(t.id));
    }
    return toolsData;
  }, [interactive, lite, toolsData]);

  const badgeTextures = useMemo(() => {
    const map = new Map<string, CanvasTexture>();
    visibleTools.forEach((t) => {
      const tex = makeLabelTexture(t.label, t.accent);
      if (tex) map.set(t.id, tex);
    });
    return map;
  }, [visibleTools]);

  const selectedTool = useMemo(() => {
    return toolsData.find((t) => t.id === selectedToolId) ?? toolsData[0];
  }, [selectedToolId, toolsData]);

  useEffect(() => {
    if (!screenCanvas) return;
    const ctx = screenCanvas.getContext("2d");
    if (!ctx) return;

    const tex = makeWindows11Texture(toolsData, selectedToolId, lite);
    if (tex) {
      ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
      ctx.drawImage(tex.image as HTMLCanvasElement, 0, 0);
      tex.dispose();
    } else {
      const fallback = makeScreenTexture(`${selectedTool.label}`, selectedTool.accent, selectedTool.lines);
      if (!fallback) return;
      ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
      ctx.drawImage(fallback.image as HTMLCanvasElement, 0, 0);
      fallback.dispose();
    }

    if (screenTexture) screenTexture.needsUpdate = true;
  }, [lite, screenCanvas, screenTexture, selectedTool.accent, selectedTool.label, selectedTool.lines, selectedToolId, toolsData]);

  const cameraIntroFrom = useMemo(() => new Vector3(0, 0.85, 6.2), []);
  const cameraIntroTo = useMemo(() => new Vector3(0, 0.22, 3.85), []);
  const cameraScreenTo = useMemo(() => new Vector3(0, 0.86, 1.55), []);
  const cameraScreenLook = useMemo(() => new Vector3(0, 0.82, 0.12), []);
  const cameraOverviewFrom = useMemo(() => new Vector3(0, 0.35, 4.3), []);
  const cameraOverviewLook = useMemo(() => new Vector3(0, 0.28, 0), []);

  useEffect(() => {
    if (!interactive) return;
    if (variant !== "hero") return;
    if (view !== "overview") return;

    camera.position.copy(cameraOverviewFrom);
    camera.lookAt(cameraOverviewLook);
    controls.current?.target?.set(cameraOverviewLook.x, cameraOverviewLook.y, cameraOverviewLook.z);
    controls.current?.update?.();
  }, [camera, cameraOverviewFrom, cameraOverviewLook, interactive, variant, view]);

  useEffect(() => {
    if (!interactive) return;
    if (variant !== "hero") return;

    if (viewRef.current !== view) {
      viewRef.current = view;
      transitionStart.current = null;

      const target = view === "screen" ? cameraScreenLook : cameraOverviewLook;
      controls.current?.target?.set(target.x, target.y, target.z);
      controls.current?.update?.();
    }
  }, [cameraOverviewLook, cameraScreenLook, interactive, variant, view]);

  useFrame((state, dt) => {
    if (!didSignalFirstFrame.current) {
      didSignalFirstFrame.current = true;
      onFirstFrame?.();
    }
    if (reducedMotion) return;

    const t = state.clock.getElapsedTime();
    const r = rig.current;
    const o = tools.current;

    if (variant === "intro") {
      if (introStart.current === null) introStart.current = t;
      const pRaw = MathUtils.clamp((t - introStart.current) / 1.1, 0, 1);
      const p = 1 - Math.pow(1 - pRaw, 3);
      state.camera.position.lerpVectors(cameraIntroFrom, cameraIntroTo, p);
      state.camera.lookAt(0, 0.28, 0);
    }

    if (variant === "hero" && interactive) {
      if (transitionStart.current === null) transitionStart.current = t;
      const elapsed = t - transitionStart.current;
      const duration = 0.55;
      const pRaw = MathUtils.clamp(elapsed / duration, 0, 1);
      const p = 1 - Math.pow(1 - pRaw, 3);

      const from = view === "screen" ? cameraOverviewFrom : cameraScreenTo;
      const to = view === "screen" ? cameraScreenTo : cameraOverviewFrom;
      const lookFrom = view === "screen" ? cameraOverviewLook : cameraScreenLook;
      const lookTo = view === "screen" ? cameraScreenLook : cameraOverviewLook;

      if (p < 1) {
        state.camera.position.lerpVectors(from, to, p);
        const lx = MathUtils.lerp(lookFrom.x, lookTo.x, p);
        const ly = MathUtils.lerp(lookFrom.y, lookTo.y, p);
        const lz = MathUtils.lerp(lookFrom.z, lookTo.z, p);
        state.camera.lookAt(lx, ly, lz);
      }
    }

    if (r) {
      if (variant === "hero" && interactive) {
        // Automatic rotation for the workstation
        // Only auto-rotate if not being manually rotated via OrbitControls
        const isUserRotating = controls.current?.active ?? false;
        if (!isUserRotating) {
          r.rotation.y += dt * 0.15; // Speed of automatic rotation
        }
        r.rotation.x = Math.sin(t * 0.35) * 0.05;
        r.position.y = Math.sin(t * 0.6) * 0.03;
      } else {
        const px = state.pointer.x;
        const py = state.pointer.y;
        r.rotation.y = MathUtils.damp(r.rotation.y, px * 0.45, 6, dt) + dt * 0.12;
        r.rotation.x = MathUtils.damp(r.rotation.x, -py * 0.18, 6, dt);
        r.position.y = Math.sin(t * 0.6) * 0.02;
      }
    }

    if (o) {
      o.rotation.y += dt * (lite ? 0.12 : 0.18);
    }
  });

  const orbitRadius = variant === "intro" ? 1.85 : 1.65;
  const orbitY = variant === "intro" ? 0.95 : 0.86;

  return (
    <>
      <color attach="background" args={["#05060a"]} />

      <ambientLight intensity={0.7} />
      <directionalLight position={[3.2, 3, 2.6]} intensity={1.15} color="#93c5fd" />
      <pointLight position={[-2.4, 1.6, 2.8]} intensity={0.85} color="#60a5fa" />
      <pointLight position={[2.4, -1.2, -2.6]} intensity={0.55} color="#a78bfa" />

      {variant === "hero" && interactive ? (
        <OrbitControls
          ref={controls}
          makeDefault
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          enableDamping={true}
          dampingFactor={0.08}
          rotateSpeed={0.7}
          minPolarAngle={view === "screen" ? 1.05 : 0.75}
          maxPolarAngle={view === "screen" ? 1.25 : 1.5}
          minAzimuthAngle={view === "screen" ? -0.35 : undefined}
          maxAzimuthAngle={view === "screen" ? 0.35 : undefined}
          minDistance={view === "screen" ? 1.25 : 1.35}
          maxDistance={view === "screen" ? 2.4 : 6.2}
          target={view === "screen" ? [cameraScreenLook.x, cameraScreenLook.y, cameraScreenLook.z] : [0, 0.28, 0]}
        />
      ) : null}

      <group ref={rig} position={[0, -0.25, 0]}>
        {lite ? (
          <mesh position={[0, -0.06, 0]}>
            <boxGeometry args={[3.2, 0.14, 2.2]} />
            <meshStandardMaterial color="#0b1220" metalness={0.15} roughness={0.6} />
          </mesh>
        ) : (
          <RoundedBox args={[3.2, 0.14, 2.2]} radius={0.14} smoothness={6} position={[0, -0.06, 0]}>
            <meshStandardMaterial color="#0b1220" metalness={0.15} roughness={0.6} />
          </RoundedBox>
        )}

        <group position={[0, 0.42, 0]}>
          {lite ? (
            <mesh position={[0, 0.54, 0]}>
              <boxGeometry args={[1.74, 1.12, 0.14]} />
              <meshStandardMaterial color="#090b12" metalness={0.2} roughness={0.45} />
            </mesh>
          ) : (
            <RoundedBox args={[1.74, 1.12, 0.14]} radius={0.12} smoothness={8} position={[0, 0.54, 0]}>
              <meshStandardMaterial color="#090b12" metalness={0.2} roughness={0.45} />
            </RoundedBox>
          )}

          <mesh
            position={[0, 0.54, 0.085]}
            onPointerDown={(e) => {
              if (!interactive) return;
              e.stopPropagation();
              if (view === "overview") {
                onRequestView?.("screen");
                return;
              }

              const uv = e.uv;
              if (!uv) return;
              const u = uv.x;
              const v = uv.y;

              const windowLeft = 0.07;
              const windowRight = 0.93;
              const windowTop = 0.92;
              const windowBottom = 0.18;

              const inWindow = u >= windowLeft && u <= windowRight && v >= windowBottom && v <= windowTop;
              if (!inWindow) return;

              const tabTop = 0.86;
              const tabBottom = 0.76;
              const inTabs = v >= tabBottom && v <= tabTop;
              if (!inTabs) return;

              const tabs = lite ? ["rag", "llm", "eval", "trae"] : ["rag", "llm", "eval", "trae", "vector", "python", "ts", "docker"];
              const tabLeft = 0.12;
              const tabRight = 0.88;
              if (u < tabLeft || u > tabRight) return;
              const idx = Math.floor(((u - tabLeft) / (tabRight - tabLeft)) * tabs.length);
              const next = tabs[MathUtils.clamp(idx, 0, tabs.length - 1)];
              onSelectTool?.(next);
            }}
          >
            <planeGeometry args={[1.5, 0.86]} />
            <meshBasicMaterial map={screenTexture ?? undefined} toneMapped={false} />
          </mesh>

          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.62, 20]} />
            <meshStandardMaterial color="#0b1220" metalness={0.35} roughness={0.35} />
          </mesh>
          <mesh position={[0, -0.26, 0.18]} rotation={[MathUtils.degToRad(-16), 0, 0]}>
            <cylinderGeometry args={[0.42, 0.55, 0.14, 28]} />
            <meshStandardMaterial color="#0b1220" metalness={0.25} roughness={0.45} />
          </mesh>
        </group>

        {lite ? (
          <mesh position={[0, 0.05, 0.55]}>
            <boxGeometry args={[2.2, 0.14, 0.86]} />
            <meshStandardMaterial color="#0b1220" metalness={0.2} roughness={0.55} />
          </mesh>
        ) : (
          <RoundedBox args={[2.2, 0.14, 0.86]} radius={0.12} smoothness={8} position={[0, 0.05, 0.55]}>
            <meshStandardMaterial color="#0b1220" metalness={0.2} roughness={0.55} />
          </RoundedBox>
        )}
        <mesh position={[0.92, 0.07, 0.6]}>
          <sphereGeometry args={[0.085, 22, 22]} />
          <meshStandardMaterial color="#0b1220" metalness={0.25} roughness={0.5} />
        </mesh>

        {interactive ? (
          <group ref={tools}>
            {visibleTools.map((tool, i) => {
              const angle = (i / visibleTools.length) * Math.PI * 2;
              const x = Math.cos(angle) * orbitRadius;
              const z = Math.sin(angle) * orbitRadius;
              const tilt = Math.sin(angle * 2) * 0.08;
              const tex = badgeTextures.get(tool.id);
              return (
                <group key={tool.id} position={[x, orbitY + tilt, z]}>
                  <mesh
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      onSelectTool?.(tool.id);
                    }}
                  >
                    <planeGeometry args={[0.86, 0.42]} />
                    <meshBasicMaterial map={tex ?? undefined} toneMapped={false} />
                  </mesh>
                </group>
              );
            })}
          </group>
        ) : null}
      </group>

      {lite ? null : (
        <Sparkles
          count={variant === "intro" ? 95 : 70}
          size={variant === "intro" ? 2.4 : 2}
          scale={variant === "intro" ? [7, 4, 7] : [6, 3.4, 6]}
          speed={reducedMotion ? 0 : 0.22}
          opacity={0.55}
        />
      )}
    </>
  );
}
