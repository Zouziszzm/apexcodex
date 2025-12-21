"use client";

import Copy from "@/components/Copy";
import { JobItem } from "./JobItem";
import { Job } from "./types";

interface ExperienceSectionProps {
  experienceLabel: string;
  experienceValue: string;
  jobs: readonly Job[];
  language: "en" | "jp";
}

export const ExperienceSection = ({
  experienceLabel,
  experienceValue,
  jobs,
  language,
}: ExperienceSectionProps) => {
  return (
    <div className="w-full pt-4">
      <Copy
        key={`experience-label-${language}`}
        stagger={0.2}
        delay={0.5}
        className="w-full mb-4"
      >
        <div className="flex w-full items-baseline gap-4">
          <h3
            className={`text-[20px] font-medium leading-[100%] cursor-default ${
              language === "jp" ? "font-['Noto_Sans_JP']" : ""
            }`}
          >
            {experienceLabel}
          </h3>
          <p
            className={`text-[20px] font-medium leading-[100%] cursor-default ${
              language === "jp" ? "font-['Noto_Sans_JP']" : ""
            }`}
          >
            {experienceValue}
          </p>
        </div>
      </Copy>

      <div className="mt-0">
        {jobs.map((job, index) => (
          <JobItem
            key={`${job.company}-${index}`}
            job={job}
            language={language}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
