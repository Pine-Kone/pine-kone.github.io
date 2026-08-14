"use strict";

/*
 * Tandemaus & Maushold Collection Data
 *
 * Each card contains a variants array.
 *
 * The first variant should always be:
 *   "Standard"
 *
 * Additional variants can be added as they are discovered.
 *
 * Examples:
 *   - Poké Ball
 *   - Master Ball
 *   - Reverse Holo
 *   - First Edition
 *   - Play! Pokémon logo
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
 * Image naming convention:
 *
 *   card-name-#-#.jpeg
 *
 * Examples:
 *   tandemaus-154-182.jpeg
 *   maushold-161-198.jpeg
 *   maushold-ex-155-182.jpeg
 *
 * If an image is not yet available:
 *   image: null
 *
 * The page will automatically display a placeholder.
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

    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/tandemaus-maushold/tandemaus-159-198.jpeg",
        obtained: true,
        obtainedDate: "2026-08-11",
        obtainedLocation: "Lynden, Washington (Gems & Games)",
        features: [],
        notes: []
      }
    ]
  },


  {
    name: "Tandemaus",
    set: "Scarlet & Violet",
    number: "160 / 198",

    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/tandemaus-maushold/tandemaus-160-198.jpeg",
        obtained: true,
        obtainedDate: "2026-08-11",
        obtainedLocation: "Lynden, Washington (Gems & Games)",
        features: [],
        notes: []
      }
    ]
  },


  {
    name: "Tandemaus",
    set: "Paldea Evolved",
    number: "166 / 193",

    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/tandemaus-maushold/tandemaus-166-193.jpeg",
        obtained: true,
        obtainedDate: "2026-08-11",
        obtainedLocation: "Lynden, Washington (Gems & Games)",
        features: [],
        notes: []
      }
    ]
  },


  {
    name: "Tandemaus",
    set: "Paldea Evolved",
    number: "167 / 193",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/tandemaus-maushold/tandemaus-167-193.jpeg",
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      },
       {
        type: "Reverse Holo",
        image: "/images/pokemon/tandemaus-maushold/tandemaus-167-193-reverse-holo.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: ["Reverse Holo"],
        notes: []
      }
    ]
  },


  {
    name: "Tandemaus",
    set: "Paradox Rift",
    number: "153 / 182",

    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/tandemaus-maushold/tandemaus-153-182.jpeg",
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },


  {
    name: "Tandemaus",
    set: "Paradox Rift",
    number: "154 / 182",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/tandemaus-maushold/tandemaus-154-182.jpeg",
        obtained: true,
        obtainedDate: "2026-08-11",
        obtainedLocation: "Lynden, Washington (Gems & Games)",
        features: [],
        notes: []
      },
       {
        type: "Reverse Holo",
        image: "/images/pokemon/tandemaus-maushold/tandemaus-154-182-reverse-holo.jpeg",
        obtained: true,
        obtainedDate: "2026-08-11",
        obtainedLocation: "Lynden, Washington (Gems & Games)",
        features: ["Reverse Holo"],
        notes: []
      }
    ]
  },


  {
    name: "Tandemaus",
    set: "Paldean Fates",
    number: "73 / 91",

    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/tandemaus-maushold/tandemaus-73-91.jpeg",
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },


  {
    name: "Tandemaus",
    set: "Paldean Fates",
    number: "209 / 91",

    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/tandemaus-maushold/tandemaus-209-91.jpeg",
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },


  {
    name: "Tandemaus",
    set: "Surging Sparks",
    number: "157 / 191",

    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/tandemaus-maushold/tandemaus-157-191.jpeg",
        obtained: true,
        obtainedDate: "2026-08-11",
        obtainedLocation: "Lynden, Washington (Gems & Games)",
        features: [],
        notes: []
      }
    ]
  },


  /* --------------------------------
     Maushold
     -------------------------------- */

  {
    name: "Maushold",
    set: "Scarlet & Violet",
    number: "161 / 198",

    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/tandemaus-maushold/maushold-161-198.jpeg",
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      },
       {
        type: "Reverse Holo",
        image: "/images/pokemon/tandemaus-maushold/maushold-161-198-reverse-holo.jpeg",
        obtained: true,
        obtainedDate: "2026-08-11",
        obtainedLocation: "Lynden, Washington (Gems & Games)",
        features: ["Reverse Holo"],
        notes: []
      }
    ]
  },


  {
    name: "Maushold",
    set: "Paldea Evolved",
    number: "168 / 193",

    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/tandemaus-maushold/maushold-168-193.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },


  {
    name: "Maushold",
    set: "Paldea Evolved",
    number: "226 / 198",

    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/tandemaus-maushold/maushold-226-198.jpeg",
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },


  {
    name: "Maushold ex",
    set: "Paradox Rift",
    number: "155 / 182",

    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/tandemaus-maushold/maushold-ex-155-182.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },


  {
    name: "Maushold ex",
    set: "Paradox Rift",
    number: "233 / 182",

    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/tandemaus-maushold/maushold-ex-233-182.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },


  {
    name: "Maushold",
    set: "Paldean Fates",
    number: "74 / 91",

    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/tandemaus-maushold/maushold-74-91.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },


  {
    name: "Maushold",
    set: "Paldean Fates",
    number: "210 / 91",

    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/tandemaus-maushold/maushold-210-91-shiny.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: ["Shiny"],
        notes: []
      }
    ]
  },


  {
    name: "Maushold",
    set: "Surging Sparks",
    number: "158 / 191",

    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/tandemaus-maushold/maushold-158-191.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },


  /* --------------------------------
     Maushold Appearance — Pikachu Promo
     -------------------------------- */

  {
    name: "Pikachu",
    set: "SV Black Star Promos",
    number: "088",

    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/tandemaus-maushold/pikachu-088.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: "Ammon, Idaho (Wal-Mart)",
        features: [
          "Full Art"
        ],
        notes: [
          "Features Maushold in the artwork."
        ]
      }
    ]
  }

];


/* ====================================
   Helper Functions
   ==================================== */

/*
 * A card is considered "obtained" if at least
 * one of its variants has been obtained.
 *
 * This means a card can eventually look like:
 *
 * Standard   → Obtained
 * Poké Ball  → Obtained
 * Master Ball → Still Chasing
 *
 * and the card itself will still count as obtained.
 */

function cardHasObtainedVariant(card) {

  return card.variants.some(
    variant => variant.obtained
  );

}


/* ====================================
   Render Collection
   ==================================== */

function renderCollection(filter = "all") {

  const grid =
    document.getElementById("card-grid");

  let obtainedCount = 0;

  grid.innerHTML = "";


  tandemausMausholdCards.forEach((card) => {

    const cardObtained =
      cardHasObtainedVariant(card);


    if (cardObtained) {
      obtainedCount++;
    }


    /* -----------------------------
       Filtering
       ----------------------------- */

    if (
      filter === "obtained" &&
      !cardObtained
    ) {
      return;
    }


    if (
      filter === "chasing" &&
      cardObtained
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
        cardObtained
          ? "obtained"
          : "not-obtained"
      }`;


    /* -----------------------------
       Status
       ----------------------------- */

    const statusText =
      cardObtained
        ? "✓ Obtained"
        : "○ Still Chasing";


    const statusClass =
      cardObtained
        ? "status-obtained"
        : "status-not-obtained";


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


                const variantStatusClass =
                  variant.obtained
                    ? "status-obtained"
                    : "status-not-obtained";


                /* -----------------------------
                   Variant Image
                   ----------------------------- */

                const imageHTML =
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
                    : "";


                const placeholderDisplay =
                  variant.image
                    ? "display:none;"
                    : "display:block;";


                /* -----------------------------
                   Variant Acquisition
                   ----------------------------- */

                let variantAcquisitionHTML = "";


                if (variant.obtained) {

                  variantAcquisitionHTML = `
                    <div class="acquisition-info">

                      <p>
                        <span class="acquisition-label">
                          Date:
                        </span>

                        ${
                          variant.obtainedDate ||
                          "Not recorded"
                        }
                      </p>

                      <p>
                        <span class="acquisition-label">
                          Location:
                        </span>

                        ${
                          variant.obtainedLocation ||
                          "Not recorded"
                        }
                      </p>

                    </div>
                  `;

                }


                /* -----------------------------
                   Variant Features
                   ----------------------------- */

                let variantFeaturesHTML = "";


                if (
                  variant.features &&
                  variant.features.length > 0
                ) {

                  variantFeaturesHTML = `
                    <div class="card-features">

                      <p class="features-label">
                        Features:
                      </p>

                      <ul class="features-list">

                        ${variant.features
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
                   Variant Notes
                   ----------------------------- */

                let variantNotesHTML = "";


                if (
                  variant.notes &&
                  variant.notes.length > 0
                ) {

                  variantNotesHTML = `
                    <div class="card-notes">

                      <p class="notes-label">
                        Notes:
                      </p>

                      <ul class="notes-list">

                        ${variant.notes
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
                   Return Variant HTML
                   ----------------------------- */

                return `
                  <div class="variant-item">

                    <div class="variant-image-wrapper">

                      ${imageHTML}

                      <div
                        class="card-image-placeholder"
                        style="${placeholderDisplay}"
                      >
                        Image not added yet.
                      </div>

                    </div>


                    <div class="variant-info">

                      <strong>
                        ${variant.type}
                      </strong>

                      <span
                        class="ownership-status ${variantStatusClass}"
                      >
                        ${variantStatus}
                      </span>


                      ${variantAcquisitionHTML}

                      ${variantFeaturesHTML}

                      ${variantNotesHTML}

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


        ${variantsHTML}

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
