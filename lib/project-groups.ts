import type { Project } from "@/types/projects";
import type { Locale } from "@/app/contexts/LocaleContext";
import { GROUP_LABELS_JP } from "@/data/i18n";

export const PINNED_PROJECT_GROUPS = [
  "professional",
  "rust",
  "typescript",
  "opensource",
] as const;

export const PROJECT_GROUP_ORDER = [
  "professional",
  "rust",
  "typescript",
  "opensource",
  "flutter",
  "tauri",
] as const;

export function formatGroupLabel(
  group: string,
  locale: Locale = "en",
): string {
  if (locale === "jp" && GROUP_LABELS_JP[group]) {
    return GROUP_LABELS_JP[group];
  }
  if (group === "opensource") return "Open Source";
  if (group === "professional") return "Professional Works";
  return group.charAt(0).toUpperCase() + group.slice(1);
}

export function getTopLevelProjects(projects: Project[]): Project[] {
  return projects.filter((project) => !project.group);
}

export function getProjectGroups(projects: Project[]): string[] {
  const groups = [
    ...new Set(
      projects
        .map((project) => project.group)
        .filter((group): group is string => Boolean(group)),
    ),
  ];

  return groups.sort((a, b) => {
    const aIndex = PROJECT_GROUP_ORDER.indexOf(
      a as (typeof PROJECT_GROUP_ORDER)[number],
    );
    const bIndex = PROJECT_GROUP_ORDER.indexOf(
      b as (typeof PROJECT_GROUP_ORDER)[number],
    );

    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });
}

export function getPinnedProjectGroups(projects: Project[]): string[] {
  const available = new Set(getProjectGroups(projects));
  return PINNED_PROJECT_GROUPS.filter((group) => available.has(group));
}

export function getProjectsForGroup(
  projects: Project[],
  group: string,
): Project[] {
  return projects
    .filter((project) => project.group === group)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}
