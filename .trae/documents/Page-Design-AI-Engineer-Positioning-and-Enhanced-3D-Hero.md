# Page Design — AI Engineer Positioning + Enhanced 3D Hero (Desktop-first)

## Global Styles (keep current style)
- Theme: dark zinc/near-black background; translucent surfaces (`bg-white/5`), thin borders (`border-white/10`), rounded-2xl cards.
- Accent: blue glow accents for hero/intro (subtle gradients/blur).
- Typography: bold role/name headline; secondary text in `text-white/70`; compact body copy.
- Buttons: primary solid (high contrast), secondary translucent, ghost for low-emphasis.
- Motion: smooth easing; always respect reduced-motion (no autoplay intro/3D motion when enabled).

## Page: Intro Overlay (Home only)
- Layout: full-viewport modal dialog, centered content; backdrop blur + dark scrim.
- Meta: none (overlay).
- Structure:
  - Backdrop layer: click-to-close.
  - Glow layer: blurred blue circle (existing visual language), optionally refined with multi-stop gradient.
  - Content: badge (“Welcome”), name + **AI Engineer** role, 1-line tagline; actions: Enter / Skip.
- Interaction:
  - Plays once per browser session; Escape closes; buttons close.
  - Reduced motion: do not animate; immediately set session flag and close.

## Page: Home (/)
- Meta:
  - Title: “{Name} — AI Engineer”
  - Description: “AI Engineer building production-ready LLM applications and modern web experiences.”
- Layout: desktop 2-column grid (copy left, feature cards / 3D right) consistent with current hero grid.
- Sections & Components:
  1. Availability badge: keep same style.
  2. Hero headline: Name + role line updated to “AI Engineer”.
  3. Short bio: update `site.about.short` to AI engineering framing (shipping LLM apps, RAG, evaluation, performance, reliability).
  4. Primary CTAs: Projects / Contact / Resume (unchanged placement).
  5. Quick facts cards (3): update labels/content to AI focus (examples: “Focus: LLM Apps”, “Stack: TS + Python + LLM tooling”, “Location”).
  6. “What I do” card:
     - Keep same layout; update bullets to AI engineering outcomes (e.g., RAG, orchestration, eval, deployment, UX for AI products).
  7. 3D hero (enhanced):
     - Place within right column; same card framing and spacing.
     - Behavior: subtle idle animation; optional pointer-driven parallax/rotation; avoid excessive motion.
     - Accessibility: provide non-3D fallback (static still frame or simplified gradient) when WebGL fails or reduced motion enabled.
  8. Featured projects card: keep list; update project summaries/tags to highlight AI results.

## Page: Projects (/projects)
- Meta:
  - Title: “Projects — {Name}”
  - Description: “Selected AI engineering and web projects.”
- Layout: card grid list + right-side (or modal/panel) detail panel per existing behavior.
- Sections & Components:
  - Project cards: keep visuals; update copy to case-study style (Problem, Approach, Impact) within existing summary/description/highlights.
  - Tags: ensure AI tags exist where relevant (e.g., “LLM”, “RAG”, “Evaluation”, “MLOps”, “Vector Search”).
  - Detail panel: keep; ensure links include “Live/Source/Case Study” when available.

## Page: About (/about)
- Meta:
  - Title: “About — {Name}”
  - Description: “Background and approach to building AI systems.”
- Layout: stacked sections with readable max width; consistent card blocks.
- Sections & Components:
  - Long bio: update `site.about.long` to AI Engineer narrative (systems thinking, model/product alignment, reliability, safety constraints where applicable).
  - Skills: keep grouped display; add/rename categories to reflect AI (e.g., “AI/LLM”, “Backend/Platforms”, “Frontend/Product”).

## Page: Resume (/resume)
- Meta:
  - Title: “Resume — {Name}”
  - Description: “AI Engineer resume: experience, projects, education.”
- Layout: single-column document style with print-friendly spacing.
- Sections & Components:
  - Summary: update to AI outcomes (shipping AI features, evaluation, performance, cost).
  - Experience/Education: keep structure; revise bullets to measurable impact.
  - Print/Save CTA: keep label/button and placement.

## Page: Contact (/contact)
- Meta:
  - Title: “Contact — {Name}”
  - Description: “Get in touch for AI engineering opportunities.”
- Layout: centered card with clear CTAs.
- Sections & Components:
  - Email primary action; social links list; optional short availability note (copy-only).

## Page: Not Found (*)
- Meta: “404 — Page not found”.
- Layout: simple centered message + button back to Home.
