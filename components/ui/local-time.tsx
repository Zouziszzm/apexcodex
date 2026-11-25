"use client";

import { useSyncExternalStore } from "react";
import { DiaTextReveal } from "./dia-text-rv";
import { useLocale } from "@/app/contexts/LocaleContext";
import { UI_COPY } from "@/data/i18n";
import { cn } from "@/lib/utils";

const clockFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

let cachedTime = "";
let intervalId: ReturnType<typeof setInterval> | null = null;
const listeners = new Set<() => void>();

function computeIstTime(): string {
  const parts = clockFormatter.formatToParts(new Date());
  const h = parts.find((p) => p.type === "hour")?.value;
  const m = parts.find((p) => p.type === "minute")?.value;
  const s = parts.find((p) => p.type === "second")?.value;
  const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value;
  return `${h}:${m}:${s} ${dayPeriod}`;
}

function subscribeClock(listener: () => void) {
  if (!cachedTime) {
    cachedTime = computeIstTime();
  }
  listeners.add(listener);
  if (!intervalId) {
    intervalId = setInterval(() => {
      cachedTime = computeIstTime();
      listeners.forEach((fn) => fn());
    }, 1000);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
}

function getClockSnapshot(): string {
  if (!cachedTime && typeof window !== "undefined") {
    cachedTime = computeIstTime();
  }
  return cachedTime;
}

function getServerClockSnapshot(): string {
  return "";
}

export function LocalTime({ className }: { className?: string }) {
  const { locale } = useLocale();
  const timeStr = useSyncExternalStore(
    subscribeClock,
    getClockSnapshot,
    getServerClockSnapshot,
  );

  if (!timeStr) return null;

  return (
    <div
      data-locale-blur
      className={cn("flex items-center gap-4", className)}
    >
      <div
        className="flex items-center gap-3 cursor-default"
        title={UI_COPY[locale].istTitle}
      >
        <DiaTextReveal
          text={timeStr}
          delay={0.8}
          duration={1.2}
          textColor="var(--body)"
        />
        <span className="opacity-40">
          <DiaTextReveal
            text="(UTC+5:30)"
            delay={1.0}
            duration={1.2}
            textColor="var(--body)"
          />
        </span>
      </div>
    </div>
  );
}
