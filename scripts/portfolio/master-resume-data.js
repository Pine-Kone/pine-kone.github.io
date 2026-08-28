// Master Resume data. Each bullet is tagged with the skill categories it
// belongs to (a bullet can belong to more than one). Add new roles or
// bullets here — the page and its filter/rank tool read this file directly.

const MASTER_RESUME_DATA = [
  {
    role: "Data Analytics Manager",
    company: "Cooper Norman",
    location: "Idaho Falls, ID",
    dateRange: "Jun. 2023 \u2013 Present",
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
    role: "Data Analytics and Reporting Specialist",
    company: "Mountain View Hospital",
    location: "Idaho Falls, ID",
    dateRange: "Aug. 2021 \u2013 Jun. 2023",
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
    role: "Staff Accountant",
    company: "Smith, Kunz & Associates",
    location: "Idaho Falls, ID",
    dateRange: "Jan. 2017 \u2013 Jun. 2023",
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
];

const MASTER_RESUME_CATEGORIES = [
  "Accounting",
  "Taxation",
  "Data Analytics",
  "Business Intelligence",
  "Leadership",
];
