# Sources

Built by Zach, 14 Oct 2026. Every fact the site copy may use, one per line, with its original URL (or the brief/instruction it comes from). Page files cite these lines by ID in their `## Claims` section.

How this was built: from the saved pack in `content/source/` (read-only). A live check of atismanipolatori.com was attempted and blocked in this scheduled run, so every ATIS fact below rests on the saved pack and is cited to the original page URL it was scraped from.

Key to tags:
- **[CONFIRM]** needs Nathan before it goes on the site.
- **[VERIFY]** the fact comes from an image file name or page address rather than page text. Fine as background; check the live page before quoting it.
- **[DO NOT USE]** recorded so nobody adds it later by mistake.

Base URLs: ATIS = `https://www.atismanipolatori.com`. AOE = `https://www.aoeengineering.com`.

---

## A. AOE: positioning (Nathan's brief)

| ID | Fact | Source |
|---|---|---|
| A-01 | AOE are engineers who specialise in moving awkward, heavy and fragile loads. | BRIEF.md, "Positioning and voice" (Nathan) |
| A-02 | AOE works across lifting apparatus and automating repetitive tasks, covering design, installation and workshop adaptations (a "360" company). | BRIEF.md, "Positioning and voice" |
| A-03 | AOE aims for long-term, transparent partnerships; buyers choose on trust rather than brand. | BRIEF.md, "Positioning and voice" |
| A-04 | Automation isn't right for every company. AOE only recommends it where there's a serious benefit, then presents the options with the best return. | BRIEF.md, "Positioning and voice" |
| A-05 | AOE is the UK supplier and installer of ATIS pneumatic manipulators. | BRIEF.md, "Positioning and voice" |
| A-06 | AOE services manipulators of all makes, not only ATIS. | BRIEF.md, "Positioning and voice" |
| A-07 | Industries served on the new site: Automotive, Windows & Doors, Food & Beverage. No Defence, no Wine. | CLAUDE.md "Industries" (Nathan, 13 Oct 2026) |
| A-08 | AOE holds full rights to use ATIS imagery. | BRIEF.md, hard rule 6 |

## B. AOE: services (current site)
Source page: AOE Services, https://www.aoeengineering.com/blank-4 (via `content/source/aoe-site-about-services.md`)

| ID | Fact | Source |
|---|---|---|
| B-01 | AOE describes its services as industrial process engineering services. | https://www.aoeengineering.com/blank-4 |
| B-02 | Feasibility and concept design: AOE evaluates process options and produces quick concept designs. | https://www.aoeengineering.com/blank-4 |
| B-03 | Feasibility work sets out the technical benefits, presents solutions to the customer's team and reduces programme risk. | https://www.aoeengineering.com/blank-4 |
| B-04 | Make and build: AOE sources and manages the manufacture and assembly of custom components and equipment for customers short of capacity or capability. | https://www.aoeengineering.com/blank-4 |
| B-05 | Make and build work is quoted competitively on request. | https://www.aoeengineering.com/blank-4 |
| B-06 | Project management: AOE coordinates partners and suppliers, manages risk, and works to deliver on schedule and within budget. | https://www.aoeengineering.com/blank-4 |
| B-07 | AOE uses its project management approach on its own equipment projects and also offers it as a standalone service. | https://www.aoeengineering.com/blank-4 |
| B-08 | Equipment support: ongoing care packages for equipment AOE supplies, tailored to the customer. | https://www.aoeengineering.com/blank-4 |
| B-09 | Support packages can include scheduled maintenance, statutory inspections and training for the customer's team. | https://www.aoeengineering.com/blank-4 |

## C. AOE: about (current site)
Source page: AOE About, https://www.aoeengineering.com/blank-1. Years-in-business and turnover figures are deliberately excluded (hard rule 2).

| ID | Fact | Source |
|---|---|---|
| C-01 | AOE's background is in production equipment design, at the front line of manufacturing. | https://www.aoeengineering.com/blank-1 |
| C-02 | AOE's purpose is to solve customers' technical manufacturing challenges and deliver effective equipment for demanding clients. | https://www.aoeengineering.com/blank-1 |
| C-03 | Past work: bespoke automotive manipulators. **[CONFIRM]** whether to present as current. | https://www.aoeengineering.com/blank-1 |
| C-04 | Past work: fully automated conveyor systems. **[CONFIRM]** whether current. | https://www.aoeengineering.com/blank-1 |
| C-05 | Past work: gantry cranes. **[CONFIRM]** whether current; the size figure on the old page is not recorded here and must not be used until Nathan confirms it. | https://www.aoeengineering.com/blank-1 |
| C-06 | Past work: industrial steel structures. **[CONFIRM]** whether current. | https://www.aoeengineering.com/blank-1 |
| C-07 | Past work: offshore and subsea handling equipment. **[CONFIRM]** whether current. | https://www.aoeengineering.com/blank-1 |
| C-08 | Past work: special-purpose industrial machinery. **[CONFIRM]** whether current. | https://www.aoeengineering.com/blank-1 |
| C-09 | Past work: military and civil aerospace process equipment. **[DO NOT USE]**: Defence dropped (Nathan, 13 Oct). | https://www.aoeengineering.com/blank-1 |

## D. AOE: contact details
Nothing verified yet. Use these placeholders on every page.

| ID | Item | Status |
|---|---|---|
| D-01 | Phone | `[CONFIRM: phone]` |
| D-02 | Email | `[CONFIRM: email]` |
| D-03 | Postal address / service area | `[CONFIRM: address]` |
| D-04 | Company registration and VAT numbers (for footer and privacy policy) | `[CONFIRM: company number]`, `[CONFIRM: VAT number]` |
| D-05 | ATIS's own address, phone and email appear on the ATIS datasheet. **[DO NOT USE]**: they are ATIS's, not AOE's. | `content/source/atismirus-200-vt-datasheet.pdf` |

## E. ATIS manipulators: the range
Source: ATIS catalogue scraped from https://www.atismanipolatori.com/en/ (saved as `content/source/atis-catalogue.html`). Range pages from `atis_images_catalog.csv`. All ATIS products are made by ATIS; AOE supplies, installs and services them.

| ID | Fact | Source |
|---|---|---|
| E-01 | ATIS makes four families of industrial manipulator: ATISmirus, ATISacer, ATISferax and ATISlinear. | https://www.atismanipolatori.com/en/industrial-manipulators/ |
| E-02 | All four families are pneumatic. | https://www.atismanipolatori.com/en/industrial-manipulators/ |
| E-03 | ATISmirus is a rigid-arm manipulator. | https://www.atismanipolatori.com/en/industrial-manipulators/atismirus/ |
| E-04 | ATISmirus 80: max capacity 115 kg, radius 3,100 mm, vertical stroke 1,500 mm. | https://www.atismanipolatori.com/en/industrial-manipulators/atismirus/ |
| E-05 | ATISmirus 100: max capacity 180 kg, radius 4,000 mm, vertical stroke 2,250 mm. | https://www.atismanipolatori.com/en/industrial-manipulators/atismirus/ |
| E-06 | ATISmirus 200: max capacity 260 kg, radius 3,250 mm, vertical stroke 2,250 mm. | https://www.atismanipolatori.com/en/industrial-manipulators/atismirus/ |
| E-07 | ATISmirus 300: max capacity 440 kg, radius 4,400 mm, vertical stroke 2,250 mm. | https://www.atismanipolatori.com/en/industrial-manipulators/atismirus/ |
| E-08 | ATISmirus 500: max capacity 600 kg, radius 4,000 mm, vertical stroke 2,100 mm. | https://www.atismanipolatori.com/en/industrial-manipulators/atismirus/ |
| E-09 | ATISmirus 800: max capacity 1,000 kg, radius 4,200 mm, vertical stroke 2,250 mm. | https://www.atismanipolatori.com/en/industrial-manipulators/atismirus/ |
| E-10 | ATISacer is a double-rope manipulator. | https://www.atismanipolatori.com/en/industrial-manipulators/acer/ |
| E-11 | ATISacer 55: max capacity 55 kg, radius 4,000 mm, vertical stroke 1,600 mm. | https://www.atismanipolatori.com/en/industrial-manipulators/acer/ |
| E-12 | ATISacer 80: max capacity 95 kg, radius 4,100 mm, vertical stroke 1,800 mm. | https://www.atismanipolatori.com/en/industrial-manipulators/acer/ |
| E-13 | ATISacer 150: max capacity 150 kg, radius 5,000 mm, vertical stroke 1,800 mm. | https://www.atismanipolatori.com/en/industrial-manipulators/acer/ |
| E-14 | ATISferax is a lever manipulator: max capacity 80 kg, radius 4,000 mm, vertical stroke 1,500 mm. | https://www.atismanipolatori.com/en/industrial-manipulators/ferax/ |
| E-15 | ATISferax is described as low inertia. | https://www.atismanipolatori.com/en/industrial-manipulators/ferax/ |
| E-16 | ATISlinear moves vertically on linear guides, with max capacity 800 kg. | https://www.atismanipolatori.com/en/industrial-manipulators/linear/ |
| E-17 | ATISlinear is installed on an overhead rail. | https://www.atismanipolatori.com/en/industrial-manipulators/linear/ |
| E-18 | Across the range, capacity runs from 55 kg (ATISacer 55) to 1,000 kg (ATISmirus 800). Derived from E-04 to E-16. | https://www.atismanipolatori.com/en/industrial-manipulators/ |

## F. ATIS manipulators: mounting options **[VERIFY]**
Source page: https://www.atismanipolatori.com/en/executions/. These come from the Italian image file names on that page (translated by Zach), not from page text. Check the live page before listing them as options.

| ID | Mounting (translated from file name) | Source |
|---|---|---|
| F-01 | Fixed floor column | https://www.atismanipolatori.com/en/executions/ |
| F-02 | Column on a self-supporting base | https://www.atismanipolatori.com/en/executions/ |
| F-03 | Column on a self-supporting base, moving on a floor rail | https://www.atismanipolatori.com/en/executions/ |
| F-04 | Offset column, fixed or rotating | https://www.atismanipolatori.com/en/executions/ |
| F-05 | Fixed ceiling-hung (suspended) mounting | https://www.atismanipolatori.com/en/executions/ |
| F-06 | Suspended, sliding on runways | https://www.atismanipolatori.com/en/executions/ |
| F-07 | Suspended, sliding on an overhead crane | https://www.atismanipolatori.com/en/executions/ |
| F-08 | Suspended from a fixed column (jib-style) | https://www.atismanipolatori.com/en/executions/ |
| F-09 | Column with an integrated pallet truck (mobile) | https://www.atismanipolatori.com/en/executions/ |

## G. ATIS gripping systems
Source: ATIS catalogue (`atis-catalogue.html`), gripping range pages listed per line. "EOAT" = end-of-arm tooling.

| ID | Fact | Source |
|---|---|---|
| G-01 | ATIS offers six gripping-system types: mechanical clamps, pneumatic clamps, magnets, integrated forks, hooks and vacuum cups. | https://www.atismanipolatori.com/en/industrial-manipulators/ (gripping section of catalogue) |
| G-02 | Mechanical clamps use custom-designed jaws; parallel, angular and toggle-joint types. | https://www.atismanipolatori.com/en/gripping-systems/mechanical-clamp-manipulators/ |
| G-03 | Mechanical clamps are used in automotive, electronics, packaging and machining. | https://www.atismanipolatori.com/en/gripping-systems/mechanical-clamp-manipulators/ |
| G-04 | Pneumatic clamps grip on an internal or external diameter. | https://www.atismanipolatori.com/en/gripping-systems/atis-manipulators-with-pneumatic-clamps/ |
| G-05 | Pneumatic clamps suit cylindrical, conical and special shapes. | https://www.atismanipolatori.com/en/gripping-systems/atis-manipulators-with-pneumatic-clamps/ |
| G-06 | Magnetic grippers use permanent magnets for steel sheets, plates and tubes. | https://www.atismanipolatori.com/en/gripping-systems/atis-manipulators-with-magnets/ |
| G-07 | ATIS states magnetic gripping causes zero surface damage. Attribute to ATIS if used. | https://www.atismanipolatori.com/en/gripping-systems/atis-manipulators-with-magnets/ |
| G-08 | Integrated forks handle pallets, boxes, sheets and bulky components; fork dimensions can be made to suit. | https://www.atismanipolatori.com/en/gripping-systems/atis-manipulators-with-integrated-forks/ |
| G-09 | Hook systems use custom hook tooling for pallets, coils and containers, used in logistics and metalworking. | https://www.atismanipolatori.com/en/gripping-systems/atis-manipulators-with-hook-systems/ |
| G-10 | Vacuum-cup grippers use modular suction frames for glass, marble, wood and metal. | https://www.atismanipolatori.com/en/gripping-systems/vacuum-cup-manipulators/ |
| G-11 | Vacuum-cup grippers can tilt the load 180° and rotate it 360°. | https://www.atismanipolatori.com/en/gripping-systems/vacuum-cup-manipulators/ |
| G-12 | Gripper variants shown by ATIS include a tilt-and-rotate clamp, a 200-litre drum clamp with rotation, an adjustable-span fork and rail-mounted (overhead) magnetic, fork and hook versions. | Gripping range pages above (catalogue "Action shots") |

## H. ATIS solutions (application pages)
Source: ATIS catalogue "Solutions" section; each line is that solution's own page.

| ID | Fact | Source |
|---|---|---|
| H-01 | Window frame handling: lifting window frames, doors and gates in aluminium, PVC and wood profiles. | https://www.atismanipolatori.com/en/solutions/handling-and-lifting-window-frames-efficiency-and-safety-with-atis-manipulators/ |
| H-02 | Glass handling: vacuum-cup lifting of large glass panes, including float glass, safety glass and insulating units. | https://www.atismanipolatori.com/en/solutions/glass-handling-glass-suction-cups/ |
| H-03 | Sheet metal handling: lifting and positioning metal sheets on stamping, cutting and assembly lines. | https://www.atismanipolatori.com/en/solutions/handling-and-lifting-sheet-metal-efficiency-and-safety-with-atis-manipulators/ |
| H-04 | Magnetic gripping tools: handling ferrous loads such as steel sheets, plates, tubes and profiles. | https://www.atismanipolatori.com/en/solutions/handling-with-magnetic-gripping-tools-safety-and-ergonomics-with-atis-manipulators/ |
| H-05 | Cardboard box handling: high-cycle palletising and depalletising at end of line. | https://www.atismanipolatori.com/en/solutions/handling-cardboard-boxes-with-industrial-manipulators/ |
| H-06 | Bag and sack handling: flexible loads such as chemical powders, cement and food sacks, handled without damage. | https://www.atismanipolatori.com/en/solutions/handling-bags-with-industrial-manipulators/ |
| H-07 | Drum handling: lifting, tilting and rotating 200-litre drums; used in chemical, paint and food industries. | https://www.atismanipolatori.com/en/solutions/handling-drums-with-lifting-and-rotation/ |
| H-08 | Coil handling: heavy paper, plastic and metal coils, gripped by pneumatic clamp on the core or outside diameter. | https://www.atismanipolatori.com/en/solutions/handling-coils-how-to-increase-efficiency-and-safety-with-atis-manipulators/ |
| H-09 | Sparkling wine bottle handling (disgorging, 90°/180° tilt, 360° rotation). **[DO NOT USE]** as an industry: no Wine (Nathan, 13 Oct). Could only appear as a generic "bottles" example if Nathan agrees. | https://www.atismanipolatori.com/en/solutions/pneumatic-manipulator-sparkling-wine-bottles/ |

## I. ATISmirus 200 VT datasheet (window handling)
Source: official ATIS product sheet, `content/source/atismirus-200-vt-datasheet.pdf` (ATIS, www.atismanipolatori.com). No public page URL in the pack; cite as "ATIS ATISmirus 200 VT product sheet".

| ID | Fact | Source |
|---|---|---|
| I-01 | The ATISmirus 200 VT is a rigid-arm pneumatic manipulator fitted with a suction-cup gripper, configured for handling windows. | ATIS ATISmirus 200 VT product sheet |
| I-02 | It covers the cycle from picking a window out of its container to releasing it onto a forklift. | ATIS ATISmirus 200 VT product sheet |
| I-03 | The rigid arm is made of high-strength steel. | ATIS ATISmirus 200 VT product sheet |
| I-04 | An articulated arm lets the operator position windows smoothly and precisely in all directions. | ATIS ATISmirus 200 VT product sheet |
| I-05 | A tool brake and a joint with a stop hold the load steady while gripping, releasing and moving it. | ATIS ATISmirus 200 VT product sheet |
| I-06 | Adjustable suction cups allow windows of different sizes and thicknesses. | ATIS ATISmirus 200 VT product sheet |
| I-07 | Safety valves keep the grip if pressure drops suddenly (vacuum loss). | ATIS ATISmirus 200 VT product sheet |
| I-08 | Typical applications: loading and unloading areas, assembly areas. | ATIS ATISmirus 200 VT product sheet |
| I-09 | The datasheet claims improved productivity and reduced downtime but gives no figures. Don't quantify. | ATIS ATISmirus 200 VT product sheet |

## J. Industry evidence (ATIS applications)
These show that ATIS equipment handles loads in each of AOE's three industries. They are **ATIS's** applications, not AOE's jobs: never present them as AOE customers or case studies. Most are **[VERIFY]**: the fact is the page title or image, not the page text.

### Automotive
| ID | Fact | Source |
|---|---|---|
| J-01 | ATIS shows mechanical grippers for car seats on assembly lines. | https://www.atismanipolatori.com/en/gripping-systems/mechanical-clamp-manipulators/ |
| J-02 | ATIS shows a mechanical gripper for engine heads, used with a rope balancer. | https://www.atismanipolatori.com/en/gripping-systems/mechanical-clamp-manipulators/ |
| J-03 | ATIS shows pneumatic grippers for filters and for drive shafts and axles. | https://www.atismanipolatori.com/en/gripping-systems/atis-manipulators-with-pneumatic-clamps/ |
| J-04 | ATIS shows a hook manipulator for lifting chassis and frames. | https://www.atismanipolatori.com/en/gripping-systems/atis-manipulators-with-hook-systems/ |
| J-05 | ATIS has a video of windscreen handling with one of its manipulators. | https://www.youtube.com/watch?v=wf2hCdy4ceA |
| J-06 | ATIS application pages cover car seats. [VERIFY] | https://www.atismanipolatori.com/en/blog/pneumatic-manipulator-for-handling-car-seats-your-ideal-partner/ ; https://www.atismanipolatori.com/en/blog/car-seat-weight-lifter/ |
| J-07 | ATIS application pages cover wheel rims, battery trays and vehicle bottom walls (ATISmirus 100 with pneumatic gripper). [VERIFY] | https://www.atismanipolatori.com/en/blog/ergonomic-wheel-rim-handling-solution-improves-safety-precision/ ; https://www.atismanipolatori.com/en/blog/industrial-pneumatic-manipulator-for-battery-tray/ ; https://www.atismanipolatori.com/en/blog/atismirus-100-industrial-rigid-arm-manipulator-complete-with-pneumatic-gripper-tool-for-vehicle-bottom-walls/ |
| J-08 | An ATIS page names a car maker's engine project. **[DO NOT USE]**: a named client of ATIS, not AOE (hard rule: no client names). | https://www.atismanipolatori.com/en/blog/atis-manipulators-for-a-supercar/ |

### Windows & Doors
| ID | Fact | Source |
|---|---|---|
| J-10 | See H-01 (window frames, doors and gates), H-02 (glass panes) and section I (ATISmirus 200 VT for windows). | as cited |
| J-11 | ATIS shows vacuum lifters for large glass panes and large panels. | https://www.atismanipolatori.com/en/gripping-systems/vacuum-cup-manipulators/ |
| J-12 | ATIS application pages cover door handling with an ATISmirus 300. [VERIFY] | https://www.atismanipolatori.com/en/blog/atismirus-300-manipulator-the-ideal-solution-for-handling-doors/ |
| J-13 | ATIS application pages cover armoured doors, packaged doors, and windows with suction cups. [VERIFY] | https://www.atismanipolatori.com/en/blog/industrial-pneumatic-manipulator-for-armoured-doors/ ; https://www.atismanipolatori.com/en/blog/safe-lifting-of-packaged-doors-efficiency-protection-and-precision/ ; https://www.atismanipolatori.com/en/blog/window-manipulator-with-suction-cups-precision-safety-and-control-in-glass-handling/ |
| J-14 | ATIS application pages cover glass and window frames together. [VERIFY] | https://www.atismanipolatori.com/en/blog/industrial-pneumatic-manipulator-for-handling-glass-and-window-frames/ ; https://www.atismanipolatori.com/en/blog/handling-windows-e-joinery-with-atis-manipulators/ |

### Food & Beverage
| ID | Fact | Source |
|---|---|---|
| J-20 | ATIS shows a hook lifter for beer kegs and barrels (Food & Beverage). | https://www.atismanipolatori.com/en/gripping-systems/atis-manipulators-with-hook-systems/ |
| J-21 | ATIS shows a hook balancer for small drums, used in chemical and food settings. | https://www.atismanipolatori.com/en/gripping-systems/atis-manipulators-with-hook-systems/ |
| J-22 | ATIS shows a pneumatic clamp that grips cylindrical bins and containers on the outside, used in chemical and food settings. | https://www.atismanipolatori.com/en/gripping-systems/atis-manipulators-with-pneumatic-clamps/ |
| J-23 | ATIS shows a vacuum gripper for flexible bags and sacks (chemical and food). See also H-06 (food sacks). | https://www.atismanipolatori.com/en/gripping-systems/vacuum-cup-manipulators/ |
| J-24 | Drum handling with rotation is used in the food industry (H-07). | https://www.atismanipolatori.com/en/solutions/handling-drums-with-lifting-and-rotation/ |
| J-25 | ATIS application pages cover cheese handling, including a stainless-steel ATISferax and an ATISmirus 80. [VERIFY] | https://www.atismanipolatori.com/en/blog/handle-cheese-safely-atis-stainless-steel-pneumatic-manipulator/ ; https://www.atismanipolatori.com/en/blog/atismirus-80-manipulator-for-cheese-handling/ |
| J-26 | ATIS application pages cover water bottle handling. [VERIFY] | https://www.atismanipolatori.com/en/blog/safety-and-efficiency-in-handling-water-bottles/ |
| J-27 | Box handling and palletising at end of line (H-05) applies to packed food and drink. Zach's link, not ATIS's wording: present as "boxes and cartons", not as an F&B claim. | https://www.atismanipolatori.com/en/solutions/handling-cardboard-boxes-with-industrial-manipulators/ |

## K. Images available (for alt text)
Every ATIS image, its file URL and the page it sits on are listed in `content/source/atis_images_catalog.csv` (440 images). Alt text is written only for an image Jenny or Carla has actually placed. Product shots on the range pages: ATISmirus 80, 100, 200, 300, 500; ATISacer 55, 80, 150; ATISferax; ATISlinear (cited pages in section E). No AOE photography is in hand yet; site placeholders are `TODO-IMAGE`.

## L. Not usable (recorded so they stay out)
- Years in business, anniversaries ("20 years" ATIS blog), turnover: hard rule 2.
- ATIS company history, headquarters, sustainability, trade fairs and staffing pages: ATIS's story, not AOE's.
- ATIS's method pages (training, scheduled maintenance, quality): ATIS's process. AOE's own support offer is B-08/B-09.
- Any ATIS customer name or logo (e.g. J-08).
- Old AOE capability "military and civil aerospace" (C-09) and anything Wine (H-09).
