import Container from "@/components/layout/Container";
import SocialLinks from "@/components/layout/SocialLinks";
import Button from "@/components/ui/Button";
import { site } from "@/data/site";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <Container className="py-14">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-white/60">About</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">A bit about me</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-white/70">{site.about.long}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-black/5 p-5 dark:border-white/10 dark:bg-white/5">
              <div className="text-sm font-semibold">What I value</div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-white/70">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/70" />
                  <span>Clear problem framing and measurable impact.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/70" />
                  <span>Reliable AI systems: evals, guardrails, and observability.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/70" />
                  <span>Practical shipping: iterate, measure, refine.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-black/10 bg-black/5 p-5 dark:border-white/10 dark:bg-white/5">
              <div className="text-sm font-semibold">Currently focused on</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["RAG pipelines", "LLM evaluation", "Latency + cost"].map(x => (
                  <span key={x} className="rounded-full border border-black/10 bg-black/5 px-2.5 py-1 text-xs text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                    {x}
                  </span>
                ))}
              </div>
              <div className="mt-5">
                <Link to="/projects">
                  <Button type="button" variant="secondary">
                    View projects
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-black/10 bg-black/5 p-5 dark:border-white/10 dark:bg-white/5">
            <div className="text-sm font-semibold">Skills</div>
            <div className="mt-4 space-y-4">
              {Object.entries(site.skills).map(([group, items]) => (
                <div key={group} className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-950/40">
                  <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-white/60">{group}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {items.map(s => (
                      <span key={s} className="rounded-full border border-black/10 bg-black/5 px-2.5 py-1 text-xs text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-black/5 p-5 dark:border-white/10 dark:bg-white/5">
            <div className="text-sm font-semibold">Connect</div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-white/70">Find me here.</p>
            <div className="mt-4">
              <SocialLinks links={site.socials} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

