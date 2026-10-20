/* MIRÈL — SHARED SITE NAVIGATION
   Central navigation for all pages. Only brand labels updated to PARTNERS. */
(() => {
  "use strict";
  const LINKS = [
    { label: "Home", href: "index.html" },
    { label: "About", href: "about.html" },
    { label: "Services", href: "services.html" },
    { label: "Systems", href: "systems.html" },
    { label: "Results", href: "results.html" },
    { label: "AI for Med Spas", href: "ai-for-med-spas.html" }
  ];
  const ACTIONS = [
    { label: "Book Consultation", href: "book.html#booking", className: "btn btn-dark" },
    { label: "Resources", href: "resources.html", className: "btn btn-light" }
  ];
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const isActive = href => currentPage === href.split("#")[0];

  function makeLink(item, className = "") {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    if (className) link.className = className;
    if (isActive(item.href)) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
    return link;
  }

  function createNavigation() {
    const mount = document.querySelector("[data-mirel-navigation]");
    if (!mount) return;
    const header = document.createElement("header");
    header.className = "nav mirel-shared-nav";
    header.setAttribute("data-nav", "");
    const brand = document.createElement("a");
    brand.className = "brand";
    brand.href = "index.html";
    brand.setAttribute("aria-label", "Mirèl Partners Home");
    const brandName = document.createElement("span");
    brandName.textContent = "MIRÈL";
    const brandSubtitle = document.createElement("small");
    brandSubtitle.textContent = "PARTNERS";
    brand.append(brandName, brandSubtitle);
    const desktopLinks = document.createElement("nav");
    desktopLinks.className = "nav-links";
    desktopLinks.setAttribute("aria-label", "Main navigation");
    LINKS.forEach(item => desktopLinks.appendChild(makeLink(item)));
    const desktopActions = document.createElement("div");
    desktopActions.className = "nav-actions";
    ACTIONS.forEach(item => desktopActions.appendChild(makeLink(item, item.className)));
    const toggle = document.createElement("button");
    toggle.className = "mobile-menu-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Open navigation menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "mirel-mobile-menu");
    toggle.innerHTML = '<span aria-hidden="true">☰</span>';
    const mobileMenu = document.createElement("nav");
    mobileMenu.className = "mobile-menu";
    mobileMenu.id = "mirel-mobile-menu";
    mobileMenu.setAttribute("aria-label", "Mobile navigation");
    mobileMenu.setAttribute("aria-hidden", "true");
    mobileMenu.setAttribute("inert", "");
    LINKS.forEach(item => mobileMenu.appendChild(makeLink(item)));
    const mobileActions = document.createElement("div");
    mobileActions.className = "mobile-menu-actions";
    ACTIONS.forEach(item => mobileActions.appendChild(makeLink(item, item.className)));
    mobileMenu.appendChild(mobileActions);
    header.append(brand, desktopLinks, desktopActions, toggle);
    mount.replaceChildren(header, mobileMenu);

    function setMenu(open) {
      mobileMenu.classList.toggle("open", open);
      mobileMenu.setAttribute("aria-hidden", String(!open));
      mobileMenu.toggleAttribute("inert", !open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
      toggle.firstElementChild.textContent = open ? "×" : "☰";
    }
    toggle.addEventListener("click", () => setMenu(!mobileMenu.classList.contains("open")));
    mobileMenu.addEventListener("click", event => {
      if (event.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && mobileMenu.classList.contains("open")) {
        setMenu(false);
        toggle.focus();
      }
    });
    document.addEventListener("click", event => {
      if (mobileMenu.classList.contains("open") && !mobileMenu.contains(event.target) && !toggle.contains(event.target)) setMenu(false);
    });
    window.addEventListener("resize", () => { if (window.innerWidth > 1250) setMenu(false); }, {passive: true});
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        header.classList.toggle("scrolled", window.scrollY > 20);
        ticking = false;
      });
    }, {passive: true});
    header.classList.toggle("scrolled", window.scrollY > 20);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createNavigation, {once: true});
  } else createNavigation();
})();

