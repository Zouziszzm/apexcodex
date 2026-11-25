import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectContent from "./project-content";
import { getAdjacentProjects, getProjectById, getProjects } from "@/lib/projects";

type Props = {
  params: Promise<{ id: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const ogImage = project.images[0] || "/meta/card.png";

  return {
    title: project.title,
    description: project.subtext,
    alternates: {
      canonical: `/projects/${project.id}`,
    },
    openGraph: {
      title: `${project.title} | Alfarhaankhan Inamdar`,
      description: project.subtext,
      url: `https://alfarhaankhan.com/projects/${project.id}`,
      type: "article",
      images: [{ url: ogImage, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Alfarhaankhan Inamdar`,
      description: project.subtext,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const { prev, next } = await getAdjacentProjects(id);

  return (
    <ProjectContent project={project} prevProject={prev} nextProject={next} />
  );
}
