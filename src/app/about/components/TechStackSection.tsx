"use client";

import Copy from "@/components/Copy";
import { TechStackItem } from "./TechStackItem";

interface TechStackSectionProps {
  techStackLabel: string;
  techStacks: readonly {
    readonly label: string;
    readonly value: string;
  }[];
  language: "en" | "jp";
}

export const TechStackSection = ({
  techStackLabel,
  techStacks,
  language,
}: TechStackSectionProps) => {
  return (
    <div className="mb-4">
      <div className="w-full mb-4">
        <Copy
          key={`techstack-title-${language}`}
          stagger={0.2}
          delay={0.5}
          className="w-full"
        >
          <h2
            className={`text-[20px] font-medium leading-[100%] cursor-default ${
              language === "jp" ? "font-['Noto_Sans_JP']" : ""
            }`}
          >
            {techStackLabel}
          </h2>
        </Copy>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4">
        {techStacks.map((stack, index) => (
          <TechStackItem
            key={stack.label}
            label={stack.label}
            value={stack.value}
            language={language}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
