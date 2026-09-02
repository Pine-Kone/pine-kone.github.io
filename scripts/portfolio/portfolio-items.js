// Portfolio page filter tool. Click a tool chip to toggle it as an active
// filter (multi-select). With no filters active, every project shows. With
// filters active, only projects using at least one selected tool show.
// Each card displays once, grouped under its primary section (sections[0]).
// Within a section, items with a "subsection" are further grouped under a
// smaller sub-heading (e.g. Shortcuts -> Professional / Personal).

(function () {
  const activeTools = new Set();

  function toolBadgesHtml(tools) {
    return tools
      .map((t) => `<span class="tool-badge">${PORTFOLIO_TOOL_ICONS[t] || ""} ${t}</span>`)
      .join("");
  }

  function renderChips() {
    const container = document.getElementById("tool-chips");
    container.innerHTML = "";
    PORTFOLIO_TOOLS.forEach((tool) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "category-chip";
      if (activeTools.has(tool)) chip.classList.add("active");
      chip.textContent = `${PORTFOLIO_TOOL_ICONS[tool] || ""} ${tool}`;
      chip.addEventListener("click", () => {
        if (activeTools.has(tool)) {
          activeTools.delete(tool);
        } else {
          activeTools.add(tool);
        }
        renderAll();
      });
      container.appendChild(chip);
    });
  }

  function buildCard(item) {
    const card = document.createElement("div");
    card.className = "portfolio-item-card";
    if (item.image) card.classList.add("has-image");

    const imageHtml = item.image
      ? `<img src="${item.image}" alt="${item.title}" class="portfolio-item-image">`
      : "";
    const statusBadge =
      item.status === "coming-soon"
        ? '<span class="badge-soon">Coming soon</span>'
        : "";
    const isFileLink = item.link && /\.(xlsx|pbix|zip|pdf|sql)$/i.test(item.link);
    const linkHtml =
      item.status === "live" && item.link
        ? `<a href="${item.link}" class="button button-secondary portfolio-item-link">${isFileLink ? "Download" : "View"}</a>`
        : "";

    card.innerHTML = `
      ${imageHtml}
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="tool-badges">${toolBadgesHtml(item.tools)}</div>
      ${statusBadge}
      ${linkHtml}
    `;
    return card;
  }

  function buildGrid(items) {
    const grid = document.createElement("div");
    grid.className = "card-grid portfolio-card-grid";
    items.forEach((item) => grid.appendChild(buildCard(item)));
    return grid;
  }

  function renderItems() {
    const container = document.getElementById("portfolio-items");
    container.innerHTML = "";

    // Primary section order = first-appearance order of sections[0] across items.
    const sections = [];
    PORTFOLIO_ITEMS.forEach((i) => {
      const primary = i.sections[0];
      if (!sections.includes(primary)) sections.push(primary);
    });

    let anySectionRendered = false;

    sections.forEach((sectionName) => {
      const items = PORTFOLIO_ITEMS.filter((i) => {
        if (i.sections[0] !== sectionName) return false;
        if (activeTools.size === 0) return true;
        return i.tools.some((t) => activeTools.has(t));
      });
      if (items.length === 0) return;
      anySectionRendered = true;

      const sectionEl = document.createElement("div");
      sectionEl.className = "portfolio-section";
      sectionEl.innerHTML = `<h2 class="resume-section-title">${sectionName}</h2>`;

      const hasSubsections = items.some((i) => i.subsection);
      if (hasSubsections) {
        const subsections = [];
        items.forEach((i) => {
          const sub = i.subsection || "";
          if (!subsections.includes(sub)) subsections.push(sub);
        });
        subsections.forEach((subName) => {
          const subItems = items.filter((i) => (i.subsection || "") === subName);
          if (subName) {
            const subHeader = document.createElement("h3");
            subHeader.className = "portfolio-subsection-title";
            subHeader.textContent = subName;
            sectionEl.appendChild(subHeader);
          }
          sectionEl.appendChild(buildGrid(subItems));
        });
      } else {
        sectionEl.appendChild(buildGrid(items));
      }

      container.appendChild(sectionEl);
    });

    if (!anySectionRendered) {
      container.innerHTML = '<p class="portfolio-no-results">No projects match the selected tools.</p>';
    }
  }

  function renderAll() {
    renderChips();
    renderItems();
  }

  document.addEventListener("DOMContentLoaded", renderAll);
})();
