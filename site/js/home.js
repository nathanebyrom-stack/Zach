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
/* Start the footage once the page has loaded: the still underneath is the same frame, so nothing visibly waits. */
if (document.readyState === 'complete') syncHero(); else window.addEventListener('load', syncHero, { once: true });

/* Section entrance motion lives in /js/motion.js (shared with the inner pages). */

/* Closing CTA band: the roll gripper close-up loop. Nothing is requested until the band is
   near the viewport; it pauses when off-screen. Reduced motion, Save-Data/2G or no JS keep the still. */
(() => {
  const band = document.querySelector('.cta-cinema');
  const clip = band && band.querySelector('.cta-video');
  if (!clip || !('IntersectionObserver' in window)) return;
  let loaded = false;
  const allowed = () => !reducedMotion.matches && !slowConnection;
  const stop = () => { clip.pause(); clip.classList.remove('is-playing'); };
  const play = () => {
    if (!allowed()) { stop(); clip.hidden = true; return; }
    if (!loaded) {
      loaded = true;
      clip.querySelectorAll('source').forEach(s => { s.src = s.dataset.src; });
      clip.muted = true;
      clip.load();
    }
    clip.hidden = false;
    const p = clip.play();
    if (p) p.then(() => clip.classList.add('is-playing')).catch(() => { clip.hidden = true; });
  };
  clip.addEventListener('error', () => { clip.hidden = true; });
  new IntersectionObserver(entries => {
    entries.forEach(e => (e.isIntersecting ? play() : stop()));
  }, { rootMargin: '200px 0px' }).observe(band);
  reducedMotion.addEventListener('change', () => { if (!allowed()) { stop(); clip.hidden = true; } });
})();
