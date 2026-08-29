// Portfolio page filter tool. Click a tool chip to toggle it as an active
// filter (multi-select). With no filters active, every project shows. With
// filters active, only projects using at least one selected tool show.

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

  function renderItems() {
    const container = document.getElementById("portfolio-items");
    container.innerHTML = "";

    const sections = [...new Set(PORTFOLIO_ITEMS.map((i) => i.section))];
    sections.forEach((sectionName) => {
      const items = PORTFOLIO_ITEMS.filter((i) => {
        if (i.section !== sectionName) return false;
        if (activeTools.size === 0) return true;
        return i.tools.some((t) => activeTools.has(t));
      });
      if (items.length === 0) return;

      const sectionEl = document.createElement("div");
      sectionEl.className = "portfolio-section";
      sectionEl.innerHTML = `<h2 class="resume-section-title">${sectionName}</h2>`;

      const grid = document.createElement("div");
      grid.className = "card-grid portfolio-card-grid";

      items.forEach((item) => {
        const card = document.createElement("div");
        card.className = "portfolio-item-card";
        const statusBadge =
          item.status === "coming-soon"
            ? '<span class="badge-soon">Coming soon</span>'
            : "";
        const linkHtml =
          item.status === "live" && item.link
            ? `<a href="${item.link}" class="button button-secondary portfolio-item-link">View</a>`
            : "";
        card.innerHTML = `
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <div class="tool-badges">${toolBadgesHtml(item.tools)}</div>
          ${statusBadge}
          ${linkHtml}
        `;
        grid.appendChild(card);
      });

      sectionEl.appendChild(grid);
      container.appendChild(sectionEl);
    });

    if (sections.every((s) => PORTFOLIO_ITEMS.filter((i) => i.section === s && (activeTools.size === 0 || i.tools.some((t) => activeTools.has(t)))).length === 0)) {
      container.innerHTML = '<p class="portfolio-no-results">No projects match the selected tools.</p>';
    }
  }

  function renderAll() {
    renderChips();
    renderItems();
  }

  document.addEventListener("DOMContentLoaded", renderAll);
})();
