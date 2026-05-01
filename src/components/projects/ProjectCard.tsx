import { makeImageUrl, type Project } from "@/data/site";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import BrowserWindow from "@/components/ui/BrowserWindow";

export default function ProjectCard({
  project,
  onOpen,
  compact,
}: {
  project: Project;
  onOpen?: (id: string) => void;
  compact?: boolean;
}) {
  const primaryLink = project.links.find(l => l.label.toLowerCase().includes('live')) || project.links[0];

  return (
    <div
      className={cn(
        "group transition-transform duration-500 hover:-translate-y-2",
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
      <BrowserWindow 
        url={primaryLink?.href}
        className="h-full"
      >
        <div className={cn("relative overflow-hidden", compact ? "h-40" : "h-52")}>
          <img
            src={makeImageUrl(project.imagePrompt, "landscape_4_3")}
            alt={project.title}
            className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:opacity-100 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />
          
          {/* Project Header Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-black uppercase tracking-widest text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-tight text-white/50 line-clamp-1">
                  {project.summary}
                </div>
              </div>
              {onOpen ? (
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/80 transition duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-400 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              ) : null}
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map(t => (
                <span key={t} className="rounded-sm border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-white/40 group-hover:text-blue-400/60 transition-colors">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </BrowserWindow>
    </div>
  );
}

