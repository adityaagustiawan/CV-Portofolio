import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

export default function Chip({
  className,
  selected,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-full border px-3 text-xs font-medium transition",
        selected
          ? "border-blue-400/30 bg-blue-500/10 text-blue-100"
          : "border-black/10 bg-black/5 text-zinc-700 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10",
        className
      )}
    />
  );
}

