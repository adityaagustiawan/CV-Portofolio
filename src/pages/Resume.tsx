import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { site, type ResumeEntry } from "@/data/site";
import { FileDown, Printer } from "lucide-react";

function EntryCard({ entry }: { entry: ResumeEntry }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="text-sm font-semibold text-white">{entry.title}</div>
          <div className="mt-1 text-sm text-white/70">{entry.org}</div>
        </div>
        <div className="text-xs font-semibold text-white/50">{entry.period}</div>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-white/70">
        {entry.bullets.map(b => (
          <li key={b} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/70" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Resume() {
  return (
    <Container className="py-14">
      <div className="flex flex-col gap-2">
        <div className="text-xs font-semibold uppercase tracking-wide text-white/60">Resume</div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{site.name}</h1>
        <p className="max-w-2xl text-sm text-white/70">{site.resume.summary}</p>
      </div>

      <div className="no-print mt-7 flex flex-wrap gap-3">
        <a href="/CV_Adytia_Agustiawan.pdf" target="_blank" rel="noopener noreferrer">
          <Button type="button">
            <Printer className="h-4 w-4" />
            {site.resumeCtaLabel}
          </Button>
        </a>
        <a href="/Portfolio_Adytia_Agustiawan.pdf" target="_blank" rel="noopener noreferrer">
          <Button type="button" variant="secondary">
            <FileDown className="h-4 w-4" />
            Download Portfolio
          </Button>
        </a>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="text-sm font-semibold">Experience</div>
          <div className="space-y-4">
            {site.resume.experience.map(e => (
              <EntryCard key={`${e.title}-${e.org}`} entry={e} />
            ))}
          </div>

          <div className="mt-10 text-sm font-semibold">Education</div>
          <div className="mt-4 space-y-4">
            {site.resume.education.map(e => (
              <EntryCard key={`${e.title}-${e.org}`} entry={e} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-semibold">Skills</div>
            <div className="mt-4 space-y-4">
              {Object.entries(site.skills).map(([group, items]) => (
                <div key={group} className="rounded-xl border border-white/10 bg-zinc-950/40 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-white/60">{group}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {items.map(s => (
                      <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-semibold">Contact</div>
            <div className="mt-2 text-sm text-white/70">{site.email}</div>
            <div className="mt-4 text-xs text-white/50">Tip: use “Print PDF” to export.</div>
          </div>
        </div>
      </div>
    </Container>
  );
}

