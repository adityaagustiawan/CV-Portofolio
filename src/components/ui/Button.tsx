import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

export default function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 disabled:pointer-events-none disabled:opacity-50",
        size === "md" ? "h-10 px-4" : "h-9 px-3",
        variant === "primary" && "bg-blue-500 text-white hover:bg-blue-400",
        variant === "secondary" && "border border-black/10 bg-black/5 text-zinc-900 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
        variant === "ghost" && "bg-transparent text-zinc-900 hover:bg-black/10 dark:text-white dark:hover:bg-white/10",
        className
      )}
    />
  );
}

