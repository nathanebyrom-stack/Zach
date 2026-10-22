/* Reveal sections on entry; content stays visible if GSAP or JS is unavailable. */
if (window.gsap && 'IntersectionObserver' in window) {
  const motion = gsap.matchMedia();
  motion.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from('.page-hero h1, .page-hero .page-intro', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08, clearProps: 'all' });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        gsap.fromTo(entry.target, { y: 24 }, { y: 0, duration: 0.55, ease: 'power2.out', clearProps: 'transform' });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.home-section').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  });
}
