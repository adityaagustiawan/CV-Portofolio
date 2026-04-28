# Page Design — 3D Rotating Hero + Intro Animation (Desktop-first)

## Global Styles (site-wide)
- Layout system: CSS Grid for page sections + Flexbox for component alignment.
- Background: keep current site background; add subtle hero gradient/spotlight behind 3D canvas (low contrast).
- Typography: preserve existing scale; hero title is the strongest visual anchor.
- Motion tokens:
  - Standard ease: `cubic-bezier(0.22, 1, 0.36, 1)`
  - Durations: 150ms (micro), 300–500ms (section), 1200–1800ms (intro)
- Buttons/links: keep existing; add hover glow/underline that does not rely on animation alone.
- Reduced motion: when `prefers-reduced-motion: reduce`, disable intro overlay animation and stop continuous 3D rotation.

## Page: Home

### Meta Information
- Title: “Portfolio — Home” (or existing site name)
- Description: “Personal portfolio showcasing projects, skills, and contact information.”
- Open Graph:
  - `og:title`: site name
  - `og:description`: same as description
  - `og:image`: hero poster image (static)

### Page Structure
Stacked sections (top-to-bottom):
1. Site Header
2. Hero (split layout: copy + 3D)
3. Rest of existing Home sections (unchanged)
4. Site Footer

### Section 1: Intro Animation Overlay (first load only)
- Placement: full-viewport overlay above all content (`position: fixed; inset: 0; z-index: max`).
- Content:
  - Centered brand wordmark/name
  - Short tagline line
  - Optional small progress indicator (subtle)
  - “Skip” button (top-right)
- Behavior:
  - Plays once per session (store a flag in `sessionStorage`).
  - Duration target: 1–2 seconds total; fade/slide out to reveal Home.
  - Keyboard: skip is focusable; `Esc` triggers skip.
  - Reduced motion: overlay does not animate; show briefly (or not at all) and immediately reveal Home.

### Section 2: Hero (primary change)
- Layout (desktop): 2-column grid, ~45% text / 55% 3D.
  - Left column: headline, subheadline, primary/secondary CTA row.
  - Right column: 3D canvas container with fixed aspect ratio (e.g., 16:10) and max height to avoid pushing content.
- Layout (tablet/mobile): stacked; text first, 3D below; cap canvas height.

#### Hero — Left column (copy + CTAs)
- Headline: your name/role.
- Subheadline: 1–2 lines.
- CTA group:
  - Primary: “View Projects”
  - Secondary: “Contact” (or “Download Resume” if already present)
- Interaction: CTAs must be visible even while 3D is loading/fallback.

#### Hero — Right column (3D computer object)
- Container:
  - Card-like surface or border to frame the object.
  - Background gradient/spotlight behind model to enhance depth.
- 3D behavior:
  - Default: slow auto-rotation (subtle).
  - Interaction: click/drag to rotate; optional light zoom constraints.
  - Idle: if user interacts, pause auto-rotation for a few seconds.
  - Offscreen: pause rendering when not visible.
- Loading & fallback:
  - Initial: show poster image with matching framing.
  - While loading: show lightweight shimmer or spinner (non-blocking).
  - WebGL unsupported/error: keep poster image and hide interaction hints.

#### Hero — Micro-interactions
- On initial reveal (after intro): fade-in the text block + slight upward translate.
- Optional: subtle parallax of spotlight background (disabled on reduced motion).

## Page: Site-wide Layout (applies to all pages)
- Entry transitions: optional minimal fade-in per route (<=200ms) to avoid slowing navigation.
- Navigation: no change; ensure intro does not trap navigation (skip always available).
- Accessibility:
  - Intro overlay must not prevent screen readers from reaching main content longer than necessary.
  - Canvas is decorative by default; provide `aria-label` on container describing it as a decorative 3D hero and keep CTAs as primary actions.
- Performance:
  - Load 3D only on Home route.
  - Keep LCP candidate as headline/hero copy (not the 3D canvas).