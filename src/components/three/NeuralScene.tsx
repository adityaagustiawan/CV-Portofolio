import { Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";

type NeuralSceneProps = {
  reducedMotion: boolean;
  variant: "hero" | "intro";
};

export default function NeuralScene({ reducedMotion, variant }: NeuralSceneProps) {
  const group = useRef<Group>(null);

  const config = useMemo(() => {
    if (variant === "intro") {
      return {
        knot: { scale: 1.12, position: [0, 0.05, 0] as const },
        orb: { scale: 0.72, position: [1.25, -0.6, -0.6] as const },
        sparkles: { size: 2.2, count: 70, scale: [6, 3, 6] as [number, number, number] },
      };
    }
    return {
      knot: { scale: 1, position: [0, 0, 0] as const },
      orb: { scale: 0.64, position: [1.05, -0.5, -0.5] as const },
      sparkles: { size: 2, count: 60, scale: [5, 2.8, 5] as [number, number, number] },
    };
  }, [variant]);

  useFrame((state, dt) => {
    if (reducedMotion) return;
    const g = group.current;
    if (!g) return;

    const t = state.clock.getElapsedTime();
    const px = state.pointer.x;
    const py = state.pointer.y;

    g.rotation.y += dt * 0.18;
    g.rotation.x = (Math.sin(t * 0.45) * 0.12 + py * 0.25) * 0.85;
    g.rotation.z = Math.sin(t * 0.25) * 0.05;
    g.position.x = px * 0.08;
    g.position.y = py * 0.06;
  });

  return (
    <>
      <color attach="background" args={["#05060a"]} />
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 2, 3]} intensity={1.1} color="#93c5fd" />
      <pointLight position={[-2.5, -1.4, 2.4]} intensity={0.9} color="#60a5fa" />

      <group ref={group}>
        <mesh position={config.knot.position} scale={config.knot.scale}>
          <torusKnotGeometry args={[0.72, 0.22, 170, 20]} />
          <meshStandardMaterial color="#93c5fd" emissive="#1d4ed8" emissiveIntensity={0.55} metalness={0.4} roughness={0.15} />
        </mesh>

        <mesh position={config.orb.position} scale={config.orb.scale}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color="#e5e7eb" emissive="#60a5fa" emissiveIntensity={0.3} metalness={0.25} roughness={0.3} />
        </mesh>
      </group>

      <Sparkles count={config.sparkles.count} size={config.sparkles.size} scale={config.sparkles.scale} speed={reducedMotion ? 0 : 0.25} opacity={0.6} />
    </>
  );
}
