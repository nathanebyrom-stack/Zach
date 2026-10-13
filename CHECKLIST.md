# Build checklist

Work top to bottom. Tick an item only when it's committed and working.

## Foundations
- [x] 1. Scaffold `site/`, `netlify.toml` (publish = "site"), design tokens (colours, type, spacing, grid) as CSS variables, shared header/nav/footer, 404 page
- [ ] 2. Gather source facts into `content/sources.md`: current AOE About and Services, plus the ATIS manipulators, gripping and solutions ranges (with URLs) BLOCKED: web fetch of aoeengineering.com and atismanipolatori.com needs a permission approval; unattended session, requests timed out. 13 Oct: also refused by the sandbox egress proxy (403). Exact page URLs now confirmed in content/sources.md

## Pages
- [x] 3. Home: every section except the hero (leave a hero slot with a still placeholder)
- [ ] 4. Industrial manipulators BLOCKED: needs source facts from item 2 (web fetch not approved). Page layout built with TODO-SOURCE copy slots and noindex; copy waits on facts
- [ ] 5. Gripping systems BLOCKED: needs source facts from item 2 (web fetch not approved). Page layout built with TODO-SOURCE copy slots and noindex; copy waits on facts
- [ ] 6. Solutions BLOCKED: needs source facts from item 2 (web fetch not approved). Page layout built with TODO-SOURCE copy slots and noindex; copy waits on facts
- [ ] 7. Services, including servicing for all makes BLOCKED: needs source facts from item 2 (web fetch not approved). Page layout built with TODO-SOURCE copy slots and noindex; copy waits on facts
- [x] 8. Industries: Automotive, Defence, Windows & Doors, Wine
- [ ] 9. About, with no figures BLOCKED: needs source facts from item 2 (web fetch not approved). Page layout built with TODO-SOURCE copy slots and noindex; copy waits on facts
- [x] 10. Contact: Netlify form, phone and email placeholders
- [x] 11. Privacy policy (UK GDPR, placeholders)

## Finish
- [ ] 12. Motion pass: GSAP scroll and transition work across every page, with a reduced-motion fallback
- [ ] 13. Humanize pass on all copy, then a hard-rules check (no ATIS-as-AOE, no figures, no orange, nothing invented)
- [ ] 14. SEO baseline: titles, meta descriptions, Open Graph, sitemap.xml, robots.txt, alt text
- [ ] 15. Hero. BLOCKED until HERO.md exists (approved real ATIS footage or CAD render)
- [ ] 16. Quality pass: Lighthouse mobile 85+, keyboard navigation, every page checked at 375px and 1440px
- [ ] 17. Ready for Nathan's sign-off. List any remaining TODO-IMAGE and placeholder items in LOG.md
