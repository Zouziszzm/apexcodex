import type { Metadata } from "next";
import AllProjectsPage from "@/components/pages/projects/all-projects-page";
import { getProjects } from "@/lib/projects";

const DESCRIPTION =
  "All projects grouped by stack — Professional Works, Rust, TypeScript, and Open Source.";

export const metadata: Metadata = {
  title: "Projects",
  description: DESCRIPTION,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Alfarhaankhan Inamdar",
    description: DESCRIPTION,
    url: "https://alfarhaankhan.com/projects",
    type: "website",
    images: [{ url: "/meta/card.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Alfarhaankhan Inamdar",
    description: DESCRIPTION,
    images: ["/meta/card.png"],
  },
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <AllProjectsPage projects={projects} />;
}
