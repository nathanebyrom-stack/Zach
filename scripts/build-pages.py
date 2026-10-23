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
HERO_PLATES = {'manipulators': ('boxes-mirus200', 'ATISmirus 200 with multiple suction cups lifting taped cardboard boxes'), 'gripping': ('strips-arm', 'ATISmirus 200 with a three-arm suction gripper'), 'solutions': ('doors-vacuum', 'ATISmirus 100 with a vacuum-cup frame lifting a metal door'), 'services': ('boilers-forks', 'ATISmirus 200 with covered forks holding a boiler'), 'industries': ('sheets-mirus300', 'ATISmirus 300 with adjustable suction cups lifting a metal sheet'), 'about': ('strips-wide', 'ATISmirus 200 with a three-arm suction gripper over a pallet')}
TEL = '<a href="tel:07771873177">07771 873177</a>'
MAIL = '<a href="mailto:davidogden@aoeengineering.com">davidogden@aoeengineering.com</a>'


# Model specs for drawing plates. Every figure is from content/sources.md (E-05 to E-17).
MODELS = {
    "ATISmirus 100": [("Max capacity", "180 kg"), ("Reach", "4,000 mm"), ("Vertical stroke", "2,250 mm")],
    "ATISmirus 200": [("Max capacity", "260 kg"), ("Reach", "3,250 mm"), ("Vertical stroke", "2,250 mm")],
    "ATISmirus 300": [("Max capacity", "440 kg"), ("Reach", "4,400 mm"), ("Vertical stroke", "2,250 mm")],
    "ATISacer 150": [("Max capacity", "150 kg"), ("Reach", "5,000 mm"), ("Vertical stroke", "1,800 mm")],
    "ATISlinear": [("Max capacity", "800 kg"), ("Mounting", "Overhead rail")],
}
# Image -> (model, what the ATIS set-up shows). Loads limited to the approved list (K-01 to K-07).
IMAGES = {
    "boilers-forks": ("ATISmirus 200", "Covered forks for boilers"),
    "plates-mirus200": ("ATISmirus 200", "Gripper for metal plates"),
    "boxes-mirus200": ("ATISmirus 200", "Multiple suction cups for taped boxes"),
    "strips-wide": ("ATISmirus 200", "Three-arm suction gripper"),
    "strips-arm": ("ATISmirus 200", "Three-arm suction gripper"),
    "sheets-mirus300": ("ATISmirus 300", "Adjustable suction cups for metal sheets"),
    "frames-windows": ("ATISmirus 300", "Suction gripper for window frames"),
    "drums-mirus300": ("ATISmirus 300", "Clamp for drums"),
    "bushings-pneumatic": ("ATISmirus 100", "Tilting pneumatic gripper for bushings"),
    "coil-magnet": ("ATISmirus 100", "Double magnet for a roll of metal strip"),
    "doors-vacuum": ("ATISmirus 100", "Vacuum-cup frame for metal doors"),
    "drums-tipper": ("ATISmirus 100", "Gripper that turns drums upside down"),
    "kegs-in-situ": ("ATISmirus 100", "Drum tipper on site, beside pallets of kegs"),
    "sacks-acer150": ("ATISacer 150", "Suction gripper for sacks"),
    "frames-linear": ("ATISlinear", "Pneumatic clamp for frames"),
}
PHOTOS = {"kegs-in-situ"}  # full photographs rather than cut-outs


def plate(name, alt, eager=False, extra_class=""):
    model, shows = IMAGES[name]
    rows = [("Model", model)] + MODELS[model]
    dl = "".join(f"<div><dt>{k}</dt><dd>{html.escape(v)}</dd></div>" for k, v in rows)
    load = 'fetchpriority="high"' if eager else 'loading="lazy"'
    kind = " plate-photo" if name in PHOTOS else ""
    return (f'<figure class="plate{kind} {extra_class}"><div class="plate-art">'
            f'<img src="/assets/atis/{name}.webp" alt="{html.escape(alt)}" {load} decoding="async">'
            '<span class="mark tl"></span><span class="mark tr"></span><span class="mark bl"></span><span class="mark br"></span></div>'
            f'<figcaption class="title-block"><dl>{dl}</dl><p>ATIS set-up: {html.escape(shows)}</p></figcaption></figure>')


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
            figures.append(plate(name, alt))
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
  <link rel="preload" href="/assets/fonts/archivo-var.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/css/tokens.css">
  <link rel="stylesheet" href="/css/shell.css">
  <link rel="stylesheet" href="/css/home.css">
  <link rel="stylesheet" href="/css/pages.css">
  <link rel="stylesheet" href="/css/design.css">
  <script src="/js/menu.js" defer></script>
  <script src="/js/pages.js" defer></script>{extra}
</head>
<body>
'''


def shell(slug):
    header = (ROOT / "scripts/partials/header.html").read_text().replace("{{NAV}}", navigation(slug))
    footer = (ROOT / "scripts/partials/footer.html").read_text().replace("{{NAV}}", navigation(slug))
    footer = footer.replace("{{PRIVACY_CURRENT}}", ' aria-current="page"' if slug == "privacy" else "")
    return header.strip(), footer.strip()


def build(slug):
    title, sections, meta = parse(slug)
    header, footer = shell(slug)
    body = [s for s in sections if s[0].startswith("Section: ")]
    intro, rest = body[0], body[1:]
    cta = next((s for s in sections if s[0] == "CTA"), None)
    hp = HERO_PLATES.get(slug)
    hero_fig = plate(hp[0], hp[1], eager=True, extra_class="hero-plate") if hp else ""
    hero_cls = "page-hero has-plate" if hp else "page-hero"
    parts = [f'''<main class="page-main" id="main" tabindex="-1">
  <section class="{hero_cls}" aria-labelledby="page-title">
    <div class="container hero-grid">
      <div class="hero-text">
        <h1 id="page-title">{html.escape(title)}</h1>
        <div class="page-intro">{blocks(intro[1])}</div>
      </div>{hero_fig}
    </div>
  </section>''']
    figures.clear()
    for name, lines in rest:
        name = name[len("Section: "):]
        if (slug, name) in HOLD:
            continue
        sid = slugify(name)
        if slug == "contact" and name == "Send us a message":
            lines = [l for l in lines if not l.startswith(("Fields:", "Button:", "Note under form:"))]
            content = blocks(lines) + "\n" + contact_form()
        else:
            content = blocks(lines)
        fig = "".join(figures); figures.clear()
        grid = "section-grid has-figure" if fig else "section-grid"
        parts.append(f'''  <section class="home-section" aria-labelledby="{sid}">
    <div class="container {grid}">
      <h2 id="{sid}">{html.escape(name)}</h2>
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
  <section class="page-hero" aria-labelledby="page-title"><div class="container"><h1 id="page-title">Privacy policy</h1></div></section>
  <section class="home-section"><div class="container prose">{"".join(out)}</div></section>
</main>'''
    doc = head("Privacy Policy | AOE Engineering", "How AOE Engineering Ltd handles the personal data you send us.", "privacy").replace('<meta property="og:type"', '<meta name="robots" content="noindex">\n  <meta property="og:type"') + header + "\n\n" + body + "\n" + footer + "\n\n</body>\n</html>\n"
    (ROOT / "site/privacy/index.html").write_text(doc)


def build_simple(slug, title, h1, copy, description, path, noindex=True):
    header, footer = shell(slug)
    body = f'''<main class="page-main" id="main" tabindex="-1">
  <section class="page-hero page-hero-tall" aria-labelledby="page-title"><div class="container"><h1 id="page-title">{h1}</h1><div class="page-intro">{copy}</div></div></section>
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
    pages = [""] + BUILD
    urls = "".join(f"  <url><loc>{SITE}/{p + '/' if p else ''}</loc></url>\n" for p in pages)
    (ROOT / "site/sitemap.xml").write_text(f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{urls}</urlset>\n')
    (ROOT / "site/robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n")
    print("built:", ", ".join(BUILD + ["privacy", "404", "contact/thanks", "sitemap.xml", "robots.txt"]))
