"use strict";

/*
 * Chase List — Shared Rendering Engine
 * =====================================
 *
 * Used by every page under /hobby/pokemon/chase-list/<group>/.
 * Each page only needs to supply its own card DATA (see the
 * _template folder) and then call renderChaseListPage(config).
 *
 * STANDARD CARD SHAPE
 * --------------------
 * {
 *   name:   "Jolteon",
 *   set:    "Jungle",
 *   number: "4 / 64",
 *   variants: [
 *     {
 *       type:             "Standard",      // "Standard", "Reverse Holo", "1st Edition", etc.
 *       image:            "/images/.../jolteon-4-64.jpeg" | null,
 *       obtained:         true | false,
 *       obtainedDate:     "YYYY-MM-DD" | null,
 *       obtainedLocation: "City, State (Shop)" | null,
 *       features:         ["Holo"],        // optional, defaults to []
 *       notes:            ["free text"]    // optional, defaults to []
 *     }
 *   ]
 * }
 *
 * Every card has at least one variant. A card with only one
 * printing still uses a variants array with a single "Standard"
 * entry — this keeps every page's data and rendering logic
 * identical, whether or not that card happens to have alternate
 * printings.
 */


/* ====================================
   Helpers
   ==================================== */

function chaseListCardHasObtainedVariant(card) {
  return card.variants.some((variant) => variant.obtained);
}

function chaseListEscape(value) {
  return String(value);
}


/* ====================================
   Render a single variant row
   ==================================== */

function chaseListRenderVariant(card, variant) {

  const statusText = variant.obtained ? "✓ Obtained" : "○ Still Chasing";
  const statusClass = variant.obtained ? "status-obtained" : "status-not-obtained";

  const imageHTML = variant.image
    ? `
      <img
        src="${variant.image}"
        alt="${chaseListEscape(card.name)} — ${chaseListEscape(card.set)} ${chaseListEscape(card.number)} — ${chaseListEscape(variant.type)}"
        loading="lazy"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
      >
      <div class="card-image-placeholder" style="display:none;">
        Image not added yet.
      </div>
    `
    : `
      <div class="card-image-placeholder">
        Image not added yet.
      </div>
    `;

  const acquisitionHTML = variant.obtained
    ? `
      <div class="acquisition-info">
        <p><span class="acquisition-label">Date:</span> ${variant.obtainedDate || "Not recorded"}</p>
        <p><span class="acquisition-label">Location:</span> ${variant.obtainedLocation || "Not recorded"}</p>
      </div>
    `
    : "";

  const featuresHTML = variant.features && variant.features.length > 0
    ? `
      <div class="card-features">
        <p class="features-label">Features:</p>
        <ul class="features-list">
          ${variant.features.map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
      </div>
    `
    : "";

  const notesHTML = variant.notes && variant.notes.length > 0
    ? `
      <div class="card-notes">
        <p class="notes-label">Notes:</p>
        <ul class="notes-list">
          ${variant.notes.map((note) => `<li>${note}</li>`).join("")}
        </ul>
      </div>
    `
    : "";

  return `
    <div class="variant-item">

      <div class="variant-image-wrapper">
        ${imageHTML}
      </div>

      <div class="variant-info">

        <div class="variant-header">
          <strong class="variant-type">${variant.type}</strong>
          <span class="ownership-status ${statusClass}">${statusText}</span>
        </div>

        ${acquisitionHTML}
        ${featuresHTML}
        ${notesHTML}

      </div>

    </div>
  `;
}


/* ====================================
   Render a single card (name / set /
   number + all of its variants)
   ==================================== */

function chaseListRenderCard(card) {

  const cardObtained = chaseListCardHasObtainedVariant(card);

  const cardElement = document.createElement("article");
  cardElement.className = `tcg-card ${cardObtained ? "obtained" : "not-obtained"}`;

  const variantsHTML = card.variants
    .map((variant) => chaseListRenderVariant(card, variant))
    .join("");

  cardElement.innerHTML = `
    <div class="card-info">

      <h3 class="card-name">${card.name}</h3>
      <p class="card-set">${card.set}</p>
      <p class="card-number">${card.number}</p>

      <div class="card-variants">
        ${variantsHTML}
      </div>

    </div>
  `;

  return cardElement;
}


/* ====================================
   Render a full page
   ====================================

   config = {
     groups: [
       { gridId: "card-grid", cards: someCardsArray }
       // add a second entry here for pages that split
       // into multiple species sections, e.g. Rhyhorn & Rhydon
     ],
     statsIds: {                 // optional — omit to skip stats
       total:     "total-cards",
       obtained:  "obtained-cards",
       remaining: "remaining-cards",
       percent:   "completion-percent"
     },
     filterId: "collection-filter"   // optional — omit to skip filtering
   }
*/

function renderChaseListPage(config) {

  const { groups, statsIds, filterId } = config;

  function draw(filter = "all") {

    let totalVariants = 0;
    let obtainedVariants = 0;

    groups.forEach((group) => {

      const grid = document.getElementById(group.gridId);
      if (!grid) return;

      grid.innerHTML = "";

      group.cards.forEach((card) => {

        totalVariants += card.variants.length;
        obtainedVariants += card.variants.filter((variant) => variant.obtained).length;

        const cardObtained = chaseListCardHasObtainedVariant(card);

        if (filter === "obtained" && !cardObtained) return;
        if (filter === "chasing" && cardObtained) return;

        grid.appendChild(chaseListRenderCard(card));

      });

    });

    if (statsIds) {

      const remainingVariants = totalVariants - obtainedVariants;

      const completion = totalVariants === 0
        ? 0
        : Math.round((obtainedVariants / totalVariants) * 100);

      const totalEl = document.getElementById(statsIds.total);
      const obtainedEl = document.getElementById(statsIds.obtained);
      const remainingEl = document.getElementById(statsIds.remaining);
      const percentEl = document.getElementById(statsIds.percent);

      if (totalEl) totalEl.textContent = totalVariants;
      if (obtainedEl) obtainedEl.textContent = obtainedVariants;
      if (remainingEl) remainingEl.textContent = remainingVariants;
      if (percentEl) percentEl.textContent = `${completion}%`;

    }

  }

  if (filterId) {
    const filterEl = document.getElementById(filterId);
    if (filterEl) {
      filterEl.addEventListener("change", () => draw(filterEl.value));
    }
  }

  draw();

}
