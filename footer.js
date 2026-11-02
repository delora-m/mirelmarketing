/* MIRÈL — SHARED FOOTER AND CONTACT EMAIL */
(() => {
  "use strict";

  // E-posta adresini bundan sonra yalnızca buradan değiştir.
  const CONTACT_EMAIL = "delora@mirelpartners.com";

  function initializeFooter() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    const footer = document.querySelector("[data-mirel-footer]");

    if (footer) {
      footer.innerHTML = `
        <a
          class="brand"
          href="index.html"
          aria-label="Mirèl Partners Home"
        >
          <span>MIRÈL</span>
          <small>PARTNERS</small>
        </a>

        <a data-mirel-email href="mailto:${CONTACT_EMAIL}">
          ${CONTACT_EMAIL}
        </a>

        <nav class="footer-social" aria-label="Mirèl social media">
          <a
            href="https://www.instagram.com/mirelpartners/"
            target="_blank"
            rel="noopener noreferrer"
          >Instagram</a>

          <a
            href="https://www.youtube.com/@mirelpartners"
            target="_blank"
            rel="noopener noreferrer"
          >YouTube</a>

          <a
            href="https://www.linkedin.com/company/mirelmarketing/"
            target="_blank"
            rel="noopener noreferrer"
          >LinkedIn</a>
        </nav>

        <a href="privacy-policy.html">Privacy Policy</a>
        <a href="terms-and-conditions.html">Terms &amp; Conditions</a>
      `;

      // AI sayfasının mevcut footer stilini koru.
      if (currentPage === "ai-for-med-spas.html") {
        footer
          .querySelector(".footer-social")
          .classList.add("ai-footer-social");
      }

      // Hukuki sayfalardaki mevcut aktif sayfa bilgisini koru.
      if (
        currentPage === "privacy-policy.html" ||
        currentPage === "terms-and-conditions.html"
      ) {
        footer
          .querySelector(`a[href="${currentPage}"]`)
          ?.setAttribute("aria-current", "page");
      }
    }

    // Footer dışındaki işaretlenmiş e-posta bağlantıları.
    document.querySelectorAll("a[data-mirel-email]").forEach(link => {
      link.href = `mailto:${CONTACT_EMAIL}`;
      link.textContent = CONTACT_EMAIL;
    });

    // Yapılandırılmış SEO verisindeki Mirèl e-posta adresi.
    function updateStructuredEmail(value) {
      if (!value || typeof value !== "object") return;

      Object.keys(value).forEach(key => {
        const entry = value[key];

        if (
          key === "email" &&
          typeof entry === "string" &&
          /^delora@mirel(?:marketing|partners)\.com$/i.test(entry)
        ) {
          value[key] = CONTACT_EMAIL;
        } else if (entry && typeof entry === "object") {
          updateStructuredEmail(entry);
        }
      });
    }

    document
      .querySelectorAll('script[type="application/ld+json"]')
      .forEach(script => {
        try {
          const data = JSON.parse(script.textContent);
          updateStructuredEmail(data);
          script.textContent = JSON.stringify(data);
        } catch (error) {
          console.warn("Mirèl: structured data could not be updated.", error);
        }
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeFooter,
      { once: true }
    );
  } else {
    initializeFooter();
  }
})();
