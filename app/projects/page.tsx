import type { Metadata } from "next";
import AllProjectsPage from "@/components/pages/projects/all-projects-page";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects | Alfarhaankhan",
  description:
    "All projects grouped by stack — Rust, TypeScript, Open Source, Flutter, Tauri, and more.",
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <AllProjectsPage projects={projects} />;
}
