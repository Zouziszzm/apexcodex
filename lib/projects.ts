import { manualProjects } from "@/data/projects";
import { fetchGitHubProjects } from "@/lib/github-projects";
import type { Project } from "@/types/projects";

export async function getProjects(): Promise<Project[]> {
  const githubProjects = await fetchGitHubProjects();
  return [...manualProjects, ...githubProjects];
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.id === id);
}

export async function getAdjacentProjects(id: string): Promise<{
  prev?: Project;
  next?: Project;
}> {
  const projects = await getProjects();
  const index = projects.findIndex((project) => project.id === id);

  if (index === -1) {
    return {};
  }

  return {
    prev: index > 0 ? projects[index - 1] : undefined,
    next: index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}
