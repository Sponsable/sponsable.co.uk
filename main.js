// Sticky header style on scroll
window.addEventListener('scroll', function () {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile nav toggle
function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  if (!nav) return;
  nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
}

// Simple form submit handler (simulate payment flow)
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  // Basic validation already handled by required attributes
  // In production: Replace with Stripe/PayPal Checkout integration.
  // For now: show a confirmation and redirect to thank-you page.
  // If you want to integrate Stripe, replace this with a fetch() to your server to create a Checkout Session.
  window.location.href = 'thank-you.html';
  return false;
}

