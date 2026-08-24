<<<<<<< Updated upstream
import HomePage from "@/components/pages/home/page";
=======
import HomePage from "@/components/home/home-page";
import { getProjects } from "@/lib/projects";
>>>>>>> Stashed changes
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Index | Alfarhaankhan",
<<<<<<< Updated upstream
};

export default function Home() {
  return (
    <main>
      <HomePage />
    </main>
  );
=======
  description:
    "I create cross-platform experiences for web, mobile, and desktop with a focus on interaction, motion, and performance.",
  openGraph: {
    title: "Index | Alfarhaankhan",
    description:
      "I create cross-platform experiences for web, mobile, and desktop with a focus on interaction, motion, and performance.",
    type: "website",
    url: "https://alfarhaankhan.com",
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
    description:
      "I create cross-platform experiences for web, mobile, and desktop with a focus on interaction, motion, and performance.",
    images: ["/meta/card.png"],
  },
};

export const revalidate = 3600;

export default async function Home() {
  const projects = await getProjects();
  return <HomePage projects={projects} />;
>>>>>>> Stashed changes
}
