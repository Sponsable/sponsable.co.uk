/* ============================
   main.js — Sponsable Site JS
   ============================ */

// Fade-in animation on scroll
document.addEventListener("DOMContentLoaded", () => {
  const fadeEls = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeEls.forEach((el) => observer.observe(el));
});

// Mobile navigation toggle
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    mobileNav.classList.toggle("active");
    mobileNav.setAttribute("aria-hidden", String(expanded));
  });
}

// Apply form submission with inline thank-you message
const applyForm = document.getElementById("applyForm");
const thankYouMessage = document.getElementById("thankYou");

if (applyForm && thankYouMessage) {
  applyForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Fake submission delay for UX
    applyForm.style.opacity = "0.5";

    setTimeout(() => {
      applyForm.reset();
      applyForm.style.display = "none";
      thankYouMessage.hidden = false;
      thankYouMessage.classList.add("visible");
    }, 800);
  });
}

// Optional: smooth scroll for same-page anchors (like #apply)
const smoothLinks = document.querySelectorAll('a[href^="#"]');
smoothLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href").slice(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      window.scrollTo({
        top: targetEl.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});
