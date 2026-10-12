#!/usr/bin/env python3
"""Inject shared partials into every page in site/.

Pages keep their own <title>, meta description and body content.
Shared blocks live between marker comments and are replaced in place:

    <!-- @head --> ... <!-- /@head -->
    <!-- @header --> ... <!-- /@header -->
    <!-- @footer --> ... <!-- /@footer -->

The nav link matching the page's URL gets aria-current="page".
Run from the repo root:  python3 tools/build_partials.py
"""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "site"
PARTIALS = ROOT / "partials"
BLOCKS = ("head", "header", "footer")


def page_url(path: Path) -> str:
    rel = path.relative_to(SITE).as_posix()
    if rel == "index.html":
        return "/"
    if rel.endswith("/index.html"):
        return "/" + rel[: -len("index.html")]
    return "/" + rel


SITE_URL = "https://www.aoeengineering.com"


def og_tags(html: str, url: str) -> str:
    """Open Graph and Twitter tags built from the page's own title and description."""
    import html as h
    title = re.search(r"<title>(.*?)</title>", html, re.S)
    desc = re.search(r'<meta name="description" content="(.*?)">', html, re.S)
    if not title or not desc:
        return ""
    t, d = title.group(1).strip(), desc.group(1).strip()
    return "\n".join([
        '<meta property="og:type" content="website">',
        '<meta property="og:site_name" content="AOE Engineering">',
        '<meta property="og:locale" content="en_GB">',
        f'<meta property="og:title" content="{t}">',
        f'<meta property="og:description" content="{d}">',
        f'<meta property="og:url" content="{SITE_URL}{url}">',
        "<!-- TODO-IMAGE: og:image once graded ATIS photography is supplied -->",
        '<meta name="twitter:card" content="summary">',
    ])


def write_sitemap(pages) -> None:
    urls = []
    for page in pages:
        html = page.read_text()
        if 'name="robots" content="noindex"' in html:
            continue
        urls.append(f"  <url><loc>{SITE_URL}{page_url(page)}</loc></url>")
    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(urls)
        + "\n</urlset>\n"
    )
    (SITE / "sitemap.xml").write_text(xml)
    print(f"sitemap.xml: {len(urls)} url(s)")


def main() -> int:
    partials = {b: (PARTIALS / f"{b}.html").read_text().strip() for b in BLOCKS}
    changed = 0
    for page in sorted(SITE.rglob("*.html")):
        html = page.read_text()
        original = html
        url = page_url(page)
        for block, content in partials.items():
            if block == "head":
                content = og_tags(html, url) + "\n" + content
            if block == "header":
                content = content.replace(
                    f'data-nav="{url}"', f'data-nav="{url}" aria-current="page"'
                )
            pattern = re.compile(
                rf"(<!-- @{block} -->)(.*?)(<!-- /@{block} -->)", re.S
            )
            if not pattern.search(html):
                print(f"warn: {page.relative_to(ROOT)} has no @{block} marker")
                continue
            html = pattern.sub(lambda m: f"{m.group(1)}\n{content}\n{m.group(3)}", html)
        if html != original:
            page.write_text(html)
            changed += 1
    print(f"partials injected; {changed} page(s) updated")
    write_sitemap(sorted(p for p in SITE.rglob("*.html") if p.name != "404.html"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
