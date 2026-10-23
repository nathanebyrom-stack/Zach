/* Drawing plates draw in as they enter view. Without JS or with reduced motion
   the plates simply show; the .js class is what hides them first. */
(() => {
  const plates = document.querySelectorAll('.plate');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!plates.length || reduce || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-drawn');
      io.unobserve(e.target);
    });
  }, { threshold: 0.25 });
  plates.forEach(p => io.observe(p));
})();
