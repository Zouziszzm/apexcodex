import { Job, CompanySpan } from "@/types/experience";
import { getDuration } from "@/lib/experience";

export const jobs: Job[] = [
  {
    company: "Mantiqh",
    position: "Software Engineer",
    startDate: "2025-02-01",
    endDate: "present",
    get duration() {
      return getDuration(this);
    },
    dateRange: "Feb 2025 - Present",
    href: "https://www.mantiqh.com",
    description: [
      "Architected React, React Native, and TypeScript frontend solutions using atomic component design principles, improving delivery speed and reducing API integration issues by 30%.",
      "Implemented SSR, bundle optimisation, and lazy-loading to cut dashboard initial load time from 3.5s → 2.1s (43% improvement), tracking Core Web Vitals (LCP, CLS) regressions via Sentry and real-user monitoring.",
      "Developed custom Canvas API-driven animated chart components enabling fluid micro-interactions with zero performance budget degradation; enforced performance budgets for bundle size and TTI across sprints.",
      "Integrated AI-assisted development workflows (prompt engineering with LLM tools) to accelerate code-review and scaffolding, reducing boilerplate authoring time by ~20%."
    ]
  },
  {
    company: "NDTCCS",
    position: "Quality Assurance Inspector (Documentation)",
    startDate: "2024-09-01",
    endDate: "2025-02-01",
    get duration() {
      return getDuration(this);
    },
    dateRange: "Sep 2024 - Feb 2025",
    href: "https://www.ndtcorrosion.com/",
    employmentType: "Temporary / Contract",
    location: "Saudi Arabia",
    workArrangement: "On-site (Office-based)",
    classification: "Non-Technical",
    description: [
      "Worked as a temporary Quality Assurance Inspector responsible for inspecting, reviewing, and verifying Entity CCS documentation.",
      "Office-based documentation quality assurance role on a six-month temporary contract in Saudi Arabia (non-technical, office-based; no field or oil-site inspections)."
    ]
  },
  {
    company: "Freelance Developer",
    position: "Freelance / Self-Employed",
    startDate: "2023-06-01",
    endDate: "2024-08-01",
    get duration() {
      return getDuration(this);
    },
    dateRange: "Jun 2023 - Aug 2024",
    employmentType: "Freelance / Self-Employed",
    description: [
      "Delivered freelance and contract frontend development projects, building responsive web applications and custom user interfaces."
    ]
  },
  {
    company: "Power Store E-Com Pvt Ltd",
    roles: [
      {
        position: "Frontend Developer",
        startDate: "2023-03-01",
        endDate: "2023-05-01",
        get duration() {
          return getDuration(this);
        },
        dateRange: "Mar 2023 - May 2023",
        description: [
          "Built and maintained customer-facing e-commerce UI as an on-site frontend developer in India.",
        ]
      },
      {
        position: "Frontend Developer Intern",
        startDate: "2022-09-01",
        endDate: "2023-02-01",
        get duration() {
          return getDuration(this);
        },
        dateRange: "Aug 2022 - Feb 2023",
        description: [
          "Assisted in developing and testing customer-facing e-commerce interfaces and UI components.",
        ]
      }
    ]
  }
];

export const companySpans: CompanySpan[] = [
  { start: "2025-02-01", end: "present" }, // Mantiqh (Feb 2025 - Present)
  { start: "2023-03-01", end: "2023-06-01" }, // Power Store E-Com Pvt Ltd (Mar 2023 - May 2023: 3 mos)
];
