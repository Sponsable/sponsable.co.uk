document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const header = document.querySelector(".header");

  if (menuToggle && nav) {
    // Toggle menu
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("show");
      menuToggle.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close menu when link clicked
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("show");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", false);
      });
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("show")) {
        nav.classList.remove("show");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", false);
      }
    });
  }

  // Header shadow on scroll
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  // Formspree thank-you logic
  const form = document.getElementById("applyForm");
  const thankYou = document.getElementById("thankYou");

  if (form && thankYou) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          form.hidden = true;
          thankYou.hidden = false;
        } else {
          alert("Something went wrong. Please try again later.");
        }
      } catch {
        alert("Network error. Please try again.");
      }
    });
  }
});
