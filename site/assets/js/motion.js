/* AOE Engineering — motion (GSAP + ScrollTrigger from cdnjs).
   Calm and precise: short rises, fades and wipes, no bounce.
   Works on every page from generic hooks, so new copy picks it up without changes.
   Reduced-motion users, and anyone without GSAP, get the static page. */
(function () {
  "use strict";
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Header state on scroll (no GSAP needed; harmless with reduced motion).
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (reduce || !window.gsap || !window.ScrollTrigger) {
    root.classList.remove("pt-enter");
    return;
  }

  var gsap = window.gsap;
  var ST = window.ScrollTrigger;
  gsap.registerPlugin(ST);
  root.classList.add("js-motion");

  /* ---------- 1. Reveals ---------- */
  // Lists whose items rise one after another.
  var STAGGER_LISTS = ".cards, .steps, .ruled, .offer, .jump-nav";
  // Everything that isn't a page head: direct children of each section's container.
  var blocks = [];
  gsap.utils.toArray("main > :not(.page-head):not(.hero)").forEach(function (section) {
    var containers = section.querySelectorAll(":scope > .container, :scope > .container > .grid, :scope > .container.grid");
    if (!containers.length) containers = [section];
    Array.prototype.forEach.call(containers, function (c) {
      Array.prototype.forEach.call(c.children, function (el) {
        if (el.classList.contains("grid")) return; // its children are handled as their own container
        if (el.matches(STAGGER_LISTS)) {
          Array.prototype.forEach.call(el.children, function (li) { blocks.push(li); });
        } else if (el.classList.contains("split")) {
          Array.prototype.forEach.call(el.children, function (child) { blocks.push(child); });
        } else {
          blocks.push(el);
        }
      });
    });
  });
  // Nested split layouts inside containers.
  gsap.utils.toArray("main .split > *").forEach(function (el) { if (blocks.indexOf(el) === -1) blocks.push(el); });
  blocks = blocks.filter(function (el, i, a) {
    // Drop parents whose children are already in the list, and anything empty.
    if (a.indexOf(el) !== i) return false;
    if (el.classList.contains("split")) return false;
    return el.offsetHeight > 0;
  });

  blocks.forEach(function (el) {
    if (!el.classList.contains("media")) el.setAttribute("data-reveal", "");
  });
  // Every image block outside the page head gets the shutter wipe, wherever it sits.
  var media = gsap.utils.toArray("main > :not(.page-head):not(.hero) .media");
  media.forEach(function (el) { el.setAttribute("data-wipe", ""); });

  // Page heads animate in on load.
  var heads = gsap.utils.toArray(".page-head .container > *, .hero__content > *");
  heads.forEach(function (el) { el.setAttribute("data-reveal", ""); });
  gsap.to(heads, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.05 });

  var rest = gsap.utils.toArray("[data-reveal]").filter(function (el) { return heads.indexOf(el) === -1; });
  ST.batch(rest, {
    start: "top 90%",
    once: true,
    onEnter: function (batch) {
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.07, overwrite: true });
    }
  });

  /* ---------- 2. Media wipes and drift ---------- */
  // Placeholders (and later, graded photography) open like a shutter, bottom to top,
  // then drift a few pixels against the scroll.
  media.forEach(function (el) {
    gsap.fromTo(el,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut",
        scrollTrigger: { trigger: el, start: "top 88%", once: true } });
    var inner = el.querySelector("img, video, .media__tag");
    if (inner) {
      gsap.fromTo(inner, { yPercent: -4 }, {
        yPercent: 4, ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true }
      });
    }
  });

  /* ---------- 3. Rules draw in ---------- */
  // Label ticks draw left to right as they arrive.
  gsap.utils.toArray(".label").forEach(function (el) {
    gsap.fromTo(el, { "--tick": 0 }, {
      "--tick": 1, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 92%", once: true }
    });
  });
  /* ---------- 4. Scroll progress hairline ---------- */
  if (header) {
    var bar = document.createElement("span");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    header.appendChild(bar);
    gsap.fromTo(bar, { scaleX: 0 }, {
      scaleX: 1, ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 }
    });
  }

  /* ---------- 5. Page transitions ---------- */
  // Arriving: the curtain painted by the inline head script lifts away.
  var curtain = document.createElement("div");
  curtain.className = "pt-curtain";
  curtain.setAttribute("aria-hidden", "true");
  document.body.appendChild(curtain);
  if (root.classList.contains("pt-enter")) {
    gsap.set(curtain, { yPercent: 0, autoAlpha: 1 });
    root.classList.remove("pt-enter");
    gsap.to(curtain, { yPercent: -100, duration: 0.55, ease: "power3.inOut", delay: 0.05,
      onComplete: function () { gsap.set(curtain, { autoAlpha: 0 }); } });
  } else {
    gsap.set(curtain, { yPercent: 100, autoAlpha: 0 });
  }

  // Leaving: same-site page links close the curtain, then navigate.
  var leaving = false;
  document.addEventListener("click", function (e) {
    if (leaving || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest("a[href]");
    if (!a || a.target && a.target !== "_self" || a.hasAttribute("download")) return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) return; // in-page anchors
    if (/\.(pdf|xml|txt|jpe?g|png|webp|svg|zip)$/i.test(url.pathname)) return;
    e.preventDefault();
    leaving = true;
    try { sessionStorage.setItem("aoe-pt", "1"); } catch (err) { /* storage blocked: no enter curtain */ }
    var go = function () { location.href = url.href; };
    var fallback = setTimeout(go, 700);
    gsap.fromTo(curtain, { yPercent: 100, autoAlpha: 1 }, {
      yPercent: 0, duration: 0.42, ease: "power3.inOut",
      onComplete: function () { clearTimeout(fallback); go(); }
    });
  });

  // Back/forward cache: never restore a closed curtain.
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) { leaving = false; gsap.set(curtain, { yPercent: 100, autoAlpha: 0 }); }
  });

  // Safety net for print.
  window.addEventListener("beforeprint", function () {
    gsap.set("[data-reveal]", { opacity: 1, y: 0 });
    gsap.set("[data-wipe]", { clipPath: "none" });
  });

  // Layout settles once fonts arrive.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ST.refresh(); });
})();
