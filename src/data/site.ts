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
        "Personal portfolio website built around a 3D flip-book interaction and Swiper-based navigation. Tactile page-turning experience showcasing work history and projects.",
      tags: ["Three.js", "Swiper", "React", "Vercel"],
      year: "2026",
      links: [
        { label: "Source", href: "https://github.com/adityaagustiawan/Portofolio-CV" },
      ],
      imagePrompt:
        "3D flipbook interface, interactive portfolio, digital book animation, Three.js visualization, modern and tactile web design",
      highlights: ["3D Flip-book interaction", "Swiper navigation", "Tactile experience"],
    },
    {
      id: "growtopia-backend",
      title: "growtopia-backend",
      summary: "Custom backend services for game servers.",
      description:
        "Custom backend services and tooling exploring Growtopia-style game server architecture. Focuses on low-level network programming, connection handling, and modular design.",
      tags: ["Node.js", "TCP/Networking", "JavaScript"],
      year: "2024",
      links: [
        { label: "Source", href: "https://github.com/adityaagustiawan/growtopia-backend" },
      ],
      imagePrompt:
        "low-level network programming, digital packets flow, server architecture visualization, modular service design, high performance backend",
      highlights: ["Low-level networking", "Modular service design", "Packet flow analysis"],
    },
  ] satisfies Project[],
  certificates: [
    {
      id: "boim-2025",
      category: "Achievement",
      title: "Participation in BOIM 2025 - 2D Live Action Comic",
      issuer: "Universitas AMIKOM Yogyakarta",
      date: "Jan 2025",
      description: "Award for participation in the BOIM competition at Amikom Yogyakarta for creating a 2D Live Action Comic.",
      skills: ["2D Art", "Comic Design", "Live Action"],
    },
    {
      id: "google-cloud-skill-boost",
      category: "Achievement",
      title: "Google Cloud Skills Boost — Public Profile",
      issuer: "Google Cloud",
      date: "2026",
      description: "Badges and hands-on labs completed on Google Cloud Skills Boost.",
      skills: ["Cloud", "Data", "ML"],
      links: [{ label: "Profile", href: "https://www.skills.google/public_profiles/32664b3e-590a-48c2-b5af-9e0355c48a84" }],
    },
    {
      id: "llm-webinar",
      category: "Webinar",
      title: "LLM Engineering & Product Reliability",
      issuer: "AI Guild",
      date: "2025",
      description: "Workshop on RAG evals and production guardrails.",
      skills: ["LLM", "Evaluation"],
    },
  ] satisfies Certificate[],
};
