/* Entrance motion (shared, all pages).
   The page is complete without this: no JS or no GSAP means plain, visible HTML.
   Reduced motion gets no animation at all — everything visible and still.
   Transform/opacity only; inline styles are cleared when each tween finishes. */
(() => {
  if (!window.gsap || !('IntersectionObserver' in window)) return;

  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const EASE = 'power3.out';
    const RISE = 18;

    /* Inner-page hero: eyebrow, heading and intro rise once on load. */
    const heroParts = gsap.utils.toArray('.page-hero .eyebrow, .page-hero h1, .page-hero .page-intro');
    if (heroParts.length) {
      gsap.fromTo(heroParts,
        { y: RISE, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: EASE, stagger: 0.09, clearProps: 'all' });
    }

    /* Sections rise into place as they enter view. */
    const sections = gsap.utils.toArray('.home-section');
    if (!sections.length) return;

    const partsOf = section => {
      const parts = section.querySelectorAll(':scope > .container > *');
      return parts.length ? Array.from(parts) : [section];
    };

    sections.forEach(section => gsap.set(partsOf(section), { y: RISE, opacity: 0 }));

    const revealed = new Set();
    const reveal = section => {
      if (revealed.has(section)) return;
      revealed.add(section);
      observer.unobserve(section);
      gsap.fromTo(partsOf(section),
        { y: RISE, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: EASE, stagger: 0.07, clearProps: 'all', overwrite: 'auto' });
      /* Subtle settle on the application images. */
      const img = section.querySelector('.section-figure img');
      if (img) {
        gsap.fromTo(img, { scale: 1.035 },
          { scale: 1, duration: 1.1, ease: 'power2.out', delay: 0.1, clearProps: 'transform', overwrite: 'auto' });
      }
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        /* Trigger once ~48px or 10% of the section is in view, whichever comes
           first: a tall section beside a tall footer may never reach a ratio
           threshold, so a pixel floor is needed too. */
        if (!entry.isIntersecting) return;
        if (entry.intersectionRect.height < 48 && entry.intersectionRatio < 0.1) return;
        /* Sections are in document order: anything above the one now entering
           was jumped past (anchor link, fast scroll, find-in-page), so reveal
           it too rather than leaving it hidden. */
        const upTo = sections.indexOf(entry.target);
        sections.slice(0, upTo + 1).forEach(reveal);
      });
    }, { threshold: [0, 0.03, 0.06, 0.1] });

    sections.forEach(section => observer.observe(section));

    /* Keyboard users can tab into a section before it scrolls into view:
       reveal it (and everything above it) the moment focus lands there. */
    const onFocusIn = event => {
      const section = event.target.closest('.home-section');
      if (section && sections.includes(section)) {
        sections.slice(0, sections.indexOf(section) + 1).forEach(reveal);
      }
    };
    document.addEventListener('focusin', onFocusIn);

    return () => {
      observer.disconnect();
      document.removeEventListener('focusin', onFocusIn);
      gsap.set(sections.flatMap(partsOf), { clearProps: 'all' });
    };
  });
})();
