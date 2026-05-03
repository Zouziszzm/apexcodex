import { Job } from "@/types/experience";

export const jobs: Job[] = [
  {
    company: "Mantiqh Technologies",
    href: "https://www.mantiqh.com",
    roles: [
      {
        position: "Senior Frontend Developer",
        duration: "1 yr 2 mos",
        dateRange: "Apr 2025 - Present",
      },
      {
        position: "Mobile Application Developer",
        duration: "1 yr 4 mos",
        dateRange: "Feb 2025 - Present",
      },
    ],
  },
  {
    company: "NDTCCS",
    position: "Software Engineer",
    duration: "6 Months",
    dateRange: "Sep 2024 - Feb 2025",
    href: "https://www.ndtcorrosion.com/",
  },
  {
    company: "MetaLine X",
    href: "https://linktr.ee/MetaLineX",
    roles: [
      {
        position: "Software Developer",
        duration: "11 mos",
        dateRange: "Jan 2024 - Nov 2024",
      },
      {
        position: "Junior Software Engineer",
        duration: "10 mos",
        dateRange: "Nov 2023 - Aug 2024",
      },
    ],
  },
  {
    company: "IT BigBang",
    position: "Jr Developer",
    duration: "1 yr 2 mos",
    dateRange: "Aug 2022 - Sep 2023",
    href: "https://linktr.ee/MetaLineX",
  },
];

export const companySpans = [
  { start: "2025-02-01", end: "present" }, // Mantiqh
  { start: "2024-09-01", end: "2025-02-01" }, // NDTCCS
  { start: "2023-11-01", end: "2024-11-01" }, // MetaLine X
  { start: "2022-08-01", end: "2023-09-01" }, // IT BigBang
];
