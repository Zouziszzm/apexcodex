export const SHIMMER_COLORS = [
  "var(--accent)",
  "var(--body)",
  "var(--title)",
  "var(--subtext)",
  "var(--display)",
];

const BAND_HALF = 17;
export const SHIMMER_SWEEP_START = -BAND_HALF;
export const SHIMMER_SWEEP_END = 100 + BAND_HALF;

export function buildShimmerGradient(
  pos: number,
  colors: string[],
  textColor: string,
) {
  const bandStart = pos - BAND_HALF;
  const bandEnd = pos + BAND_HALF;

  if (bandStart >= 100) {
    return `linear-gradient(90deg, ${textColor}, ${textColor})`;
  }

  const n = colors.length;
  const parts: string[] = [];

  if (bandStart > 0) {
    parts.push(`${textColor} 0%`, `${textColor} ${bandStart.toFixed(2)}%`);
  }

  colors.forEach((c, i) => {
    const pct = n === 1 ? pos : bandStart + (i / (n - 1)) * BAND_HALF * 2;
    parts.push(`${c} ${pct.toFixed(2)}%`);
  });

  if (bandEnd < 100) {
    parts.push(`${textColor} ${bandEnd.toFixed(2)}%`, `${textColor} 100%`);
  }

  return `linear-gradient(90deg, ${parts.join(", ")})`;
}
