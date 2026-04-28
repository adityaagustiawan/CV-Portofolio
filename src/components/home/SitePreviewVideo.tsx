import { motion } from "framer-motion";

const SITES = [
  {
    title: "AI Neural Network Interface",
    description: "Deep learning visualization and orchestration platform.",
    color: "bg-blue-600/20",
    border: "border-blue-500/30",
    tags: ["Neural", "LLM", "Scale"]
  },
  {
    title: "Personal Portfolio v4.0",
    description: "A showcase of technical expertise and creative design.",
    color: "bg-zinc-800/20",
    border: "border-white/10",
    tags: ["React", "3D", "UX"]
  },
  {
    title: "Data Analytics Engine",
    description: "Real-time stream processing and visualization dashboard.",
    color: "bg-indigo-600/20",
    border: "border-indigo-500/30",
    tags: ["Data", "Viz", "Fast"]
  },
  {
    title: "Edge Deployment Hub",
    description: "Managing global deployments at the edge with high reliability.",
    color: "bg-emerald-600/20",
    border: "border-emerald-500/30",
    tags: ["Ops", "Docker", "CI/CD"]
  }
];

export default function SitePreviewVideo() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-zinc-950/20">
      <motion.div 
        className="flex flex-col gap-8 p-8"
        animate={{
          y: ["0%", "-100%"]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...SITES, ...SITES].map((site, i) => (
          <div 
            key={i} 
            className={`w-full aspect-video rounded-xl border ${site.border} ${site.color} p-8 flex flex-col justify-end backdrop-blur-sm relative overflow-hidden group`}
          >
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
            
            <div className="relative z-10">
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Project Preview</div>
              <h4 className="text-2xl font-black tracking-tighter uppercase text-white mb-2">{site.title}</h4>
              <p className="text-sm text-white/60 mb-4 max-w-md">{site.description}</p>
              <div className="flex gap-2">
                {site.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 rounded-sm bg-white/5 border border-white/10 text-[8px] font-bold uppercase tracking-widest text-white/40">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Simulated "Site" Elements */}
            <div className="absolute top-8 right-8 flex gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Video Overlay Effects */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950 opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
}
