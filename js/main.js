// Sticky header
(function() {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 10) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Mobile nav toggle
(function() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (!menuToggle || !mobileNav) return;

  function toggleMobileNav() {
    const isOpen = mobileNav.classList.toggle('show');
    mobileNav.setAttribute('aria-hidden', !isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  }

  menuToggle.addEventListener('click', toggleMobileNav);
  mobileNav.addEventListener('click', e => {
    if (e.target.tagName === 'A') toggleMobileNav();
  });
})();

// Fade-in on scroll
(function() {
  const items = document.querySelectorAll('.fade-in');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  items.forEach(el => observer.observe(el));
})();

// Simple form handler
(function() {
  const form = document.getElementById('applyForm');
  const thankYou = document.getElementById('thankYou');
  if (!form || !thankYou) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    form.hidden = true;
    thankYou.hidden = false;
  });
})();
