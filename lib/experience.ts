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

export function formatDurationString(startStr: string, endStr: string): string {
  const totalMonths = calculateMonthsBetween(startStr, endStr);

  const years = Math.floor(totalMonths / 12);
  const remMonths = totalMonths % 12;

  if (years > 0 && remMonths > 0) {
    return `${years} yr${years > 1 ? "s" : ""} ${remMonths} mo${remMonths > 1 ? "s" : ""}`;
  } else if (years > 0) {
    return `${years} yr${years > 1 ? "s" : ""}`;
  } else {
    return `${remMonths} mo${remMonths > 1 ? "s" : ""}`;
  }
}

export function getDuration(item: {
  startDate?: string;
  endDate?: string;
  duration?: string;
}): string {
  if (item.startDate && item.endDate) {
    return formatDurationString(item.startDate, item.endDate);
  }
  return item.duration || "";
}

