// Portfolio page data. Each item is tagged with the tool(s) it used so the
// page can filter by tool.
//
// SECTIONS: the first entry in "sections" is where the card physically
// displays (its primary home). Any additional entries are used for grouping
// only - they are not displayed as a label on the card.
//
// IMAGE: "image" is optional. Set it to an image path for a blog-style
// thumbnail at the top of the card, or leave it null/omit it entirely for a
// plain text card - no broken image, no reserved empty space either way.

const PORTFOLIO_TOOLS = ["Power BI", "SQL", "Excel", "JavaScript", "HTML/CSS", "Apple Shortcuts"];

const PORTFOLIO_TOOL_ICONS = {
  "Apple Shortcuts": "\ud83d\udcf1",
  "Power BI": "\ud83d\udcca",
  "SQL": "\ud83d\uddc4\ufe0f",
  "JavaScript": "\ud83d\udfe8",
  "Excel": "\ud83d\udcd7",
  "HTML/CSS": "\ud83c\udf10",
};

const PORTFOLIO_ITEMS = [
  {
    sections: ["Data Projects"],
    title: "CPA Study Tracker",
    description: "A Power BI report tracking my CPA exam study progress.",
    tools: ["Power BI"],
    link: null,
    status: "coming-soon",
    image: null,
  },
  {
    sections: ["Data Projects"],
    title: "Atlas Earth Dataset & Power BI Report",
    description: "A SQL dataset and Power BI report built around my Atlas Earth activity. Also featured on my Atlas Earth page.",
    tools: ["SQL", "Power BI"],
    link: "/hobby/atlas-earth/",
    status: "live",
    image: null,
  },
  {
    sections: ["Code Snippets", "School Projects"],
    title: "Roman Numerals Converter",
    description: "Converts a number entered that is less than 4000 to its Roman numeral equivalent.",
    tools: ["JavaScript"],
    link: "/hobby/code-snippets/roman_numerals.html",
    status: "live",
    image: null,
  },
  {
    sections: ["Code Snippets", "School Projects"],
    title: "Items per Group Calculator",
    description: "Calculates how many groups (and leftover members) result from splitting a set of items as evenly as possible.",
    tools: ["JavaScript"],
    link: "/hobby/code-snippets/items_per_group.html",
    status: "live",
    image: null,
  },
  {
    sections: ["Code Snippets", "School Projects"],
    title: "Runaway Button",
    description: "A playful button that dodges your cursor or tap whenever you try to click it.",
    tools: ["JavaScript", "HTML/CSS"],
    link: "/hobby/code-snippets/runaway_button.html",
    status: "live",
    image: null,
  },
  {
    sections: ["Professional Projects"],
    title: "Arrival Time Shortcut",
    description: "An iOS Shortcut that logs when I arrive at work, helping me keep my timecard clean and accurate.",
    tools: ["Apple Shortcuts"],
    link: "/hobby/shortcuts/",
    status: "live",
    image: null,
  },
  {
    sections: ["School Projects"],
    title: "Insanity Calorie Calculator",
    description: "An Excel spreadsheet built to estimate calorie burn for Insanity workout sessions.",
    tools: ["Excel"],
    link: "/portfolio/projects/excel/insanity-calorie-calculator/",
    status: "live",
    image: null,
  },
  {
    sections: ["School Projects"],
    title: "Is My Social Security Taxable?",
    description: "An Excel spreadsheet that walks through IRS rules to estimate how much of a person's Social Security benefits are taxable.",
    tools: ["Excel"],
    link: "/portfolio/projects/excel/social-security-taxable-calculator/",
    status: "live",
    image: null,
  },
  {
    sections: ["School Projects"],
    title: "Excel Formulas Demo",
    description: "A spreadsheet demonstrating a number of useful Excel formulas in action.",
    tools: ["Excel"],
    link: "/portfolio/projects/excel/excel-formulas-demo/",
    status: "live",
    image: null,
  },
];
