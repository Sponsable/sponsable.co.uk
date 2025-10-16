// main.js — lightweight interactions: sticky header, mobile toggle, fade-ins, form handler

// Sticky header toggle on scroll
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

// Mobile nav toggle — updates aria attributes and toggles visible class
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

  // Close mobile nav when a link is clicked (improves UX)
  mobileNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      mobileNav.classList.remove('show');
      mobileNav.setAttribute('aria-hidden', 'true');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Fade-in on scroll using IntersectionObserver
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.fade-in');
    if (!items.length) return;

    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    }, { threshold: 0.18 });

    items.forEach(el => {
      // if data-delay present, apply delay class (transition-delay handled in CSS)
      const delay = el.getAttribute('data-delay');
      if (delay) el.dataset.delay = delay;
      obs.observe(el);
    });
  });
})();

// Simple form handler (replace with real payment/email in production)
function handleFormSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  // Ensure required are present (browser will do this), then simulate success
  // In production: call backend / Checkout session etc.
  // For now redirect to a simple thanks page (create thank-you.html)
  window.location.href = 'thank-you.html';
  return false;
}
