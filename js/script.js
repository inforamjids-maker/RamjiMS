
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const nav = document.querySelector(".site-nav");
  const menu = document.querySelector(".menu");

  // Mobile navigation: no inline handlers, no layout-dependent hacks.
  if (nav && menu) {
    const closeMenu = () => {
      nav.classList.remove("mobile-open");
      menu.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-label", "Open menu");
      body.classList.remove("menu-open");
    };

    menu.addEventListener("click", () => {
      const open = !nav.classList.contains("mobile-open");
      nav.classList.toggle("mobile-open", open);
      menu.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      body.classList.toggle("menu-open", open);
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  // Accessible services dropdown.
  document.querySelectorAll(".nav-dropdown > button").forEach(btn => {
    btn.addEventListener("click", event => {
      event.preventDefault();
      const dropdown = btn.parentElement;
      const isOpen = dropdown.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });
  });

  document.addEventListener("click", event => {
    document.querySelectorAll(".nav-dropdown.open").forEach(dropdown => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("open");
        const button = dropdown.querySelector(":scope > button");
        if (button) button.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Scroll reveal using IntersectionObserver.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealItems.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("show"));
  }

  // FAQ accordion with animated CSS grid transition.
  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
      const icon = button.querySelector("span:last-child");
      if (icon) icon.textContent = isOpen ? "−" : "+";
    });
  });

  // Small page-transition fade for internal HTML navigation.
  // It is intentionally skipped for external, mail, tel and new-tab links.
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener("click", event => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || link.target === "_blank") return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      body.classList.add("page-leaving");
      window.setTimeout(() => { window.location.href = url.href; }, 130);
    });
  });

  // Contact form: frontend validation only; no server endpoint was supplied.
  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");
  if (form && status) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      status.textContent =
        "Please review your details and contact RamjiMS directly using the phone or email below. This static site does not send form data to a server.";
    });
  }
});
