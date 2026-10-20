# Build checklist

Work top to bottom. Tick an item only when it's committed and working.

## Foundations
- [x] 1. Scaffold `site/`, `netlify.toml` (publish = "site"), design tokens (colours, type, spacing, grid) as CSS variables, shared header/nav/footer, 404 page
- [x] 2. Gather source facts into `content/sources.md`: current AOE About and Services, plus the ATIS manipulators, gripping and solutions ranges (with URLs)

## Pages
- [x] 3. Home: every section except the hero (leave a hero slot with a still placeholder). Carla Task 02, merged 20 Oct. Lighthouse mobile 73, to fix in item 16
- [ ] 4. Industrial manipulators
- [ ] 5. Gripping systems
- [ ] 6. Solutions
- [ ] 7. Services, including servicing for all makes
- [ ] 8. Industries: Automotive, Windows & Doors, Food & Beverage, Defence
- [ ] 9. About, with no figures
- [ ] 10. Contact: Netlify form, phone and email placeholders
- [ ] 11. Privacy policy (UK GDPR, placeholders)

## Finish
- [ ] 12. Motion pass: GSAP scroll and transition work across every page, with a reduced-motion fallback
- [ ] 13. Humanize pass on all copy, then a hard-rules check (no ATIS-as-AOE, no figures, orange only on manipulators and the word ATIS, nothing invented)
- [ ] 14. SEO baseline: titles, meta descriptions, Open Graph, sitemap.xml, robots.txt, alt text
- [x] 15. Hero. Interim roll-lift loop live 20 Oct (Nathan). Swap to ATIS side-member/seat originals when they arrive (see HERO.md)
- [ ] 16. Quality pass: Lighthouse mobile 85+, keyboard navigation, every page checked at 375px and 1440px
- [ ] 17. Ready for Nathan's sign-off. List any remaining TODO-IMAGE and placeholder items in LOG.md
