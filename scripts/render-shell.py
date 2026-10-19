"""Refresh shared shell regions (preserving existing page content): python3 scripts/render-shell.py (no dependencies)."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
PAGES = [
    ("", "Home"), ("manipulators", "Manipulators"), ("gripping", "Gripping"),
    ("solutions", "Solutions"), ("services", "Services"),
    ("industries", "Industries"), ("about", "About"), ("contact", "Contact"),
]


def navigation(current):
    links = []
    for slug, label in PAGES:
        href = f"/{slug}/" if slug else "/"
        active = ' aria-current="page"' if current == slug else ""
        style = ' class="contact-link"' if slug == "contact" else ""
        links.append(f'<li><a href="{href}"{style}{active}>{label}</a></li>')
    return '<ul class="nav-list">' + "".join(links) + '</ul>'


for slug, title in PAGES + [("privacy", "Privacy policy"), ("404", "404")]:
    header = (ROOT / "scripts/partials/header.html").read_text().replace("{{NAV}}", navigation(slug))
    footer = (ROOT / "scripts/partials/footer.html").read_text().replace("{{NAV}}", navigation(slug))
    footer = footer.replace("{{PRIVACY_CURRENT}}", ' aria-current="page"' if slug == "privacy" else "")
    content = '<p>[COPY NEEDED: page content]</p>'
    if slug == "":
        content += '\n<!-- HERO: waiting on HERO.md -->\n<div class="hero-placeholder" aria-hidden="true"></div>'
    elif slug == "404":
        content = '<p>[COPY NEEDED: 404 message]</p>\n<a href="/">Home</a>'
    document = f'''<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title} | AOE Engineering</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap">
  <link rel="stylesheet" href="/css/tokens.css">
  <link rel="stylesheet" href="/css/shell.css">
  <script src="/js/menu.js" defer></script>
</head>
<body>
{header}
<main class="container" id="main" tabindex="-1">
  <h1>{title}</h1>
  {content}
</main>
{footer}
</body>
</html>
'''
    target = ROOT / "site" / ("404.html" if slug == "404" else f"{slug}/index.html" if slug else "index.html")
    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists():
        existing = target.read_text()
        existing = re.sub(r'<a class="skip-link".*?</header>', lambda _: header.strip(), existing, flags=re.S)
        existing = re.sub(r'<footer class="site-footer">.*?</footer>', lambda _: footer.strip(), existing, flags=re.S)
        target.write_text(existing)
    else:
        target.write_text(document)
