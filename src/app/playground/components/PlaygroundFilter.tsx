"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PlaygroundFilterProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const PlaygroundFilter: React.FC<PlaygroundFilterProps> = ({
  filters,
  activeFilter,
  onFilterChange,
}) => {
  const { language } = useLanguage();

  return (
    <div className="text-[#5C5C5C] text-[14px] leading-[100%] tracking-normal flex flex-col gap-2 mt-10">
      {filters.map((f, i) => (
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          className={`text-left w-fit transition-colors duration-300 cursor-pointer ${
            activeFilter === f || (activeFilter === "All" && i === 0)
              ? "text-[#963531]"
              : "hover:text-[#963531] opacity-70 hover:opacity-100"
          } ${language === "jp" ? "font-['Noto_Sans_JP']" : ""}`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default PlaygroundFilter;
