import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export default function NavItemLink({ to, label, onNavigate, className }: { to: string; label: string; onNavigate?: () => void; className?: string }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60",
          isActive
            ? "bg-black/10 text-zinc-900 dark:bg-white/10 dark:text-white"
            : "text-zinc-700 hover:bg-black/5 hover:text-zinc-900 dark:text-white/80 dark:hover:bg-white/5 dark:hover:text-white",
          className
        )
      }
      end={to === "/"}
    >
      {label}
    </NavLink>
  );
}

