"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { aboutData } from "@/data/about";
import { IntroSection } from "./components/IntroSection";
import { TechStackSection } from "./components/TechStackSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { Job } from "./components/types";

const AboutClient = () => {
  const { language } = useLanguage();
  const t = aboutData[language];

  return (
    <main className="relative min-h-screen pt-40 px-6 lg:px-12 text-[#963531] max-w-[1440px] mx-auto pb-40">
      <IntroSection
        title={t.title}
        description={t.description}
        language={language}
      />

      <div className="flex w-full flex-col gap-10 xl:gap-20">
        <div className="w-full xl:ml-auto">
          <TechStackSection
            techStackLabel={t.techStackLabel}
            techStacks={t.techStacks}
            language={language}
          />

          <ExperienceSection
            experienceLabel={t.experienceLabel}
            experienceValue={t.experienceValue}
            jobs={t.jobs as unknown as Job[]}
            language={language}
          />
        </div>
      </div>
    </main>
  );
};

export default AboutClient;
