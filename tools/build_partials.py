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


def main() -> int:
    partials = {b: (PARTIALS / f"{b}.html").read_text().strip() for b in BLOCKS}
    changed = 0
    for page in sorted(SITE.rglob("*.html")):
        html = page.read_text()
        original = html
        url = page_url(page)
        for block, content in partials.items():
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
    return 0


if __name__ == "__main__":
    sys.exit(main())
