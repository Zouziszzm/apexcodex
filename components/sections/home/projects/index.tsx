"use client";

import type { Project } from "@/types/projects";
import { getPinnedProjectGroups, getProjectGroups } from "@/lib/project-groups";
import { ProjectsList } from "@/components/sections/projects/projects-list";

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  const pinnedGroups = getPinnedProjectGroups(projects);

  return (
    <ProjectsList
      projects={projects}
      variant="home"
      groupNames={pinnedGroups}
      showViewAllLink={getProjectGroups(projects).length > 0}
    />
  );
};
