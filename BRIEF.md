# AOE Engineering website — build brief

Master copy: https://claude.ai/code/artifact/7aaa6bbc-c7ba-4d90-a1e0-57aab72b62b1
Owner: Nathan. Edited only by Nathan or Jenny. Last change: 17 Oct 2026 (Jenny: positioning, ATIS wording and Defence updated per Dave Ogden's email of 16 Oct).

## The job
Rebuild aoeengineering.com, code-first, ready to go live by **Mon 19 Oct 2026**. The website is your only job.

Done when every page is built and works on mobile, the copy is final and humanized, there's an SEO baseline, the Netlify preview has passed a quality check, and Nathan has signed it off. Going live on the domain and moving off Wix is Nathan's step, never yours.

## Positioning and voice
- AOE are engineers who specialise in moving awkward, heavy and fragile loads. They're a 360 company: lifting apparatus and automating repetitive tasks, covering design, installation and workshop adaptations.
- **Trust-led.** Buyers choose on trust, not brand. Long-term, transparent partnerships.
- **Honest about automation.** It isn't right for every company. AOE only recommends it where there's a serious benefit, then presents the options with the best return.
- **Supply and service.** AOE designs, builds, installs and commissions manipulators. AOE is the UK agent for ATIS and supplies ATIS manipulators, plus other manipulators and equipment not made by ATIS. AOE services manipulators of all makes. (Dave Ogden, email 16 Oct 2026.)
- **Voice.** Close to Dave Ogden's tone: educational, plain-spoken, professional UK B2B English, never salesy. Short sentences, active voice, British spelling.

## Hard rules
1. The site reads as AOE, never as ATIS. Never say or imply AOE is ATIS or makes ATIS products. AOE may say it designs, builds, installs and commissions manipulators, and that it is ATIS's UK agent.
2. ATIS orange appears only on the manipulators themselves in imagery and on the word "ATIS" in text. Everything around it stays in the AOE palette.
3. No years-in-business or turnover figures anywhere.
4. No "ATIS specialist" or endorsement claim beyond "UK agent for ATIS".
5. No invented statistics, results, client names, logos, testimonials or quotes.
6. ATIS imagery is cleared for use (AOE holds full rights).

## Pages (build in this order)
| # | Page | Source |
|---|---|---|
| 1 | Home | Written new from this brief |
| 2 | Industrial manipulators | ATIS range (atismanipolatori.com), rewritten in AOE's voice |
| 3 | Gripping systems | ATIS range, rewritten |
| 4 | Solutions | ATIS range, rewritten |
| 5 | Services | Current AOE site: design, installation, workshop adaptations, servicing for all makes |
| 6 | Industries | One section each: Automotive, Windows & Doors, Food & Beverage, Defence |
| 7 | About | Current AOE site, all figures removed |
| 8 | Contact | Netlify form plus phone and email (placeholders until confirmed) |
| 9 | Privacy policy | Standard UK GDPR, placeholders for Nathan to confirm |
| 10 | 404 | On-brand, links home |

Only the About and Services content is taken from the current AOE site. Ignore everything else on it.
Navigation order: Home, Manipulators, Gripping, Solutions, Services, Industries, About, Contact.

## Look
- **Logo (main branding, used everywhere):** brushed-silver "AOE" wordmark with an electric-blue bar, and "ENGINEERING" spaced beneath.
  - Use `site/assets/brand/aoe-logo.webp` (fallback `aoe-logo.png`), transparent, for any dark background.
  - `aoe-logo-on-black.png` is for pure black only. `aoe-logo-original.svg` is the source file; don't use it on the site (it's a 490KB raster wrapped in SVG).
  - Never recolour, redraw, stretch or place the logo on a light background.
- **Palette (taken from the logo):** near-black and deep steel-blue backgrounds, brushed silver (#E9EBF0 to #B5BCC4) for type and lines, and electric blue #0043FE as the single accent. Use the blue sparingly (CTAs, active states, a glow like the logo's). No orange in the palette (see hard rule 2).
- **Style:** engineering-grade. Sharp corners and industrial texture. No grid backgrounds of any kind, faint line or dot (Nathan, 19 Oct). Calm, precise and confident.
- **Type:** a strong grotesk for headings and a highly readable sans for body text (Google Fonts).
- **Hero:** real footage of an actual ATIS manipulator moving a real load, graded like a film: slow motion, close detail, deep steel-blue grade. Scroll-driven type and subtle WebGL effects sit over the footage.
  - Renders are allowed only if they stay faithful to the real manipulator's form. **Never** cartoonish, low-poly or stylised distortion.
  - Do not build the hero until HERO.md exists. The test: Dave says "wow".
- **Imagery:** ATIS product photography with a consistent steel-blue grade. Until the files arrive, use neutral placeholders marked `TODO-IMAGE`.

## Build
- Static site in `site/`, using Three.js and GSAP from cdnjs. Hosted on Netlify from this repo (`netlify.toml`).
- WebGL and GSAP drive motion, transitions and effects on real footage and photography. No 3D object that isn't faithful to the real manipulator.
- Reduced-motion users and slow devices get a still frame.
- Lighthouse performance 85+ on mobile. Every image has alt text. Fully keyboard navigable.
- SEO baseline: a unique title and meta description per page, sitemap.xml, robots.txt and Open Graph tags.
