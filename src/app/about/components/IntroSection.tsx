"use client";

import Copy from "@/components/Copy";

interface IntroSectionProps {
  title: string;
  description: string;
  language: "en" | "jp";
}

export const IntroSection = ({
  title,
  description,
  language,
}: IntroSectionProps) => {
  return (
    <div className="flex flex-col gap-4 mb-20">
      <Copy key={`title-${language}`} stagger={0.2} delay={0.5}>
        <h1
          className={`text-[24px] font-semibold leading-[100%] cursor-default ${
            language === "jp" ? "font-['Noto_Sans_JP']" : ""
          }`}
          style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
        >
          {title}
        </h1>
      </Copy>
      <div className="w-full">
        <Copy
          key={`desc-${language}`}
          delay={0.5}
          stagger={0.2}
          animateOnScroll
        >
          <p
            className={`text-[16px] font-normal text-justify max-w-[800px] leading-[130%] tracking-[0.02rem] cursor-default ${
              language === "jp" ? "font-['Noto_Sans_JP']" : ""
            }`}
            style={{
              wordBreak: "normal",
              overflowWrap: "anywhere",
              lineBreak: "strict",
            }}
          >
            {description}
          </p>
        </Copy>
      </div>
    </div>
  );
};
