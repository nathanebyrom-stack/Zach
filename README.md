# AOE Engineering website

Static site in `site/`, deployed by Netlify (`netlify.toml`, publish = "site").

- Shared head, header and footer live in `partials/`. After editing a partial or adding a page, run `python3 tools/build_partials.py` from the repo root. It injects the partials, adds Open Graph tags and rewrites `site/sitemap.xml`.
- Each page keeps its own `<title>`, meta description and canonical link, plus the `<!-- @head -->`, `<!-- @header -->` and `<!-- @footer -->` markers.
- Preview locally: `cd site && python3 -m http.server`.
