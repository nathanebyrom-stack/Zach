# Report: final polish (final hero + second motion moment)
Date: 2026-10-25
Branch: jenny/final-polish (from main at a00fa62; not merged)
Status: DONE, ready for Jenny's review

## 1. Hero swap plan retired
- Rewrote HERO.md as the final record:
  - The roll-lift loop is the final hero as of 25 Oct 2026 (Nathan), and no swap is pending.
  - Why the ATIS YouTube side-member and seat copies were rejected: burned-in ATIS logo and URL, and the side-member video is 720p.
  - Dave will not supply clean originals.
  - The rights note (Dave, 17 Oct) is kept.
- CHECKLIST.md item 15: wording changed to "final hero, no swap pending", still ticked.
- LOG.md: new entry added and the interim-hero line removed from the sign-off list (newest first, 5 kept).

## 2. Second motion moment: roll gripper close-up behind the Home CTA band
- **Assets:** Vic's `hero-roll-gripper-closeup{,-mobile}.{mp4,webm}`, plus its `_poster` and `_still` frames (jpg and webp), taken unchanged from origin/hero-footage into site/assets/hero/.
  - Sizes: desktop 1920x1080, 5.0 s; mobile 1080x1920, 5.3 s.
  - No audio stream.
  - Per Vic's notes: no people in frame, low branding, the darkest and calmest shot.
- **Markup** (site/index.html): a `<picture>` still is the fallback (mobile still below 48rem, desktop still above), with `<video muted loop playsinline preload="none" hidden>` over it. Video sources sit in data-src: desktop file at 768px and above, mobile file below.
- **Behaviour** (site/js/home.js):
  - An IntersectionObserver (200px margin) attaches the sources and plays the video only when the band is near the viewport, and pauses it off-screen.
  - Reduced motion, Save-Data or 2G, or no JS: the still only, and the video is never requested.
  - The clip fades in once it is actually playing, so there is no flash.
- **Verified in Chromium:**
  - First-load close-up requests: 0 at 1440 and 390, so LCP and first-load transfer are unaffected.
  - In view: playing, readyState 4. Correct file served at each width (closeup.webm at 1440, closeup-mobile.webm at 390).
  - Scrolled away: paused.
  - Reduced motion: hidden, no video request, still frame shown.
- **Layout:** the media is absolutely positioned inside a padded section, so loading it cannot shift layout. CLS 0.
- **Scrim and grade:** a cobalt and teal wash, with near-black under the type (a stronger vertical scrim on mobile). Contrast was measured on the rendered background pixels behind the text:
  - Desktop: white at least 11.4:1, ice-blue phone number at least 5.9:1.
  - Mobile: white at least 16.7:1.
  - All pass WCAG AA; white passes AAA.
- The poster-frame CTA background (the roll-lift poster) is retired. The scroll parallax now moves the whole media box.

## Checks
- Text diff of visible words against main (a00fa62), all 11 pages: no change.
- Playwright: 11 pages at 375, 390 and 1440, normal and reduced motion, plus no-JS. No overflow, no console errors, no missing alt, all content visible.
- Screenshots at 1440 and 390 checked by eye (CTA band with footage; reduced-motion still).
- Lighthouse mobile (local, run alone, two runs each): Home 94 / 94, Services 95 / 96, CLS 0.
  - A run made while the Playwright audit was hogging the CPU gave Home 85/86 (TBT 330 ms). Re-run alone it was 94/94, so the low score was the test machine, not the page.

## Not done
- The seat-balancer and side-member clips will not be used (HERO.md).
- No other Vic clips used. The coil-gripper loop has a dominant ATIS logo on desktop. The panel-lifter clips show hands and are not needed.
- No copy changes.
