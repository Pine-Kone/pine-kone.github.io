// Portfolio page data. Each item is tagged with the tool(s) it used so the
// page can filter by tool. Add new projects here as they're ready.

const PORTFOLIO_TOOLS = ["Apple Shortcuts", "Power BI", "SQL", "JavaScript", "Excel", "HTML/CSS"];

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
    section: "Professional Projects",
    title: "Arrival Time Shortcut",
    description: "An iOS Shortcut that logs when I arrive at work, helping me keep my timecard clean and accurate.",
    tools: ["Apple Shortcuts"],
    link: "/hobby/shortcuts/",
    status: "live",
  },
  {
    section: "School Projects",
    title: "Insanity Calorie Calculator",
    description: "A calculator built to estimate calorie burn for Insanity workout sessions.",
    tools: ["JavaScript", "HTML/CSS"],
    link: null,
    status: "coming-soon",
  },
  {
    section: "School Projects",
    title: "Is My Social Security Taxable?",
    description: "A calculator that walks through IRS rules to estimate how much of a person's Social Security benefits are taxable.",
    tools: ["JavaScript", "HTML/CSS"],
    link: null,
    status: "coming-soon",
  },
  {
    section: "School Projects",
    title: "Excel Formulas Demo",
    description: "A spreadsheet demonstrating a number of useful Excel formulas in action.",
    tools: ["Excel"],
    link: null,
    status: "coming-soon",
  },
  {
    section: "Data & Analytics",
    title: "CPA Study Tracker",
    description: "A Power BI report tracking my CPA exam study progress. Also featured on my CPA Exam Journey page.",
    tools: ["Power BI"],
    link: "/portfolio/cpa-exam-journey/",
    status: "live",
  },
  {
    section: "Data & Analytics",
    title: "Atlas Earth SQL Dataset",
    description: "A SQL dataset built around my Atlas Earth activity. Also featured on my Atlas Earth page.",
    tools: ["SQL"],
    link: "/hobby/atlas-earth/",
    status: "coming-soon",
  },
  {
    section: "Data & Analytics",
    title: "Atlas Earth Power BI Report",
    description: "A Power BI report visualizing my Atlas Earth data. Also featured on my Atlas Earth page.",
    tools: ["Power BI"],
    link: "/hobby/atlas-earth/",
    status: "coming-soon",
  },
  {
    section: "Code Snippets",
    title: "Roman Numerals Converter",
    description: "Converts an entered number into its Roman numeral equivalent.",
    tools: ["JavaScript"],
    link: "/hobby/code-snippets/roman_numerals.html",
    status: "live",
  },
  {
    section: "Code Snippets",
    title: "Team Recommendations",
    description: "Calculates how many teams (and leftover members) result from splitting a group of students.",
    tools: ["JavaScript"],
    link: "/hobby/code-snippets/items_per_group.html",
    status: "live",
  },
  {
    section: "Code Snippets",
    title: "Runaway Button",
    description: "A playful button that dodges your cursor or tap whenever you try to click it.",
    tools: ["JavaScript", "HTML/CSS"],
    link: "/hobby/code-snippets/runaway_button.html",
    status: "live",
  },
];
