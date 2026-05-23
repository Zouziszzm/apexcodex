import { Job } from "@/types/experience";

export const jobs: Job[] = [
  {
    company: "Mantiqh",
    position: "Sr. Frontend Developer / Mobile Developer",
    duration: "1 yr 4 mos",
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
    href: "https://www.ndtcorrosion.com/",
    roles: [
      {
        position: "Software Engineer (Full-time, Onsite)",
        duration: "1 yr 9 mos",
        dateRange: "Jun 2023 - Feb 2025",
        description: [
          "Led frontend development of Bexel, an in-house equipment management platform built with React + TypeScript, integrating real-time operational data—license status, calibration records, and site-location tracking via interactive maps—enhancing data visibility by ~40%.",
          "Automated form-to-PDF workflows within Bexel by building dynamic document templates and integrating backend services, reducing manual report-generation time by 60% and cutting data errors by 30%.",
          "Authored and executed end-to-end test scenarios with Playwright, achieving 85%+ UI flow coverage; validated WCAG 2.1 AA compliance using Lighthouse and axe, collaborating with cross-functional teams to reduce data inconsistencies by 25%.",
          "Standardised internal development workflows using GitHub Actions (CI/CD) and Docker to containerise and deploy Bexel, reducing environment-related deployment failures by 30% and improving release consistency across environments."
        ]
      },
      {
        position: "Junior Frontend Developer (Contract, Remote)",
        duration: "6 mos",
        dateRange: "Sep 2022 - Feb 2023",
        description: [
          "Developed and maintained the main NDTCCS company website using HTML5, CSS3 (Grid, Flexbox), and JavaScript (ES6+), implementing responsive design and semantic markup for improved accessibility and SEO.",
          "Built an in-house document creation tool enabling structured generation of internal reports and forms; collaborated with senior developers to translate requirements into functional UI components, establishing foundational React and TypeScript skills."
        ]
      },
    ],
  },
];

export const companySpans = [
  { start: "2025-02-01", end: "present" }, // Mantiqh
  { start: "2022-09-01", end: "2025-02-01" }, // NDTCCS
];
