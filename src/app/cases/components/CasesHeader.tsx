"use client";

import React from "react";
import Copy from "@/components/Copy";
import { useLanguage } from "@/contexts/LanguageContext";

interface CasesHeaderProps {
  title: string;
  description: string;
}

const CasesHeader: React.FC<CasesHeaderProps> = ({ title, description }) => {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col gap-4">
      <Copy key={`title-${language}`} delay={0.2} stagger={0.2}>
        <h1
          className={`text-[24px] font-semibold leading-[100%] cursor-default text-[#963531] ${
            language === "jp" ? "font-['Noto_Sans_JP']" : ""
          }`}
        >
          {title}
        </h1>
      </Copy>
      <div className="max-w-[800px]">
        <Copy key={`desc-${language}`} delay={0.4} stagger={0.1}>
          <p
            className={`text-[16px] font-normal text-justify leading-[1.3] tracking-[0.02rem] cursor-default text-[#963531] ${
              language === "jp" ? "font-['Noto_Sans_JP']" : ""
            }`}
          >
            {description}
          </p>
        </Copy>
      </div>
    </div>
  );
};

export default CasesHeader;
