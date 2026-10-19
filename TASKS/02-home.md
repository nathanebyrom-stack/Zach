# Task 02: Home page

Issued by Jenny, Mon 19 Oct 2026. Branch: `carla/home` (from current `main`).
Read `AGENTS.md`, `BRIEF.md` and `HERO.md` first. This task covers CHECKLIST item 3 and the hero slot for item 15.

## Copy
- All words come from `content/pages/home.md`, exactly as written. Don't change, add or shorten copy. If something doesn't fit the layout, say so in your report.
- **Hero: use Option C only** (Nathan, 19 Oct). Headline "Design. Supply. Fit. Service." and the line under it. Ignore Options A and B.
- `## Section: Footer details` fills the footer placeholders on **every** page (phone, email, address, website), so update the shared footer, not just Home.
- Phone and email are links (`tel:07771873177`, `mailto:`).
- Use `## Meta` for the title and meta description if present; if missing, leave the shell's values and note it.

## Build
1. **Hero.** Full-bleed, `100svh` on mobile. White Option C type over the footage with a dark gradient scrim (about 55 to 60% black) on the headline side, per HERO.md.
   - If `assets/hero/hero-side-member.{mp4,webm}` and `-mobile` exist on `main` or the `hero-footage` branch, use them: `<video autoplay muted loop playsinline>` with WebM then MP4 sources, poster frame, mobile source via `media` query or JS swap. Copy only the files you use into `site/assets/hero/`.
   - If they don't exist yet, build the same structure with a plain dark placeholder and leave clearly named source paths ready, marked `TODO-HERO-FILES`.
   - `prefers-reduced-motion`: show the still image, no video.
2. **Sections** in the order of `home.md`: What we do, Honest about automation, Manipulators, Gripping, What you can lift (as a tidy list or grid), Industries, Service and support, CTA. Buttons link to the matching pages built in Task 01.
3. **Seat-balancer clip.** If `assets/clips/clip-seat-balancer.*` exists, use it as a muted looping clip beside "What we do" or "Manipulators" (your layout call, explain it). Otherwise a `TODO-IMAGE` placeholder.
4. **Styling.** Use the tokens from Task 01 only. ATIS orange appears only on the machine in footage; never in CSS.
5. **Motion.** Light GSAP (cdnjs) scroll reveals on sections only. The full motion pass is item 12, not this task.

## Done when
- Home opens on Netlify (`aoe-preview`) from your branch's deploy preview, or locally if previews aren't on.
- Nothing scrolls sideways at 375px; layout holds at 1440px.
- Hero text is readable over the footage or placeholder (check contrast on the brightest frame).
- Keyboard works throughout; every image or video has alt text or `aria-hidden` if decorative.
- Lighthouse mobile performance noted in your report (target 85+; don't chase it yet if video drags it down, just report the number).
- Report in `REPORTS/2026-10-XX-home.md` per `AGENTS.md`.

## Out of scope (don't do)
- Any other page's content.
- Writing or editing copy, choosing footage, WebGL/Three.js effects.
- Editing `BRIEF.md`, `HERO.md`, `CLAUDE.md`, `CHECKLIST.md`, `LOG.md` or anything in `content/`.
- Merging to `main`.
