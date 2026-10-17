# HERO-DRAFT: AOE homepage hero footage (draft for Nathan)

Prepared by Vic (footage agent) on 17 Oct 2026. **This is a draft, not HERO.md.** Nathan chooses the hero, and HERO.md gets written only after he approves it.

## Source and rights
- Rights: Dave Ogden (AOE) confirmed on 17 Oct 2026 that AOE can use any ATIS video or image. AOE are ATIS's UK agents.
- `ATIS_Atis.mp4`: ATIS homepage reel, downloaded 17 Oct from atismanipolatori.com. H.264, 2250x1264, 30 fps, 33.13 s. SHA-256 `63e386f8…74c6ce02`.
- `ATIS_video-definitivo-mobile-2_1.mp4`: the vertical cut of the same reel. 1264x2250, 30 fps, 33.13 s. SHA-256 `37430ffc…e3c3486f`.
- Both reels are web-compressed (about 4.8 Mbps), and that sets the detail ceiling. Desktop outputs are downscaled to 1920x1080 and mobile outputs to 1080x1920. Nothing is upscaled.
- All timecodes below are in seconds from the start of the source file. The vertical reel uses the same edit and the same timecodes.

## How the loops work
- Every hero loop is a **ping-pong**: the segment plays forwards, then backwards, and the turn frames aren't repeated. The first and last frames match, so it loops without a cut.
- Hero shots in this reel run 2 to 5 s, too short for a plain loop. I tried a crossfade loop on the coil shot and rejected it, because the two ends are from very different camera angles and blending them ghosts badly.
- No audio. MP4 is H.264 High with faststart. WebM is VP9 two-pass.
- Each candidate has a poster (frame 0 of the loop) and a reduced-motion still (the frame a quarter of the way through), both as JPG and WebP.

## Safe area for headline text
Measured on every frame at 5 fps. Luma runs 0 to 255, and below about 100 is comfortable for white type.
- **No candidate has a naturally dark, calm area.** All of them are bright, daylight workshop footage, with a mean luma of 84 to 161 in the candidate text areas.
- White type will need a dark gradient scrim on every one: roughly 50 to 60% black, behind the headline side. The best area for each candidate is listed below.

## Candidates, ranked

### 1. Roll lift: `hero-roll-lift` (top pick)
- Files: `assets/hero/hero-roll-lift.{mp4,webm}` (1920x1080, 10.40 s, 3.51 / 3.52 MB) and `hero-roll-lift-mobile.{mp4,webm}` (1080x1920, 10.40 s, 1.78 / 1.76 MB). Posters and stills: `hero-roll-lift[-mobile]_{poster,still}.{jpg,webp}`.
- Source: both reels, 11.16–16.40 (shot runs 11.13–16.43). Ping-pong loop: forwards 11.16 to 16.40, then back.
- What's in the shot: an operator guides an overhead manipulator that lifts a wrapped roll and swings it from horizontal to vertical. The camera is steady. On mobile, the operator's arms and hands are on the controls.
- Edits: trim and scale only. **Operator removed: No.**
- Branding: low. No ATIS mark is legible. A yellow arm from another make sits in the background.
- Safe area: desktop, top-right, over the plain wall (mean 161, low motion), with a strong scrim of about 60%. The left side is the operator. Mobile: the bottom third, over the floor (mean 141, the lowest motion), with a scrim of about 60%.
- Why it's my top pick: the manipulator's job is clearest here, and the camera is the steadiest of all five. It also shows a person in control, which is accurate for operator-guided equipment.

### 2. Coil gripper close-up: `hero-coil-gripper`
- Files: `hero-coil-gripper.{mp4,webm}` (1920x1080, 9.43 s, 3.50 / 3.52 MB) and `hero-coil-gripper-mobile.{mp4,webm}` (1080x1920, 6.93 s, 1.78 / 1.76 MB).
- Source: desktop from `ATIS_Atis.mp4` 28.34–33.10; mobile from the vertical reel 29.60–33.10. Both are ping-pong loops.
- What's in the shot: a handheld close-up of a coil gripper holding a steel coil while it rotates.
- On desktop, an operator's hand is on the control handle at the right edge for most of the clip. Under the brief, hands on the controls in a close-up are fine to keep, so I kept them. The mobile segment has no person in frame.
- Edits: trim and scale only. **Operator removed: No.** The mobile version shows no operator, so the machine could look as if it moves by itself; Nathan to judge.
- **Branding flag (desktop): DOMINANT.** A large ATIS logo is on the gripper body throughout. The mobile version only shows the orange body briefly, with no legible mark.
- Safe area: desktop, the bottom corners (mean 88 to 131), with a scrim of about 50%. Mobile: the bottom third (mean 120, low motion), with a scrim of about 50%.

### 3. Timber pallet frame: `hero-timber-frame`
- Files: `hero-timber-frame.{mp4,webm}` (1920x1080, 4.00 s, 2.94 / 3.00 MB) and `hero-timber-frame-mobile.{mp4,webm}` (1080x1920, 4.00 s, 1.76 / 1.77 MB).
- Source: both reels, 5.86–7.88. Ping-pong loop.
- What's in the shot: a wide workshop view of an overhead manipulator carrying a large timber pallet frame.
- **Correction to the earlier quick look: this shot is not free of people.** The operator is visible at the right of the load at the loop's start and end, and his legs show underneath the frame in the middle.
- Edits: trim and scale only. **Operator removed: No.**
- Branding: no ATIS mark. Third-party machinery signage ("ERREBI") is visible in the background.
- Weakness: the segment is only 2 s, so the loop's back-and-forth is quite noticeable.
- Safe area: desktop, top-left, over the roof and windows (mean 125, low motion), with a scrim of about 55%. Mobile: the bottom third (mean 117), with a scrim of about 55%.

### 4. Blue roll gripper: `hero-blue-roll`
- Files: `hero-blue-roll.{mp4,webm}` (1920x1080, 7.70 s, 3.47 / 3.50 MB) and `hero-blue-roll-mobile.{mp4,webm}` (1080x1920, 7.70 s, 1.78 / 1.77 MB).
- Source: both reels, 24.40–28.28. Ping-pong loop.
- What's in the shot: an operator guides a gripper that rotates a blue-wrapped roll, in a hall full of manipulators.
- Edits: trim and scale only. **Operator removed: No.** On mobile, ATIS's own vertical framing leaves only the operator's hand at the right edge, so the machine could look as if it moves by itself; Nathan to judge.
- **Branding flag: MODERATE to HIGH.** There's a small ATIS logo on the gripper, and the setting reads as a manufacturer's showroom full of ATIS arms. That's a risk for the site looking like ATIS's own.
- Safe area: top-right, over the windows (mean 135, very bright), with a scrim of 60% or more. The left side has blown-out windows (p90 = 255). Mobile: the bottom third (mean 110), with a scrim of about 55%.

### 5. Roll gripper close-up: `hero-roll-gripper-closeup`
- Files: `hero-roll-gripper-closeup.{mp4,webm}` (1920x1080, 5.00 s, 3.46 / 3.53 MB) and `hero-roll-gripper-closeup-mobile.{mp4,webm}` (1080x1920, 5.30 s, 1.76 / 1.77 MB).
- Source: desktop from `ATIS_Atis.mp4` 8.55–11.10; mobile from the vertical reel 8.40–11.08. Ping-pong loops.
- What's in the shot: a detail of the roll gripper head beside stacked paper rolls.
- **No people in frame.** I started the segment after a hand leaves the top of the frame (shot starts 7.92). That's segment selection, not removal. **Operator removed: No.** Most of the movement comes from the handheld camera, so the shot doesn't suggest autonomous movement much.
- Branding: low.
- Safe area: bottom-left, over the floor (mean 84, the darkest of all the candidates), with a scrim of about 40%. Mobile: the bottom third (mean 99), with a scrim of about 45%.

## Supporting clips (1920x1080, MP4 + WebM + poster, straight trims, not loops)
| File | Source (`ATIS_Atis.mp4`) | Content (only what is in the shot) | Size mp4/webm | People | Notes |
|---|---|---|---|---|---|
| `assets/clips/clip-cheese-wheel` | 16.47–18.97 | Operator places a cheese wheel into a box using a vacuum lifter | 1.86 / 1.87 MB | Yes | Product page |
| `assets/clips/clip-panel-lifter-wide` | 19.03–21.00 | Operator (from behind) guides a vacuum panel lifter onto a white board | 1.49 / 1.46 MB | Yes | Small ATIS mark on the arm |
| `assets/clips/clip-panel-lifter-closeup` | 22.45–24.33 | Close-up of a hand on the controls; vacuum cups on a white panel | 1.40 / 1.42 MB | Hands only | Product page |
| `assets/clips/clip-design-drawings` | 4.93–5.78 | Hands pointing at technical drawings | 0.75 / 0.58 MB | Hands only | Only 0.87 s long; About page at most. These are ATIS staff at ATIS, so never caption them as AOE's team or design office |

## Excluded
- 0.00–1.03: ATIS sign. 1.03–3.03: ATIS building exterior. Both are ATIS branding and the building.
- 3.03–3.90: meeting room, with an ATIS logo on the screen.
- 3.90–4.90: the drawing table showing staff faces. These are ATIS staff and must not be read as AOE's.
