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
    link: "/career/projects/excel/insanity-calorie-calculator/",
    status: "live",
    image: null,
  },
  {
    sections: ["Microsoft Office Projects"],
    title: "Is My Social Security Taxable?",
    description: "An Excel spreadsheet that walks through IRS rules to estimate how much of a person's Social Security benefits are taxable.",
    tools: ["Excel"],
    link: "/career/projects/excel/social-security-taxable-calculator/",
    status: "live",
    image: null,
  },
  {
    sections: ["Microsoft Office Projects"],
    title: "Excel Formulas Demo",
    description: "A spreadsheet demonstrating a number of useful Excel formulas in action.",
    tools: ["Excel"],
    link: "/career/projects/excel/excel-formulas-demo/",
    status: "live",
    image: null,
  },
  {
    sections: ["Code Snippets"],
    title: "Roman Numerals Converter",
    description: "Converts a number entered that is less than 4000 to its Roman numeral equivalent.",
    tools: ["JavaScript"],
    link: "/career/code-snippets/roman-numerals.html",
    status: "live",
    image: null,
  },
  {
    sections: ["Code Snippets"],
    title: "Items per Group Calculator",
    description: "Calculates how many groups (and leftover members) result from splitting a set of items as evenly as possible.",
    tools: ["JavaScript"],
    link: "/career/code-snippets/items-per-group.html",
    status: "live",
    image: null,
  },
  {
    sections: ["Code Snippets"],
    title: "Runaway Button",
    description: "A playful button that dodges your cursor or tap whenever you try to click it.",
    tools: ["JavaScript", "HTML/CSS"],
    link: "/career/code-snippets/runaway-button.html",
    status: "live",
    image: null,
  },
  {
    sections: ["Shortcuts"],
    subsection: "Professional",
    title: "Arrival Time",
    description: "Fires automatically when I arrive at one of three work locations and emails myself the time and city, so I can keep my timecard honest.",
    tools: ["Apple Shortcuts"],
    link: "/career/shortcuts/arrival-time/",
    status: "live",
    image: null,
  },
  {
    sections: ["Shortcuts"],
    subsection: "Professional",
    title: "Get Details of Locations",
    description: "The companion shortcut that pinpoints a location for Arrival Time to log.",
    tools: ["Apple Shortcuts"],
    link: "/career/shortcuts/get-details-of-locations/",
    status: "live",
    image: null,
  },
  {
    sections: ["Shortcuts"],
    subsection: "Professional",
    title: "YouTube Sentinel",
    description: "Blocks Facebook, YouTube, X, and Instagram from opening - built to keep me focused during CPA study sessions.",
    tools: ["Apple Shortcuts"],
    link: "/career/shortcuts/youtube-sentinel/",
    status: "live",
    image: null,
  },
  {
    sections: ["Shortcuts"],
    subsection: "Professional",
    title: "When \"Messenger\" Is Opened",
    description: "Closes Facebook Messenger if it ever navigates to a Facebook link - a companion guardrail to YouTube Sentinel.",
    tools: ["Apple Shortcuts"],
    link: "/career/shortcuts/when-messenger-is-opened/",
    status: "live",
    image: null,
  },
  {
    sections: ["Shortcuts"],
    subsection: "Personal",
    title: "Log Your Calories",
    description: "Piggybacks on my Atlas Earth habit to remind me - and get me straight into my calorie-logging app - if I haven't logged food yet today.",
    tools: ["Apple Shortcuts"],
    link: "/career/shortcuts/log-your-calories/",
    status: "live",
    image: null,
  },
  {
    sections: ["Shortcuts"],
    subsection: "Personal",
    title: "Quote-o-the Day",
    description: "Forwards my dad's daily quote to a few friends, and quietly tracks the days he forgets to send one.",
    tools: ["Apple Shortcuts"],
    link: "/career/shortcuts/quote-o-the-day/",
    status: "live",
    image: null,
  },
  {
    sections: ["Shortcuts"],
    subsection: "Personal",
    title: "Random Dad Joke",
    description: "Runs at 2 a.m. every night and texts my wife a random dad joke from icanhazdadjoke.com, just for fun.",
    tools: ["Apple Shortcuts"],
    link: "/career/shortcuts/random-dad-joke/",
    status: "live",
    image: null,
  },
  { sections: ["Shortcuts"], subsection: "Personal", title: "Regenerate Hamstring Timer", description: "Rebuilds my chiropractor-prescribed stretch timer in Just Timers with one tap - plain or with a 3-2-1 countdown first.", tools: ["Apple Shortcuts"], link: "/career/shortcuts/regenerate-hamstring-timer/", status: "live", image: null, },
  {
    sections: ["Shortcuts"],
    subsection: "Personal",
    title: "Assistive Touch Assistant",
    description: "A double-click AssistiveTouch trigger for quick helper actions - right now, mostly setting reminders to check back in on Atlas Earth.",
    tools: ["Apple Shortcuts"],
    link: "/career/shortcuts/assistive-touch-assistant/",
    status: "live",
    image: null,
  },
];
