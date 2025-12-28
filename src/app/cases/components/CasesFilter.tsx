"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CasesFilterProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const CasesFilter: React.FC<CasesFilterProps> = ({
  filters,
  activeFilter,
  onFilterChange,
}) => {
  const { language } = useLanguage();

  return (
    <div className="text-[var(--text-secondary)] text-[14px] leading-[100%] tracking-normal flex flex-col gap-2 mt-10">
      {filters.map((f, i) => (
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          className={`text-left w-fit transition-colors duration-300 ${
            activeFilter === f || (activeFilter === "All" && i === 0)
              ? "text-[var(--text-primary)]"
              : "hover:text-[var(--text-primary)] opacity-70 hover:opacity-100"
          } ${language === "jp" ? "font-['Noto_Sans_JP']" : ""}`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default CasesFilter;
