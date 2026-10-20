# Copy report: manipulators
Date: 2026-10-20
Branch: copy/manipulators
Status: READY FOR REVIEW (one [VERIFY] section for Jenny's live check)

## Written
- `content/pages/manipulators.md`: Intro; ATISmirus (table and applications, plus the ATISmirus 200 VT window example); ATISacer (table and application); ATISferax; ATISlinear (and application); Mounting [VERIFY]; How we help; CTA; Meta; Alt text; Claims.
- About 720 words of visible copy, counting headings and tables.
- Title tag: 49 characters. Meta description: 139 characters.
- Same heading format as `home.md`. No hero, because this isn't the home page. CTA button reads "Contact us" and links to Contact.
- No changes to `sources.md`: every line on the page is already in it.

## Humanize pass
- Run with voice profile: yes. Used humanize-kit:humanize with Dave Ogden's profile (`content/voice/voice-profile-dave-ogden.md`, copied to the three paths; copies not committed). Pattern score before about 16/57 (28%), so moderate mode. Tier 4 gate passed.
- Fact-check after humanizing: no claims, numbers or names added. I took out one phrase lifted from Dave's Fluid Process sample ("not just any equipment, the right equipment").
- Slop-gate (anthropic-skills:slop-gate): 5/5 clean on the body copy. No exceptions needed. Rival-model pass not run (no codex CLI here).

## Claims and sources
- Four ATIS families, all pneumatic, 55 kg to 1,000 kg — E-01, E-02, E-18
- UK agent for ATIS; ATIS makes them; AOE supplies, installs, commissions, services; AOE designs and builds manipulators — A-05, A-09, A-06, B-11
- Model tables (capacity, radius, stroke) — E-04 to E-14, E-16
- Family types: rigid arm, double rope, lever (low inertia, attributed to ATIS), linear guides on an overhead rail — E-03, E-10, E-14, E-15, E-16, E-17
- "Widest spread of capacity in the range" (ATISmirus) — derived by comparing E-04 to E-09 with E-11 to E-16
- ATIS application examples (presented as ATIS's, never AOE jobs): bushings, boilers, three taped boxes, metal sheets, paint drums, frames — K-02 to K-07
- ATISmirus 200 VT window example — I-01, I-02, I-05, I-06, I-07
- Mountings — F-01 to F-09 [VERIFY]
- How we help: honest about automation, concept designs, other makers, workshop adaptations, support packages — A-04, B-02, A-10, B-10, B-08, B-09
- Phone and email — D-01, D-02

## Needs Nathan
- **Mounting section [VERIFY]:** the mountings come from image file names on the ATIS executions page, not page text. Jenny, please check https://www.atismanipolatori.com/en/executions/ live. Cut any that don't match, or drop the section.
- **What each family is for:** the ATIS pack gives the type and specs but no "best for" descriptions. I've shown each family's use through ATIS's own applications (K lines) instead of writing advice we can't source. If Dave has guidance on when to pick each family, send it and I'll add it.
- **Phone and email:** still Dave's mobile and personal email (open from earlier reports).
- **Images:** no product shots placed yet (TODO-IMAGE). Alt text gets written once the images are placed.

## Not done
- Nothing merged to `main`. Not handed to Carla.
