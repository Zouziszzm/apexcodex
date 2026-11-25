import HomePage from "@/components/home/home-page";
import { getProjects } from "@/lib/projects";
import { socialLinks } from "@/data/socials";
import type { Metadata } from "next";

const SITE_DESCRIPTION =
  "Software Engineer creating cross-platform experiences for web, mobile, and desktop with React, TypeScript, Next.js, Rust, Go, and Tauri.";

export const metadata: Metadata = {
  title: "Alfarhaankhan Inamdar — Software Engineer",
  description: SITE_DESCRIPTION,
  keywords: [
    "Alfarhaankhan Inamdar",
    "Farhaan Khan",
    "Software Engineer",
    "Frontend Engineer",
    "Full-Stack Developer",
    "React",
    "TypeScript",
    "Next.js",
    "Rust",
    "Go",
    "Bengaluru",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Alfarhaankhan Inamdar — Software Engineer",
    description: SITE_DESCRIPTION,
    type: "website",
    url: "https://alfarhaankhan.com",
    siteName: "Alfarhaankhan Inamdar",
    images: [
      {
        url: "/meta/card.png",
        width: 1200,
        height: 630,
        alt: "Alfarhaankhan Inamdar Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alfarhaankhan Inamdar — Software Engineer",
    description: SITE_DESCRIPTION,
    images: ["/meta/card.png"],
  },
};

export const revalidate = 3600;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alfarhaankhan Inamdar",
  alternateName: ["Farhaan Khan", "Alfarhaankhan"],
  url: "https://alfarhaankhan.com",
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Mantiqh",
    url: "https://www.mantiqh.com",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
  },
  knowsAbout: [
    "React",
    "React Native",
    "TypeScript",
    "Next.js",
    "Rust",
    "Go",
    "Tauri",
    "Frontend Architecture",
  ],
  sameAs: socialLinks
    .map((s) => s.href)
    .filter((href) => href.startsWith("https://")),
};

export default async function Home() {
  const projects = await getProjects();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <HomePage projects={projects} />
    </>
  );
}
