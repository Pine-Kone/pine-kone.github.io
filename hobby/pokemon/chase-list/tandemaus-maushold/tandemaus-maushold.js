"use strict";

/*
 * Tandemaus & Maushold Collection Data
 *
 * obtained:
 *   true  = card is in my collection
 *   false = card is still on my chase list
 *
 * obtainedDate:
 *   YYYY-MM-DD
 *
 * obtainedLocation:
 *   Where I obtained the card
 *
 * variants:
 *   Use this when the same numbered card has additional
 *   physical variations that you want to track separately.
 *
 *   Examples:
 *     - Poké Ball
 *     - Master Ball
 *     - Reverse Holo
 *     - First Edition
 *     - Play! Pokémon logo
 *
 * Each variant can have its own:
 *   type
 *   image
 *   obtained
 *   obtainedDate
 *   obtainedLocation
 *   features
 *   notes
 *
 * notes:
 *   Free-form notes about the specific card.
 */


/* ====================================
   Tandemaus & Maushold Cards
   ==================================== */

const tandemausMausholdCards = [

  /* --------------------------------
     Tandemaus
     -------------------------------- */

  {
    name: "Tandemaus",
    set: "Scarlet & Violet",
    number: "159 / 198",
    image: "/images/pokemon/tandemaus-maushold/tandemaus-159-198.jpeg",

    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,

    variants: [],

    features: [],
    notes: []
  },


  {
    name: "Tandemaus",
    set: "Scarlet & Violet",
    number: "160 / 198",
    image: "/images/pokemon/tandemaus-maushold/tandemaus-160-198.jpeg",

    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,

    variants: [],

    features: [],
    notes: []
  },


  {
    name: "Tandemaus",
    set: "Paldea Evolved",
    number: "166 / 198",
    image: "/images/pokemon/tandemaus-maushold/tandemaus-166-198.jpeg",

    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,

    variants: [],

    features: [],
    notes: []
  },


  {
    name: "Tandemaus",
    set: "Paldea Evolved",
    number: "167 / 198",
    image: "/images/pokemon/tandemaus-maushold/tandemaus-167-198.jpeg",

    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,

    variants: [],

    features: [],
    notes: []
  },


  {
    name: "Tandemaus",
    set: "Paradox Rift",
    number: "153 / 182",
    image: "/images/pokemon/tandemaus-maushold/tandemaus-153-182.jpeg",

    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,

    variants: [],

    features: [],
    notes: []
  },


  {
    name: "Tandemaus",
    set: "Paradox Rift",
    number: "154 / 182",
    image: "/images/pokemon/tandemaus-maushold/tandemaus-154-182.jpeg",

    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,

    variants: [],

    features: [],
    notes: []
  },


  {
    name: "Tandemaus",
    set: "Paldean Fates",
    number: "73 / 91",
    image: "/images/pokemon/tandemaus-maushold/tandemaus-73-91.jpeg",

    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,

    variants: [],

    features: [],
    notes: []
  },


  {
    name: "Tandemaus",
    set: "Paldean Fates",
    number: "209 / 91",
    image: "/images/pokemon/tandemaus-maushold/tandemaus-209-91.jpeg",

    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,

    variants: [],

    features: [],
    notes: []
  },


  {
    name: "Tandemaus",
    set: "Surging Sparks",
    number: "157 / 191",
    image: "/images/pokemon/tandemaus-maushold/tandemaus-157-191.jpeg",

    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,

    variants: [],

    features: [],
    notes: []
  },


  /* --------------------------------
     Maushold
     -------------------------------- */

  {
    name: "Maushold",
    set: "Scarlet & Violet",
    number: "161 / 198",
    image: "/images/pokemon/tandemaus-maushold/maushold-161-198.jpeg",

    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,

    variants: [],

    features: [],
    notes: []
  },


  {
    name: "Maushold",
    set: "Paldea Evolved",
    number: "168 / 198",
    image: "/images/pokemon/tandemaus-maushold/maushold-168-198.jpeg",

    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,

    variants: [],

    features: [],
    notes: []
  },


  {
    name: "Maushold",
    set: "Paldea Evolved",
    number: "226 / 198",
    image: "/images/pokemon/tandemaus-maushold/maushold-226-198.jpeg",

    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,

    variants: [],

    features: [],
    notes: []
  },


  {
    name: "Maushold ex",
    set: "Paradox Rift",
    number: "155 / 182",
    image: "/images/pokemon/tandemaus-maushold/maushold-ex-155-182.jpeg",

    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,

    variants: [],

    features: [],
    notes: []
  },


  {
    name: "Maushold ex",
    set: "Paradox Rift",
    number: "233 / 182",
    image: "/images/pokemon/tandemaus-maushold/maushold-ex-233-182.jpeg",

    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,

    variants: [],

    features: [],
    notes: []
  },


  {
    name: "Maushold",
    set: "Paldean Fates",
    number: "74 / 91",
    image: "/images/pokemon/tandemaus-maushold/maushold-74-91.jpeg",

    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,

    variants: [],

    features: [],
    notes: []
  },


  {
    name: "Maushold",
    set: "Paldean Fates",
    number: "210 / 91",
    image: "/images/pokemon/tandemaus-maushold/maushold-210-91.jpeg",

    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,

    variants: [],

    features: [],
    notes: []
  },


  {
    name: "Maushold",
    set: "Surging Sparks",
    number: "158 / 191",
    image: "/images/pokemon/tandemaus-maushold/maushold-158-191.jpeg",

    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,

    variants: [],

    features: [],
    notes: []
  },


  /* --------------------------------
     Maushold Appearance — Pikachu Promo
     -------------------------------- */

  {
    name: "Pikachu",
    set: "SV Black Star Promos",
    number: "088",
    image: "/images/pokemon/tandemaus-maushold/pikachu-088.jpeg",

    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,

    variants: [],

    features: [
      "Full Art"
    ],

    notes: [
      "Features Maushold in the artwork."
    ]
  }

];


/* ====================================
   Render Collection
   ==================================== */

function renderCollection(filter = "all") {

  const grid = document.getElementById("card-grid");

  let obtainedCount = 0;

  grid.innerHTML = "";


  tandemausMausholdCards.forEach((card) => {

    if (card.obtained) {
      obtainedCount++;
    }


    /* -----------------------------
       Filtering
       ----------------------------- */

    if (
      filter === "obtained" &&
      !card.obtained
    ) {
      return;
    }

    if (
      filter === "chasing" &&
      card.obtained
    ) {
      return;
    }


    /* -----------------------------
       Card Element
       ----------------------------- */

    const cardElement =
      document.createElement("article");


    cardElement.className =
      `tcg-card ${
        card.obtained
          ? "obtained"
          : "not-obtained"
      }`;


    /* -----------------------------
       Status
       ----------------------------- */

    const statusText =
      card.obtained
        ? "✓ Obtained"
        : "○ Still Chasing";


    const statusClass =
      card.obtained
        ? "status-obtained"
        : "status-not-obtained";


    /* -----------------------------
       Acquisition Information
       ----------------------------- */

    let acquisitionHTML = "";


    if (card.obtained) {

      acquisitionHTML = `
        <div class="acquisition-info">

          <p>
            <span class="acquisition-label">
              Date:
            </span>

            ${card.obtainedDate || "Not recorded"}
          </p>

          <p>
            <span class="acquisition-label">
              Location:
            </span>

            ${card.obtainedLocation || "Not recorded"}
          </p>

        </div>
      `;
    }


    /* -----------------------------
       Features
       ----------------------------- */

    let featuresHTML = "";


    if (
      card.features &&
      card.features.length > 0
    ) {

      featuresHTML = `
        <div class="card-features">

          <p class="features-label">
            Features:
          </p>

          <ul class="features-list">

            ${card.features
              .map(
                feature =>
                  `<li>${feature}</li>`
              )
              .join("")}

          </ul>

        </div>
      `;
    }


    /* -----------------------------
       Notes
       ----------------------------- */

    let notesHTML = "";


    if (
      card.notes &&
      card.notes.length > 0
    ) {

      notesHTML = `
        <div class="card-notes">

          <p class="notes-label">
            Notes:
          </p>

          <ul class="notes-list">

            ${card.notes
              .map(
                note =>
                  `<li>${note}</li>`
              )
              .join("")}

          </ul>

        </div>
      `;
    }


    /* -----------------------------
       Variants
       ----------------------------- */

    let variantsHTML = "";


    if (
      card.variants &&
      card.variants.length > 0
    ) {

      variantsHTML = `
        <div class="card-variants">

          <p class="variants-label">
            Variants:
          </p>

          <div class="variants-list">

            ${card.variants
              .map((variant) => {

                const variantStatus =
                  variant.obtained
                    ? "✓ Obtained"
                    : "○ Still Chasing";


                return `
                  <div class="variant-item">

                    <div class="variant-image-wrapper">

                      ${
                        variant.image
                          ? `
                            <img
                              src="${variant.image}"
                              alt="${card.name} — ${variant.type}"
                              loading="lazy"
                              onerror="
                                this.style.display='none';
                                this.nextElementSibling.style.display='block';
                              "
                            >
                          `
                          : ""
                      }

                      <div
                        class="card-image-placeholder"
                        style="${
                          variant.image
                            ? "display:none;"
                            : "display:block;"
                        }"
                      >
                        Image not added yet.
                      </div>

                    </div>

                    <div class="variant-info">

                      <strong>
                        ${variant.type}
                      </strong>

                      <span>
                        ${variantStatus}
                      </span>

                      ${
                        variant.obtained
                          ? `
                            <small>
                              ${
                                variant.obtainedDate ||
                                "Date not recorded"
                              }
                            </small>

                            <small>
                              ${
                                variant.obtainedLocation ||
                                "Location not recorded"
                              }
                            </small>
                          `
                          : ""
                      }

                    </div>

                  </div>
                `;
              })
              .join("")}

          </div>

        </div>
      `;
    }


    /* -----------------------------
       Card HTML
       ----------------------------- */

    cardElement.innerHTML = `

      <div class="card-image-wrapper">

        <img
          src="${card.image}"
          alt="${card.name} — ${card.set} ${card.number}"
          loading="lazy"
          onerror="
            this.style.display='none';
            this.nextElementSibling.style.display='block';
          "
        >

        <div
          class="card-image-placeholder"
          style="display:none;"
        >
          Card image not added yet.
        </div>

      </div>


      <div class="card-info">

        <h3 class="card-name">
          ${card.name}
        </h3>

        <p class="card-set">
          ${card.set}
        </p>

        <p class="card-number">
          ${card.number}
        </p>

        <span
          class="ownership-status ${statusClass}"
        >
          ${statusText}
        </span>


        ${acquisitionHTML}

        ${featuresHTML}

        ${variantsHTML}

        ${notesHTML}

      </div>

    `;


    grid.appendChild(cardElement);

  });


  /* ====================================
     Statistics
     ==================================== */

  const totalCount =
    tandemausMausholdCards.length;


  const remainingCount =
    totalCount - obtainedCount;


  const completion =
    totalCount === 0
      ? 0
      : Math.round(
          (obtainedCount / totalCount) * 100
        );


  document.getElementById(
    "total-cards"
  ).textContent = totalCount;


  document.getElementById(
    "obtained-cards"
  ).textContent = obtainedCount;


  document.getElementById(
    "remaining-cards"
  ).textContent = remainingCount;


  document.getElementById(
    "completion-percent"
  ).textContent = `${completion}%`;

}


/* ====================================
   Filter
   ==================================== */

function initializeFilter() {

  const filter =
    document.getElementById(
      "collection-filter"
    );


  if (!filter) {
    return;
  }


  filter.addEventListener(
    "change",
    () => {

      renderCollection(
        filter.value
      );

    }
  );

}


/* ====================================
   Start Page
   ==================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderCollection();

    initializeFilter();

  }
);
