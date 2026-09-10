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
    { href: "/career/", label: "My Career" },
    { href: "/reading-writing/", label: "My Reading &amp; Writing" },
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
    { name: "GitHub", href: "https://github.com/Pine-Kone", svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.02 11.02 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.08.78 2.17 0 1.56-.01 2.82-.01 3.2 0 .31.21.66.79.55A11.5 11.5 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5z"/></svg>` },
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
        <p class="footer-credit">Site created by Hans M. Haroldsen.</p>
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
