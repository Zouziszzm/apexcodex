import localFont from "next/font/local";
import { Noto_Sans_JP } from "next/font/google";


export const neueMontreal = localFont({
  src: [
    {
      path: "../public/fonts/NeueMontreal-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/NeueMontreal-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/NeueMontreal-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/NeueMontreal-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/NeueMontreal-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/NeueMontreal-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/NeueMontreal-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/NeueMontreal-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
  preload: true,
});

export const notoSansJp = Noto_Sans_JP({
  variable: "--font_sans_JP",
  subsets: ["cyrillic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});
