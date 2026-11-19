/* AOE motion layer (all pages).
   The page is complete without this file: no JS means plain, visible HTML.
   Reduced motion gets no animation at all: everything visible and still.
   - Header scroll state (always, it is not motion).
   - Scroll reveals: transform/opacity only, triggered once.
   - Home: the Design/Supply/Fit/Service sequence (sticky stage, scrubbed cross-fade) on wide screens.
   - Machine cut-outs: slow parallax, plus pointer tilt on fine pointers. */
(() => {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');

  /* Header: refined state once the page has moved. */
  if (header) {
    let ticking = false;
    const sync = () => { header.classList.toggle('is-scrolled', window.scrollY > 24); ticking = false; };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(sync); } }, { passive: true });
    sync();
  }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches || !('IntersectionObserver' in window)) { root.classList.remove('motion'); return; }

  /* ---------- Reveals ---------- */
  const groups = [
    '.band-intro .label, .band-intro .statement',
    '.band-honest .label, .honest-big, .honest-copy',
    '.machine-grid .giant, .machine-grid .machine-copy',
    '.loads-head, .loads-list li, .loads-foot',
    '.industries-head > *, .ind-panel',
    '.cta-cinema .container > *, .home-cta .container > *',
    '.inner-section .section-head, .inner-section .section-copy, .inner-section .section-figure',
    '.verbs:not(.is-pinned) .verb-copy > *, .verbs:not(.is-pinned) .verb-media',
  ];
  const items = [];
  root.classList.add('reveal-ready');
  const heroFirst = document.querySelector('.page-hero');
  groups.forEach(sel => {
    let i = 0, last = null;
    document.querySelectorAll(sel).forEach(el => {
      if (el.closest('[data-reveal]') && el.closest('[data-reveal]') !== el) return;
      const parent = el.parentElement;
      i = parent === last ? i + 1 : 0; last = parent;
      el.setAttribute('data-reveal', '');
      el.style.setProperty('--d', `${Math.min(i, 8) * 0.07}s`);
      items.push(el);
    });
  });
  const show = el => el.classList.add('is-in');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      /* Anything above an element now entering was skipped (anchor jump, fast scroll): show it too. */
      const idx = items.indexOf(e.target);
      items.slice(0, idx + 1).forEach(el => { if (!el.classList.contains('is-in')) { show(el); io.unobserve(el); } });
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
  items.forEach(el => io.observe(el));
  if (heroFirst) requestAnimationFrame(() => heroFirst.querySelectorAll('[data-reveal]').forEach(show));
  /* Keyboard: reveal whatever focus lands in, and everything above it. */
  document.addEventListener('focusin', e => {
    const el = e.target.closest('[data-reveal]') || e.target.querySelector?.('[data-reveal]');
    const idx = el ? items.indexOf(el) : -1;
    if (idx > -1) items.slice(0, idx + 1).forEach(show);
  });

  /* GSAP + ScrollTrigger (self-hosted) are only needed for scroll-scrubbed work, so they load after
     the page has painted and finished loading: they never compete with the hero or the CSS. */
  const load = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  const start = () => load('/assets/vendor/gsap.min.js').then(() => load('/assets/vendor/ScrollTrigger.min.js')).then(scrollWork).catch(() => {});
  /* Everything GSAP does is scroll-driven, so it loads on the first sign of intent (scroll, pointer, key, touch),
     or after a long idle as a fallback. The page above the fold never waits on it. */
  let started = false;
  const intent = ['scroll', 'wheel', 'pointerdown', 'pointermove', 'keydown', 'touchstart'];
  const go = () => { if (started) return; started = true; intent.forEach(t => window.removeEventListener(t, go)); start(); };
  intent.forEach(t => window.addEventListener(t, go, { passive: true, once: true }));
  if (window.scrollY > 0) go();
  window.addEventListener('load', () => setTimeout(go, 8000), { once: true });

  function scrollWork() {
  const gsap = window.gsap;
  const ST = window.ScrollTrigger;
  if (!gsap || !ST) return;
  gsap.registerPlugin(ST);

  const mm = gsap.matchMedia();

  /* ---------- Verbs sequence (Home) ---------- */
  const verbs = document.querySelector('.verbs');
  if (verbs) {
    mm.add('(min-width: 64rem) and (min-height: 36rem) and (prefers-reduced-motion: no-preference)', () => {
      const list = gsap.utils.toArray('.verb', verbs);
      const index = verbs.querySelectorAll('.verbs-index li');
      const bar = verbs.querySelector('.verbs-progress span');
      verbs.classList.add('is-pinned');
      list.forEach(v => v.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-in')));

      const parts = v => ({ copy: v.querySelectorAll('.verb-copy > *'), media: v.querySelector('.verb-media'), img: v.querySelector('.verb-media img') });
      gsap.set(list.slice(1), { opacity: 0 });
      list.forEach((v, i) => { if (i) { const p = parts(v); gsap.set(p.copy, { y: 60, opacity: 0 }); gsap.set(p.media, { y: 80, opacity: 0, scale: 0.94 }); } });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      list.forEach((v, i) => {
        const p = parts(v);
        tl.to(p.img, { yPercent: -6, duration: 1, ease: 'none' }, i);
        if (i === list.length - 1) return;
        const n = parts(list[i + 1]);
        const at = i + 0.62;
        tl.to(p.copy, { y: -50, opacity: 0, duration: 0.3, stagger: 0.03, ease: 'power2.in' }, at)
          .to(p.media, { y: -70, opacity: 0, scale: 1.04, duration: 0.34, ease: 'power2.in' }, at)
          .to(list[i + 1], { opacity: 1, duration: 0.34, ease: 'none' }, at + 0.1)
          .set(v, { opacity: 0 }, at + 0.46)
          .to(n.media, { y: 0, opacity: 1, scale: 1, duration: 0.42, ease: 'expo.out' }, at + 0.3)
          .to(n.copy, { y: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: 'expo.out' }, at + 0.34);
      });

      let active = -1;
      const setActive = a => {
        if (a === active) return; active = a;
        list.forEach((v, i) => v.classList.toggle('is-on', i === a));
        index.forEach((li, i) => li.classList.toggle('is-active', i === a));
      };
      setActive(0);
      const st = ST.create({
        trigger: verbs.querySelector('.verbs-track'),
        start: 'top top', end: 'bottom bottom',
        animation: tl, scrub: 0.6,
        onUpdate: self => {
          const t = self.progress * tl.duration();
          setActive(Math.min(list.length - 1, Math.max(0, Math.floor(t + 0.12))));
          if (bar) bar.style.transform = `scaleX(${self.progress})`;
        },
      });
      /* Keyboard: focusing a control in a later verb scrolls the sequence to it. */
      const onFocus = e => {
        const v = e.target.closest('.verb');
        if (!v) return;
        const i = list.indexOf(v);
        const y = st.start + (st.end - st.start) * ((i + 0.9) / tl.duration());
        window.scrollTo({ top: y, behavior: 'instant' });
        tl.progress(Math.min(1, (i + 0.9) / tl.duration()));
        setActive(i);
      };
      verbs.addEventListener('focusin', onFocus);
      return () => {
        verbs.removeEventListener('focusin', onFocus);
        verbs.classList.remove('is-pinned');
        list.forEach(v => v.classList.remove('is-on'));
        if (bar) bar.style.transform = '';
      };
    });
  }

  /* ---------- Parallax ---------- */
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    /* Hero footage drifts slower than the page. */
    const heroMedia = document.querySelector('.hero-media');
    if (heroMedia) {
      gsap.to(heroMedia, { yPercent: 14, scale: 1.06, ease: 'none', scrollTrigger: { trigger: '.home-hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero-content', { yPercent: -10, opacity: 0.25, ease: 'none', scrollTrigger: { trigger: '.home-hero', start: '30% top', end: 'bottom top', scrub: true } });
    }
    /* Machine cut-outs and inner-page figures: restrained depth. */
    gsap.utils.toArray('.machine-stage .machine, .section-figure img').forEach(img => {
      gsap.fromTo(img, { y: 36 }, { y: -36, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    gsap.utils.toArray('.machine-grid .giant').forEach(h => {
      /* Drift inward only, so the heading never crosses the page gutter. */
      gsap.fromTo(h, { xPercent: h.closest('.machine-grid-flip') ? -4 : 4 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: h, start: 'top bottom', end: 'bottom 40%', scrub: true } });
    });
    const cta = document.querySelector('.cta-media');
    if (cta) gsap.fromTo(cta, { yPercent: -6, scale: 1.12 }, { yPercent: 6, scale: 1.12, ease: 'none', scrollTrigger: { trigger: '.cta-cinema', start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* ---------- Pointer tilt (desktop, fine pointer) ---------- */
  mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    const offs = [];
    document.querySelectorAll('[data-tilt]').forEach(stage => {
      const img = stage.querySelector('img');
      if (!img) return;
      gsap.set(img, { transformPerspective: 1000 });
      const rx = gsap.quickTo(img, 'rotationX', { duration: 0.8, ease: 'power3.out' });
      const ry = gsap.quickTo(img, 'rotationY', { duration: 0.8, ease: 'power3.out' });
      const move = e => {
        const r = stage.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        ry(x * 10); rx(-y * 7);
      };
      const leave = () => { rx(0); ry(0); };
      stage.addEventListener('pointermove', move);
      stage.addEventListener('pointerleave', leave);
      offs.push(() => { stage.removeEventListener('pointermove', move); stage.removeEventListener('pointerleave', leave); gsap.set(img, { rotationX: 0, rotationY: 0 }); });
    });
    return () => offs.forEach(f => f());
  });

  /* Fonts or late images change heights: keep trigger positions honest. */
  ST.refresh();
  }
})();
