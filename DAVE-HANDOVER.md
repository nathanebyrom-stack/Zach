# AOE website: handover to Dave Ogden (25 Oct 2026)

From Nathan, via Jenny. The new AOE site is built and merged to main in this repo (nathanebyrom-stack/Zach), and Netlify (aoe-preview) rebuilds from it. Nathan's decision: nothing below blocks the build. These are the items for Dave to check and put right after, in his own time.

## 1. Companies House (Dave to check)
- Every page footer says "Registered in England. Registered number: 6716033". That number could not be verified from anything we hold. Please check it against Companies House and correct the footer if it's wrong.

## 2. Privacy page placeholders (Dave to rectify)
Nathan's call: the privacy page goes up as it is. Three bracketed placeholders are visible to anyone who reads it (`site/privacy/index.html`):
- Retention: "Enquiries that don't lead to work are deleted after [CONFIRM: retention period, e.g. 24 months]." Please set the real period.
- Cookies: "[CONFIRM: if analytics is added later, update this section.]" Remove the bracket now; update the section only if analytics is ever added.
- Last updated: "[CONFIRM: date of go-live]." Put in the real date at go-live.
Anything legal in the page text is Dave's to confirm; none of it has been invented.

## 3. Contact details shown on every page (please confirm they're right)
- Phone 07771 873177, email davidogden@aoeengineering.com, address Dorney House, 46-48a High Street, Burnham, Berkshire, SL1 7JP.

## 4. Wording points flagged but not changed
- "We'd rather work with you for years..." on Home and About: an aspiration, not a years-in-business figure. Fine to keep, but Dave's call.
- Gripping page: "ATIS says they leave no mark on the surface" is ATIS's claim, attributed to ATIS. Worth a quick check with ATIS.

## 5. Not needed any more
- The ATIS side-member and seat video originals. Nathan has decided to go without. The live hero is Vic's roll-lift loop, and a roll-gripper close-up plays behind the closing call-to-action band (both cut from the ATIS website reel; Dave confirmed on 17 Oct 2026 that AOE can use any ATIS video or image). Nothing to send.

## Resolved 27 Oct 2026 (Dave's answers, via Nathan)
- Companies House: 6716033 is correct as shown. No change.
- Privacy page: enquiries that don't lead to work are deleted after 28 days; no analytics, so the cookies bracket is removed; last updated set to 27 October 2026.
- Contact details: as shown (match Dave's email footer).
- Both wording points: Dave is fine with them. No change.
- Preview sign-off: Dave has given Nathan the final say; Nathan has approved the preview.
- Domain: Dave holds the aoeengineering.com login (DNS at GoDaddy; site currently on Wix; email on Microsoft 365, which must not be touched).
- Contact form: submissions go to Nathan (nathan.e.byrom@gmail.com), who handles first enquiries. Netlify form detection switched on and an email notification added in Netlify (27 Oct); not in the code.
