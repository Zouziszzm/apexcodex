import type { Metadata } from "next";
import ProjectContent from "./project-content";
import { projects } from "@/data/projects";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  return {
    title: project ? `${project.title}` : "Project",
  };
}

export default function ProjectPage() {
  return <ProjectContent />;
}
