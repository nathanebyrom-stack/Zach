/* Sources stay inert until the approved files are supplied; no placeholder 404s. */
const hero = document.querySelector('.hero-media');
const video = hero.querySelector('video');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const connection = navigator.connection;
const slowConnection = connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '');

function syncHero() {
  const ready = video.dataset.mediaReady === 'true';
  if (ready) {
    hero.querySelectorAll('[data-srcset]').forEach(source => {
      source.srcset = source.dataset.srcset;
    });
    hero.querySelector('img').src = hero.querySelector('img').dataset.still;
  }
  if (!ready || reducedMotion.matches || slowConnection) {
    video.pause();
    video.hidden = true;
    video.querySelectorAll('source').forEach(source => source.removeAttribute('src'));
    video.load();
    return;
  }
  video.poster = video.dataset.poster;
  video.querySelectorAll('source').forEach(source => { source.src = source.dataset.src; });
  video.muted = true;
  video.load();
  video.hidden = false;
  video.play().catch(() => { video.hidden = true; });
}
reducedMotion.addEventListener('change', syncHero);
video.addEventListener('error', () => { video.hidden = true; });
syncHero();

/* Reveal on entry only; keep content visible if GSAP or JS is unavailable. */
if (window.gsap && 'IntersectionObserver' in window) {
  const motion = gsap.matchMedia();
  motion.add('(prefers-reduced-motion: no-preference)', () => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        gsap.fromTo(entry.target, { y: 24 }, {
          y: 0, duration: 0.55, ease: 'power2.out', clearProps: 'transform'
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.home-section').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  });
}
