import { Hanken_Grotesk, Noto_Sans_JP, Yomogi } from "next/font/google";
import localFont from "next/font/local";

export const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

/**
 * Latin-only Hanken Grotesk with `size-adjust: 116%` so that when `html[data-locale="jp"]`
 * steps font sizes down by 2px for Japanese (`Noto Sans JP`), every English word,
 * tech name, number, and symbol renders at the exact 100% English size automatically.
 */
export const hankenJpScale = localFont({
  src: "./fonts/HankenGrotesk-Latin.woff2",
  variable: "--font-hanken-jp-scale",
  weight: "100 900",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  declarations: [
    { prop: "size-adjust", value: "113.64%" },
    { prop: "ascent-override", value: "99.07%" },
    { prop: "descent-override", value: "30.02%" },
    { prop: "line-gap-override", value: "0%" },
    {
      prop: "unicode-range",
      value:
        "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122",
    },
  ],
});

export const notoSansJP = Noto_Sans_JP({
  weight: ["200", "300", "400", "500", "700"],
  variable: "--font-noto-jp",
  display: "swap",
  preload: false,
});

export const doodleEn = localFont({
  src: "./fonts/BelmonteBallpointTrial-Cursive.otf",
  variable: "--font-doodle-en",
  weight: "400",
  display: "swap",
});

export const doodleJp = Yomogi({
  weight: "400",
  variable: "--font-doodle-jp",
  display: "swap",
  preload: false,
});
