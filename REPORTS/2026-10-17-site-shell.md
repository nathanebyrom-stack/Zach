# Report: site shell
Date: 2026-10-17
Branch: carla/site-shell
Status: PARTLY DONE

## What I built
- Static shell with all nine page stubs, a 404 page, supplied logos, shared navigation and footer, design tokens, and Netlify publish configuration.
- Accessible mobile menu with keyboard controls, Escape to close, focus handling, current-page markers, and a skip link. Navigation also works without JavaScript.
- Shared HTML partials are copied into committed pages by `python3 scripts/render-shell.py`, run from the repository root. This regenerates the page stubs; Netlify requires no build step. JavaScript only controls the menu.

## Files changed
- `netlify.toml`; `scripts/render-shell.py`; `scripts/partials/header.html`; `scripts/partials/footer.html`.
- `site/css/tokens.css`; `site/css/shell.css`; `site/js/menu.js`.
- `site/index.html`; `site/404.html`; `site/{manipulators,gripping,solutions,services,industries,about,contact,privacy}/index.html`.
- `REPORTS/2026-10-17-site-shell.md`.

## Placeholders left
- [COPY NEEDED: page content] on all nine page stubs.
- [COPY NEEDED: phone], [COPY NEEDED: email], [COPY NEEDED: address] in every footer.
- [COPY NEEDED: 404 message] on the 404 page.
- [ALT NEEDED]: none; supplied logos have descriptive alt text.
- Hero: waiting on HERO.md (yes); plain dark slot only, no footage or poster imagery added.

## Checks run
- Mobile width: pass; all ten pages at 375px, including expanded menus, have no sideways scrolling. Desktop 1440px: pass; screenshots reviewed.
- Reduced motion: pass; all ten pages have no animations or transitions under the reduced-motion preference.
- Keyboard: pass; menu opening, Escape, focus return, resizing, skip link, visible focus, and header/footer navigation.
- Local page responses, current-page markers, logo alt attributes, no-JavaScript navigation, repeatable generation, and Netlify publish configuration: pass.
- Rule check (no invented copy or facts, faithful machinery, orange only where allowed): pass; no machinery imagery or application copy added.

## Problems or questions
- Implementation is complete locally. Netlify bad-URL handling remains unrun because no connected deployment was available; `site/404.html` is in the publish directory.
- Google Fonts requests are blocked by the environment network policy. Archivo and Inter are linked as specified, but visual checks used sans-serif fallbacks. Allow `fonts.googleapis.com` and `fonts.gstatic.com`, then recheck layout with the specified fonts.

## Suggestions (not done)
- Verify a nonexistent URL on the connected Netlify preview before marking the task fully done.
