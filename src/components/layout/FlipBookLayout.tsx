import React, { useRef, forwardRef, useState, useMemo } from "react";
import HTMLFlipBook from "react-pageflip";
import { site, type Project } from "@/data/site";
import Certificates from "@/pages/Certificates";
import Resume from "@/pages/Resume";
import IntroOverlay from "@/components/intro/IntroOverlay";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Printer, ExternalLink, Github, ChevronLeft, ChevronRight, Menu, X, Sun, Moon } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import NeuralCanvas from "@/components/three/NeuralCanvas";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const Page = forwardRef<HTMLDivElement, { children: React.ReactNode; number: number; title?: string }>(
  (props, ref) => {
    return (
      <div className="page" ref={ref} data-density="hard">
        <div className="page-content h-full w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden relative flex flex-col">
          {props.title && (
            <div className="px-8 pt-8 pb-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50">
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">{props.title}</h2>
            </div>
          )}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
            {props.children}
          </div>
          <div className="p-4 text-center text-[10px] text-zinc-400 font-mono border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-800/30">
            {props.number}
          </div>
        </div>
      </div>
    );
  }
);

Page.displayName = "Page";

const ProjectPage = ({ project }: { project: Project }) => (
  <div className="space-y-6">
    <div className="aspect-video rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 group relative">
      <img 
        src={`https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(project.imagePrompt)}&image_size=landscape_16_9`} 
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
    </div>
    <div>
      <h3 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">{project.title}</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-blue-500/10 text-blue-500 dark:text-blue-400 rounded text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
            {tag}
          </span>
        ))}
      </div>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
        {project.description}
      </p>
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Highlights</h4>
        <ul className="space-y-2">
          {project.highlights.map((highlight, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-8 flex gap-3">
        {project.links.map(link => (
          <a 
            key={link.label} 
            href={link.href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform"
          >
            {link.label.toLowerCase().includes('github') || link.label.toLowerCase().includes('source') ? <Github className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </div>
);

type PageConfig = {
  type: string;
  title?: string;
  data?: Project;
};

interface PageFlipElement {
  pageFlip: () => {
    turnToPage: (page: number) => void;
    turnNext: () => void;
    turnPrev: () => void;
    getPageCount: () => number;
    getCurrentPageIndex: () => number;
  };
}

export default function FlipBookLayout() {
  const bookRef = useRef<PageFlipElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const { isDark, toggleTheme } = useTheme();
  const [isNavOpen, setIsNavOpen] = useState(false);

  // 3D Rotation state
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const exportPDF = async () => {
    const book = document.querySelector(".flip-book-container");
    if (!book) return;

    x.set(0);
    y.set(0);

    setTimeout(async () => {
      const canvas = await html2canvas(book as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null,
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${site.name.replace(/\s+/g, "_")}_Portfolio.pdf`);
    }, 100);
  };

  const pages: PageConfig[] = useMemo(() => [
    { type: 'cover' },
    { type: 'contents' },
    { type: 'about', title: 'About Me' },
    { type: 'what-i-do', title: 'What I Do' },
    ...site.projects.map(p => ({ type: 'project', title: 'Project', data: p })),
    { type: 'tech', title: 'Tech Stack' },
    { type: 'resume', title: 'Resume' },
    { type: 'certificates', title: 'Certificates' },
    { type: 'contact', title: 'Contact' },
    { type: 'back-cover' }
  ], []);

  return (
    <div 
      className="relative min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Background */}
      <NeuralCanvas reducedMotion={false} className="absolute inset-0 z-0 opacity-50" />
      
      <IntroOverlay />
      
      {/* Header / Nav */}
      <header className="fixed top-0 left-0 right-0 z-[60] px-6 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-4 bg-blue-500" />
            <span className="text-xl font-black tracking-tighter text-white uppercase">{site.name}</span>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-blue-500/80 ml-3">Portfolio · 2026</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white/50 hover:text-white transition-all"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="p-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white/50 hover:text-white transition-all"
            aria-label="Toggle Menu"
          >
            {isNavOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Navigation Overlay */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[55] bg-zinc-950/90 backdrop-blur-xl flex items-center justify-center p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
              {pages.slice(2, -1).map((page, i) => (
                <button
                  key={i}
                  onClick={() => {
                    bookRef.current?.pageFlip().turnToPage(i + 2);
                    setIsNavOpen(false);
                  }}
                  className="group relative p-6 rounded-2xl border border-white/5 bg-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all text-left"
                >
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">0{i + 1}</span>
                  <span className="block text-lg font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                    {page.title === 'Project' ? page.data?.title : page.title}
                  </span>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-5 h-5 text-blue-500" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed top-6 right-24 z-50 flex gap-2">
        <button
          onClick={exportPDF}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full shadow-lg hover:scale-105 transition-transform text-xs font-bold uppercase tracking-widest text-white"
        >
          <Printer className="w-4 h-4" />
          Export CV
        </button>
      </div>

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="flip-book-container relative perspective-[2000px] z-10"
      >
        <HTMLFlipBook
          width={550}
          height={733}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={(e) => setCurrentPage(e.data)}
          className="shadow-2xl rounded-sm overflow-hidden"
          ref={bookRef}
          style={{}}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={false}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {/* Cover */}
          <Page number={1}>
            <div className="h-full flex flex-col items-center justify-center p-12 bg-gradient-to-br from-zinc-50 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
              <div className="w-24 h-1 bg-blue-500 mb-8" />
              <h1 className="text-5xl font-black tracking-tighter mb-4 leading-tight text-zinc-900 dark:text-white uppercase">{site.name}</h1>
              <p className="text-xl text-blue-600 dark:text-blue-400 mb-12 font-bold uppercase tracking-widest">{site.role}</p>
              
              <div className="flex flex-wrap justify-center gap-3 opacity-80">
                {site.roles?.slice(0, 5).map(tag => (
                  <span key={tag} className="px-3 py-1 border border-zinc-300 dark:border-zinc-700 rounded-full text-[10px] font-bold tracking-widest uppercase text-zinc-600 dark:text-zinc-400">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto">
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-white/80 mb-8">
                  <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                  Status: Available
                </div>
                <div className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-30">Swipe to Enter</div>
              </div>
            </div>
          </Page>

          {/* Table of Contents */}
          <Page number={2} title="Contents">
            <div className="h-full flex flex-col justify-center space-y-8">
              <ul className="space-y-4">
                {pages.slice(2, -1).map((page, i) => (
                  <li 
                    key={i} 
                    className="flex items-center gap-6 group cursor-pointer border-b border-zinc-100 dark:border-zinc-800 pb-2 hover:border-blue-500 transition-colors" 
                    onClick={() => bookRef.current?.pageFlip().turnToPage(i + 2)}
                  >
                    <span className="text-zinc-200 dark:text-zinc-800 font-mono text-xl font-bold">0{i + 1}</span>
                    <span className="text-lg font-bold group-hover:text-blue-500 transition-colors uppercase tracking-tight">
                      {page.title === 'Project' ? page.data?.title : page.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Page>

          {/* About */}
          <Page number={3} title="01 · About Me">
            <div className="space-y-6">
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                {site.about.long}
              </p>
              <div className="pt-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Core Values</h4>
                <div className="grid gap-3">
                  {["Clear problem framing", "Reliable AI systems", "Practical shipping"].map(value => (
                    <div key={value} className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <p className="text-sm font-bold uppercase tracking-tight">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Page>

          {/* What I Do */}
          <Page number={4} title="02 · What I Do">
            <div className="grid gap-4">
              {[
                { title: "AI Engineering", desc: "Building and deploying machine learning models and LLM solutions." },
                { title: "Game Development", desc: "Creating immersive experiences with Unity and Unreal Engine." },
                { title: "MLOps", desc: "Designing robust pipelines for model training and deployment." },
                { title: "Software Solutions", desc: "Full-stack development with a focus on performance and UX." }
              ].map(item => (
                <div key={item.title} className="p-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 group hover:border-blue-500/30 transition-colors">
                  <h4 className="font-bold mb-1 text-zinc-900 dark:text-white uppercase tracking-tight">{item.title}</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </Page>

          {/* Projects */}
          {site.projects.map((project, i) => (
            <Page key={project.id} number={5 + i} title={`03 · Project 0${i + 1}`}>
              <ProjectPage project={project} />
            </Page>
          ))}

          {/* Tech Stack */}
          <Page number={8} title="04 · Tech Stack">
            <div className="space-y-8">
              {Object.entries(site.skills).map(([category, skills]) => (
                <div key={category}>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: string) => (
                      <span key={skill} className="px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-100 dark:border-zinc-800 text-xs font-bold uppercase tracking-tight text-zinc-700 dark:text-zinc-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Page>

          {/* Resume */}
          <Page number={9} title="05 · Resume">
            <Resume />
          </Page>

          {/* Certificates */}
          <Page number={10} title="06 · Certificates">
            <Certificates />
          </Page>

          {/* Contact */}
          <Page number={11} title="07 · Let's Connect">
            <div className="h-full flex flex-col justify-center text-center space-y-8">
              <div>
                <h3 className="text-3xl font-black tracking-tighter mb-4 uppercase">Get in touch</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                  I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                </p>
              </div>
              <div className="grid gap-3">
                <a href={`mailto:${site.email}`} className="p-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-lg shadow-blue-500/20">
                  Send Message
                </a>
                <div className="flex justify-center gap-3">
                  {site.socials.map(social => (
                    <a 
                      key={social.label} 
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl hover:scale-110 transition-transform border border-zinc-200 dark:border-zinc-700"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Page>

          {/* Back Cover */}
          <Page number={12}>
            <div className="h-full flex flex-col items-center justify-center p-12 bg-gradient-to-br from-zinc-200 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 text-center relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500" />
              <div className="w-24 h-1 bg-blue-500 mb-8" />
              <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase text-zinc-900 dark:text-white">{site.name}</h1>
              <p className="text-blue-600 dark:text-blue-400 mb-12 uppercase tracking-[0.3em] text-[10px] font-bold">{site.role}</p>
              <div className="mt-auto">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-30">© 2026 · ADYTIA AGUSTIAWAN</p>
              </div>
            </div>
          </Page>
        </HTMLFlipBook>

        {/* Navigation Arrows (Optional but helpful for desktop) */}
        <div className="absolute top-1/2 -left-16 -translate-y-1/2 hidden lg:block">
          <button 
            onClick={() => bookRef.current?.pageFlip().turnPrev()}
            className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/50 hover:text-white transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute top-1/2 -right-16 -translate-y-1/2 hidden lg:block">
          <button 
            onClick={() => bookRef.current?.pageFlip().turnNext()}
            className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/50 hover:text-white transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </motion.div>

      {/* Footer Info */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        <div className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
          ← Swipe or use arrows to explore →
        </div>
      </div>
    </div>
  );
}
