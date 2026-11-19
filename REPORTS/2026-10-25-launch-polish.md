# Report: launch polish (icons, social meta, structured data)
Date: 2026-10-25
Branch: jenny/launch-polish (from main at 61600b8; not merged)
Status: DONE, ready for Jenny's review

## What changed
1. **Favicon set.** All files are made from `site/assets/brand/aoe-logo.png`, the real mark, nothing redrawn.
   - Files at the site root: `favicon.ico` (16/32/48), `favicon-32.png`, `apple-touch-icon.png` (180, solid #05080D), `icon-192.png`, `icon-512.png` and `site.webmanifest` (name "AOE Engineering"; theme and background #05080D, from `--color-bg`).
   - The icon uses the "AOE" letters of the logo, without the "ENGINEERING" line. The full logo is illegible at 32px; the letters stay readable at 32px.
   - I tried using the E with its blue bar alone, but at 32px it reads as a hamburger menu, so I didn't use it.
   - No `favicon.svg`: `aoe-logo-original.svg` is a 1320x904 raster inside an SVG wrapper (BRIEF.md says so too), with no vector paths to use.
   - All icon links, the manifest and `<meta name="theme-color" content="#05080D">` are on all 11 pages, including 404 and thanks.
2. **Home canonical and Open Graph.** Added canonical https://www.aoeengineering.com/ plus og:title, description, url, type, site_name, locale (en_GB) and image. Title and description are Home's existing text, word for word.
3. **Share card** `site/assets/brand/og-aoe.jpg`: 1200x630, 72 KB.
   - Made from the real roll-lift still with the site's cobalt and teal grade, a steel-blue scrim, the AOE logo, the blue accent bar, and the Home H1 wording only ("Design. Supply. Fit. Service.").
   - Used as og:image on every page, with og:image:type, width, height and alt.
   - twitter:card summary_large_image, plus twitter title, description, image and image alt, on every page.
4. **Organization JSON-LD on Home.**
   - Fields: name, legalName "AOE Engineering Ltd", url, logo, telephone "07771 873177", email, and the postal address split from the footer line.
   - Every value is copied from the footer; nothing that isn't on the site.
   - Left out on purpose: addressCountry (not shown on the site) and the registered number (Companies House check still pending per DAVE-HANDOVER.md).
   - The JSON parses, and it sits at the end of `<body>` so it isn't in the way of the head.
5. **404:** canonical removed, and the matching og:url (it also pointed at /404/). noindex is kept.

## Where the changes live, so a rebuild keeps them
- `scripts/build-pages.py`: a new `meta_block()` writes the head tags for every generated page.
- `refresh_home()` rewrites Home's `<!-- meta:start -->…<!-- meta:end -->` block from Home's own `<title>` and meta description.
- The JSON-LD is written by hand in `site/index.html`.
- Running the build twice gives byte-identical output.

## Judgement call
- **og:image:alt.** The hero image has empty alt text (it's decorative), so there was no existing alt to reuse. I used "AOE Engineering: Design. Supply. Fit. Service.", which is only words already on the site. It is meta only, nothing visible.

## Checks
- Playwright, 11 pages x 360 and 1440:
  - Icon and manifest links present on every page, and every icon, the manifest and og-aoe.jpg return 200.
  - All OG and Twitter tags present; canonical on every page except 404.
  - JSON-LD parses; no console errors; no horizontal overflow. 0 failures.
- Visible-text diff against main (61600b8): no change.
- Lighthouse mobile (local serve, Chromium 1243, lighthouse 12):
  - Home: 94, 93, 94, 94. Main run in the same session: 94, 94, 90, 94.
  - Services: 95, 95.
  - CLS 0 everywhere.
  - Putting the new meta block before the image preloads cost about 0.1 s of LCP, so it now sits after them.
- I looked at the 32px and 180px icons and the share card: all legible.

## Preview files (for review)
- /tmp/claude-0/launch-polish/favicon-32px-actual.png
- /tmp/claude-0/launch-polish/favicon-32px-from-ico-x8.png
- /tmp/claude-0/launch-polish/favicon-preview-sheet.png
- /tmp/claude-0/launch-polish/apple-touch-icon-180px.png
- /tmp/claude-0/launch-polish/og-aoe.jpg

## Not done
- No copy changes.
- No BreadcrumbList or other schema types.
- No sitemap changes.
