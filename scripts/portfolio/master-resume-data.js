// Master Resume data. Each bullet is tagged with the skill categories it
// belongs to (a bullet can belong to more than one). Add new employers or
// bullets here - the page and its filter/rank tool read this file directly.
//
// STRUCTURE: one entry per EMPLOYER, not per role. Each employer carries a
// `roles` array so a title progression at one company stays a single block
// with the logo shown once and no bullet text duplicated.
//
//   roles: [{ title, altTitle?, dateRange }]  - list most recent first.
//   altTitle is for companies whose internal job titles don't read clearly
//   to outside recruiters; it renders as "Real Title (Plain-English Title)".
//
// BULLET SCOPE: a bullet with no `roles` key applies to the whole tenure at
// that employer and renders once in a shared list. A bullet with
// `roles: ["Some Title"]` belongs only to those roles and renders under a
// per-role subheading. Use shared bullets when the work stayed the same
// across a title change; use scoped bullets when the work actually changed.
//
// DATES: store exact start/end as { month, year }. If you only know the
// year, omit month. If a role is ongoing, use { present: true } for the
// end date. If you don't have exact dates at all, use { display: "..." }
// with whatever text you do want shown (e.g. "Sometime 2015") - it bypasses
// the month/year formatting entirely. formatResumeDateRange() below turns any
// of these into a clean "Mon. YYYY - Mon. YYYY" display string, and
// formatResumeEmployerSpan() derives the overall tenure from the roles array.
//
// UNKNOWN BOUNDARIES: when you know one end of a role but not the other -
// typically the month one title handed off to the next - omit the unknown
// side entirely rather than guessing at it. A range with only a start renders
// as "from Apr. 2015"; only an end renders as "through Aug. 2018". The
// employer's overall span still comes out right, because the missing boundary
// is covered by the neighbouring role. Mark those roles `datesPending: true`
// so they are easy to grep for once the real dates are confirmed.

const MASTER_RESUME_MONTHS = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

function formatResumeDatePart(part) {
  if (!part) return "";
  if (part.present) return "Present";
  if (part.display) return part.display;
  if (part.month) return `${MASTER_RESUME_MONTHS[part.month - 1]} ${part.year}`;
  return `${part.year}`;
}

function formatResumeDateRange(range) {
  if (!range) return "";
  const start = formatResumeDatePart(range.start);
  const end = formatResumeDatePart(range.end);
  if (start && end) return `${start} - ${end}`;
  if (start) return `from ${start}`;
  if (end) return `through ${end}`;
  return "";
}

// Sortable number for a date part, so the overall employer span can be
// derived instead of maintained by hand. Free-text { display } dates can't
// be compared, so they return null and are skipped.
function resumeDateValue(part) {
  if (!part) return null;
  if (part.present) return Number.POSITIVE_INFINITY;
  if (!part.year) return null;
  return part.year * 12 + ((part.month || 1) - 1);
}

// Earliest start and latest end across every role at an employer.
function formatResumeEmployerSpan(roles) {
  if (!roles || roles.length === 0) return "";
  if (roles.length === 1) return formatResumeDateRange(roles[0].dateRange);

  let earliestStart = null;
  let latestEnd = null;
  roles.forEach((r) => {
    const range = r.dateRange || {};
    const s = resumeDateValue(range.start);
    const e = resumeDateValue(range.end);
    if (s !== null && (earliestStart === null || s < resumeDateValue(earliestStart))) earliestStart = range.start;
    if (e !== null && (latestEnd === null || e > resumeDateValue(latestEnd))) latestEnd = range.end;
  });
  if (!earliestStart || !latestEnd) return formatResumeDateRange(roles[roles.length - 1].dateRange);
  return `${formatResumeDatePart(earliestStart)} - ${formatResumeDatePart(latestEnd)}`;
}

// Display title for a role, folding in the plain-English alternate if present.
function formatResumeRoleTitle(role) {
  if (!role) return "";
  return role.altTitle ? `${role.title} (${role.altTitle})` : role.title;
}

const MASTER_RESUME_DATA = [
  {
    section: "Work Experience",
    company: "Cooper Norman",
    logo: "/images/companies/cooper-norman-logo.png",
    website: "https://coopernorman.com",
    location: "Idaho Falls, ID",
    roles: [
      { title: "Data Analytics Manager", dateRange: { start: { month: 6, year: 2023 }, end: { present: true } } },
    ],
    bullets: [
      {
        text: "Developed data transformation process to provide account mapping solutions to convert Italian accounting data into U.S. GAAP reporting formats",
        categories: ["Accounting", "Data Analytics"],
      },
      {
        text: "Integrated data across Practice CS, GoFileRoom, ShareFile, UltraTax, RightSignature, QuickBooks Online, Jetpack Workflow and other software using Excel, Power Query, SQL, Power BI, REST APIs, Power Automate, Fivetran, and other related tools",
        categories: ["Data Analytics", "Business Intelligence"],
      },
      {
        text: "Conducted external compensation benchmarking using Bureau of Labor Statistics occupational wage data to evaluate internal salary positioning",
        categories: ["Data Analytics"],
      },
      {
        text: "Collaborated with ~20 partners and service line leads to understand needs, clarify reporting objectives, and deliver actionable insights for decision making",
        categories: ["Leadership", "Business Intelligence"],
      },
      {
        text: "Re-engineered audit project tracking dashboard by replacing inefficient full-database cross join with targeted logic and methodology, reducing refresh time from over an hour to less than a minute",
        categories: ["Data Analytics", "Business Intelligence"],
      },
      {
        text: "Led cross-functional process improvement initiatives integrating SQL, Power BI, Power Automate, and APIs for four service lines",
        categories: ["Data Analytics", "Business Intelligence"],
      },
      {
        text: "Built Power BI Paginated Reports and automated annual reporting workflows to distribute client packages to ~3,500 clients, spanning ~7,500 entities",
        categories: ["Data Analytics", "Business Intelligence"],
      },
      {
        text: "Assisted in data cleaning and data integrity of NAICS codes across ~9,000 entities",
        categories: ["Data Analytics", "Business Intelligence"],
      },
      {
        text: "Pioneered method to safely insert data into Practice CS, creating opportunity to make tens of thousands of updates to the database",
        categories: ["Data Analytics", "Business Intelligence"],
      },
      {
        text: "Developed a process to upload timecard info, joining SharePoint, Excel, PCS, and Power Automate, and ShareFile",
        categories: ["Data Analytics", "Business Intelligence"],
      },
      {
        text: "Oversaw and implemented twenty Power BI reports across four distinct service lines",
        categories: ["Data Analytics", "Business Intelligence"],
      },
      {
        text: "Reduced report processing times by 10-20 minutes each across four report processes by revising query code and eliminating unnecessary steps",
        categories: ["Data Analytics", "Business Intelligence"],
      },
      {
        text: "Utilized Power BI, Fivetran and Snowflake providing insight into key business metrics for 22 business clients, and internal usage",
        categories: ["Data Analytics", "Business Intelligence"],
      },
    ],
  },
  {
    section: "Work Experience",
    company: "Mountain View Hospital",
    logo: "/images/companies/mountain-view-hospital-logo.jpg",
    website: "https://www.mountainviewhospital.org",
    location: "Idaho Falls, ID",
    roles: [
      { title: "Data Analytics and Reporting Specialist", dateRange: { start: { month: 8, year: 2021 }, end: { month: 6, year: 2023 } } },
    ],
    bullets: [
      {
        text: "Developed recurring KPI reporting process across 29 key performance indicators using Business Objects software, supporting monthly and ad-hoc analysis for healthcare leadership",
        categories: ["Data Analytics", "Business Intelligence", "Leadership"],
      },
      {
        text: "Transformed, and modeled report data within Power BI across four dashboards published monthly to 70+ southeast Idaho clinics and hospitals for their aid in providing quality experience",
        categories: ["Data Analytics", "Business Intelligence"],
      },
      {
        text: "Coordinated with team of ~20 individuals to assess clinic needs and provide data to support informed strategies",
        categories: ["Leadership", "Data Analytics"],
      },
    ],
  },
  {
    section: "Work Experience",
    company: "Smith, Kunz & Associates",
    logo: "/images/companies/smith-kunz-logo.jpg",
    website: "https://www.smithkunz.com",
    location: "Idaho Falls, ID",
    roles: [
      { title: "Seasonal Tax Accountant", dateRange: { start: { month: 8, year: 2021 }, end: { month: 6, year: 2023 } } },
      { title: "Staff Accountant", dateRange: { start: { month: 9, year: 2019 }, end: { month: 8, year: 2021 } } },
      { title: "Tax Intern", dateRange: { start: { month: 1, year: 2016 }, end: { month: 9, year: 2019 } } },
    ],
    bullets: [
      {
        text: "Created and organized bookkeeping spreadsheets and records for small business owners, improving reporting accuracy and decision-making",
        categories: ["Accounting"],
      },
      {
        text: "Consulted with business owners of LLCs, partnerships, and S-corporations on entity structure, compliance considerations, and operational planning",
        categories: ["Taxation", "Accounting", "Leadership"],
      },
      {
        text: "Assisted individuals and small business owners with U.S. tax compliance and tax planning strategies",
        categories: ["Taxation", "Accounting"],
      },
      {
        text: "Developed foundation of financial analysis, data accuracy and regulatory compliance through preparation of individual and small business tax filings",
        categories: ["Taxation", "Accounting", "Data Analytics"],
      },
      {
        text: "Advised small business owners on IRS payroll tax regulations, filing requirements, and compliance best practices to support accurate and timely payroll reporting",
        categories: ["Taxation", "Accounting"],
      },
      {
        text: "Conducted approximately 95% of client meetings in Spanish, preparing U.S. individual income tax returns for Spanish-speaking clients",
        categories: ["Taxation", "Accounting"],
      },
      {
        text: "Prepared correspondence for taxpayers addressed to the Internal Revenue Service to resolve tax issues",
        categories: ["Taxation"],
      },
      {
        text: "Advised individual clients on the tax implications of Traditional versus Roth IRA contributions to support informed retirement savings decisions",
        categories: ["Taxation"],
      },
    ],
  },
  {
    section: "Work Experience",
    company: "Citizens Community Bank",
    logo: "/images/companies/citizens-community-bank-logo.png",
    website: "https://www.ccb-idaho.com",
    location: "Idaho Falls, ID",
    roles: [
      // Started as a Teller and moved into the accounting/data role; the month
      // of that transition still needs pinning down.
      { title: "Accounting Operations Clerk", dateRange: { end: { month: 9, year: 2019 } }, datesPending: true },
      { title: "Teller", dateRange: { start: { month: 10, year: 2018 } }, datesPending: true },
    ],
    bullets: [
      {
        text: "Programmed reports using Cognos Analytics and Excel to provide bank growth data to management",
        categories: ["Data Analytics", "Business Intelligence"],
        roles: ["Accounting Operations Clerk"],
      },
      {
        text: "Conducted market research of 20+ local banks and credit unions to help Citizens set more competitive interest rates",
        categories: ["Data Analytics"],
        roles: ["Accounting Operations Clerk"],
      },
      {
        text: "Compiled data from 14+ thousand customers to help determine potential new bank locations",
        categories: ["Data Analytics", "Business Intelligence"],
        roles: ["Accounting Operations Clerk"],
      },
      // Teller bullets to be added - see the Teller role above.
    ],
  },
  // Melaleuca is split into two entries because the two stints are separated
  // by a full-time volunteer mission (Feb. 2012 - Feb. 2014). Combining them
  // would imply eight unbroken years and would sort the 2010 role next to the
  // 2018 one.
  {
    section: "Work Experience",
    company: "Melaleuca: The Wellness Company",
    logo: "/images/companies/melaleuca-logo.png",
    website: "https://www.melaleuca.com",
    location: "Idaho Falls, ID",
    roles: [
      { title: "Hot Shot", dateRange: { start: { month: 8, year: 2018 }, end: { month: 10, year: 2018 } } },
      {
        title: "Hot Shot Coordinator",
        altTitle: "Sales Team Coordinator",
        dateRange: { end: { month: 8, year: 2018 } },
        datesPending: true,
      },
      {
        title: "U.S. Spanish & Mexico Hot Shot",
        dateRange: { start: { month: 4, year: 2015 } },
        datesPending: true,
      },
      {
        title: "U.S. Spanish & Mexico Customer Service Specialist",
        dateRange: { start: { month: 3, year: 2014 }, end: { month: 4, year: 2015 } },
      },
    ],
    // Scoping rule: Customer Service covers everything a Hot Shot does, but not
    // the reverse - so sales and enrollment work is scoped to the Hot Shot
    // roles and everything else to Customer Service. The final Hot Shot stint
    // is a wind-down of the same job and carries no separate bullets.
    bullets: [
      {
        text: "Recognized as a Top Performer within the customer service department in September 2014",
        categories: [],
        roles: ["U.S. Spanish & Mexico Customer Service Specialist"],
      },
      {
        text: "Resolved order and internet issues and placed orders for English- and Spanish-speaking customers",
        categories: [],
        roles: ["U.S. Spanish & Mexico Customer Service Specialist"],
      },
      {
        text: "Promoted customer retention through accurate information entry, client rapport, and applied knowledge of company policies",
        categories: [],
        roles: ["U.S. Spanish & Mexico Customer Service Specialist"],
      },
      {
        text: "Handled 25-75 customer calls per shift, resolving sales and enrollment requests",
        categories: [],
        roles: ["U.S. Spanish & Mexico Hot Shot"],
      },
      {
        text: "Analyzed team scorecard data in Excel to assess performance and determine strategy for team improvement",
        categories: ["Data Analytics", "Leadership"],
        roles: ["Hot Shot Coordinator"],
      },
      {
        text: "Coached a team of 7-11 representatives in world class customer service techniques through one-on-one and group training, raising the team's scorecard score from 278.42 to 380.40 (a 36.6% improvement) in six months",
        categories: ["Leadership"],
        roles: ["Hot Shot Coordinator"],
      },
      {
        text: "Trained and reviewed team member performance to ensure proper application of company policies across the U.S., Canada, and Mexico",
        categories: ["Leadership"],
        roles: ["Hot Shot Coordinator"],
      },
      {
        text: "Utilized fluency in Spanish to help team members employ company policies for the U.S., Canada, and Mexico",
        categories: ["Leadership"],
        roles: ["Hot Shot Coordinator"],
      },
    ],
  },
  {
    section: "Work Experience",
    company: "Melaleuca: The Wellness Company",
    logo: "/images/companies/melaleuca-logo.png",
    website: "https://www.melaleuca.com",
    location: "Idaho Falls, ID",
    roles: [
      { title: "Express Verification Specialist", dateRange: { start: { month: 8, year: 2010 }, end: { month: 12, year: 2011 } } },
    ],
    bullets: [
      {
        text: "Guided new customers through legally binding verbal enrollment contracts, confirming terms and completing verification",
        categories: [],
      },
      {
        text: "Created an Express Verification training guide to improve instruction for the position",
        categories: ["Leadership"],
      },
      {
        text: "Trained and developed new Express Verification Specialists regarding the strict rules surrounding verbally binding agreements",
        categories: ["Leadership"],
      },
      {
        text: "Recognized as a Top Performer within the department on three separate occasions",
        categories: [],
      },
      {
        text: "Recognized as a Star Performer in July 2011",
        categories: [],
      },
    ],
  },
  {
    section: "Volunteer Experience",
    company: "The Church of Jesus Christ of Latter-day Saints",
    logo: "/images/companies/church-of-jesus-christ-logo.png",
    website: "https://www.churchofjesuschrist.org/?lang=eng",
    location: "Idaho Falls, ID",
    roles: [
      { title: "Assistant Stake Clerk of Finance", dateRange: { start: { month: 9, year: 2022 }, end: { month: 11, year: 2025 } } },
    ],
    bullets: [
      {
        text: "Validated reimbursement requests to confirm appropriate authorizations were obtained",
        categories: ["Accounting"],
      },
      {
        text: "Processed reimbursements and assisted in reimbursement distribution",
        categories: ["Accounting"],
      },
      {
        text: "Compiled annual budget requests from stake auxiliary leaders, presented consolidated recommendations to the stake president, and recorded approved budgets in the church financial system",
        categories: ["Accounting", "Leadership"],
      },
      {
        text: "Monitored monthly spending against budgeted amounts for stake auxiliaries, notifying leaders when their funds were running tight, over budget, or still available to use",
        categories: ["Accounting"],
      },
      {
        text: "Reviewed monthly expenditures with the stake president, covering both stake finances and budget activity across all seven wards",
        categories: ["Accounting", "Leadership"],
      },
      {
        text: "Followed up with clerks across the stake's seven wards to confirm ward-level budget submissions were completed and uploaded",
        categories: ["Accounting", "Leadership"],
      },
      {
        text: "Served as the stake's point of contact for ward-level budget questions",
        categories: ["Accounting"],
      },
    ],
  },
  // The four Church roles are separate entries rather than one block: they span
  // 2012-2025 with a five-year gap, and Hans considers them distinct callings
  // rather than a progression within one position.
  {
    section: "Volunteer Experience",
    company: "The Church of Jesus Christ of Latter-day Saints",
    logo: "/images/companies/church-of-jesus-christ-logo.png",
    website: "https://www.churchofjesuschrist.org/?lang=eng",
    location: "Idaho Falls, ID",
    roles: [
      {
        title: "Stake Auditor",
        altTitle: "Volunteer Auditor",
        dateRange: { start: { month: 5, year: 2021 }, end: { month: 8, year: 2022 } },
      },
    ],
    bullets: [
      {
        text: "Safeguarded member donations by independently auditing receipt and reporting processes across the stake's seven wards for compliance with church policy",
        categories: ["Accounting"],
      },
      {
        text: "Identified reporting deficiencies during audits and documented areas of improvement with corresponding correction plans",
        categories: ["Accounting"],
      },
      {
        text: "Reviewed confidential donation records while maintaining member confidentiality",
        categories: ["Accounting"],
      },
    ],
  },
  {
    section: "Volunteer Experience",
    company: "The Church of Jesus Christ of Latter-day Saints",
    logo: "/images/companies/church-of-jesus-christ-logo.png",
    website: "https://www.churchofjesuschrist.org/?lang=eng",
    location: "Rexburg, ID",
    roles: [
      { title: "Assistant Ward Clerk of Finance", dateRange: { start: { month: 10, year: 2014 }, end: { month: 4, year: 2016 } } },
    ],
    bullets: [
      {
        text: "Oversaw the protection of member donations by ensuring contributions were processed in compliance with church financial policy",
        categories: ["Accounting"],
      },
      {
        text: "Oversaw confidential member donation records under strict church confidentiality policy",
        categories: ["Accounting"],
      },
      {
        text: "Compiled annual budget requests from ward auxiliary leaders, presented consolidated recommendations to the bishop, and recorded approved budgets in the church financial system",
        categories: ["Accounting", "Leadership"],
      },
      {
        text: "Monitored monthly spending against budgeted amounts, notifying auxiliary leaders when their funds were running tight, over budget, or still available to use",
        categories: ["Accounting"],
      },
      {
        text: "Reviewed monthly expenditures with the bishop to confirm spending aligned with expectations",
        categories: ["Accounting", "Leadership"],
      },
    ],
  },
  {
    section: "Volunteer Experience",
    company: "The Church of Jesus Christ of Latter-day Saints",
    logo: "/images/companies/church-of-jesus-christ-logo.png",
    website: "https://www.churchofjesuschrist.org/?lang=eng",
    location: "Comodoro Rivadavia, Chubut, Argentina",
    roles: [
      {
        title: "Full-time Missionary",
        altTitle: "Full-time Volunteer Representative",
        dateRange: { start: { month: 2, year: 2012 }, end: { month: 2, year: 2014 } },
      },
    ],
    bullets: [
      {
        text: "Developed Spanish fluency over two years of full-time service conducted in Spanish",
        categories: [],
      },
      {
        text: "Established lesson plans to help others achieve and elevate personal goals",
        categories: ["Leadership"],
      },
      {
        text: "Prepared and taught weekly meetings to fellow volunteers to increase expertise, productivity, and care",
        categories: ["Leadership"],
      },
      {
        text: "Planned and conducted a daily schedule of appointments, coordinating independently with numerous contacts and fellow volunteers",
        categories: ["Leadership"],
      },
    ],
  },
];

const MASTER_RESUME_SKILLS = [
  "Proficient with Microsoft Power Platform and Microsoft Office applications",
  "Fluent in Spanish",
  "Eagle Scout",
  "CPA Candidate - examinations in progress",
];

const MASTER_RESUME_CATEGORIES = [
  "Accounting",
  "Taxation",
  "Data Analytics",
  "Business Intelligence",
  "Leadership",
];
