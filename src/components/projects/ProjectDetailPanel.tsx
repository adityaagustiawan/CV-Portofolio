import Button from "@/components/ui/Button";
import { makeImageUrl, type Project } from "@/data/site";
import { ExternalLink, X } from "lucide-react";

export default function ProjectDetailPanel({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-4xl rounded-t-2xl border border-white/10 bg-zinc-950 p-5 shadow-2xl md:inset-y-6 md:right-6 md:left-auto md:bottom-auto md:max-w-xl md:rounded-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-white/60">Project</div>
            <h2 className="mt-1 text-xl font-semibold">{project.title}</h2>
            <p className="mt-2 text-sm text-white/70">{project.description}</p>
          </div>
          <Button type="button" variant="ghost" size="sm" className="w-10 px-0" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <img
            src={makeImageUrl(project.imagePrompt, "landscape_16_9")}
            alt={project.title}
            className="h-48 w-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map(t => (
            <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5">
          <div className="text-sm font-semibold text-white">Highlights</div>
          <ul className="mt-2 space-y-2 text-sm text-white/70">
            {project.highlights.map(h => (
              <li key={h} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/70" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {project.links.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.links.map(l => (
              <a
                key={l.href}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <Button type="button" variant="secondary">
                  <ExternalLink className="h-4 w-4" />
                  {l.label}
                </Button>
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

