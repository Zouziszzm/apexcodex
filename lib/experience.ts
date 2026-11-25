import type { Locale } from "@/app/contexts/LocaleContext";

export function calculateMonthsBetween(startStr: string, endStr: string): number {
  const start = new Date(startStr);
  const end = endStr === "present" ? new Date() : new Date(endStr);

  let totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (endStr !== "present") {
    totalMonths += 1;
  }

  return Math.max(1, totalMonths);
}

export function formatDurationString(
  startStr: string,
  endStr: string,
  locale: Locale = "en",
): string {
  const totalMonths = calculateMonthsBetween(startStr, endStr);

  const years = Math.floor(totalMonths / 12);
  const remMonths = totalMonths % 12;

  if (locale === "jp") {
    if (years > 0 && remMonths > 0) {
      return `${years}年 ${remMonths}ヶ月`;
    } else if (years > 0) {
      return `${years}年`;
    } else {
      return `${remMonths}ヶ月`;
    }
  }

  if (years > 0 && remMonths > 0) {
    return `${years} yr${years > 1 ? "s" : ""} ${remMonths} mo${remMonths > 1 ? "s" : ""}`;
  } else if (years > 0) {
    return `${years} yr${years > 1 ? "s" : ""}`;
  } else {
    return `${remMonths} mo${remMonths > 1 ? "s" : ""}`;
  }
}

export function getDuration(
  item: {
    startDate?: string;
    endDate?: string;
    duration?: string;
  },
  locale: Locale = "en",
): string {
  if (item.startDate && item.endDate) {
    return formatDurationString(item.startDate, item.endDate, locale);
  }
  return item.duration || "";
}
