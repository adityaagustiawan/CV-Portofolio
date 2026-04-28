import { useEffect, useState } from "react";

function supportsWebGL() {
  if (typeof window === "undefined") return true;
  if (typeof document === "undefined") return true;

  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

export function useWebGLSupport() {
  const [supported, setSupported] = useState(() => supportsWebGL());

  useEffect(() => {
    setSupported(supportsWebGL());
  }, []);

  return supported;
}

