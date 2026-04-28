import Container from "@/components/layout/Container";
import Chip from "@/components/ui/Chip";
import { site, type Certificate, type CertificateCategory } from "@/data/site";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";

const categories: ("All" | CertificateCategory)[] = ["All", "Achievement", "Webinar"];

function CertificateCard({ certificate }: { certificate: Certificate }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-black/5 p-5 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-white/60">{certificate.category}</div>
          <div className="mt-2 text-sm font-semibold text-zinc-900 dark:text-white">{certificate.title}</div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-white/70">
            {certificate.issuer} • {certificate.date}
          </div>
        </div>

        {certificate.links?.[0] ? (
          <a
            href={certificate.links[0].href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-black/5 text-zinc-700 transition hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
            aria-label={certificate.links[0].label}
            title={certificate.links[0].label}
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : null}
      </div>

      {certificate.description ? <div className="mt-3 text-sm text-zinc-600 dark:text-white/70">{certificate.description}</div> : null}

      {certificate.skills?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {certificate.skills.slice(0, 6).map(s => (
            <span key={s} className="rounded-full border border-black/10 bg-black/5 px-2.5 py-1 text-xs text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
              {s}
            </span>
          ))}
        </div>
      ) : null}

      {certificate.links && certificate.links.length > 1 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {certificate.links.slice(1).map(l => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-300 dark:hover:text-blue-200"
            >
              {l.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function Certificates() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");

  const { achievements, webinars } = useMemo(() => {
    const all = site.certificates ?? [];
    const filtered = filter === "All" ? all : all.filter(c => c.category === filter);
    return {
      achievements: filtered.filter(c => c.category === "Achievement"),
      webinars: filtered.filter(c => c.category === "Webinar"),
    };
  }, [filter]);

  return (
    <Container className="py-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-white/60">Certificates</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Achievements and webinars</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-white/70">
            A curated list of certificates and learning milestones. Split by achievements (badges/certifications) and webinars (attendance/participation).
          </p>
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          {categories.map(c => (
            <Chip key={c} type="button" selected={filter === c} onClick={() => setFilter(c)}>
              {c}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-8">
        <section className="space-y-4">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-sm font-semibold">Achievements</h2>
            <div className="text-sm text-zinc-600 dark:text-white/70">{achievements.length} item(s)</div>
          </div>

          {achievements.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {achievements.map(c => (
                <CertificateCard key={c.id} certificate={c} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-black/10 bg-black/5 p-5 text-sm text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
              No achievements yet for this filter.
            </div>
          )}
        </section>

        <section className="space-y-4">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-sm font-semibold">Webinars</h2>
            <div className="text-sm text-zinc-600 dark:text-white/70">{webinars.length} item(s)</div>
          </div>

          {webinars.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {webinars.map(c => (
                <CertificateCard key={c.id} certificate={c} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-black/10 bg-black/5 p-5 text-sm text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
              No webinars yet for this filter.
            </div>
          )}
        </section>
      </div>
    </Container>
  );
}

