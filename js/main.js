// main.js — minimal interactions: mobile nav, fade-in on scroll, FAQ accordion, form submission

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  menuToggle && menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    mobileNav.classList.toggle('active');
    mobileNav.setAttribute('aria-hidden', String(expanded));
  });

  // Close mobile nav when clicking a link (better UX)
  mobileNav && mobileNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      mobileNav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    }
  });

  // Fade-in on scroll using IntersectionObserver
  const fadeEls = document.querySelectorAll('.fade-in');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => io.observe(el));

  // FAQ accordion: only one open at a time with smooth scroll into view
  const details = document.querySelectorAll('#faq details');
  details.forEach(d => {
    d.addEventListener('toggle', (e) => {
      if (d.open) {
        // close other details
        details.forEach(other => { if (other !== d) other.open = false; });
        // ensure it's visible in viewport smoothly
        setTimeout(() => d.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 150);
      }
    });
  });

  // Form submission: POST to Formspree; local thank-you swap
  const form = document.getElementById('applyForm');
  const thank = document.getElementById('thankYou');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      const fd = new FormData(form);
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: fd,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          form.hidden = true;
          thank.hidden = false;
        } else {
          const data = await res.json().catch(()=>null);
          alert((data && data.error) ? data.error : 'There was a problem submitting the form. Try again.');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Join the Waitlist';
        }
      } catch (err) {
        alert('Network error — please try again later.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Join the Waitlist';
      }
    });
  }
});
