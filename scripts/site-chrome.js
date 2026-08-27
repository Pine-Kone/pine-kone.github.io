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
// of the site exists — see LANG_SWITCH_ENABLED below.

(function () {
  const LANG_SWITCH_ENABLED = false;

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
    const title = headerEl.getAttribute("data-title") || "Hans M. Haroldsen";
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

  function renderFooter(footerEl) {
    footerEl.innerHTML = `<p>&copy; <span id="year"></span> Hans M. Haroldsen</p>`;
    const yearEl = footerEl.querySelector("#year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("header[data-site-header]").forEach(renderHeader);
    document.querySelectorAll("footer[data-site-footer]").forEach(renderFooter);
  });
})();
