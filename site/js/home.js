/* Sources stay inert until the approved files are supplied; no placeholder 404s. */
const hero = document.querySelector('.hero-media');
const video = hero.querySelector('video');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const connection = navigator.connection;
const slowConnection = connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '');

function syncHero() {
  const ready = video.dataset.mediaReady === 'true';
  if (ready) {
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

/* The one orchestrated moment: the four steps light up in order, once,
   then the last one holds. Skipped entirely for reduced motion. */
(() => {
  const steps = [...document.querySelectorAll('.hero-step')];
  if (!steps.length || reducedMotion.matches) {
    steps.at(-1)?.classList.add('is-on');
    return;
  }
  steps.forEach((step, i) => {
    setTimeout(() => {
      if (i > 0) { steps[i - 1].classList.remove('is-on'); steps[i - 1].classList.add('is-past'); }
      step.classList.add('is-on');
    }, 350 + i * 650);
  });
})();
