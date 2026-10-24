# Log (newest first, keep 5)

- 24 Oct 2026 (Jenny, evening push): Checklist 12, 13, 16 worked in one session (branch jenny/motion-quality). Item 12: GSAP 3.12.5 vendored (self-hosted, no CDN), shared site/js/motion.js — sections rise 18px power3.out 0.07s stagger, ATIS images settle from 1.035, inner-page hero rise; reduced-motion = still, no-JS = plain HTML, inline styles cleared; fixed fast-scroll skip, tall-Contact trigger and a tab-order bug. Item 13: hard-rules sweep clean (no figures, no orange, ATIS "UK agent" wording only, no grids); three debatable items in zach-REPORT (incl. footer "Registered number: 6716033" — verify at Companies House pre-launch). Item 16: Playwright 11 pages x 375/1440 x normal/reduced — overflow, alt, keyboard, console all pass; hero still preloaded for LCP. Ticked 12 and 13; 16 stays open until Lighthouse mobile 85+ is confirmed on the Netlify preview. Preview artifact published for Nathan.

## 12 Oct 2026, setup (Jenny)
- Done: repo set up with BRIEF.md, CLAUDE.md, CHECKLIST.md and LOG.md.
- Next: checklist item 1, scaffold.
- Blocker: none for items 1–14. Netlify not yet connected (Nathan). Hero waits on ATIS footage and HERO.md.

- 17 Oct (Jenny): Task 01 site shell by Carla reviewed and merged (carla/site-shell). 375px and 1440px checked, no sideways scroll, menu works, palette per brief, no orange. Open: Netlify 404 check once Netlify is connected.

- 17 Oct (Jenny): pushed Vic's hero-footage branch (a7c3cec) from his bundle. Ticked item 2 (sources merged d4a562a). Item 8 now lists four industries incl. Defence per Dave 16 Oct.

- 19 Oct (Jenny): HERO.md written. Nathan picked two ATIS YouTube videos (vehicle side member = main hero, seat rope balancer = secondary); Vic's five draft loops not used. Nathan reports Netlify (aoe-preview) deployed; Jenny can't reach it from her sandbox to verify. Hero headline (A/B/C) still to pick.
- 19 Oct (Jenny): Nathan picked hero Option C. Merged copy/home (with copy/sources) to main. Wrote TASKS/02-home.md for Carla (Home build incl. hero slot and site-wide footer).
- 20 Oct (Jenny): Reviewed Carla's Task 02 (carla/home, PR #2). Copy matches content/pages/home.md and sources; no figures; ATIS wording is "UK agent" only. Removed the faint grid page background (Nathan's 19 Oct rule) and the matching BRIEF line. Merged to main. Open: side-member hero files still not cut (Vic); Lighthouse mobile 73 vs 85 target; TODO-IMAGE slots on Home.
- 20 Oct (Jenny): Nathan downloaded both approved YouTube videos; rejected for the hero (burned-in ATIS logo + URL, side member 720p). Nathan chose Vic's roll-lift loop as interim hero. Copied to site/assets/hero, wired into index.html, media-ready on. Checked at 375px and 1440px: plays, readable, no sideways scroll.

- 22 Oct (Jenny): Nathan asked for the whole site now. Jenny wrote copy for Gripping, Solutions, Services, Industries, About, Contact, Privacy (sourced from content/sources.md only; humanize pass in Dave's voice; slop-gate 5/5 or justified: product lists, 'bespoke'). Built all inner pages with scripts/build-pages.py, Netlify enquiry form, thanks page, 404, sitemap, robots, OG tags. Checked 375px and 1440px, no sideways scroll. Held back: Manipulators mounting list ([VERIFY], ATIS page not reachable). Open: images (TODO), privacy [CONFIRM]s, Lighthouse.
- 22 Oct (Jenny, pm): Nathan asked for Dave's ATIS material. Found the 31 Jul WeTransfer pack (expired) already saved in Nathan's Google Drive. Extracted 17 real ATIS application photos from 14 case-study PDFs, cut out, steel-blue framed, placed on Home and every inner page with alt text. Register in content/sources.md. Two .mov files (V01, V02) in Drive are over the connector's 10 MB limit; not checked.
- 23 Oct (Jenny): V01/V02.mov checked via Nathan's synced Drive: short screen recordings of the ATIS reel (2.6 s HQ building, 4 s frame lift + reel close-up). Not used; interim roll-lift hero stays. PR #5 merged to main on Nathan's say-so.
