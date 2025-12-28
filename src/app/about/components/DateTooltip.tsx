"use client";

import { useRef, useState } from "react";

const formatDateTooltip = (dateRange: string, language: "en" | "jp") => {
  const parts = dateRange.split(" - ");
  if (parts.length !== 2) return dateRange;

  const formatPart = (part: string) => {
    if (part.toLowerCase() === "present")
      return language === "en" ? "Present" : "現在";
    const pieces = part.split("/");
    if (pieces.length !== 2) return part;
    const [y, m] = pieces;
    const year = `20${y}`;
    const month = parseInt(m);
    if (isNaN(month)) return part;

    if (language === "en") {
      const monthName = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ][month - 1];
      return `${monthName} ${year}`;
    } else {
      return `${year}年${month}月`;
    }
  };

  const start = formatPart(parts[0]);
  const end = formatPart(parts[1]);

  if (language === "en") {
    return `Started ${start} and worked until ${end}`;
  } else {
    return `${start}に開始し、${end}まで勤務`;
  }
};

interface DateTooltipProps {
  dateRange: string;
  language: "en" | "jp";
  children: React.ReactNode;
}

export const DateTooltip = ({
  dateRange,
  language,
  children,
}: DateTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[var(--bg-overlay)] text-[var(--text-primary)] text-[12px] rounded shadow-xl whitespace-nowrap z-100 animate-in fade-in slide-in-from-bottom-1 duration-300">
          <p className={language === "jp" ? "font-['Noto_Sans_JP']" : ""}>
            {formatDateTooltip(dateRange, language)}
          </p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[var(--bg-overlay)]" />
        </div>
      )}
    </div>
  );
};
