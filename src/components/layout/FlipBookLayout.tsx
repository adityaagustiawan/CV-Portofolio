import React, { useRef, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { site, type Project } from "@/data/site";
import Certificates from "@/pages/Certificates";
import Resume from "@/pages/Resume";
import IntroOverlay from "@/components/intro/IntroOverlay";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Printer, ExternalLink, Github } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Page = forwardRef<HTMLDivElement, { children: React.ReactNode; number: number; title?: string }>(
  (props, ref) => {
    return (
      <div className="page" ref={ref} data-density="hard">
        <div className="page-content h-full w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden relative flex flex-col">
          {props.title && (
            <div className="px-8 pt-8 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">{props.title}</h2>
            </div>
          )}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {props.children}
          </div>
          <div className="p-4 text-center text-xs text-zinc-400 font-mono border-t border-zinc-100 dark:border-zinc-800">
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
    <div className="aspect-video rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
      <img 
        src={`https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(project.imagePrompt)}&image_size=landscape_16_9`} 
        alt={project.title}
        className="w-full h-full object-cover"
      />
    </div>
    <div>
      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px] font-bold uppercase tracking-wider">
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
            <li key={i} className="flex items-center gap-3 text-sm">
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
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
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
  };
}

export default function FlipBookLayout() {
  const bookRef = useRef<PageFlipElement>(null);

  // 3D Rotation state
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

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

    // To capture properly, we temporarily reset the 3D rotation
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

  const pages: PageConfig[] = [
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
  ];

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-zinc-100 dark:bg-zinc-950 p-4 md:p-8 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <IntroOverlay />
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <button
          onClick={exportPDF}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-lg hover:scale-105 transition-transform text-sm font-medium"
        >
          <Printer className="w-4 h-4" />
          Print PDF
        </button>
      </div>

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="flip-book-container relative perspective-[1500px]"
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
          onFlip={() => {}}
          className="shadow-2xl"
          ref={bookRef}
        >
          {/* Cover */}
          <Page number={1}>
            <div className="h-full flex flex-col items-center justify-center p-12 bg-gradient-to-br from-zinc-50 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 text-center">
              <div className="w-24 h-1 bg-blue-500 mb-8" />
              <h1 className="text-5xl font-bold tracking-tighter mb-4 leading-tight">{site.name}</h1>
              <p className="text-2xl text-zinc-600 dark:text-zinc-400 mb-12 font-medium">{site.role}</p>
              <div className="flex flex-wrap justify-center gap-3 opacity-60">
                {["AI Engineer", "Game Dev", "MLOps", "Python", "C#"].map(tag => (
                  <span key={tag} className="px-3 py-1 border border-zinc-400 dark:border-zinc-600 rounded-full text-xs font-bold tracking-widest uppercase">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-auto">
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs font-semibold text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-white/80 mb-8">
                  <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                  Available for opportunities
                </div>
                <p className="text-sm font-bold tracking-[0.2em] uppercase opacity-30">Portfolio · 2026</p>
              </div>
            </div>
          </Page>

          {/* Table of Contents */}
          <Page number={2} title="What's Inside">
            <div className="h-full flex flex-col justify-center">
              <ul className="space-y-6">
                {pages.slice(2, -1).map((page, i) => (
                  <li 
                    key={i} 
                    className="flex items-center gap-6 group cursor-pointer" 
                    onClick={() => bookRef.current.pageFlip().turnToPage(i + 2)}
                  >
                    <span className="text-zinc-200 dark:text-zinc-800 font-mono text-2xl font-bold">0{i + 1}</span>
                    <span className="text-xl font-bold group-hover:text-blue-500 transition-colors">
                      {page.title === 'Project' ? page.data?.title : page.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Page>

          {/* About */}
          <Page number={3} title="About Me">
            <div className="space-y-6">
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {site.about.long}
              </p>
              <div className="pt-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Values</h4>
                <div className="grid gap-4">
                  {["Clear problem framing", "Reliable AI systems", "Practical shipping"].map(value => (
                    <div key={value} className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
                      <p className="text-sm font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Page>

          {/* What I Do */}
          <Page number={4} title="What I Do">
            <div className="grid gap-4">
              {[
                { title: "AI Engineering", desc: "Building and deploying machine learning models and LLM solutions." },
                { title: "Game Development", desc: "Creating immersive experiences with Unity and Unreal Engine." },
                { title: "MLOps", desc: "Designing robust pipelines for model training and deployment." },
                { title: "Software Solutions", desc: "Full-stack development with a focus on performance and UX." }
              ].map(item => (
                <div key={item.title} className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </Page>

          {/* Projects */}
          {site.projects.map((project, i) => (
            <Page key={project.id} number={5 + i} title={`Project 0${i + 1}`}>
              <ProjectPage project={project} />
            </Page>
          ))}

          {/* Tech Stack */}
          <Page number={8} title="Tech Stack">
            <div className="space-y-8">
              {Object.entries(site.skills).map(([category, skills]) => (
                <div key={category}>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: string) => (
                      <span key={skill} className="px-4 py-2 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-100 dark:border-zinc-800 text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Page>

          {/* Resume */}
          <Page number={9} title="Resume">
            <Resume />
          </Page>

          {/* Certificates */}
          <Page number={10} title="Certificates">
            <Certificates />
          </Page>

          {/* Contact */}
          <Page number={11} title="Let's Connect">
            <div className="h-full flex flex-col justify-center text-center space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-4">Get in touch</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                </p>
              </div>
              <div className="grid gap-4">
                <a href={`mailto:${site.email}`} className="p-4 bg-blue-500 text-white rounded-2xl font-bold hover:scale-105 transition-transform">
                  Email Me
                </a>
                <div className="flex justify-center gap-4">
                  {site.socials.map(social => (
                    <a 
                      key={social.label} 
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl hover:scale-110 transition-transform"
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Page>

          {/* Back Cover */}
          <Page number={12}>
            <div className="h-full flex flex-col items-center justify-center p-12 bg-gradient-to-br from-zinc-200 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 text-center">
              <div className="w-24 h-1 bg-blue-500 mb-8" />
              <h1 className="text-4xl font-bold tracking-tighter mb-2">{site.name}</h1>
              <p className="text-zinc-600 dark:text-zinc-400 mb-12 uppercase tracking-widest text-xs font-bold">{site.role}</p>
              <p className="text-sm font-bold tracking-[0.2em] uppercase opacity-30 mt-auto">© 2026 · All Rights Reserved</p>
            </div>
          </Page>
        </HTMLFlipBook>
      </motion.div>

      <div className="mt-4 text-[10px] text-zinc-400 font-bold uppercase tracking-[0.3em]">
        ← Swipe to explore →
      </div>
    </div>
  );
}
