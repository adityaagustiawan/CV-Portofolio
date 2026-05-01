import Container from "@/components/layout/Container";
import NavItemLink from "@/components/layout/NavItemLink";
import SocialLinks from "@/components/layout/SocialLinks";
import Button from "@/components/ui/Button";
import { site } from "@/data/site";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function SiteHeader() {
  const { isDark, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const primaryNav = useMemo(() => site.nav, []);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-white/5 bg-zinc-950/20 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      <Container className="relative flex h-16 items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="group flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-bold tracking-[0.2em] text-white focus-visible:outline-none pointer-events-auto"
            aria-label="Go to Home"
            onClick={() => setOpen(false)}
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-lg bg-blue-500/20 ring-1 ring-blue-500/30 group-hover:ring-blue-400 transition-all duration-300 isolate">
              <img 
                src="/profile.svg" 
                alt={site.name}
                className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity transform-gpu"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent pointer-events-none" />
            </div>
            <span className="hidden sm:inline uppercase text-glow will-change-[text-shadow]">{site.name}</span>
          </Link>

          <nav className="hidden items-center gap-4 md:flex" aria-label="Primary navigation">
            {primaryNav.map(item => (
              <NavItemLink 
                key={item.to} 
                to={item.to} 
                label={item.label} 
                className="uppercase tracking-widest text-[10px] font-bold text-white/50 hover:text-white transition-colors"
              />
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="text-[10px] font-bold uppercase tracking-tighter text-white/60">System Online</span>
          </div>

          <div className="hidden lg:block">
            <SocialLinks links={site.socials} iconOnly size="sm" />
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            title={isDark ? "Light" : "Dark"}
            className="w-10 px-0 text-white/50 hover:text-white hover:bg-white/5"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            className={cn("md:hidden bg-white/5 border-white/10", open && "bg-white/10")}
            onClick={() => setOpen(v => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </Container>

      {open ? (
        <div className="md:hidden">
          <Container className="pb-4">
            <div className="rounded-xl border border-black/10 bg-black/5 p-3 dark:border-white/10 dark:bg-white/5">
              <div className="flex flex-col gap-1">
                {primaryNav.map(item => (
                  <NavItemLink key={item.to} to={item.to} label={item.label} onNavigate={() => setOpen(false)} />
                ))}
              </div>
              <div className="mt-3 border-t border-black/10 pt-3 dark:border-white/10">
                <SocialLinks links={site.socials} size="sm" />
              </div>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

