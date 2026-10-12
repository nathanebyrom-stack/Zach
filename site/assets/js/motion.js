/* AOE Engineering — scroll motion (GSAP + ScrollTrigger from cdnjs).
   Calm and precise: short rises and fades, no bounce.
   Reduced-motion users, and anyone without GSAP, get the static page. */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !window.gsap || !window.ScrollTrigger) return;

  var gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);

  var groups = [
    ".page-head .container > *",
    ".hero__content > *",
    ".section-head",
    ".statement, .intro-lede",
    ".cards > *",
    ".steps > *",
    ".ruled > li",
    ".split > *",
    ".offer > *",
    ".cta-band .container > *",
    ".prose > *",
    ".form > *, .contact-aside"
  ];

  document.documentElement.classList.add("js-motion");

  groups.forEach(function (sel) {
    var els = gsap.utils.toArray(sel);
    els.forEach(function (el) { el.setAttribute("data-reveal", ""); });
  });

  // Above-the-fold heads animate in on load; everything else batches in on scroll.
  var heads = gsap.utils.toArray(".page-head .container > [data-reveal], .hero__content > [data-reveal]");
  gsap.to(heads, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.05 });

  var rest = gsap.utils.toArray("[data-reveal]").filter(function (el) { return heads.indexOf(el) === -1; });
  window.ScrollTrigger.batch(rest, {
    start: "top 88%",
    once: true,
    onEnter: function (batch) {
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.07, overwrite: true });
    }
  });

  // Safety net: if anything is still hidden after load (e.g. print, odd layouts), show it.
  window.addEventListener("beforeprint", function () {
    gsap.set("[data-reveal]", { opacity: 1, y: 0 });
  });
})();
