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
  name: "ADYTIA (ADIT) AGUSTIAWAN",
  role: "AI Engineer | Game Dev | MLOps",
  roles: [
    "AI Engineer",
    "Game Dev",
    "MLOps",
    "Digital Marketing",
    "Ios Dev",
    "IoTs"
  ],
  tagline: "Bachelor of Information Technology | AI Engineer | Game Dev | MLOps",
  location: "Kutai Kartanegara, Kalimantan Timur, Indonesia",
  email: "adityaagustiawan562@gmail.com",
  resumeCtaLabel: "Print / Save PDF",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/adytia-agustiawan-3a3345376/", icon: Linkedin },
    { label: "Email", href: "mailto:adityaagustiawan562@gmail.com", icon: Mail },
    { label: "GitHub", href: "https://github.com/adityaagustiawan", icon: Github },
    { label: "Twitter", href: "https://twitter.com/adytia-agustiawan", icon: Twitter },
    { label: "Google Skills", href: "https://www.skills.google/public_profiles/32664b3e-590a-48c2-b5af-9e0355c48a84", icon: GoogleSkillsIcon },
    { label: "Website", href: "https://adytiaportofolio.onhercules.app", icon: Globe },
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
    "AI/LLM": ["LLM apps", "RAG", "Evaluation", "Vector search", "Prompting"],
    Backend: ["Python", "Node.js", "REST APIs", "Postgres"],
    Frontend: ["React", "TypeScript", "Tailwind"],
    Tools: ["Docker", "Git", "Vite"],
  } as const,
  about: {
    short:
      "Bachelor of Information Technology from Universitas AMIKOM Yogyakarta. I am an AI Engineer, Game Developer, and MLOps enthusiast focused on building innovative solutions.",
    long:
      "I specialize in building production-ready AI features, immersive game experiences, and robust MLOps pipelines. With a background in Information Technology from Universitas AMIKOM Yogyakarta, I bridge the gap between complex technical systems and user-centric design. I care about reliability, scalability, and measurable outcomes in every project I undertake.",
  },
  resume: {
    summary:
      "AI Engineer with expertise in LLM applications, RAG systems, and production-ready AI features. Focused on building reliable, scalable, and user-centric solutions.",
    experience: [
      {
        title: "AI Engineer",
        org: "Freelance",
        period: "2024 - Present",
        bullets: [
          "Built RAG workspace search with citations and evaluation harness",
          "Developed agentic support copilot with human-in-the-loop review",
          "Created LLM evaluation workflows for prompt regression testing",
        ],
      },
    ] satisfies ResumeEntry[],
    education: [
      {
        title: "Bachelor of Information Technology",
        org: "Universitas AMIKOM Yogyakarta",
        period: "2020 - 2024",
        bullets: [
          "Focused on AI, Machine Learning, and Software Engineering",
          "Graduated with honors",
        ],
      },
    ] satisfies ResumeEntry[],
  },
  projects: [
    {
      id: "rag-workspace-search",
      title: "RAG Workspace Search",
      summary: "Search + chat over internal docs with citations and evals.",
      description:
        "A retrieval-augmented system that answers questions over documentation and notes. Emphasis on response grounding, transparent citations, and predictable behavior under uncertainty.",
      tags: ["LLM", "RAG", "Vector Search", "TypeScript"],
      year: "2026",
      links: [
        { label: "Live Demo", href: "#" },
        { label: "Source", href: "https://github.com/adityaagustiawan/rag-workspace-search" },
      ],
      imagePrompt:
        "dark mode AI search product UI, citations panel, chat interface, subtle blue glow accents, crisp typography, modern product screenshot, high contrast, studio lighting",
      highlights: ["Citations-first UX", "Evaluation harness", "Latency-aware retrieval"],
    },
    {
      id: "llm-eval-harness",
      title: "LLM Evaluation Harness",
      summary: "Automated evals for prompts, regressions, and safety checks.",
      description:
        "A lightweight evaluation workflow to measure answer quality, grounding, and policy constraints across prompt/model changes. Designed to support fast iteration with confidence.",
      tags: ["Evaluation", "LLM", "Testing", "Node.js"],
      year: "2025",
      links: [{ label: "Case Study", href: "#" }],
      imagePrompt:
        "dark mode developer tool UI, test matrix, metrics charts, prompt variants, subtle blue highlights, clean layout, modern product screenshot, studio lighting",
      highlights: ["Prompt regression tests", "Quality metrics", "Fast iteration workflow"],
    },
    {
      id: "agentic-support-copilot",
      title: "Agentic Support Copilot",
      summary: "Tool-using assistant for triage, summaries, and next steps.",
      description:
        "An assistant workflow that drafts responses, summarizes threads, and proposes actions. Emphasis on controllability, human-in-the-loop review, and transparent reasoning.",
      tags: ["Agents", "LLM", "UX", "TypeScript"],
      year: "2025",
      links: [{ label: "Source", href: "https://github.com/adityaagustiawan/agentic-support-copilot" }],
      imagePrompt:
        "dark mode AI assistant UI, conversation thread, action sidebar, subtle blue glow, modern product interface, crisp typography, studio lighting",
      highlights: ["Human-in-the-loop review", "Tool-based actions", "Consistent output formatting"],
    },
  ] satisfies Project[],
  certificates: [
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
