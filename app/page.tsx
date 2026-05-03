import HomePage from "@/components/home/home-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Index | Alfarhaankhan",
  description: "I create cross-platform experiences for web, mobile, and desktop with a focus on interaction, motion, and performance.",
  openGraph: {
    title: "Index | Alfarhaankhan",
    description: "I create cross-platform experiences for web, mobile, and desktop with a focus on interaction, motion, and performance.",
    type: "website",
    url: "https://alfarhaankhan.com", // Placeholder
    images: [
      {
        url: "/meta/card.png",
        width: 1200,
        height: 630,
        alt: "Alfarhaankhan Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Index | Alfarhaankhan",
    description: "I create cross-platform experiences for web, mobile, and desktop with a focus on interaction, motion, and performance.",
    images: ["/meta/card.png"],
  },
};

export default function Home() {
  return <HomePage />;
}
