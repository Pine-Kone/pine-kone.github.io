// Shared site chrome: header, nav, and footer, injected into every page
// from one place so nav labels / links / footer text only need to change
// here, not in every individual HTML file.
//
// Usage in a page:
//   Full main nav:
//     <header data-site-header data-title="Page Title"></header>
//   Breadcrumb-style nav (used on deeper sub-pages):
//     <header data-site-header data-title="Page Title"
//             data-nav="breadcrumb" data-back-href="/hobby/" data-back-label="Hobbies"></header>
//   Footer (same on every page):
//     <footer data-site-footer></footer>
//
// A lang-switch slot is included but inactive until a Spanish version
// of the site exists - see LANG_SWITCH_ENABLED below.

(function () {
  const LANG_SWITCH_ENABLED = false;
  const SITE_NAME = "Hans M. Haroldsen, MTax, MBA";

  const MAIN_NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/portfolio/", label: "My Career" },
    { href: "/library/", label: "My Reading &amp; Writing" },
    { href: "/hobby/", label: "My Hobbies" },
    { href: "https://youtube.com/@rarecandymindset?si=ucd7i97Zyu1Jm-pX", label: "YouTube", external: true },
    { href: "/about/", label: "About Me" },
  ];

  function mainNavHtml() {
    return MAIN_NAV_LINKS.map((link) => {
      const target = link.external ? ' target="_blank"' : "";
      return `<li><a href="${link.href}"${target}>${link.label}</a></li>`;
    }).join("\n        ");
  }

  function breadcrumbNavHtml(backHref, backLabel) {
    return `
        <li><a href="/">Home</a></li>
        <li><a href="${backHref}">Back to ${backLabel}</a></li>`;
  }

  function langSwitchHtml() {
    if (!LANG_SWITCH_ENABLED) return "";
    return `<li class="lang-switch"><a href="#" data-lang-switch>ES</a></li>`;
  }

  function renderHeader(headerEl) {
    const rawTitle = headerEl.getAttribute("data-title") || SITE_NAME;
    const title = rawTitle === SITE_NAME ? rawTitle : `${SITE_NAME} | ${rawTitle}`;
    const subtitle = headerEl.getAttribute("data-subtitle");
    const navType = headerEl.getAttribute("data-nav") || "main";

    let navItems;
    if (navType === "breadcrumb") {
      const backHref = headerEl.getAttribute("data-back-href") || "/";
      const backLabel = headerEl.getAttribute("data-back-label") || "Home";
      navItems = breadcrumbNavHtml(backHref, backLabel);
    } else {
      navItems = "\n        " + mainNavHtml();
    }

    headerEl.innerHTML = `
    <h1>${title}</h1>
    ${subtitle ? `<h2>${subtitle}</h2>` : ""}
    <nav>
      <ul>${navItems}
        ${langSwitchHtml()}
      </ul>
    </nav>
  `;
  }

  const SOCIAL_LINKS = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/hans-m-haroldsen/",
      svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>`,
    },
  ];

  function socialLinksHtml() {
    return SOCIAL_LINKS.map(
      (s) => `<a href="${s.href}" target="_blank" rel="noopener" class="footer-social-link" aria-label="${s.name}">${s.svg}</a>`
    ).join("");
  }

  function renderFooter(footerEl) {
    footerEl.innerHTML = `
      <div class="footer-inner">
        <p>&copy; <span id="year"></span> Hans M. Haroldsen</p>
        <div class="footer-social">${socialLinksHtml()}</div>
      </div>
    `;
    const yearEl = footerEl.querySelector("#year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("header[data-site-header]").forEach(renderHeader);
    document.querySelectorAll("footer[data-site-footer]").forEach(renderFooter);
  });
})();
