/* Sources stay inert until the approved files are supplied; no placeholder 404s. */
const hero = document.querySelector('.hero-media');
const video = hero.querySelector('video');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const connection = navigator.connection;
const slowConnection = connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '');

function syncHero() {
  /* The still image loads from the markup itself (srcset in the picture),
     so the LCP image needs no JavaScript. This only gates the video. */
  const ready = video.dataset.mediaReady === 'true';
  if (!ready || reducedMotion.matches || slowConnection) {
    video.pause();
    video.hidden = true;
    video.querySelectorAll('source').forEach(source => source.removeAttribute('src'));
    video.load();
    return;
  }
  /* Use the same still the picture already painted (and preloaded) as the
     poster, so the video element never waits on a second image. */
  video.poster = window.matchMedia('(max-width: 47.99rem)').matches
    ? '/assets/hero/hero-roll-lift-mobile_still.webp'
    : '/assets/hero/hero-roll-lift_still.webp';
  video.querySelectorAll('source').forEach(source => { source.src = source.dataset.src; });
  video.muted = true;
  video.load();
  video.hidden = false;
  video.play().catch(() => { video.hidden = true; });
}
reducedMotion.addEventListener('change', syncHero);
video.addEventListener('error', () => { video.hidden = true; });
syncHero();

/* Section entrance motion lives in /js/motion.js (shared with the inner pages). */
