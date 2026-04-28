import type { SocialLink } from "@/data/site";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

export default function SocialLinks({
  links,
  className,
  iconOnly,
  size = "md",
}: {
  links: SocialLink[];
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md";
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {links.map(link => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={cn(
              "group relative inline-flex items-center gap-2 overflow-hidden rounded-lg border border-black/10 bg-black/5 px-3 text-sm text-zinc-900 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white/90",
              "hover:bg-black/10 dark:hover:bg-white/10",
              "will-change-transform",
              size === "sm" ? "h-9" : "h-10",
              iconOnly && "w-10 justify-center px-0"
            )}
            aria-label={link.label}
            title={link.label}
            style={{ transform: "translate3d(var(--tx, 0px), var(--ty, 0px), 0)" } as CSSProperties}
            onPointerMove={(e) => {
              const el = e.currentTarget;
              const rect = el.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const dx = x - rect.width / 2;
              const dy = y - rect.height / 2;
              el.style.setProperty("--x", `${x}px`);
              el.style.setProperty("--y", `${y}px`);
              el.style.setProperty("--tx", `${dx * 0.06}px`);
              el.style.setProperty("--ty", `${dy * 0.06}px`);
            }}
            onPointerLeave={(e) => {
              const el = e.currentTarget;
              el.style.setProperty("--tx", "0px");
              el.style.setProperty("--ty", "0px");
            }}
          >
            <span
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(140px circle at var(--x, 50%) var(--y, 50%), rgba(59,130,246,0.22), transparent 62%)",
              }}
              aria-hidden="true"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true" />

            <Icon className={cn("relative h-4 w-4 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3")} />
            {!iconOnly ? <span className="text-xs font-medium">{link.label}</span> : null}
          </a>
        );
      })}
    </div>
  );
}

