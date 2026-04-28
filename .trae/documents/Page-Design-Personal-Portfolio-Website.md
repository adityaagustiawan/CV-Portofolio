# Page Design — Personal Portfolio Website (Desktop-first)

## Global Styles (all pages)
- Layout system: CSS Grid for page sections + Flexbox for alignment within components.
- Breakpoints: Desktop ≥1024px (primary), Tablet 768–1023px, Mobile ≤767px.
- Spacing: 8px scale (8/16/24/32/48/64). Content max-width 1120–1200px, centered.
- Typography: 
  - H1 48/56, H2 32/40, H3 24/32, Body 16/24, Small 14/20.
- Colors (example tokens):
  - Background: #0B0F17, Surface: #121A2A, Text: #EAF0FF, Muted: #A8B3CF
  - Accent: #5B8CFF, AccentHover: #3D73FF, Border: rgba(255,255,255,0.12)
- Buttons:
  - Primary: accent background, white text, 10–12px vertical padding, 14–16px horizontal.
  - Secondary: transparent with border; hover increases border/brightness.
- Links: underlined on hover; external links show an “open in new tab” icon.
- Motion: 150–200ms ease for hover/focus; subtle card lift (translateY -2px).
- Accessibility: visible focus ring (2px accent), sufficient contrast, form errors announced.

## Shared Components
- Header (sticky): left logo/name, right nav links, active state underline.
- Header social links: optional icon buttons (GitHub/LinkedIn/etc.) on desktop; moved into mobile menu on small screens.
- Footer: copyright, social links, “Back to top”.
- Project Card: thumbnail, title, 1–2 line summary, tags, actions.

---

## 1) Home
### Meta Information
- Title: “Your Name — Portfolio”
- Description: “Projects, background, and contact details for Your Name.”
- Open Graph: title, description, and a share image (hero/project collage).

### Page Structure
- Stacked sections: Header → Hero → Featured Projects → About Teaser → Contact CTA → Footer.

### Sections & Components
1. Hero
   - Two-column grid (desktop): left text (name, role, short pitch), right visual (portrait/illustration or featured screenshot).
   - CTAs: “View Projects” (primary), “Contact” (secondary).
2. Featured Projects
   - Grid of 3 cards (desktop), 2 (tablet), 1 (mobile).
   - Each card links to Projects page anchored to the selected project.
3. About Teaser
   - Short paragraph + 3 highlight bullets (e.g., years experience, specialties).
   - Link to About.
4. Contact CTA
   - Simple panel: “Have a project in mind?” + button to Contact.

Responsive behavior
- Collapse hero to single column on tablet/mobile; image moves below text.

---

## 2) Projects
### Meta Information
- Title: “Projects — Your Name”
- Description: “A curated list of projects with tech stack and links.”

### Page Structure
- Header → Filter/Search Bar → Project Grid → Project Detail (panel/modal) → Footer.

### Sections & Components
1. Filter/Search Bar
   - Search input (keyword) + tag chips (multi-select).
   - Clear filters action.
2. Project Grid
   - Card grid (3/2/1 columns by breakpoint).
   - Card includes: thumbnail, title, short description, tags, actions (Demo/Repo).
3. Project Detail
   - Opens as right-side panel on desktop (40% width) or full-screen modal on mobile.
   - Content: overview, key features, responsibilities, tech stack, gallery (2–5 images), links.

Interaction states
- Loading skeletons (if data fetched), empty state when no matches, keyboard-esc to close detail.

---

## 3) About
### Meta Information
- Title: “About — Your Name”
- Description: “Background, skills, and experience highlights.”

### Page Structure
- Header → Intro → Skills → Highlights/Timeline → CV Download → Footer.

### Sections & Components
1. Intro
   - Two-column: portrait + bio text; includes location/timezone if relevant.
2. Skills
   - Grouped skill cards (Frontend/Backend/Tools) with short lists.
3. Highlights/Timeline
   - Vertical timeline or stacked cards (role, company/project, 1–2 achievements).
4. CV Download
   - Primary button to download PDF; secondary links to LinkedIn/GitHub.

---

## 4) Contact
### Meta Information
- Title: “Contact — Your Name”
- Description: “Send a message or connect via social links.”

### Page Structure
- Header → Contact Form (primary) + Contact Links (secondary) → Footer.

### Sections & Components
1. Contact Form
   - Fields: Name, Email, Message (+ optional hidden honeypot field).
   - Validation: required fields, email format, message min length.
   - Submit states: idle, submitting (disabled), success (thank-you), error (retry).
2. Contact Links
   - Email mailto link, social icons, optional calendar link.

Responsive behavior
- Desktop: 2-column (form left, links right). Tablet/mobile: stacked with form first.

---

## 5) CV/Resume
### Meta Information
- Title: “Resume — Your Name”
- Description: “Work experience, skills, and education.”

### Page Structure
- Header → Summary → Experience → Skills → Education/Certifications → Actions → Footer.

### Sections & Components
1. Summary
   - 2–3 lines focused on role, strengths, and target position.
2. Experience
   - Reverse-chronological cards; each includes role, organization, dates, and 2–4 bullet achievements.
3. Skills
   - Same groupings as About, but denser and scan-friendly.
4. Education/Certifications
   - Compact list.
5. Actions
   - “Download PDF” primary button.
   - “Print” secondary button that triggers browser print.

Responsive behavior
- Single-column layout on mobile.
- Print styles: hide header/footer/nav, remove shadows, set white background.
