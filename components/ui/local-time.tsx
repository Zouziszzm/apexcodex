"use client";

import { useEffect, useState } from "react";
import { DiaTextReveal } from "./dia-text-rv";
import { cn } from "@/lib/utils";

export function LocalTime({ className }: { className?: string }) {
  const [timeStr, setTimeStr] = useState("");
  const [offsetStr, setOffsetStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      const parts = formatter.formatToParts(now);
      const h = parts.find((p) => p.type === "hour")?.value;
      const m = parts.find((p) => p.type === "minute")?.value;
      const s = parts.find((p) => p.type === "second")?.value;
      const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value;
      const istTime = `${h}:${m}:${s} ${dayPeriod}`;
      const istOffsetStr = "UTC+5:30";

      setTimeStr(istTime);
      setOffsetStr(istOffsetStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeStr) return null;

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div
        className="flex items-center gap-3 cursor-default"
        title="India Standard Time"
      >
        <DiaTextReveal
          text={timeStr}
          delay={0.8}
          duration={1.2}
          textColor="var(--body)"
        />
        <span className="opacity-40">
          <DiaTextReveal
            text={`(${offsetStr})`}
            delay={1.0}
            duration={1.2}
            textColor="var(--body)"
          />
        </span>
      </div>
    </div>
  );
}
