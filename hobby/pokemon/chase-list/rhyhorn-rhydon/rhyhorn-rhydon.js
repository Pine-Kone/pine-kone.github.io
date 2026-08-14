"use strict";

/*
 * Rhyhorn & Rhydon Collection Data
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
 *
 *   Examples:
 *     "First Edition"
 *     "Reverse Holo"
 *     "Play! Pokémon logo"
 *     "Poké Ball logo"
 *     "Great Ball logo"
 *     "Ultra Ball logo"
 *     "Master Ball logo"
 *
 * notes:
 *   Free-form notes about the specific card
 */


const rhyhornCards = [

  {
    name: "Rhyhorn",
    set: "Jungle",
    number: "61 / 64",
    variants: [
        {
          type: "Standard",
          image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhyhorn-61-64.jpeg",
          features: [],
          obtained: true,
          obtainedDate: null,
          obtainedLocation: "Lynden, Washington (Gems & Games)",
          notes: []
        },
        {
          type: "1st Edition",
          image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhyhorn-61-64-1st-edition.jpeg",
          features: ["1st Edition"],
          obtained: true,
          obtainedDate: "2025-08-05",
          obtainedLocation: "Online (Cardhaven Games)",
          notes: []
        }
      ]
  },

  {
    name: "Rhyhorn",
    set: "Base Set 2",
    number: "90 / 130",
    image: "/images/pokemon/rhyhorn-rhydon/rhyhorn-90-130.jpeg",
    obtained: true,
    obtainedDate: "2025-08-05",
    obtainedLocation: "Online (Cardhaven Games)",
    features: [],
    notes: []
  },
  
  {
    name: "Brock's Rhyhorn",
    set: "Gym Heroes",
    number: "22 / 132",
    image: "/images/pokemon/rhyhorn-rhydon/brocks-rhyhorn-22-132.jpeg",
    obtained: true,
    obtainedDate: "2025-08-05",
    obtainedLocation: "Online (Cardhaven Games)",
    features: [],
    notes: []
  },

  {
    name: "Brock's Rhyhorn",
    set: "Gym Heroes",
    number: "70 / 132",
    variants: [
        {
          type: "Standard",
          image: "/images/pokemon/chase-list/rhyhorn-rhydon/brocks-rhyhorn-70-132.jpeg",
          features: [],
          obtained: true,
          obtainedDate: "2026-08-12",
          obtainedLocation: "Bellingham, Washington (Cardhaven Games)",
          notes: []
        },
        {
          type: "1st Edition",
          image: "/images/pokemon/chase-list/rhyhorn-rhydon/brocks-rhyhorn-70-132-1st-edition.jpeg",
          features: ["1st Edition"],
          obtained: true,
          obtainedDate: "2026-08-12",
          obtainedLocation: "Bellingham, Washington (Cardhaven Games)",
          notes: []
        }
      ]
  },

  {
    name: "Blaine's Rhyhorn",
    set: "Gym Challenge",
    number: "65 / 132",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhyhorn",
    set: "Skyridge",
    number: "91 / 144",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Team Magma's Rhyhorn",
    set: "EX Team Magma VS Team Aqua",
    number: "38 / 95",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Team Magma's Rhyhorn",
    set: "EX Team Magma VS Team Aqua",
    number: "67 / 95",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Team Magma's Rhyhorn",
    set: "EX Team Magma VS Team Aqua",
    number: "68 / 95",
    image: "/images/pokemon/rhyhorn-rhydon/team-magmas-rhyhorn-68-95.jpeg",
    obtained: true,
    obtainedDate: "2025-08-05",
    obtainedLocation: "Online (Cardhaven Games),
    features: [],
    notes: []
  },

  {
    name: "Rhyhorn",
    set: "EX Hidden Legends",
    number: "70 / 101",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhyhorn",
    set: "EX Emerald",
    number: "62 / 106",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhyhorn",
    set: "Diamond and Pearl",
    number: "95 / 130",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhyhorn",
    set: "Supreme Victors",
    number: "122 / 147",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhyhorn",
    set: "X Y",
    number: "60 / 146",
    image: "/images/pokemon/rhyhorn-rhydon/rhyhorn-60-146.jpeg",
    obtained: true,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhyhorn",
    set: "Primal Clash",
    number: "74 / 160",
    image: "/images/pokemon/rhyhorn-rhydon/rhyhorn-74-160.jpeg",
    obtained: true,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhyhorn",
    set: "Generations",
    number: "49 / 83",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhyhorn",
    set: "Burning Shadows",
    number: "65 / 147",
    image: "/images/pokemon/rhyhorn-rhydon/rhyhorn-65-147.jpeg",
    obtained: true,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhyhorn",
    set: "Unbroken Bonds",
    number: "92 / 214",
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
          image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhyhorn-92-214-reverse-holo.jpeg",
          features: ["Reverse Holo"],
          obtained: true,
          obtainedDate: null,
          obtainedLocation: null,
          notes: []
        }
      ]
  },

  {
    name: "Rhyhorn",
    set: "Unbroken Bonds",
    number: "93 / 214",
    image: null,
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhyhorn",
    set: "Sword Shield",
    number: "96 / 202",
    image: "/images/pokemon/rhyhorn-rhydon/rhyhorn-96-202.jpeg",
    obtained: true,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhyhorn",
    set: "Sword Shield",
    number: "97 / 202",
    image: "/images/pokemon/rhyhorn-rhydon/rhyhorn-97-202.jpeg",
    obtained: true,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhyhorn",
    set: "Lost Origin",
    number: "89 / 196",
    image: "/images/pokemon/rhyhorn-rhydon/rhyhorn-89-196.jpeg",
    obtained: true,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhyhorn",
    set: "151",
    number: "111 / 165",
    variants: [
        {
          type: "Standard",
          image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhyhorn-111-165.jpeg",
          features: [],
          obtained: true,
          obtainedDate: null,
          obtainedLocation: null,
          notes: []
        },
        {
          type: "Reverse Holo",
          image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhyhorn-111-165-reverse-holo.jpeg",
          features: ["Reverse Holo"],
          obtained: true,
          obtainedDate: null,
          obtainedLocation: null,
          notes: []
        }
      ]
  },

  {
    name: "Rhyhorn",
    set: "Stellar Crown",
    number: "74 / 142",
    image: "/images/pokemon/rhyhorn-rhydon/rhyhorn-74-142.jpeg",
    obtained: true,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  }

];


const rhydonCards = [

  {
    name: "Rhydon",
    set: "Jungle",
    number: "45 / 64",
    variants: [
        {
          type: "Standard",
          image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhydon-45-64.jpeg",
          features: [],
          obtained: true,
          obtainedDate: null,
          obtainedLocation: null,
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
    name: "Rhydon",
    set: "Base Set 2",
    number: "59 / 130",
    image: "/images/pokemon/rhyhorn-rhydon/rhydon-59-130.jpeg",
    obtained: true,
    obtainedDate: "2025-08-05",
    obtainedLocation: "Online (Cardhaven Games)",
    features: [],
    notes: []
  },
  
  {
    name: "Brock's Rhydon",
    set: "Gym Heroes",
    number: "2 / 132",
    image: "/images/pokemon/rhyhorn-rhydon/brocks-rhydon-2-132.jpeg",
    obtained: true,
    obtainedDate: null,
    obtainedLocation: "Bellingham, Washington (Cardhaven Games)",
    features: [],
    notes: []
  },

  {
    name: "Rhydon",
    set: "Vending Machine Set 3",
    number: "No Number",
    image: "/images/pokemon/rhyhorn-rhydon/vending-machine-set-3-031.jpeg",
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Chuck's Rhydon",
    set: "VS",
    number: "35 / 141",
    image: "/images/pokemon/rhyhorn-rhydon/vs-035.jpeg",
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhydon",
    set: "Skyridge",
    number: "29 / 144",
    image: "/images/pokemon/rhyhorn-rhydon/skyridge-029.jpeg",
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Team Magma's Rhydon",
    set: "EX Team Magma VS Team Aqua",
    number: "11 / 95",
    image: "/images/pokemon/rhyhorn-rhydon/team-magmas-rhydon-11-95.jpeg",
    obtained: true,
    obtainedDate: "2026-08-12",
    obtainedLocation: "Bellingham, Washington (Cardhaven Games)",
    features: [],
    notes: ["My copy is in pretty rough shape. If I happen to find one in better condition, I'll have to jump on it."]
  },

  {
    name: "Team Magma's Rhydon",
    set: "EX Team Magma VS Team Aqua",
    number: "22 / 95",
    image: "/images/pokemon/rhyhorn-rhydon/ex-team-magma-vs-team-aqua-022.jpeg",
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhydon",
    set: "EX Hidden Legends",
    number: "46 / 101",
    image: "/images/pokemon/rhyhorn-rhydon/ex-hidden-legends-046.jpeg",
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhydon",
    set: "EX Emerald",
    number: "19 / 106",
    image: "/images/pokemon/rhyhorn-rhydon/ex-emerald-019.jpeg",
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhydon",
    set: "Diamond and Pearl",
    number: "60 / 130",
    image: "/images/pokemon/rhyhorn-rhydon/rhydon-60-130.jpeg",
    obtained: true,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhydon",
    set: "Supreme Victors",
    number: "80 / 147",
    image: "/images/pokemon/rhyhorn-rhydon/supreme-victors-080.jpeg",
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhydon",
    set: "X Y",
    number: "61 / 146",
    image: "/images/pokemon/rhyhorn-rhydon/xy-061.jpeg",
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhydon",
    set: "Primal Clash",
    number: "75 / 160",
    image: "/images/pokemon/rhyhorn-rhydon/primal-clash-075.jpeg",
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhydon",
    set: "XY Promo",
    number: "113 / XY-P",
    image: "/images/pokemon/rhyhorn-rhydon/xy-promo-113.jpeg",
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhydon",
    set: "Burning Shadows",
    number: "66 / 147",
    image: "/images/pokemon/rhyhorn-rhydon/rhydon-66-147.jpeg",
    obtained: true,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhydon",
    set: "Unbroken Bonds",
    number: "94 / 214",
    image: "/images/pokemon/rhyhorn-rhydon/unbroken-bonds-094.jpeg",
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhydon",
    set: "Sword Shield",
    number: "98 / 202",
    image: "/images/pokemon/rhyhorn-rhydon/rhydon-98-202.jpeg",
    obtained: true,
    obtainedDate: "2026-08-11",
    obtainedLocation: "Lynden, Washington (Gems & Games)",
    features: [],
    notes: []
  },

  {
    name: "Rhydon",
    set: "Lost Origin",
    number: "90 / 196",
    image: "/images/pokemon/rhyhorn-rhydon/rhydon-90=196.jpeg",
    obtained: true,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhydon",
    set: "151",
    number: "112 / 165",
    image: "/images/pokemon/rhyhorn-rhydon/rhydon-112-165.jpeg",
    obtained: true,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  },

  {
    name: "Rhydon",
    set: "Stellar Crown",
    number: "75 / 142",
    image: "/images/pokemon/rhyhorn-rhydon/stellar-crown-075.jpeg",
    obtained: false,
    obtainedDate: null,
    obtainedLocation: null,
    features: [],
    notes: []
  }

];


/* ====================================
   Render Individual Card
   ==================================== */

function renderCard(card) {

  const cardElement = document.createElement("article");

  cardElement.className =
    `tcg-card ${card.obtained ? "obtained" : "not-obtained"}`;


  const statusText =
    card.obtained
      ? "✓ Obtained"
      : "○ Still Chasing";


  const statusClass =
    card.obtained
      ? "status-obtained"
      : "status-not-obtained";


  /* ------------------------------------
     Acquisition Information
     ------------------------------------ */

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


  /* ------------------------------------
     Features
     ------------------------------------ */

  let featuresHTML = "";

  if (card.features && card.features.length > 0) {

    featuresHTML = `
      <div class="card-features">

        <p class="features-label">
          Features:
        </p>

        <ul class="features-list">

          ${card.features
            .map(feature => `<li>${feature}</li>`)
            .join("")}

        </ul>

      </div>
    `;
  }


  /* ------------------------------------
     Notes
     ------------------------------------ */

  let notesHTML = "";

  if (card.notes && card.notes.length > 0) {

    notesHTML = `
      <div class="card-notes">

        <p class="notes-label">
          Notes:
        </p>

        <ul class="notes-list">

          ${card.notes
            .map(note => `<li>${note}</li>`)
            .join("")}

        </ul>

      </div>
    `;
  }


  /* ------------------------------------
     Card HTML
     ------------------------------------ */

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
        style="display: none;"
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


      <span class="ownership-status ${statusClass}">
        ${statusText}
      </span>


      ${acquisitionHTML}

      ${featuresHTML}

      ${notesHTML}

    </div>

  `;


  return cardElement;
}


/* ====================================
   Render Collection
   ==================================== */

function renderCollection() {

  const rhyhornGrid =
    document.getElementById("rhyhorn-grid");

  const rhydonGrid =
    document.getElementById("rhydon-grid");


  rhyhornGrid.innerHTML = "";
  rhydonGrid.innerHTML = "";


  /* ------------------------------------
     Render Rhyhorn
     ------------------------------------ */

  rhyhornCards.forEach((card) => {

    rhyhornGrid.appendChild(
      renderCard(card)
    );

  });


  /* ------------------------------------
     Render Rhydon
     ------------------------------------ */

  rhydonCards.forEach((card) => {

    rhydonGrid.appendChild(
      renderCard(card)
    );

  });


  /* ------------------------------------
     Collection Statistics
     ------------------------------------ */

  const allCards = [
    ...rhyhornCards,
    ...rhydonCards
  ];


  const totalCount =
    allCards.length;


  const obtainedCount =
    allCards.filter(card => card.obtained).length;


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
  ).textContent =
    totalCount;


  document.getElementById(
    "obtained-cards"
  ).textContent =
    obtainedCount;


  document.getElementById(
    "remaining-cards"
  ).textContent =
    remainingCount;


  document.getElementById(
    "completion-percent"
  ).textContent =
    `${completion}%`;

}


/* ====================================
   Start Page
   ==================================== */

document.addEventListener(
  "DOMContentLoaded",
  renderCollection
);
