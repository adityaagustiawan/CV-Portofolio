import { useCallback, useMemo } from "react";

export function useSessionFlag(key: string) {
  const safeKey = useMemo(() => `session:${key}`, [key]);

  const get = useCallback(() => {
    try {
      return sessionStorage.getItem(safeKey) === "1";
    } catch {
      return false;
    }
  }, [safeKey]);

  const set = useCallback(
    (value: boolean) => {
      try {
        sessionStorage.setItem(safeKey, value ? "1" : "0");
      } catch {
        return;
      }
    },
    [safeKey]
  );

  return { get, set };
}
