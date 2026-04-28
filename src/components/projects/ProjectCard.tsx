import { makeImageUrl, type Project } from "@/data/site";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({
  project,
  onOpen,
  compact,
}: {
  project: Project;
  onOpen?: (id: string) => void;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "group overflow-hidden rounded-2xl border border-black/10 bg-black/5 transition hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
        onOpen && "cursor-pointer"
      )}
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onClick={onOpen ? () => onOpen(project.id) : undefined}
      onKeyDown={
        onOpen
          ? e => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen(project.id);
              }
            }
          : undefined
      }
    >
      <div className={cn("relative", compact ? "h-40" : "h-48")}>
        <img
          src={makeImageUrl(project.imagePrompt, "landscape_4_3")}
          alt={project.title}
          className="h-full w-full object-cover opacity-90 transition duration-300 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/10 to-transparent" />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-zinc-900 dark:text-white">{project.title}</div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-white/70">{project.summary}</div>
          </div>
          {onOpen ? (
            <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-black/5 text-zinc-700 transition group-hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:group-hover:bg-white/10">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map(t => (
            <span key={t} className="rounded-full border border-black/10 bg-black/5 px-2.5 py-1 text-xs text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

