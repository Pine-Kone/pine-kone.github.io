"use strict";

/*
 * Jolteon Collection Data
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
 * features:
 *   Structured characteristics of the physical card
 *   Examples:
 *     "First Edition"
 *     "Reverse Holo"
 *     "Play! Pokémon logo"
 *     "Poké Ball logo"
 *     "Master Ball logo"
 *
 * notes:
 *   Free-form notes about the specific card
 */

const jolteonCards = [

  {
    name: "Jolteon",
    set: "Jungle",
    number: "4 / 64",
    variants: [
        {
          type: "Standard",
          image: "/images/pokemon/chase-list/jolteon/jolteon-4-64-standard.jpeg",
          features: ["Holo"],
          obtained: true,
          obtainedDate: null,
          obtainedLocation: "Ammon, Idaho (Silver Slugger Coins & Cards)",
          notes: []
        },
        {
          type: "1st Edition",
          image: null,
          features: ["1st Edition", "Holo"],
          obtained: false,
          obtainedDate: null,
          obtainedLocation: null,
          notes: []
        }
      ]
  },

  {
    name: "Jolteon",
    set: "Jungle",
    number: "20 / 64",
    variants: [
        {
          type: "Standard",
          image: "/images/pokemon/chase-list/jolteon/jolteon-20-64-standard.jpeg",
          features: [],
          obtained: true,
          obtainedDate: "2026-08-12",
          obtainedLocation: "Bellingham, Washington (Cardhaven Games)",
          notes: []
        },
        {
          type: "1st Edition",
          image: null,
          features: ["1st Edition"],
          obtained: false,
          obtainedDate: null,
          obtainedLocation: null,
          notes: []
        }
      ]
  },

  {
    name: "Dark Jolteon",
    set: "Team Rocket",
    number: "38 / 82",
    variants: [
        {
          type: "Standard",
          image: "/images/pokemon/chase-list/jolteon/dark-jolteon-38-82-standard.jpeg",
          features: [],
          obtained: true,
          obtainedDate: "2026-08-12",
          obtainedLocation: "Bellingham, Washington (Cardhaven Games)",
          notes: []
        },
        {
          type: "First Edition",
          image: null,
          features: ["First Edition"],
          obtained: false,
          obtainedDate: null,
          obtainedLocation: null,
          notes: []
        }
      ]
  },

  {
    name: "Lt. Surge's Jolteon",
    set: "Gym Challenge",
    number: "28 / 132",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Light Jolteon",
    set: "Neo Destiny",
    number: "48 / 105",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jasmine's Jolteon",
    set: "VS",
    number: "30 / 141",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Lt. Surge's Jolteon",
    set: "Miscellaneous Promos 1998",
    number: "Promo",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "Skyridge",
    number: "13 / 144",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "EX Sandstorm",
    number: "6 / 100",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "EX Unseen Forces",
    number: "8 / 115",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon δ",
    set: "EX Delta Species",
    number: "7 / 113",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon ex",
    set: "EX Delta Species",
    number: "109 / 113",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "POP Series 3",
    number: "3 / 17",
    image: "/images/pokemon/chase-list/jolteon/jolteon-3-17.jpeg",
    obtained: true,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "EX Power Keepers",
    number: "101 / 108",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "Majestic Dawn",
    number: "23 / 100",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "Rising Rivals",
    number: "26 / 111",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "Undaunted",
    number: "28 / 90",
    image: "/images/pokemon/chase-list/jolteon/jolteon-28-90.jpeg",
    obtained: true,
    obtainedDate: "2026-08-12",
    obtainedLocation: "Bellingham, Washington (Cardhaven Games)",
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "Call of Legends",
    number: "45 / 95",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "Dark Explorers",
    number: "37 / 108",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "Plasma Freeze",
    number: "34 / 116",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "BW Promos",
    number: "BW91",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "Ancient Origins",
    number: "26 / 98",
    variants: [
        {
          type: "Standard",
          image: null,
          features: [],
          obtained: false,
          obtainedDate: null,
          obtainedLocation: null,
          notes: []
        },
        {
          type: "Reverse Holo",
          image: "/images/pokemon/chase-list/jolteon/jolteon-26-98-reverse-holo.jpeg",
          features: ["Reverse Holo"],
          obtained: true,
          obtainedDate: "2026-08-12",
          obtainedLocation: "Bellingham, Washington (Cardhaven Games)",
          notes: []
        }
      ]
  },

  {
    name: "Jolteon EX",
    set: "Generations",
    number: "28 / 83",
    image: "/images/pokemon/chase-list/jolteon/jolteon-28-83.jpeg",
    obtained: true,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon EX",
    set: "Alternate Art Promo",
    number: "28a / 83",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "Hidden Fates",
    number: "23 / 68",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "Cosmic Eclipse",
    number: "70 / 236",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "Tag All Stars",
    number: "42 / 173",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon GX",
    set: "SM Promos",
    number: "SM173",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "Vivid Voltage",
    number: "47 / 180",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon VMAX",
    set: "Evolving Skies",
    number: "51 / 203",
    image: "/images/pokemon/chase-list/jolteon/jolteon-vmax-51-203.jpeg",
    obtained: true,
    obtainedDate: null,
    obtainedLocation: "Lynden, Washington",
    features: [],
    notes: []
  },

  {
    name: "Jolteon V",
    set: "Evolving Skies",
    number: "177 / 225",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "Brilliant Stars",
    number: "TG4 / TG30",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "SWSH Promos",
    number: "SWSH94",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon V",
    set: "SWSH Promos",
    number: "SWSH151",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon V",
    set: "SWSH Promos",
    number: "SWSH183",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon VMAX",
    set: "SWSH Promos",
    number: "SWSH184",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "151",
    number: "135 / 165",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "Prismatic Evolutions",
    number: "29 / 131",
    variants: [
        {
          type: "Standard",
          image: "/images/pokemon/chase-list/jolteon/jolteon-29-131-standard.jpeg",
          features: [],
          obtained: true,
          obtainedDate: "2026-08-11",
          obtainedLocation: "Lynden, Washington (Gems & Games)",
          notes: []
        },
        {
          type: "Pokeball",
          image: null,
          features: ["Pokeball Mark"],
          obtained: false,
          obtainedDate: null,
          obtainedLocation: null,
          notes: []
        },
        {
          type: "Masterball",
          image: "/images/pokemon/chase-list/jolteon/jolteon-29-131-masterball.jpeg",
          features: ["Masterball Mark"],
          obtained: true,
          obtainedDate: null,
          obtainedLocation: "Lynden, Washington (Meeple Manor)",
          notes: []
        }
      ]
  },

  {
    name: "Jolteon ex",
    set: "Prismatic Evolutions",
    number: "30 / 131",
    variants: [
        {
          type: "Standard",
          image: null,
          features: [],
          obtained: false,
          obtainedDate: null,
          obtainedLocation: null,
          notes: []
        },
        {
          type: "Play! Pokemon Logo",
          image: "/images/pokemon/chase-list/jolteon/jolteon-ex-30-131-play-pokemon.jpeg",
          features: ["Play! Pokemon Logo"],
          obtained: true,
          obtainedDate: null,
          obtainedLocation: "Lynden, Washington (Gems & Games)",
          notes: []
        }
      ]
  },

  {
    name: "Jolteon ex",
    set: "Prismatic Evolutions",
    number: "153 / 131",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "SV Promos",
    number: "169",
    image: "/images/pokemon/chase-list/jolteon/jolteon-169.jpeg",
    obtained: true,
    obtainedDate: null,
    obtainedLocation: "Bellingham, Washington",
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "SV Promo",
    number: "64 / SV-P",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Jolteon",
    set: "Starter Set ex Eevee ex",
    number: "1 / 19",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  }

];


/* ====================================
   Render Collection
   ==================================== */

function renderCollection() {

  const grid = document.getElementById("card-grid");

  let obtainedCount = 0;
  let totalCount = 0;

  grid.innerHTML = "";


  jolteonCards.forEach((card) => {

    /*
     * Determine whether this card uses the new
     * variants[] structure or the original structure.
     */

    const variants = card.variants || [
      {
        type: "Standard",
        image: card.image,
        features: card.features || [],
        obtained: card.obtained,
        obtainedDate: card.obtainedDate,
        obtainedLocation: card.obtainedLocation,
        notes: card.notes || []
      }
    ];


    /*
     * Count each variant individually.
     */

    variants.forEach((variant) => {

      totalCount++;

      if (variant.obtained) {
        obtainedCount++;
      }


      const cardElement = document.createElement("article");

      cardElement.className =
        `tcg-card ${variant.obtained ? "obtained" : "not-obtained"}`;


      /*
       * Ownership status
       */

      const statusText =
        variant.obtained
          ? "✓ Obtained"
          : "○ Still Chasing";


      const statusClass =
        variant.obtained
          ? "status-obtained"
          : "status-not-obtained";


      /*
       * Image
       */

      let imageHTML = "";

      if (variant.image) {

        imageHTML = `
          <img
            src="${variant.image}"
            alt="${card.name} — ${variant.type} — ${card.set} ${card.number}"
            loading="lazy"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
          >

          <div
            class="card-image-placeholder"
            style="display: none;"
          >
            Card image not added yet.
          </div>
        `;

      } else {

        imageHTML = `
          <div class="card-image-placeholder">
            Card image not added yet.
          </div>
        `;

      }


      /*
       * Acquisition information
       */

      let acquisitionHTML = "";

      if (variant.obtained) {

        acquisitionHTML = `
          <div class="acquisition-info">

            <p>
              <span class="acquisition-label">
                Date:
              </span>

              ${variant.obtainedDate || "Not recorded"}
            </p>

            <p>
              <span class="acquisition-label">
                Location:
              </span>

              ${variant.obtainedLocation || "Not recorded"}
            </p>

          </div>
        `;

      }


      /*
       * Features
       */

      let featuresHTML = "";

      if (
        Array.isArray(variant.features) &&
        variant.features.length > 0
      ) {

        featuresHTML = `
          <div class="card-features">

            <p class="features-label">
              Features:
            </p>

            <ul class="features-list">

              ${variant.features
                .map(feature => `<li>${feature}</li>`)
                .join("")}

            </ul>

          </div>
        `;

      }


      /*
       * Notes
       */

      let notesHTML = "";

      if (
        Array.isArray(variant.notes) &&
        variant.notes.length > 0
      ) {

        notesHTML = `
          <div class="card-notes">

            <p class="notes-label">
              Notes:
            </p>

            <ul class="notes-list">

              ${variant.notes
                .map(note => `<li>${note}</li>`)
                .join("")}

            </ul>

          </div>
        `;

      }


      /*
       * Build the card
       */

      cardElement.innerHTML = `

        <div class="card-image-wrapper">

          ${imageHTML}

        </div>


        <div class="card-info">

          <h3 class="card-name">
            ${card.name}
          </h3>

          <p class="card-variant">
            ${variant.type}
          </p>

          <p class="card-set">
            ${card.set}
          </p>

          <p class="card-number">
            ${card.number}
          </p>


          <span class="ownership-status ${statusClass}">
            ${statusText}
          </span>


          ${acquisitionHTML}

          ${featuresHTML}

          ${notesHTML}

        </div>

      `;


      grid.appendChild(cardElement);

    });

  });


  /*
   * Collection statistics
   */

  const remainingCount =
    totalCount - obtainedCount;


  const completion =
    totalCount === 0
      ? 0
      : Math.round(
          (obtainedCount / totalCount) * 100
        );


  document.getElementById("total-cards").textContent =
    totalCount;

  document.getElementById("obtained-cards").textContent =
    obtainedCount;

  document.getElementById("remaining-cards").textContent =
    remainingCount;

  document.getElementById("completion-percent").textContent =
    `${completion}%`;
}


/* ====================================
   Start Page
   ==================================== */

document.addEventListener(
  "DOMContentLoaded",
  renderCollection
);
