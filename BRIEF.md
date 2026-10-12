# AOE Engineering website — build brief

Master copy: https://claude.ai/code/artifact/7aaa6bbc-c7ba-4d90-a1e0-57aab72b62b1
Owner: Nathan. Edited only by Nathan or Jenny. Last change: 12 Oct 2026.

## The job
Rebuild aoeengineering.com, code-first, ready to go live by **Mon 19 Oct 2026**. The website is your only job.

Done when every page is built and works on mobile, the copy is final and humanized, there's an SEO baseline, the Netlify preview has passed a quality check, and Nathan has signed it off. Going live on the domain and moving off Wix is Nathan's step, never yours.

## Positioning and voice
- AOE are engineers who specialise in moving awkward, heavy and fragile loads. They're a 360 company: lifting apparatus and automating repetitive tasks, covering design, installation and workshop adaptations.
- **Trust-led.** Buyers choose on trust, not brand. Long-term, transparent partnerships.
- **Honest about automation.** It isn't right for every company. AOE only recommends it where there's a serious benefit, then presents the options with the best return.
- **Supply and service.** AOE is the UK supplier and installer of ATIS pneumatic manipulators, and services manipulators of all makes.
- **Voice.** Close to Dave Ogden's tone: educational, plain-spoken, professional UK B2B English, never salesy. Short sentences, active voice, British spelling.

## Hard rules
1. The site reads as AOE, never as ATIS. Never say or imply AOE is ATIS or manufactures the manipulators.
2. No ATIS oranges anywhere.
3. No years-in-business or turnover figures anywhere.
4. No "ATIS specialist" or endorsement claim.
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
| 6 | Industries | One section each: Automotive, Defence, Windows & Doors, Wine |
| 7 | About | Current AOE site, all figures removed |
| 8 | Contact | Netlify form plus phone and email (placeholders until confirmed) |
| 9 | Privacy policy | Standard UK GDPR, placeholders for Nathan to confirm |
| 10 | 404 | On-brand, links home |

Only the About and Services content is taken from the current AOE site. Ignore everything else on it.
Navigation order: Home, Manipulators, Gripping, Solutions, Services, Industries, About, Contact.

## Look
- **Palette:** deep steel blue, with graphite and off-white supporting it, plus one cool accent. Never orange.
- **Style:** engineering-grade. Sharp corners, a fine grid and industrial texture. Calm, precise and confident.
- **Type:** a strong grotesk for headings and a highly readable sans for body text (Google Fonts).
- **Hero:** real footage of an actual ATIS manipulator moving a real load, graded like a film: slow motion, close detail, deep steel-blue grade. Scroll-driven type and subtle WebGL effects sit over the footage.
  - **Never** a modelled, low-poly or cartoon arm.
  - The only fallback is a photoreal render from ATIS's own CAD model.
  - Do not build the hero until HERO.md exists. The test: Dave says "wow".
- **Imagery:** ATIS product photography with a consistent steel-blue grade. Until the files arrive, use neutral placeholders marked `TODO-IMAGE`.

## Build
- Static site in `site/`, using Three.js and GSAP from cdnjs. Hosted on Netlify from this repo (`netlify.toml`).
- WebGL and GSAP drive motion, transitions and effects on real footage and photography. No hand-modelled 3D objects anywhere.
- Reduced-motion users and slow devices get a still frame.
- Lighthouse performance 85+ on mobile. Every image has alt text. Fully keyboard navigable.
- SEO baseline: a unique title and meta description per page, sitemap.xml, robots.txt and Open Graph tags.
