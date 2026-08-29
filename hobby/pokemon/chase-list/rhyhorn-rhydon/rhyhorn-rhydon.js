"use strict";

/*
 * Rhyhorn & Rhydon Collection Data
 * ==================================
 * See /scripts/hobby/pokemon/chase-list/chase-list-common.js for the
 * card/variant shape and field descriptions.
 *
 * This page tracks two species, so it uses two grids that share one
 * set of overall stats - see the "groups" array passed below.
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
        obtained: true,
        obtainedDate: null,
        obtainedLocation: "Lynden, Washington (Gems & Games)",
        features: [],
        notes: []
      },
      {
        type: "1st Edition",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhyhorn-61-64-1st-edition.jpeg",
        obtained: true,
        obtainedDate: "2025-08-05",
        obtainedLocation: "Online (Cardhaven Games)",
        features: ["1st Edition"],
        notes: []
      }
    ]
  },

  {
    name: "Rhyhorn",
    set: "Base Set 2",
    number: "90 / 130",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhyhorn-90-130.jpeg",
        obtained: true,
        obtainedDate: "2025-08-05",
        obtainedLocation: "Online (Cardhaven Games)",
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Brock's Rhyhorn",
    set: "Gym Heroes",
    number: "22 / 132",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/brocks-rhyhorn-22-132.jpeg",
        obtained: true,
        obtainedDate: "2025-08-05",
        obtainedLocation: "Online (Cardhaven Games)",
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Brock's Rhyhorn",
    set: "Gym Heroes",
    number: "70 / 132",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/brocks-rhyhorn-70-132.jpeg",
        obtained: true,
        obtainedDate: "2026-08-12",
        obtainedLocation: "Bellingham, Washington (Cardhaven Games)",
        features: [],
        notes: []
      },
      {
        type: "1st Edition",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/brocks-rhyhorn-70-132-1st-edition.jpeg",
        obtained: true,
        obtainedDate: "2026-08-12",
        obtainedLocation: "Bellingham, Washington (Cardhaven Games)",
        features: ["1st Edition"],
        notes: []
      }
    ]
  },

  {
    name: "Blaine's Rhyhorn",
    set: "Gym Challenge",
    number: "65 / 132",
    variants: [
      {
        type: "Standard",
        image: null,
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhyhorn",
    set: "Skyridge",
    number: "91 / 144",
    variants: [
      {
        type: "Standard",
        image: null,
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Team Magma's Rhyhorn",
    set: "EX Team Magma VS Team Aqua",
    number: "38 / 95",
    variants: [
      {
        type: "Standard",
        image: null,
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Team Magma's Rhyhorn",
    set: "EX Team Magma VS Team Aqua",
    number: "67 / 95",
    variants: [
      {
        type: "Standard",
        image: null,
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Team Magma's Rhyhorn",
    set: "EX Team Magma VS Team Aqua",
    number: "68 / 95",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/team-magmas-rhyhorn-68-95.jpeg",
        obtained: true,
        obtainedDate: "2025-08-05",
        obtainedLocation: "Online (Cardhaven Games)",
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhyhorn",
    set: "EX Hidden Legends",
    number: "70 / 101",
    variants: [
      {
        type: "Standard",
        image: null,
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhyhorn",
    set: "EX Emerald",
    number: "62 / 106",
    variants: [
      {
        type: "Standard",
        image: null,
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhyhorn",
    set: "Diamond and Pearl",
    number: "95 / 130",
    variants: [
      {
        type: "Standard",
        image: null,
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhyhorn",
    set: "Supreme Victors",
    number: "122 / 147",
    variants: [
      {
        type: "Standard",
        image: null,
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhyhorn",
    set: "X Y",
    number: "60 / 146",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhyhorn-60-146.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhyhorn",
    set: "Primal Clash",
    number: "74 / 160",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhyhorn-74-160.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhyhorn",
    set: "Generations",
    number: "49 / 83",
    variants: [
      {
        type: "Standard",
        image: null,
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhyhorn",
    set: "Burning Shadows",
    number: "65 / 147",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhyhorn-65-147.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhyhorn",
    set: "Unbroken Bonds",
    number: "92 / 214",
    variants: [
      {
        type: "Standard",
        image: null,
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      },
      {
        type: "Reverse Holo",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhyhorn-92-214-reverse-holo.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: ["Reverse Holo"],
        notes: []
      }
    ]
  },

  {
    name: "Rhyhorn",
    set: "Unbroken Bonds",
    number: "93 / 214",
    variants: [
      {
        type: "Standard",
        image: null,
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhyhorn",
    set: "Sword Shield",
    number: "96 / 202",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhyhorn-96-202.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhyhorn",
    set: "Sword Shield",
    number: "97 / 202",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhyhorn-97-202.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhyhorn",
    set: "Lost Origin",
    number: "89 / 196",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhyhorn-89-196.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhyhorn",
    set: "151",
    number: "111 / 165",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhyhorn-111-165.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      },
      {
        type: "Reverse Holo",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhyhorn-111-165-reverse-holo.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: ["Reverse Holo"],
        notes: []
      }
    ]
  },

  {
    name: "Rhyhorn",
    set: "Stellar Crown",
    number: "74 / 142",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhyhorn-74-142.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
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
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      },
      {
        type: "1st Edition",
        image: null,
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: ["1st Edition"],
        notes: []
      }
    ]
  },

  {
    name: "Rhydon",
    set: "Base Set 2",
    number: "59 / 130",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhydon-59-130.jpeg",
        obtained: true,
        obtainedDate: "2025-08-05",
        obtainedLocation: "Online (Cardhaven Games)",
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Brock's Rhydon",
    set: "Gym Heroes",
    number: "2 / 132",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/brocks-rhydon-2-132.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: "Bellingham, Washington (Cardhaven Games)",
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhydon",
    set: "Vending Machine Set 3",
    number: "No Number",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/vending-machine-set-3-031.jpeg",
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Chuck's Rhydon",
    set: "VS",
    number: "35 / 141",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/vs-035.jpeg",
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhydon",
    set: "Skyridge",
    number: "29 / 144",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/skyridge-029.jpeg",
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Team Magma's Rhydon",
    set: "EX Team Magma VS Team Aqua",
    number: "11 / 95",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/team-magmas-rhydon-11-95.jpeg",
        obtained: true,
        obtainedDate: "2026-08-12",
        obtainedLocation: "Bellingham, Washington (Cardhaven Games)",
        features: [],
        notes: ["My copy is in pretty rough shape. If I happen to find one in better condition, I'll have to jump on it."]
      }
    ]
  },

  {
    name: "Team Magma's Rhydon",
    set: "EX Team Magma VS Team Aqua",
    number: "22 / 95",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/ex-team-magma-vs-team-aqua-022.jpeg",
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhydon",
    set: "EX Hidden Legends",
    number: "46 / 101",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/ex-hidden-legends-046.jpeg",
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhydon",
    set: "EX Emerald",
    number: "19 / 106",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/ex-emerald-019.jpeg",
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhydon",
    set: "Diamond and Pearl",
    number: "60 / 130",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhydon-60-130.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhydon",
    set: "Supreme Victors",
    number: "80 / 147",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/supreme-victors-080.jpeg",
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhydon",
    set: "X Y",
    number: "61 / 146",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/xy-061.jpeg",
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhydon",
    set: "Primal Clash",
    number: "75 / 160",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/primal-clash-075.jpeg",
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhydon",
    set: "XY Promo",
    number: "113 / XY-P",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/xy-promo-113.jpeg",
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhydon",
    set: "Burning Shadows",
    number: "66 / 147",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhydon-66-147.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhydon",
    set: "Unbroken Bonds",
    number: "94 / 214",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/unbroken-bonds-094.jpeg",
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhydon",
    set: "Sword Shield",
    number: "98 / 202",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhydon-98-202.jpeg",
        obtained: true,
        obtainedDate: "2026-08-11",
        obtainedLocation: "Lynden, Washington (Gems & Games)",
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhydon",
    set: "Lost Origin",
    number: "90 / 196",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhydon-90=196.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhydon",
    set: "151",
    number: "112 / 165",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/rhydon-112-165.jpeg",
        obtained: true,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  },

  {
    name: "Rhydon",
    set: "Stellar Crown",
    number: "75 / 142",
    variants: [
      {
        type: "Standard",
        image: "/images/pokemon/chase-list/rhyhorn-rhydon/stellar-crown-075.jpeg",
        obtained: false,
        obtainedDate: null,
        obtainedLocation: null,
        features: [],
        notes: []
      }
    ]
  }

];


/* ====================================
   Start Page
   ==================================== */

document.addEventListener("DOMContentLoaded", () => {

  renderChaseListPage({

    groups: [
      { gridId: "rhyhorn-grid", cards: rhyhornCards },
      { gridId: "rhydon-grid", cards: rhydonCards }
    ],

    statsIds: {
      total: "total-cards",
      obtained: "obtained-cards",
      remaining: "remaining-cards",
      percent: "completion-percent"
    },

    filterId: "collection-filter"

  });

});
