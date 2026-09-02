// Portfolio page data. Each item is tagged with the tool(s) it used so the
// page can filter by tool.
//
// SECTIONS: the first entry in "sections" is where the card physically
// displays (its primary home). Any additional entries are used for grouping
// only - they are not displayed as a label on the card.
//
// SUBSECTION: optional. When set, items within a section are further
// grouped under a smaller sub-heading (e.g. Shortcuts -> Professional /
// Personal). Items without a subsection just render directly under the
// main section heading.
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
    sections: ["Microsoft Office Projects"],
    title: "Insanity Calorie Calculator",
    description: "An Excel spreadsheet built to estimate calorie burn for Insanity workout sessions.",
    tools: ["Excel"],
    link: "/portfolio/projects/excel/insanity-calorie-calculator/",
    status: "live",
    image: null,
  },
  {
    sections: ["Microsoft Office Projects"],
    title: "Is My Social Security Taxable?",
    description: "An Excel spreadsheet that walks through IRS rules to estimate how much of a person's Social Security benefits are taxable.",
    tools: ["Excel"],
    link: "/portfolio/projects/excel/social-security-taxable-calculator/",
    status: "live",
    image: null,
  },
  {
    sections: ["Microsoft Office Projects"],
    title: "Excel Formulas Demo",
    description: "A spreadsheet demonstrating a number of useful Excel formulas in action.",
    tools: ["Excel"],
    link: "/portfolio/projects/excel/excel-formulas-demo/",
    status: "live",
    image: null,
  },
  {
    sections: ["Code Snippets"],
    title: "Roman Numerals Converter",
    description: "Converts a number entered that is less than 4000 to its Roman numeral equivalent.",
    tools: ["JavaScript"],
    link: "/hobby/code-snippets/roman_numerals.html",
    status: "live",
    image: null,
  },
  {
    sections: ["Code Snippets"],
    title: "Items per Group Calculator",
    description: "Calculates how many groups (and leftover members) result from splitting a set of items as evenly as possible.",
    tools: ["JavaScript"],
    link: "/hobby/code-snippets/items_per_group.html",
    status: "live",
    image: null,
  },
  {
    sections: ["Code Snippets"],
    title: "Runaway Button",
    description: "A playful button that dodges your cursor or tap whenever you try to click it.",
    tools: ["JavaScript", "HTML/CSS"],
    link: "/hobby/code-snippets/runaway_button.html",
    status: "live",
    image: null,
  },
  {
    sections: ["Shortcuts"],
    subsection: "Professional",
    title: "Arrival Time",
    description: "Logs when I arrive at work, helping me keep my timecard clean and accurate.",
    tools: ["Apple Shortcuts"],
    link: "/hobby/shortcuts/arrival-time/",
    status: "live",
    image: null,
  },
  {
    sections: ["Shortcuts"],
    subsection: "Professional",
    title: "Get Details of Locations",
    description: "Pulls up quick details for a given location.",
    tools: ["Apple Shortcuts"],
    link: "/hobby/shortcuts/get-details-of-locations/",
    status: "live",
    image: null,
  },
  {
    sections: ["Shortcuts"],
    subsection: "Professional",
    title: "YouTube Sentinel",
    description: "CPA-study related shortcut for keeping tabs on relevant YouTube content.",
    tools: ["Apple Shortcuts"],
    link: "/hobby/shortcuts/youtube-sentinel/",
    status: "live",
    image: null,
  },
  {
    sections: ["Shortcuts"],
    subsection: "Professional",
    title: "When \\"Messenger\\" Is Opened",
    description: "CPA-study related automation triggered by opening Messenger.",
    tools: ["Apple Shortcuts"],
    link: "/hobby/shortcuts/when-messenger-is-opened/",
    status: "live",
    image: null,
  },
  {
    sections: ["Shortcuts"],
    subsection: "Personal",
    title: "Log Your Calories",
    description: "Quick logging for daily calorie tracking.",
    tools: ["Apple Shortcuts"],
    link: "/hobby/shortcuts/log-your-calories/",
    status: "live",
    image: null,
  },
  {
    sections: ["Shortcuts"],
    subsection: "Personal",
    title: "Quote-o-the Day",
    description: "Delivers a quote of the day.",
    tools: ["Apple Shortcuts"],
    link: "/hobby/shortcuts/quote-o-the-day/",
    status: "live",
    image: null,
  },
  {
    sections: ["Shortcuts"],
    subsection: "Personal",
    title: "Random Dad Joke",
    description: "Delivers a random dad joke on demand.",
    tools: ["Apple Shortcuts"],
    link: "/hobby/shortcuts/random-dad-joke/",
    status: "live",
    image: null,
  },
  {
    sections: ["Shortcuts"],
    subsection: "Personal",
    title: "Regenerate Hamstring Timer",
    description: "A recurring timer to support hamstring stretching/rehab.",
    tools: ["Apple Shortcuts"],
    link: "/hobby/shortcuts/regenerate-hamstring-timer/",
    status: "live",
    image: null,
  },
  {
    sections: ["Shortcuts"],
    subsection: "Personal",
    title: "Regenerate Hamstring Timer w/Countdown",
    description: "Same as the Hamstring Timer, with a visible countdown.",
    tools: ["Apple Shortcuts"],
    link: "/hobby/shortcuts/regenerate-hamstring-timer-with-countdown/",
    status: "live",
    image: null,
  },
  {
    sections: ["Shortcuts"],
    subsection: "Personal",
    title: "Assistive Touch Assistant",
    description: "A general-purpose helper shortcut spanning multiple personal-vision categories.",
    tools: ["Apple Shortcuts"],
    link: "/hobby/shortcuts/assistive-touch-assistant/",
    status: "live",
    image: null,
  },
];
