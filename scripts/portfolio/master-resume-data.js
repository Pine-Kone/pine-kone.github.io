// Master Resume data. Each bullet is tagged with the skill categories it
// belongs to (a bullet can belong to more than one). Add new roles or
// bullets here - the page and its filter/rank tool read this file directly.
//
// DATES: store exact start/end as { month, year }. If you only know the
// year, omit month. If a role is ongoing, use { present: true } for the
// end date. If you don't have exact dates at all, use { display: "..." }
// with whatever text you do want shown (e.g. "Sometime 2015") - it bypasses
// the month/year formatting entirely. formatDateRange() below turns any of
// these into a clean "Mon. YYYY - Mon. YYYY" display string.

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
  return `${formatResumeDatePart(range.start)} - ${formatResumeDatePart(range.end)}`;
}

const MASTER_RESUME_DATA = [
  {
    section: "Work Experience",
    role: "Data Analytics Manager",
    company: "Cooper Norman",
    logo: "/images/companies/cooper-norman-logo.png",
    location: "Idaho Falls, ID",
    dateRange: { start: { month: 6, year: 2023 }, end: { present: true } },
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
    ],
  },
  {
    section: "Work Experience",
    role: "Data Analytics and Reporting Specialist",
    company: "Mountain View Hospital",
    logo: "/images/companies/mountain-view-hospital-logo.jpg",
    location: "Idaho Falls, ID",
    dateRange: { start: { month: 8, year: 2021 }, end: { month: 6, year: 2023 } },
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
    role: "Staff Accountant",
    company: "Smith, Kunz & Associates",
    logo: "/images/companies/smith-kunz-logo.jpg",
    location: "Idaho Falls, ID",
    dateRange: { start: { month: 1, year: 2017 }, end: { month: 6, year: 2023 } },
    bullets: [
      {
        text: "Served as the primary Spanish-speaking tax associate in the Idaho Falls office, communicating primarily with Spanish-speaking clients to prepare U.S. individual income tax returns",
        categories: ["Taxation", "Accounting"],
      },
      {
        text: "Advised small business owners on IRS payroll tax regulations, filing requirements, and compliance best practices to support accurate and timely reporting",
        categories: ["Taxation", "Accounting"],
      },
      {
        text: "Consulted with business owners of LLCs, partnerships, and S-corporations on entity structure, compliance considerations, and operational planning",
        categories: ["Taxation", "Accounting", "Leadership"],
      },
    ],
  },
  {
    section: "Volunteer Experience",
    role: "Volunteer Financial Clerk",
    company: "Local Religious Organization",
    logo: null,
    location: "",
    dateRange: { start: { month: 9, year: 2022 }, end: { month: 11, year: 2025 } },
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
        text: "Maintained and managed area budget and annual budget proposals",
        categories: ["Accounting", "Leadership"],
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
