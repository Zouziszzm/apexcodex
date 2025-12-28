"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import Copy from "@/components/Copy";
import Line from "@/components/Line";
import { ArrowUpRight } from "lucide-react";
import { DateTooltip } from "./DateTooltip";
import { Job } from "./types";

interface JobItemProps {
  job: Job;
  language: "en" | "jp";
  index: number;
}

export const JobItem = ({ job, language, index }: JobItemProps) => {
  const companyLineRef = useRef<HTMLDivElement>(null);

  const handleCompanyHover = (hovered: boolean) => {
    if (companyLineRef.current) {
      gsap.to(companyLineRef.current, {
        width: hovered ? "100%" : "0%",
        duration: 0.6,
        ease: "power3.out",
      });
    }
  };

  return (
    <div className="pt-6 pb-2 last:pb-0">
      <div className="block lg:flex justify-between w-full">
        <Link
          href={job.href}
          target="_blank"
          onMouseEnter={() => handleCompanyHover(true)}
          onMouseLeave={() => handleCompanyHover(false)}
          className="cursor-pointer w-fit block"
        >
          <Copy
            key={`company-${index}-${language}`}
            className="py-1 lg:py-0 flex gap-2 items-center w-full"
            delay={0.5 + index * 0.1}
          >
            <p
              className={`font-medium ${
                language === "jp" ? "font-['Noto_Sans_JP']" : ""
              }`}
            >
              {job.company}
            </p>
            <div>
              <ArrowUpRight size={20} />
            </div>
          </Copy>
          <div
            ref={companyLineRef}
            className="h-px bg-[var(--text-primary)] mt-1"
            style={{ width: "0%" }}
          />
        </Link>
        <Copy key={`location-${index}-${language}`} delay={0.6 + index * 0.1}>
          <p
            className={`py-1 lg:py-0 text-nowrap ${
              language === "jp" ? "font-['Noto_Sans_JP']" : ""
            }`}
          >
            {job.location}
          </p>
        </Copy>
      </div>
      <Line
        key={`line-${index}-${language}`}
        delay={0.7 + index * 0.1}
        className="my-3"
      />
      <div className="w-full flex justify-between lg:justify-start gap-0 lg:gap-16">
        <Copy key={`jobtype-${index}-${language}`} delay={0.8 + index * 0.1}>
          <p className={language === "jp" ? "font-['Noto_Sans_JP']" : ""}>
            {job.jobType}
          </p>
        </Copy>
        <Copy key={`workmode-${index}-${language}`} delay={0.85 + index * 0.1}>
          <p className={language === "jp" ? "font-['Noto_Sans_JP']" : ""}>
            {job.workMode}
          </p>
        </Copy>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {job.roles.map((role, roleIndex) => (
          <div
            key={`${role.position}-${roleIndex}`}
            className="w-full flex flex-col gap-3 pt-2"
          >
            <div className="flex gap-2 justify-between">
              <Copy
                key={`position-${index}-${roleIndex}-${language}`}
                delay={0.9 + index * 0.1 + roleIndex * 0.05}
              >
                <p className={language === "jp" ? "font-['Noto_Sans_JP']" : ""}>
                  {role.position}
                </p>
              </Copy>
              <div className="flex w-fit lg:w-[30%] justify-between">
                <div className="hidden lg:block">
                  <Copy
                    key={`duration-${index}-${roleIndex}-${language}`}
                    delay={0.95 + index * 0.1 + roleIndex * 0.05}
                  >
                    <p
                      className={
                        language === "jp" ? "font-['Noto_Sans_JP']" : ""
                      }
                    >
                      {role.duration}
                    </p>
                  </Copy>
                </div>
                <DateTooltip dateRange={role.dateRange} language={language}>
                  <Copy
                    key={`daterange-${index}-${roleIndex}-${language}`}
                    delay={1 + index * 0.1 + roleIndex * 0.05}
                  >
                    <p
                      className={
                        language === "jp" ? "font-['Noto_Sans_JP']" : ""
                      }
                    >
                      {role.dateRange}
                    </p>
                  </Copy>
                </DateTooltip>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
