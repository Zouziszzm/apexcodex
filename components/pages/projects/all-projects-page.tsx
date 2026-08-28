"use client";

import { useRef } from "react";
import { ChevronLeft } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { Project } from "@/types/projects";
import { getProjectGroups } from "@/lib/project-groups";
import { ProjectsList } from "@/components/sections/projects/projects-list";
import { TransitionLink } from "@/components/ui/transition-link";

interface AllProjectsPageProps {
  projects: Project[];
}

export default function AllProjectsPage({ projects }: AllProjectsPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const groupNames = getProjectGroups(projects);

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.15 },
      );
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-6 pt-24 text-(--body)"
    >
      <nav
        className="absolute top-10 left-6 lg:left-12"
        aria-label="Breadcrumb"
      >
        <div className="group flex items-center gap-2 text-[var(--font-body-sm)] transition-all duration-500">
          <TransitionLink
            href="/"
            aria-label="Back to Home"
            className="flex items-center gap-3"
          >
            <ChevronLeft
              size={14}
              className="shrink-0 opacity-40 transition-all group-hover:-translate-x-0.5 group-hover:opacity-100"
              aria-hidden="true"
            />
            <span className="font-medium text-caption opacity-100">Home</span>
          </TransitionLink>
          <span className="opacity-20" aria-hidden="true">
            /
          </span>
          <span className="font-light text-caption text-(--subtext) opacity-50">
            Projects
          </span>
        </div>
      </nav>

      <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-8 pt-8">
        <header className="flex flex-col gap-2">
          <h1 className="font-medium text-[var(--font-body-sm)]">All Projects</h1>
          <p className="font-light text-body-sm text-(--subtext)">
            Every stack and contribution — grouped by technology.
          </p>
        </header>

        <ProjectsList
          projects={projects}
          variant="full"
          groupNames={groupNames}
          sectionTitle="Projects"
        />
      </div>
    </main>
  );
}
