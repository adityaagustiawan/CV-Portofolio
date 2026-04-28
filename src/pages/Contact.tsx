import Container from "@/components/layout/Container";
import SocialLinks from "@/components/layout/SocialLinks";
import Button from "@/components/ui/Button";
import { site } from "@/data/site";
import { ArrowRight, Check, Copy, Mail, Send } from "lucide-react";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
  company: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Portfolio contact: ${form.name || "Hello"}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        form.company ? `Company: ${form.company}` : undefined,
        "",
        form.message,
      ]
        .filter(Boolean)
        .join("\n")
    );
    return `mailto:${site.email}?subject=${subject}&body=${body}`;
  }, [form.company, form.email, form.message, form.name]);

  function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("idle");

    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.email.trim() || !validateEmail(form.email.trim())) nextErrors.email = "Please enter a valid email.";
    if (form.message.trim().length < 10) nextErrors.message = "Please write at least 10 characters.";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      setStatus("submitting");
      window.location.href = mailtoHref;
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Container className="py-14">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-white/60">Contact</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Let’s build something smart</h1>
          <p className="mt-4 max-w-2xl text-sm text-zinc-600 dark:text-white/70">
            Send a message and I’ll get back to you. The form opens your email client with the details.
          </p>

          <form onSubmit={onSubmit} className="mt-8 rounded-2xl border border-black/10 bg-black/5 p-5 dark:border-white/10 dark:bg-white/5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-600 dark:text-white/70">Name</label>
                <input
                  value={form.name}
                  onChange={e => onChange("name", e.target.value)}
                  className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 dark:border-white/10 dark:bg-zinc-950/40 dark:text-white dark:placeholder:text-white/40"
                  placeholder="Your name"
                />
                {errors.name ? <div className="text-xs text-red-200">{errors.name}</div> : null}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-600 dark:text-white/70">Email</label>
                <input
                  value={form.email}
                  onChange={e => onChange("email", e.target.value)}
                  className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 dark:border-white/10 dark:bg-zinc-950/40 dark:text-white dark:placeholder:text-white/40"
                  placeholder="you@company.com"
                />
                {errors.email ? <div className="text-xs text-red-200">{errors.email}</div> : null}
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <label className="text-xs font-semibold text-zinc-600 dark:text-white/70">Company (optional)</label>
              <input
                value={form.company}
                onChange={e => onChange("company", e.target.value)}
                className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 dark:border-white/10 dark:bg-zinc-950/40 dark:text-white dark:placeholder:text-white/40"
                placeholder="Company name"
              />
            </div>

            <div className="mt-4 space-y-1">
              <label className="text-xs font-semibold text-zinc-600 dark:text-white/70">Message</label>
              <textarea
                value={form.message}
                onChange={e => onChange("message", e.target.value)}
                className="min-h-32 w-full resize-y rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 dark:border-white/10 dark:bg-zinc-950/40 dark:text-white dark:placeholder:text-white/40"
                placeholder="Tell me about your project..."
              />
              {errors.message ? <div className="text-xs text-red-200">{errors.message}</div> : null}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button type="submit" disabled={status === "submitting"}>
                <Send className="h-4 w-4" />
                {status === "submitting" ? "Preparing..." : "Send"}
              </Button>
              <a href={mailtoHref}>
                <Button type="button" variant="secondary">
                  <Mail className="h-4 w-4" />
                  Open email
                </Button>
              </a>
              {status === "success" ? <div className="text-sm text-emerald-200">Ready to send.</div> : null}
              {status === "error" ? <div className="text-sm text-red-200">Something went wrong. Try again.</div> : null}
            </div>
          </form>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-black/10 bg-black/5 p-5 dark:border-white/10 dark:bg-white/5">
            <div className="text-sm font-semibold">Email</div>
            <div className="mt-2 text-sm text-zinc-600 dark:text-white/70">{site.email}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={copyEmail}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy email"}
              </Button>
              <a href={`mailto:${site.email}`}>
                <Button type="button" variant="ghost">
                  <Mail className="h-4 w-4" />
                  Email me
                </Button>
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-black/5 p-5 dark:border-white/10 dark:bg-white/5">
            <div className="text-sm font-semibold">Social</div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-white/70">Prefer DMs? Reach out here.</p>
            <div className="mt-4 space-y-3">
              <SocialLinks links={site.socials} />
              <div className="pt-2 border-t border-black/5 dark:border-white/5">
                <a 
                  href={site.socials.find(s => s.label === "LinkedIn")?.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Visit LinkedIn Profile
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

