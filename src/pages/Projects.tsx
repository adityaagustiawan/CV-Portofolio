import Container from "@/components/layout/Container";
import ProjectDetailPanel from "@/components/projects/ProjectDetailPanel";
import ProjectCard from "@/components/projects/ProjectCard";
import Chip from "@/components/ui/Chip";
import { site, type Project } from "@/data/site";
import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

function uniqueTags(projects: Project[]) {
  const set = new Set<string>();
  projects.forEach(p => p.tags.forEach(t => set.add(t)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(() => searchParams.get("project"));

  const projects = site.projects;
  const tags = useMemo(() => uniqueTags(projects), [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter(p => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q));
      const matchesTags = selectedTags.length === 0 || selectedTags.every(t => p.tags.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [projects, query, selectedTags]);

  const activeProject = useMemo(() => (activeId ? projects.find(p => p.id === activeId) ?? null : null), [activeId, projects]);

  useEffect(() => {
    const id = searchParams.get("project");
    if (id && id !== activeId) {
      setActiveId(id);
    }
  }, [activeId, searchParams]);

  function openProject(id: string) {
    setActiveId(id);
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set("project", id);
      return next;
    });
  }

  function closeProject() {
    setActiveId(null);
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.delete("project");
      return next;
    });
  }

  return (
    <Container className="py-14">
      <div className="flex flex-col gap-2">
        <div className="text-xs font-semibold uppercase tracking-wide text-white/60">Projects</div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Selected work</h1>
        <p className="max-w-2xl text-sm text-white/70">
          Browse projects, filter by tech, and open a project to see highlights and links.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search projects..."
              className="h-10 w-full rounded-xl border border-white/10 bg-zinc-950/40 pl-10 pr-3 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-white/60">
            <SlidersHorizontal className="h-4 w-4" />
            <span>{filtered.length} results</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map(t => {
            const isSelected = selectedTags.includes(t);
            return (
              <Chip
                key={t}
                type="button"
                selected={isSelected}
                onClick={() =>
                  setSelectedTags(prev => (isSelected ? prev.filter(x => x !== t) : [...prev, t]))
                }
              >
                {t}
              </Chip>
            );
          })}
          {selectedTags.length || query.trim() ? (
            <Chip
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedTags([]);
              }}
            >
              Clear
            </Chip>
          ) : null}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(p => (
          <ProjectCard key={p.id} project={p} onOpen={openProject} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
          No projects match your search.
        </div>
      ) : null}

      {activeProject ? <ProjectDetailPanel project={activeProject} onClose={closeProject} /> : null}
    </Container>
  );
}

