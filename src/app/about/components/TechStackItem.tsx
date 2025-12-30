"use client";

import { useRef, useState, useLayoutEffect } from "react";
import Copy from "@/components/Copy";
import Line from "@/components/Line";

interface TechStackItemProps {
  label: string;
  value: string;
  language: "en" | "jp";
  index: number;
}

export const TechStackItem = ({
  label,
  value,
  language,
  index,
}: TechStackItemProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState(8);

  useLayoutEffect(() => {
    const updateLayout = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const items = value.split(", ");

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) return;

      const isMobile = window.innerWidth < 1024;
      const fontSize = isMobile ? "10px" : "11px";
      const fontFamily =
        language === "jp" ? "Noto Sans JP, sans-serif" : "Inter, sans-serif";
      context.font = `${fontSize} ${fontFamily}`;

      let maxItemWidth = 0;
      items.forEach((item) => {
        const metrics = context.measureText(item);
        maxItemWidth = Math.max(maxItemWidth, metrics.width);
      });

      const gap = 8; // gap-x-2
      const horizontalPadding = 8; // px-1
      const totalItemWidth = maxItemWidth + horizontalPadding + gap;

      const maxCols = isMobile ? 6 : 8;
      const calculatedCols = Math.floor(containerWidth / totalItemWidth);
      setColumnCount(Math.max(1, Math.min(maxCols, calculatedCols)));
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [value, language]);

  return (
    <div className="pb-8 last:pb-0" ref={containerRef}>
      <div className="w-full flex justify-start gap-4 mb-1.5">
        <div className="flex justify-between w-full gap-2">
          <Copy
            key={`stack-label-${index}-${language}`}
            className="font-medium"
            delay={0.5 + index * 0.1}
          >
            <span className={language === "jp" ? "font-['Noto_Sans_JP']" : ""}>
              {label}
            </span>
          </Copy>
        </div>
      </div>
      <Line
        key={`stack-line-${index}-${language}`}
        delay={0.6 + index * 0.1}
        className="my-3"
      />
      <div className="mt-3 overflow-hidden">
        <div
          className="grid gap-x-2 gap-y-2"
          style={{
            gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
          }}
        >
          {value.split(", ").map((tech, i) => (
            <Copy
              key={`tech-${index}-${i}-${language}`}
              delay={0.7 + index * 0.1 + i * 0.02}
              className="w-full h-full"
            >
              <div
                className={`text-[14px] lg:text-[14px] w-full h-full py-1 text-[var(--text-primary)] transition-all duration-700 cursor-default flex items-center justify-start text-left px-1 ${
                  language === "jp" ? "font-['Noto_Sans_JP']" : ""
                }`}
              >
                <span className="w-full whitespace-nowrap overflow-visible">
                  {tech}
                </span>
              </div>
            </Copy>
          ))}
        </div>
      </div>
    </div>
  );
};
