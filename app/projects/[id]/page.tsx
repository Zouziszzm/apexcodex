import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectContent from "./project-content";
import { getAdjacentProjects, getProjectById } from "@/lib/projects";

type Props = {
  params: Promise<{ id: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);

  return {
    title: project ? `${project.title}` : "Project",
  };
}

export default async function ProjectPage({
  params,
}: Props) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const { prev, next } = await getAdjacentProjects(id);

  return <ProjectContent project={project} prevProject={prev} nextProject={next} />;
}
