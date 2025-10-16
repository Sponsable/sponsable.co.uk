window.addEventListener('scroll', () => {
  const header = document.getElementById('siteHeader');
  if (window.scrollY > 10) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  nav.classList.toggle('show');
}

function handleFormSubmit(e) {
  e.preventDefault();
  window.location.href = 'thank-you.html';
}
