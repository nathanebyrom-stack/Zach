# Task 01: Site shell

Issued by Jenny, Wed 14 Oct 2026. Branch: `carla/site-shell`.
Read `AGENTS.md` and `BRIEF.md` first. This task covers CHECKLIST item 1 only.

## Build
1. **Structure.** A static site in `site/`, plus `netlify.toml` in the repo root with `publish = "site"`. No build step and no framework.
2. **Design tokens.** One `site/css/tokens.css` holding every colour, font, spacing step and grid value as CSS variables. Use these values:
   - Backgrounds: near-black `#0A0C10`, deep steel-blue `#0E1A2B`, raised panel `#132238`.
   - Type and lines: brushed silver `#E9EBF0` (primary) to `#B5BCC4` (secondary).
   - Accent: electric blue `#0043FE`, used only for CTAs, active and focus states, and a soft glow. No orange anywhere.
   - Fonts (Google Fonts): **Archivo** (600–800) for headings and **Inter** (400–600) for body text.
   - Corners: 0 to 2px radius only. Add a fine background grid as a subtle CSS pattern.
3. **Shared header.** The logo `site/assets/brand/aoe-logo.webp` (fallback `.png`), linked to home. Navigation in this exact order: Home, Manipulators, Gripping, Solutions, Services, Industries, About, Contact. Contact is styled as the blue CTA. The current page is marked with `aria-current`. On mobile the menu collapses behind an accessible toggle (button, `aria-expanded`, Esc closes it, focus is managed).
4. **Shared footer.** The logo, the same navigation links, a Privacy policy link, `[COPY NEEDED: phone]`, `[COPY NEEDED: email]`, `[COPY NEEDED: address]` and `© AOE Engineering Ltd`.
5. **Page stubs.** One page each, all using the shared header and footer: `index.html`, `manipulators/`, `gripping/`, `solutions/`, `services/`, `industries/`, `about/`, `contact/`, `privacy/`. Each page holds only an `h1` with its nav name and `[COPY NEEDED: page content]`. On the home page, add an empty hero slot marked `<!-- HERO: waiting on HERO.md -->` with a plain dark placeholder.
6. **404 page.** `site/404.html` with the header and footer, `[COPY NEEDED: 404 message]` and a link home.
7. **Header and footer reuse.** Keep one source for the header and footer: a small vanilla JS include, or one partial copied by a script you document in the report. Your choice, but explain it.

## Done when
- Every page opens locally, the navigation works between all of them and the 404 page shows for a bad URL on Netlify.
- Nothing scrolls sideways at 375px, and the layout holds at 1440px.
- The header, menu and footer work with keyboard alone, with a visible focus ring.
- Your report is in `REPORTS/` in the format set out in `AGENTS.md`.

## Out of scope (don't do)
- Any page content, imagery, Three.js, GSAP or motion.
- The hero (it waits for HERO.md).
- Editing `BRIEF.md`, `CLAUDE.md`, `CHECKLIST.md` or `LOG.md`. Jenny ticks the checklist after review.
- Merging to `main`.
