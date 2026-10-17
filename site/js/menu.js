const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');
const desktop = window.matchMedia('(min-width: 75rem)');

function setOpen(open, restoreFocus = false) {
  toggle.setAttribute('aria-expanded', String(open));
  navigation.hidden = !open;
  if (restoreFocus) toggle.focus();
}

function syncLayout() {
  const focusWasInNavigation = navigation.contains(document.activeElement);
  toggle.hidden = desktop.matches;
  setOpen(desktop.matches);
  if (!desktop.matches && focusWasInNavigation) toggle.focus();
  if (desktop.matches && document.activeElement === toggle) {
    navigation.querySelector('a').focus();
  }
}

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  setOpen(open);
  if (open) navigation.querySelector('a').focus();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !desktop.matches && !navigation.hidden) {
    setOpen(false, true);
  }
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a') && !desktop.matches) setOpen(false, true);
});

desktop.addEventListener('change', syncLayout);
syncLayout();
