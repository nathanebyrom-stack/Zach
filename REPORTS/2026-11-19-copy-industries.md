# Copy report: industries (Windows & Doors alt-text fix)
Date: 2026-11-19
Branch: copy/industries
Status: READY FOR REVIEW (merged to main for the Netlify preview under Jenny's build-night review; no live domain affected)

## Written
- One line changed: the `Image: frames-windows` alt text on /industries/, from "ATISmirus 300 with a suction gripper lifting a window frame" to "ATIS manipulator with a suction gripper lifting a window frame". No body copy changed. Site rebuilt with scripts/build-pages.py; the only diff in site/ is that one alt attribute (site/industries/index.html).

## Why this fix, not the other option
The 17 Nov preflight flagged that the Windows & Doors section names the ATISmirus 200 VT while the image alt declared an ATISmirus 300 (`claude/zach/inbox/2026-11-17-build-night-aoe-preflight.md`).
- Changing the copy to the 300 is blocked by the truth rule: every fact in the worked example (container to forklift, adjustable cups, safety valves) is sourced to the ATISmirus 200 VT product sheet (I-01, I-02, I-06, I-07) and can't be re-attributed to the 300.
- Swapping the image isn't possible: the image register in sources.md holds no 200 VT photo; frames-windows (ATIS PDF 40.250.165) is the only window-frame handling shot in hand, and it shows a 300.
- So the alt drops the model name. It stays accurate (ATIS manipulator, suction gripper, window frame — all visible in the photo, checked against the image file) and still describes the machine and load per the image register rule.
- Solutions page left as is: the same image sits there in the "Window frames, doors and gates" section, whose copy names no model, so the "ATISmirus 300" alt is accurate with nothing to clash with.

## Humanize pass
- run with voice profile: no — no prose was written or changed; the edit is a seven-word alt attribute with no new claims. Re-running humanize over an approved page for this would risk drifting signed-off copy.

## Claims and sources
- No claims changed. The alt follows the image register entry: frames-windows | 40.250.165 | ATISmirus 300, window/door frame (sources.md, Shared: image register). Dropping the model name from the alt removes information, adds none.

## Needs Nathan
- Nothing for this fix.

## Not done
- gripping.md "Vacuum cups" section (discovered, not changed — outside this task): copy cites the 200 VT, adjacent image is doors-vacuum with alt "ATISmirus 100 with a vacuum-cup frame lifting a metal door". Softer case than Industries (the section explicitly covers several set-ups), so left for Zach's next pass to judge.
