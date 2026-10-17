# Copy report: sources
Date: 2026-10-14
Branch: copy/sources
Status: READY FOR REVIEW

## Written
- `content/sources.md` (CHECKLIST item 2): about 100 fact lines, each with a stable ID and its original URL. No page copy has been written.
- This run regrouped the facts by the page they serve, in BRIEF.md order:
  1. Home: AOE positioning, A-01 to A-06
  2. Industrial manipulators: all 11 ATIS models with capacity, radius and stroke (E-01 to E-18), plus mounting options (F)
  3. Gripping systems: six gripper types and their variants (G)
  4. Solutions: nine ATIS solution pages (H), plus the ATISmirus 200 VT datasheet as a worked example (I)
  5. Services: AOE's old Services page (B)
  6. Industries: Automotive, Windows & Doors, Food & Beverage (A-07 and J)
  7. About: AOE's old About page with figures removed (C)
  8. Contact: placeholders (D). The privacy policy and 404 need no product facts.
  - There are also shared sections for images and for facts that must not be used.
- Each fact appears once. Where another page needs it, that page has an "Also uses" line with the IDs.
- All IDs from the first version are unchanged.
- Built from `content/source/`, which was not edited:
  - the ATIS catalogue
  - the image CSV (for page URLs)
  - the ATISmirus 200 VT datasheet
  - the AOE About and Services facts

## Humanize pass
- Not run. `sources.md` is an internal fact list, not site copy.
- There was no voice profile in this run either (`~/.claude/voice-profile.md` is missing and `~/Desktop/Agents/Zach/` can't be reached from the cloud). Until one is supplied, no page can be humanized.

## Claims and sources
- This task makes no site claims. Each line in `sources.md` carries its own source.
- Main sources:
  - https://www.aoeengineering.com/blank-4 (Services)
  - https://www.aoeengineering.com/blank-1 (About)
  - ATIS pages: `/en/industrial-manipulators/` and its four range pages, the six `/en/gripping-systems/` pages, the nine `/en/solutions/` pages and `/en/executions/`
  - the ATIS ATISmirus 200 VT product sheet
  - BRIEF.md (positioning)

## Needs Nathan
- **Voice profile:** please supply one so pages can be humanized.
- **Contact details:** `[CONFIRM: phone]`, `[CONFIRM: email]`, `[CONFIRM: address]`, `[CONFIRM: company number]`, `[CONFIRM: VAT number]`.
- **About (C-03 to C-08):** which of the old capabilities are still current? The gantry crane size stays out until you confirm it.
- **Services scope:** do "Make & build" and "Project management" (B-04 to B-07) stay on the new site?
- **Services gap:** "workshop adaptations" and "servicing all makes" are in the brief, but no source says what they involve. Please send detail, or accept the one-line versions in A-02 and A-06.
- **Industries:** every example in J is ATIS's work, not AOE's. Do you have AOE projects in these industries that can be described?
- **Mounting options (F-01 to F-09):** these come from image file names, not page text. Someone needs to check the live page.
- **Bottles (H-09):** the sparkling-wine example is out under the no-Wine rule. Can it be used as a generic bottles example, or should it stay out completely?

## Not done
- No page copy, as instructed. Next run: Home, on branch `copy/home`.
- No live check of the ATIS site (web fetch was blocked in scheduled runs). Lines tagged `[VERIFY]` still need one.
