import Container from "@/components/layout/Container";
import SocialLinks from "@/components/layout/SocialLinks";
import { site } from "@/data/site";
import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="no-print border-t border-black/10 bg-white dark:border-white/10 dark:bg-zinc-950">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-zinc-900 dark:text-white">{site.name}</div>
            <div className="text-sm text-zinc-600 dark:text-white/70">{site.tagline}</div>
            <div className="text-xs text-zinc-500 dark:text-white/50">{site.location}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-zinc-900 dark:text-white">Pages</div>
            <div className="flex flex-col gap-1">
              {site.nav.map(item => (
                <Link key={item.to} to={item.to} className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-white/70 dark:hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-zinc-900 dark:text-white">Social</div>
            <SocialLinks links={site.socials} />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
          <div className="text-xs text-zinc-500 dark:text-white/50">© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
          <a href="#top" className="text-xs text-zinc-600 transition hover:text-zinc-900 dark:text-white/70 dark:hover:text-white">
            Back to top
          </a>
        </div>
      </Container>
    </footer>
  );
}

