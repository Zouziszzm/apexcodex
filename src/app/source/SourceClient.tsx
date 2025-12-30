"use client";

import React from "react";
import Copy from "@/components/Copy";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import GithubStats from "@/components/GithubStats";
import RecommendedProfiles from "@/components/RecommendedProfiles";
import RecommendedProjects from "@/components/RecommendedProjects";
import {
  sourceData,
  recommendedProfiles,
  recommendedProjects,
} from "@/data/source";

interface SourceClientProps {
  githubStats: { year: number; count: number }[];
}

const SourceClient: React.FC<SourceClientProps> = ({ githubStats }) => {
  const { language } = useLanguage();

  const t = sourceData[language];

  return (
    <main className="relative min-h-screen pt-40 px-6 lg:px-12 text-[var(--text-primary)] max-w-[1440px] mx-auto pb-40">
      <div className="flex flex-col gap-16 md:gap-24">
        {/* Header Section */}
        <div className="flex flex-col gap-8 max-w-[800px]">
          <Copy delay={0.2} stagger={0.1}>
            <h1
              className={`text-[24px] font-semibold leading-[100%] cursor-default text-[var(--text-primary)] ${
                language === "jp" ? "font-['Noto_Sans_JP']" : ""
              }`}
            >
              {t.title}
            </h1>
          </Copy>

          <Copy delay={0.4} stagger={0.1}>
            <p
              className={`text-[16px] md:text-[18px] font-normal leading-[1.6] text-justify cursor-default text-[var(--text-primary)] ${
                language === "jp" ? "font-['Noto_Sans_JP']" : ""
              }`}
            >
              {t.intro}
            </p>
          </Copy>

          <div className="flex flex-col gap-6">
            <Link
              href="https://github.com/zouziszzm"
              target="_blank"
              className={`text-sm underline hover:text-[#5f5f5f] transition-colors duration-700 text-[var(--text-primary)] ${
                language === "jp" ? "font-['Noto_Sans_JP']" : ""
              }`}
            >
              {t.linkGithub}
            </Link>

            {/* Recommended Projects */}
            <RecommendedProjects projects={recommendedProjects} />

            {/* Recommended Profiles */}
            <div className="flex flex-col gap-2 mt-8">
              <Copy>
                <h2
                  className={`text-[20px] font-medium text-[var(--text-primary)] ${
                    language === "jp" ? "font-['Noto_Sans_JP']" : ""
                  }`}
                >
                  {t.recommendedProfilesTitle}
                </h2>
              </Copy>
              <RecommendedProfiles recommendations={recommendedProfiles} />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="text-[var(--text-primary)]">
          <GithubStats stats={githubStats} />
        </div>
      </div>
    </main>
  );
};

export default SourceClient;
