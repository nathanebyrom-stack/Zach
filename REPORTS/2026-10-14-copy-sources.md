# Copy report: sources
Date: 2026-10-14
Branch: copy/sources
Status: READY FOR REVIEW

## Written
- `content/sources.md`: the fact base for every page. Roughly 100 fact lines with IDs (A-01 and so on) that page files will cite in their `## Claims` sections. About 2,800 words.
- Sections: A AOE positioning (from BRIEF.md) · B AOE services (old Services page) · C AOE about (old About page, figures left out) · D contact placeholders · E ATIS manipulator range with capacity, radius and stroke for all 11 models · F mounting options · G gripping systems · H ATIS solutions · I ATISmirus 200 VT datasheet · J evidence for each industry (Automotive, Windows & Doors, Food & Beverage) · K images · L things that must not be used.
- Built from the saved pack in `content/source/`. A live check of atismanipolatori.com was blocked in this scheduled run, so ATIS facts rest on the saved scrape. Each one is cited to its original page URL.

## Humanize pass
- Not run. `sources.md` is an internal reference list, not site copy, so nothing here goes on the site word for word.
- Also: there was no voice profile in this run (`~/.claude/voice-profile.md` is missing, and `~/Desktop/Agents/Zach/` can't be reached from the cloud). The humanize skill needs one, so this will block the humanize step on every page until Nathan's voice profile is supplied.

## Claims and sources
- No site claims are made in this task. Each fact line in `sources.md` carries its own source.
- Main sources used: https://www.aoeengineering.com/blank-4 (Services), https://www.aoeengineering.com/blank-1 (About), https://www.atismanipolatori.com/en/industrial-manipulators/ and the range pages (atismirus, acer, ferax, linear), the six `/en/gripping-systems/` pages, the nine `/en/solutions/` pages, `/en/executions/`, the ATIS ATISmirus 200 VT product sheet and BRIEF.md (positioning).

## Needs Nathan
- **Voice profile:** please supply it, either through the voice-profiler skill or as a file in the repo or the task, so pages can be humanized.
- **Contact details:** `[CONFIRM: phone]`, `[CONFIRM: email]`, `[CONFIRM: address]`, `[CONFIRM: company number]`, `[CONFIRM: VAT number]`.
- **Old About capabilities (C-03 to C-08):** bespoke automotive manipulators, conveyor systems, gantry cranes, steel structures, offshore and subsea handling, special-purpose machinery. Which of these can be described as current? The gantry crane size figure is held back until you confirm it.
- **Old Services lines:** "Make & build" and "Project management" (B-04 to B-07) are wider than the new positioning. Should they stay on the Services page?
- **Mounting options (F-01 to F-09):** these were taken from image file names on ATIS's executions page, not from its text. A quick check of the live page is needed before they're listed.
- **Industry evidence is thin and belongs to ATIS.** Section J shows ATIS equipment working in all three industries, but none of it is AOE's own work. Pages will say what the equipment can handle and will never present these as AOE jobs. If AOE has its own projects that can be named or described, please send them over.
- **Bottles:** the sparkling-wine solution (H-09) is excluded under the no-Wine rule. Can I use it as a generic "bottles" example, or should it stay out completely?

## Not done
- No pages written. Next run: Home (`copy/home`).
- No live re-check of the ATIS site (web fetch blocked).
- `[VERIFY]` lines (mounting options, ATIS blog titles) still need a live page check before they're quoted.
