"""Build the inner pages from content/pages/<page>.md: python3 scripts/build-pages.py (no dependencies).

Home (site/index.html) is hand-built and is not touched. Only these sections are rendered:
`## Section: <name>` blocks and `## CTA`. `## Meta` feeds <title> and the meta description.
`## Alt text` and `## Claims` are for the record and never reach the page.
"""
from pathlib import Path
import html
import re

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://www.aoeengineering.com"
PAGES = [
    ("", "Home"), ("manipulators", "Manipulators"), ("gripping", "Gripping"),
    ("solutions", "Solutions"), ("services", "Services"),
    ("industries", "Industries"), ("about", "About"), ("contact", "Contact"),
]
BUILD = ["manipulators", "gripping", "solutions", "services", "industries", "about", "contact"]
# Sections held back from the live page until checked (see report).
HOLD = {("manipulators", "Mounting")}
figures = []
# Full-frame photographs (not cut-outs): framed rather than floated on a light pool.
PHOTOS = {"kegs-in-situ"}
# Hero light-stage image per page: real ATIS cut-outs already in site/assets/atis, decorative here (alt="")
# because each page's own figures carry the described images. Chosen so the hero doesn't repeat a figure on the same page.
HERO_IMAGE = {
    "manipulators": "sheets-mirus300", "gripping": "strips-wide", "solutions": "doors-vacuum",
    "services": "bushings-pneumatic", "industries": "drums-mirus300", "about": "boilers-forks",
}
# Each page's hero takes a different tint from the brand range.
HERO_TINT = {"manipulators": "cobalt", "gripping": "teal", "solutions": "steel", "services": "cobalt",
             "industries": "teal", "about": "steel", "contact": "cobalt"}
INDUSTRY_PANELS = [  # (section heading, anchor, image or None, panel class)
    ("Automotive", "automotive", None, "ind-automotive"),
    ("Windows & Doors", "windows-doors", "frames-windows", "ind-windows"),
    ("Food & Beverage", "food-beverage", "kegs-in-situ", "ind-food"),
    ("Defence", "defence", None, "ind-defence"),
]
TEL = '<a href="tel:07771873177">07771 873177</a>'
MAIL = '<a href="mailto:davidogden@aoeengineering.com">davidogden@aoeengineering.com</a>'


PREPAINT = """<script>/* Set the header's mobile/desktop state before first paint so the menu swap never shifts the layout. */
(function () {
  var d = window.matchMedia('(min-width: 75rem)').matches;
  var t = document.querySelector('.menu-toggle');
  var n = document.getElementById('primary-navigation');
  if (t && n) { t.hidden = d; n.hidden = !d; t.setAttribute('aria-expanded', String(d)); }
})();
</script>"""


def navigation(current):
    links = []
    for slug, label in PAGES:
        href = f"/{slug}/" if slug else "/"
        active = ' aria-current="page"' if current == slug else ""
        style = ' class="contact-link"' if slug == "contact" else ""
        links.append(f'<li><a href="{href}"{style}{active}>{label}</a></li>')
    return '<ul class="nav-list">' + "".join(links) + '</ul>'


def inline(text):
    text = html.escape(text, quote=False)
    text = text.replace("07771 873177", TEL).replace("davidogden@aoeengineering.com", MAIL)
    return re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)


def image_size(name):
    """Read width/height straight from the WebP header (no dependencies), so every figure reserves its space (CLS 0)."""
    b = (ROOT / "site/assets/atis" / f"{name}.webp").read_bytes()
    kind = b[12:16]
    if kind == b"VP8X":
        return 1 + int.from_bytes(b[24:27], "little"), 1 + int.from_bytes(b[27:30], "little")
    if kind == b"VP8L":
        v = int.from_bytes(b[21:25], "little")
        return (v & 0x3FFF) + 1, ((v >> 14) & 0x3FFF) + 1
    return int.from_bytes(b[26:28], "little") & 0x3FFF, int.from_bytes(b[28:30], "little") & 0x3FFF


def slugify(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def blocks(lines):
    """Turn a section's markdown lines into HTML: paragraphs, lists, tables, buttons."""
    out, para, items, rows = [], [], [], []
    global figures

    def flush():
        nonlocal para, items, rows
        if para:
            out.append(f"<p>{inline(' '.join(para))}</p>")
        if items:
            out.append('<ul class="tick-list">' + "".join(f"<li>{inline(i)}</li>" for i in items) + "</ul>")
        if rows:
            head, body = rows[0], [r for r in rows[1:] if not set("".join(r)) <= set("-: ")]
            t = '<div class="table-wrap"><table><thead><tr>' + "".join(f'<th scope="col">{inline(c)}</th>' for c in head) + "</tr></thead><tbody>"
            for r in body:
                t += "<tr>" + f'<th scope="row">{inline(r[0])}</th>' + "".join(f"<td>{inline(c)}</td>" for c in r[1:]) + "</tr>"
            out.append(t + "</tbody></table></div>")
        para, items, rows = [], [], []

    for line in lines:
        s = line.strip()
        if not s or s.startswith("<!--"):
            flush(); continue
        if s.startswith("Image:"):
            flush()
            name, alt = [x.strip() for x in s[6:].split("|", 1)]
            w, h = image_size(name)
            if name in PHOTOS:
                figures.append(f'<figure class="section-figure figure-photo"><img src="/assets/atis/{name}.webp" width="{w}" height="{h}" alt="{html.escape(alt)}" loading="lazy" decoding="async"></figure>')
            else:
                figures.append(f'<figure class="section-figure machine-stage" data-tilt><img class="machine" src="/assets/atis/{name}.webp" width="{w}" height="{h}" alt="{html.escape(alt)}" loading="lazy" decoding="async"></figure>')
            continue
        if s.startswith("Button:"):
            flush()
            out.append(f'<a class="home-button" href="/contact/">{inline(s[7:].strip())}</a>')
        elif s.startswith("- "):
            if para or rows: flush()
            items.append(s[2:])
        elif s.startswith("|"):
            if para or items: flush()
            rows.append([c.strip() for c in s.strip("|").split("|")])
        else:
            if items or rows: flush()
            para.append(s)
    flush()
    return "\n".join(out)


def parse(slug):
    text = (ROOT / "content/pages" / f"{slug}.md").read_text()
    text = re.sub(r"<!--.*?-->", "", text, flags=re.S)
    title = text.splitlines()[0].lstrip("# ").strip()
    sections, current = [], None
    for line in text.splitlines()[1:]:
        if line.startswith("## "):
            current = [line[3:].strip(), []]
            sections.append(current)
        elif current:
            current[1].append(line)
    meta = dict(sections and [])
    for name, body in sections:
        if name == "Meta":
            for l in body:
                if l.startswith("- Title tag:"): meta["title"] = l.split(":", 1)[1].strip()
                if l.startswith("- Meta description:"): meta["description"] = l.split(":", 1)[1].strip()
    return title, sections, meta


CSS_FILES = ["tokens", "shell", "home", "pages"]


def css_block():
    """Inline site/css/*.css (the source of truth) into the head: four render-blocking requests become none.
    Comments and whitespace are stripped only; nothing else is rewritten."""
    css = "".join((ROOT / "site/css" / f"{n}.css").read_text() for n in CSS_FILES)
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    css = re.sub(r"\s+", " ", css).replace("; ", ";").replace(" { ", "{").replace(" } ", "}").replace("{ ", "{").replace(" }", "}")
    return f"<!-- css:start (inlined from site/css by scripts/build-pages.py) --><style>{css.strip()}</style><!-- css:end -->"


def refresh_home():
    """Home is hand-built; only its inlined CSS block is refreshed here."""
    path = ROOT / "site/index.html"
    doc = path.read_text()
    doc = re.sub(r"<!-- css:start.*?<!-- css:end -->", lambda m: css_block(), doc, flags=re.S)
    path.write_text(doc)


def masked(text):
    """Wrap each word of a heading in a mask so it can rise line by line (CSS only; visible without JS)."""
    return " ".join(f'<span class="mask"><span>{html.escape(w)}</span></span>' for w in text.split())


def page_hero(slug, title, intro_html, tall=False):
    img = HERO_IMAGE.get(slug)
    tint = HERO_TINT.get(slug, "steel")
    art = ""
    if img:
        w, h = image_size(img)
        art = f'''
    <div class="page-hero-art machine-stage" aria-hidden="true" data-tilt><img class="machine" src="/assets/atis/{img}.webp" width="{w}" height="{h}" alt="" fetchpriority="high" decoding="async"></div>'''
    cls = f"page-hero tint-{tint}" + (" has-art" if img else "") + (" page-hero-tall" if tall else "")
    intro = f'\n      <div class="page-intro">{intro_html}</div>' if intro_html else ""
    return f'''  <section class="{cls}" aria-labelledby="page-title">
    <div class="container page-hero-grid">
      <div class="page-hero-copy">
        <p class="label">AOE Engineering</p>
        <h1 id="page-title" class="page-title">{masked(title)}</h1>{intro}
      </div>{art}
    </div>
  </section>'''


def industry_panels():
    out = []
    for i, (name, anchor, img, cls) in enumerate(INDUSTRY_PANELS, 1):
        pic = ""
        if img:
            w, h = image_size(img)
            klass = "" if img in PHOTOS else ' class="machine"'
            pic = f'<img{klass} src="/assets/atis/{img}.webp" width="{w}" height="{h}" alt="" loading="lazy" decoding="async">'
        big = "" if img else f'<span class="ind-big" aria-hidden="true">{i:02d}</span>'
        out.append(f'<li class="ind-panel {cls}"><a href="#{anchor}">{big}{pic}<span class="ind-num" aria-hidden="true">{i:02d}</span><span class="ind-name">{html.escape(name)}</span></a></li>')
    return '''  <section class="ind-panels-band" aria-label="Industries">
    <div class="container"><ul class="ind-panels">''' + "".join(out) + '''</ul></div>
  </section>'''


def contact_form():
    return '''<form class="enquiry-form" name="enquiry" method="POST" action="/contact/thanks/" data-netlify="true" netlify-honeypot="company-website">
  <input type="hidden" name="form-name" value="enquiry">
  <p class="visually-hidden"><label>Leave this empty <input name="company-website" tabindex="-1" autocomplete="off"></label></p>
  <div class="field"><label for="f-name">Name</label><input id="f-name" name="name" autocomplete="name" required></div>
  <div class="field"><label for="f-company">Company</label><input id="f-company" name="company" autocomplete="organization"></div>
  <div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
  <div class="field"><label for="f-phone">Phone <span>(optional)</span></label><input id="f-phone" name="phone" type="tel" autocomplete="tel"></div>
  <div class="field field-wide"><label for="f-load">What do you need to lift or move?</label><textarea id="f-load" name="message" rows="5" required></textarea></div>
  <button class="home-button" type="submit">Send</button>
  <p class="form-note">We'll only use your details to reply to your enquiry. See our <a href="/privacy/">privacy policy</a>.</p>
</form>'''


def head(title, description, slug, extra=""):
    canonical = f"{SITE}/{slug}/" if slug else f"{SITE}/"
    return f'''<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{html.escape(title)}</title>
  <meta name="description" content="{html.escape(description)}">
  <link rel="canonical" href="{canonical}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="AOE Engineering">
  <meta property="og:title" content="{html.escape(title)}">
  <meta property="og:description" content="{html.escape(description)}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:image" content="{SITE}/assets/hero/hero-roll-lift_poster.jpg">
  <script>if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('motion');</script>
  <link rel="preload" href="/assets/fonts/archivo-aoe.woff2" as="font" type="font/woff2" crossorigin>
  {css_block()}
  <script src="/js/menu.js" defer></script>
  <script src="/js/motion.js" defer></script>{extra}
</head>
<body>
'''


def shell(slug):
    header = (ROOT / "scripts/partials/header.html").read_text().replace("{{NAV}}", navigation(slug))
    footer = (ROOT / "scripts/partials/footer.html").read_text().replace("{{NAV}}", navigation(slug))
    footer = footer.replace("{{PRIVACY_CURRENT}}", ' aria-current="page"' if slug == "privacy" else "")
    return header.strip() + "\n" + PREPAINT, footer.strip()


def build(slug):
    title, sections, meta = parse(slug)
    header, footer = shell(slug)
    body = [s for s in sections if s[0].startswith("Section: ")]
    intro, rest = body[0], body[1:]
    cta = next((s for s in sections if s[0] == "CTA"), None)
    parts = ['<main class="page-main" id="main" tabindex="-1">', page_hero(slug, title, blocks(intro[1]))]
    if slug == "industries":
        parts.append(industry_panels())
    figures.clear()
    n = 0
    flip = False
    for name, lines in rest:
        name = name[len("Section: "):]
        if (slug, name) in HOLD:
            continue
        n += 1
        sid = slugify(name)
        if slug == "contact" and name == "Send us a message":
            lines = [l for l in lines if not l.startswith(("Fields:", "Button:", "Note under form:"))]
            content = blocks(lines) + "\n" + contact_form()
        else:
            content = blocks(lines)
        fig = "".join(figures); figures.clear()
        kind = "has-figure" if fig else "no-figure"
        if fig:
            flip = not flip
            kind += " flip" if not flip else ""
        tint = ("tint-a", "tint-b", "tint-c")[(n - 1) % 3]
        parts.append(f'''  <section class="home-section inner-section {tint} {kind}" id="{sid}-section" aria-labelledby="{sid}">
    <div class="container inner-grid">
      <div class="section-head"><p class="sec-num" aria-hidden="true">{n:02d}</p><h2 id="{sid}">{html.escape(name)}</h2></div>
      <div class="section-copy">{content}</div>{fig}
    </div>
  </section>''')
    if cta:
        parts.append(f'  <section class="home-section home-cta" aria-label="Contact"><div class="container">{blocks(cta[1])}</div></section>')
    parts.append("</main>")
    doc = head(meta.get("title", f"{title} | AOE Engineering"), meta.get("description", ""), slug) + header + "\n\n" + "\n".join(parts) + "\n" + footer + "\n\n</body>\n</html>\n"
    target = ROOT / "site" / slug / "index.html"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(doc)


def build_privacy():
    text = (ROOT / "content/pages/privacy.md").read_text()
    header, footer = shell("privacy")
    out = []
    for chunk in text.split("\n## ")[1:]:
        name, *lines = chunk.splitlines()
        out.append(f"<h2>{html.escape(name)}</h2>\n{blocks(lines)}")
    body = f'''<main class="page-main" id="main" tabindex="-1">
{page_hero("privacy", "Privacy policy", "")}
  <section class="home-section prose-section"><div class="container prose">{"".join(out)}</div></section>
</main>'''
    doc = head("Privacy Policy | AOE Engineering", "How AOE Engineering Ltd handles the personal data you send us.", "privacy").replace('<meta property="og:type"', '<meta name="robots" content="noindex">\n  <meta property="og:type"') + header + "\n\n" + body + "\n" + footer + "\n\n</body>\n</html>\n"
    (ROOT / "site/privacy/index.html").write_text(doc)


def build_simple(slug, title, h1, copy, description, path, noindex=True):
    header, footer = shell(slug)
    body = f'''<main class="page-main" id="main" tabindex="-1">
{page_hero(slug, html.unescape(h1), copy, tall=True)}
</main>'''
    doc = head(title, description, slug.strip("/"))
    if noindex:
        doc = doc.replace('<meta property="og:type"', '<meta name="robots" content="noindex">\n  <meta property="og:type"')
    (ROOT / "site" / path).parent.mkdir(parents=True, exist_ok=True)
    (ROOT / "site" / path).write_text(doc + header + "\n\n" + body + "\n" + footer + "\n\n</body>\n</html>\n")


if __name__ == "__main__":
    for slug in BUILD:
        build(slug)
    build_privacy()
    build_simple("404", "Page not found | AOE Engineering", "That page has moved, or it never existed.",
                 '<p>Try the menu above, or head back to the home page.</p><a class="home-button" href="/">Back to home</a>',
                 "Page not found.", "404.html")
    build_simple("contact/thanks", "Thanks | AOE Engineering", "Thanks. We've got your message.",
                 f'<p>We\'ll get back to you soon. If it\'s urgent, call us on {TEL}.</p><a class="home-button" href="/">Back to home</a>',
                 "Enquiry sent.", "contact/thanks/index.html")
    refresh_home()
    pages = [""] + BUILD
    urls = "".join(f"  <url><loc>{SITE}/{p + '/' if p else ''}</loc></url>\n" for p in pages)
    (ROOT / "site/sitemap.xml").write_text(f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{urls}</urlset>\n')
    (ROOT / "site/robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n")
    print("built:", ", ".join(BUILD + ["privacy", "404", "contact/thanks", "sitemap.xml", "robots.txt"]))
