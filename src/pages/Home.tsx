import SitePreviewVideo from "@/components/home/SitePreviewVideo";
import Container from "@/components/layout/Container";
import WorkstationCanvas from "@/components/three/WorkstationCanvas";
import ProjectCard from "@/components/projects/ProjectCard";
import Button from "@/components/ui/Button";
import AnimatedName from "@/components/hero/AnimatedName";
import TypewriterRole from "@/components/hero/TypewriterRole";
import BrowserWindow from "@/components/ui/BrowserWindow";
import { site } from "@/data/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { motion, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Mail, Monitor, Activity, Cpu, Database, Terminal, Shield, Zap, Layout, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Home() {
  const reducedMotion = usePrefersReducedMotion();
  const [view, setView] = useState<"overview" | "screen">("overview");
  const [tool, setTool] = useState<string>("rag");
  const [isInteracting, setIsInteracting] = useState(false);
  
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });
  const rotateX = useTransform(mouseY, [-20, 20], [5, -5]);
  const rotateY = useTransform(mouseX, [-20, 20], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 40);
    mouseY.set((clientY / innerHeight - 0.5) * 40);
  };

  return (
    <motion.div 
      className="relative min-h-screen overflow-x-hidden will-change-transform"
      onMouseMove={handleMouseMove}
      style={{
        rotateX,
        rotateY,
        perspective: "1200px",
        backfaceVisibility: "hidden"
      }}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Immersive 3D Background - "Out of the box" */}
        <motion.div 
          className="absolute inset-0 z-0 overflow-visible pointer-events-auto"
          style={{
            x: mouseX,
            y: mouseY,
            scale: 1.05
          }}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
        >
          <WorkstationCanvas
            reducedMotion={reducedMotion}
            className={cn(
              "h-full w-full transition-opacity duration-1000",
              isInteracting ? 'opacity-100' : 'opacity-40'
            )}
            interactive={true}
            view={view}
            onViewChange={setView}
            selectedTool={tool}
            onSelectedToolChange={setTool}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-zinc-950/80" />
        </motion.div>

        <Container className="relative z-10 py-20 pointer-events-none">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="pointer-events-none"
            >
              <div className="inline-flex items-center gap-3 rounded-sm border-l-2 border-blue-500 bg-blue-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400 backdrop-blur-md pointer-events-auto w-fit">
                <Activity className="h-3 w-3 animate-pulse" />
                Operational Status: Active
              </div>

              <h1 className="mt-8 text-5xl font-black tracking-tighter sm:text-7xl lg:text-8xl pointer-events-auto">
                <div className="text-white opacity-20 text-sm tracking-[0.5em] font-bold uppercase mb-2">Subject Name</div>
                <div className="text-glow">
                  <AnimatedName value={site.name} reducedMotion={reducedMotion} />
                </div>
                <div className="mt-4 border-t border-white/10 pt-4">
                  <TypewriterRole roles={site.roles || [site.role]} />
                </div>
              </h1>

              <div className="mt-8 p-6 rounded-lg bg-zinc-900/40 border border-white/5 backdrop-blur-xl max-w-xl pointer-events-auto">
                <p className="text-lg leading-relaxed text-white/80 font-medium">
                  {site.about.short}
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4 pointer-events-auto">
                <Link to="/projects">
                  <Button 
                    type="button" 
                    className="group relative overflow-hidden bg-blue-600 px-8 py-6 text-sm font-bold uppercase tracking-widest transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Initialize Projects
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button 
                    type="button" 
                    variant="secondary"
                    className="border-white/10 bg-white/5 px-8 py-6 text-sm font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white/20"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Establish Contact
                  </Button>
                </Link>
              </div>

              <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { label: "Core Focus", value: "AI Architecture", icon: Cpu },
                  { label: "System Stack", value: "Neural Networks", icon: Database },
                  { label: "Deployment", value: "Edge Computing", icon: Monitor }
                ].map((stat, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-sm border border-white/5 bg-white/5 p-4 backdrop-blur-md transition-colors hover:border-blue-500/30">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-blue-400 transition-colors">{stat.label}</div>
                      <stat.icon className="h-3 w-3 text-white/20 group-hover:text-blue-400/50 transition-colors" />
                    </div>
                    <div className="mt-1 text-sm font-black uppercase tracking-tight text-white">{stat.value}</div>
                    <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-blue-500 transition-all duration-500 group-hover:w-full" />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative h-full min-h-[400px] flex items-center justify-center pointer-events-none"
            >
              {/* The HUD was removed per user request to clean up the interface */}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* System Specifications (Skills) */}
      <section className="relative z-10 py-32 overflow-hidden bg-zinc-950/40 backdrop-blur-sm border-y border-white/5">
        {/* Background Site Preview - "Video of sites" effect */}
        <div className="absolute inset-0 z-0 opacity-40">
          <SitePreviewVideo />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-transparent to-zinc-950/80" />
        </div>

        <Container className="relative z-10">
          <div className="mb-16">
            <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500 mb-2">Technical Registry</div>
            <h2 className="text-4xl font-black tracking-tighter uppercase sm:text-5xl">System Specifications</h2>
            <div className="mt-4 h-1 w-20 bg-blue-500" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { 
                category: "Languages", 
                skills: site.skills["Languages"], 
                icon: Cpu,
                desc: "Proficiency in modern programming and scripting languages.",
                url: "adytia.dev/languages"
              },
              { 
                category: "Frontend", 
                skills: site.skills["Frontend"], 
                icon: Layout,
                desc: "Building reactive, high-fidelity interfaces and 3D web experiences.",
                url: "adytia.dev/frontend-engine"
              },
              { 
                category: "Backend", 
                skills: site.skills["Backend"], 
                icon: Database,
                desc: "Scalable server-side logic and real-time database management.",
                url: "adytia.dev/backend-services"
              },
              { 
                category: "AI & Tools", 
                skills: site.skills["AI & Tools"], 
                icon: Terminal,
                desc: "Integration of AI models, automation flows, and production tooling.",
                url: "adytia.dev/ai-tools"
              }
            ].map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <BrowserWindow 
                  url={group.url}
                  className="h-full"
                >
                  <div className="p-6">
                    <div className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <group.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-md font-black uppercase tracking-widest text-white mb-2">{group.category}</h3>
                    <p className="text-[9px] text-white/40 mb-6 uppercase tracking-[0.2em] leading-relaxed line-clamp-2">{group.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills?.map((skill, j) => (
                        <span key={j} className="px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest text-white/50 group-hover:border-blue-500/30 group-hover:text-blue-400 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="absolute top-0 right-0 p-3 text-[8px] font-mono text-white/5 group-hover:text-blue-500/20">NODE_{i + 1}</div>
                  </div>
                </BrowserWindow>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Operations (Projects) */}
      <section className="relative z-10 py-32 overflow-hidden">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500 mb-2">Active Deployments</div>
              <h2 className="text-4xl font-black tracking-tighter uppercase sm:text-5xl">Featured Operations</h2>
            </div>
            <Link to="/projects">
              <Button variant="ghost" className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 hover:text-blue-400 group">
                View All Missions <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {site.projects.slice(0, 3).map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </Container>

        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-[10%] w-px h-full bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />
      </section>

      {/* Mission Briefing (About) CTA */}
      <section className="relative z-10 py-32 bg-blue-600/5 border-y border-white/5 backdrop-blur-sm">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/20 mb-8 border border-blue-500/30">
              <Zap className="h-10 w-10 text-blue-400 animate-pulse" />
            </div>
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-6">Ready to Initialize?</h2>
            <p className="text-xl text-white/60 mb-10 leading-relaxed uppercase tracking-tight">
              Bridging the gap between complex technical systems and user-centric design through AI, Game Dev, and MLOps.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/contact">
                <Button className="bg-white text-zinc-950 hover:bg-blue-500 hover:text-white px-10 py-8 text-sm font-bold uppercase tracking-[0.2em] transition-all">
                  Start Briefing
                </Button>
              </Link>
              <Link to="/resume">
                <Button variant="secondary" className="border-white/20 bg-transparent hover:bg-white/5 px-10 py-8 text-sm font-bold uppercase tracking-[0.2em]">
                  Download Protocol
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </motion.div>
  );
}

