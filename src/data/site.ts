import { FileText, Github, Globe, Linkedin, Mail, Twitter } from "lucide-react";
import type { ComponentType } from "react";
import GoogleSkillsIcon from "@/components/icons/GoogleSkillsIcon";

export type SocialLink = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

export type NavItem = {
  label: string;
  to: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  year?: string;
  links: ProjectLink[];
  imagePrompt: string;
  highlights: string[];
};

export type CertificateCategory = "Achievement" | "Webinar";

export type CertificateLink = {
  label: string;
  href: string;
};

export type Certificate = {
  id: string;
  category: CertificateCategory;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  skills?: string[];
  links?: CertificateLink[];
};

export type ResumeEntry = {
  title: string;
  org: string;
  period: string;
  bullets: string[];
};

export type ImageSize = "square_hd" | "square" | "portrait_4_3" | "portrait_16_9" | "landscape_4_3" | "landscape_16_9";

export function makeImageUrl(prompt: string, imageSize: ImageSize = "landscape_4_3") {
  const encoded = encodeURIComponent(prompt);
  return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encoded}&image_size=${imageSize}`;
}

export type SiteConfig = {
  name: string;
  role: string;
  roles?: string[];
  tagline: string;
  location: string;
  email: string;
  resumeCtaLabel: string;
  socials: SocialLink[];
  nav: NavItem[];
  quickActions: readonly { label: string; href: string; icon: ComponentType<{ className?: string }> }[];
  skills: Record<string, string[]>;
  about: { short: string; long: string };
  resume: { summary: string; experience: ResumeEntry[]; education: ResumeEntry[] };
  projects: Project[];
  certificates: Certificate[];
};

export const site: SiteConfig = {
  // Last updated: 2026-05-01
  name: "ADYTIA AGUSTIAWAN",
  role: "Full-Stack Developer | AI & Automation Enthusiast",
  roles: [
    "Full-Stack Developer",
    "AI & Automation",
    "Backend Engineer",
    "Game Dev Enthusiast"
  ],
  tagline: "Building AI-powered applications, automation tools, and engaging web experiences.",
  location: "Bandung, Indonesia",
  email: "adityaagustiawan562@gmail.com",
  resumeCtaLabel: "Print PDF",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/adytia-agustiawan-3a3345376/", icon: Linkedin },
    { label: "Email", href: "mailto:adityaagustiawan562@gmail.com", icon: Mail },
    { label: "GitHub", href: "https://github.com/adityaagustiawan", icon: Github },
    { label: "Twitter", href: "https://twitter.com/adytia-agustiawan", icon: Twitter },
    { label: "Google Skills", href: "https://www.skills.google/public_profiles/32664b3e-590a-48c2-b5af-9e0355c48a84", icon: GoogleSkillsIcon },
    { label: "Website", href: "https://trae1ftki8k7-h6627kama-adityaagustiawans-projects.vercel.app", icon: Globe },
  ] satisfies SocialLink[],
  nav: [
    { label: "Home", to: "/" },
    { label: "Projects", to: "/projects" },
    { label: "About", to: "/about" },
    { label: "Resume", to: "/resume" },
    { label: "Certificates", to: "/certificates" },
    { label: "Contact", to: "/contact" },
  ] satisfies NavItem[],
  quickActions: [
    { label: "Resume", href: "/resume", icon: FileText },
  ] as const,
  skills: {
    "Languages": ["JavaScript", "TypeScript", "Python", "PHP", "SQL"],
    "Frontend": ["React", "Next.js", "TanStack", "Tailwind CSS", "Three.js", "Framer Motion"],
    "Backend": ["Node.js", "Express", "REST APIs", "Supabase", "PostgreSQL"],
    "AI & Tools": ["OpenAI API", "Chatbots", "Automation", "Git", "Vercel", "Docker"],
  } as const,
  about: {
    short:
      "Detail-oriented developer focused on building AI-powered applications, automation tools, and engaging web experiences.",
    long:
      "I am a Full-Stack Developer based in Bandung, Indonesia. I specialize in building practical software where AI, automation, and clean interfaces meet. My projects span AI chatbots for restaurants, casual game platforms, 3D portfolio experiences, and game backend tooling. I am skilled at turning ideas into shipped products — from chatbot-driven food ordering to game platforms and backend services.",
  },
  resume: {
    summary:
      "Detail-oriented developer focused on building AI-powered applications, automation tools, and engaging web experiences. Skilled at turning ideas into shipped products.",
    experience: [
      {
        title: "Independent Developer",
        org: "Personal Projects & Open Source",
        period: "2023 — Present",
        bullets: [
          "Built DynamenuAI: AI chatbot for restaurant ordering and kitchen automation",
          "Developed NexPlay-playhub: A web platform for discoverable casual gaming",
          "Shipped 3D portfolio site with flip-book UI and Swiper navigation",
          "Focused on end-to-end product delivery and modern web tooling",
        ],
      },
      {
        title: "Backend & Game Tooling",
        org: "Growtopia Backend (Open Source)",
        period: "2024",
        bullets: [
          "Implemented backend services and tooling for game server experimentation",
          "Explored low-level network programming and modular service design",
          "Focused on connection handling and packet flow analysis",
        ],
      },
    ] satisfies ResumeEntry[],
    education: [
      {
        title: "Self-Directed Learning",
        org: "Software Engineering & AI",
        period: "Ongoing",
        bullets: [
          "Continuous study of full-stack web development and AI integration",
          "Specializing in modern frameworks like Next.js and React",
          "Exploring AI automation flows and LLM orchestration",
        ],
      },
    ] satisfies ResumeEntry[],
  },
  projects: [
    {
      id: "dynamenu-ai",
      title: "DynamenuAI",
      summary: "AI Chatbot & Automation for dining and food requests.",
      description:
        "AI-powered dining and food request application combining a chatbot interface with kitchen-side automation. Customers place orders by chatting; the system parses intent, confirms items, and routes the order downstream.",
      tags: ["React", "Node.js", "OpenAI API", "Tailwind"],
      year: "2026",
      links: [
        { label: "Source", href: "https://github.com/adityaagustiawan/DynamenuAI" },
      ],
      imagePrompt:
        "modern restaurant menu interface, AI chatbot overlay, food ordering automation, dark mode, sleek UI design, high tech restaurant vibes, blue glow accents",
      highlights: ["AI Chatbot integration", "Intent parsing", "Kitchen-side automation"],
    },
    {
      id: "nexplay-playhub",
      title: "NexPlay-playhub",
      summary: "Web-based play hub for casual gaming.",
      description:
        "A web-based play hub that brings casual games into a single accessible platform. Designed for discovery and instant browser-based play with a clean, performance-first interface.",
      tags: ["Next.js", "React", "Tailwind", "Vercel"],
      year: "2026",
      links: [
        { label: "Source", href: "https://github.com/adityaagustiawan/NexPlay-playhub" },
      ],
      imagePrompt:
        "gaming platform UI, casual game discovery, modern web dashboard, vibrant accents, dark mode, play-first interface",
      highlights: ["Single-platform discovery", "Performance optimized", "Clean play-first UX"],
    },
    {
      id: "portofolio-cv-3d",
      title: "Portofolio-CV",
      summary: "3D flip-book portfolio website.",
      description:
        "Personal portfolio website built around a 3D flip-book interaction and Swiper-based navigation. Showcases work history and projects through a tactile, page-turning experience rather than a traditional scroll layout.",
      tags: ["Three.js", "Swiper", "React", "Vercel"],
      year: "2026",
      links: [
        { label: "Source", href: "https://github.com/adityaagustiawan/Portofolio-CV" },
      ],
      imagePrompt:
        "interactive 3D book, flip book portfolio, web GL interface, futuristic digital library, sleek dark UI, blue and purple neon highlights",
      highlights: ["3D Flip-book interaction", "Swiper-based navigation", "Tactile page-turning UX"],
    },
    {
      id: "cv-portofolio",
      title: "CV-Portofolio",
      summary: "Structured CV web application.",
      description:
        "Structured CV web application presenting personal information, skills, and experience in a clean, recruiter-friendly layout. Built as a fast, deployable single-page resume that doubles as an online business card.",
      tags: ["React", "Tailwind CSS", "Vercel"],
      year: "2026",
      links: [
        { label: "Source", href: "https://github.com/adityaagustiawan/CV-Portofolio" },
      ],
      imagePrompt:
        "clean professional resume layout, modern typography, minimalist web design, structured information architecture, white and grey tones with subtle blue accents",
      highlights: ["Recruiter-friendly layout", "Fast deployment", "Structured information architecture"],
    },
    {
      id: "growtopia-backend",
      title: "growtopia-backend",
      summary: "Custom backend services for game server experimentation.",
      description:
        "Custom backend services and tooling exploring Growtopia-style game server architecture. Focuses on connection handling, packet flow, and modular service design as a learning ground for low-level network programming.",
      tags: ["Node.js", "TCP / Networking", "JavaScript"],
      year: "2024",
      links: [
        { label: "Source", href: "https://github.com/adityaagustiawan/growtopia-backend" },
      ],
      imagePrompt:
        "server rack with glowing blue lights, network packet flow visualization, backend architecture diagram, technical and complex terminal interface",
      highlights: ["Connection handling", "Packet flow analysis", "Modular service design"],
    },
  ],
  certificates: [
    {
      id: "google-ai-essentials",
      category: "Achievement",
      title: "Google AI Essentials",
      issuer: "Google",
      date: "2024",
      description: "Foundational knowledge in AI principles, applications, and ethical considerations.",
      skills: ["AI Fundamentals", "Generative AI", "AI Ethics"],
    },
  ],
};
