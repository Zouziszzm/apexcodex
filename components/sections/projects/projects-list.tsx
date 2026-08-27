"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { DiaTextReveal } from "@/components/ui/dia-text-rv";
import { TransitionLink } from "@/components/ui/transition-link";
import type { Project } from "@/types/projects";
import {
  formatGroupLabel,
  getProjectGroups,
  getProjectsForGroup,
  getTopLevelProjects,
} from "@/lib/project-groups";
import { setAccordionOpen } from "@/lib/animate-accordion";
import { ProjectItem } from "@/components/sections/home/projects/project-item";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ProjectsListProps = {
  projects: Project[];
  variant: "home" | "full";
  groupNames: string[];
  sectionTitle?: string;
  showViewAllLink?: boolean;
};

export function ProjectsList({
  projects,
  variant,
  groupNames,
  sectionTitle = "02 Projects",
  showViewAllLink = false,
}: ProjectsListProps) {
  const isFull = variant === "full";
  const containerRef = useRef<HTMLDivElement>(null);
  const headerLineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);
  const titleLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const dividerLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const dividerPulseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const chevronRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const groupTitleLineRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const groupPanelRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [expandedGroups, setExpandedGroups] = React.useState<
    Record<string, boolean>
  >({});
  const [activeHomeGroup, setActiveHomeGroup] = React.useState<string | null>(
    null,
  );
  const expandedGroupsRef = useRef<Record<string, boolean>>({});
  const activeHomeGroupRef = useRef<string | null>(null);

  const topLevelProjects = getTopLevelProjects(projects);
  const totalGroupCount = getProjectGroups(projects).length;

  const { contextSafe } = useGSAP({ scope: containerRef });

  useEffect(() => {
    groupNames.forEach((group) => {
      const panel = groupPanelRefs.current[group];
      if (!panel) return;

      gsap.set(panel, { height: 0, overflow: "hidden", opacity: 0 });
    });
  }, [groupNames]);

  const closeGroupPanel = (group: string) => {
    const panel = groupPanelRefs.current[group];
    if (!panel) return;

    setAccordionOpen(panel, false);
  };

  const openGroupPanel = (group: string) => {
    const panel = groupPanelRefs.current[group];
    if (!panel) return;

    setAccordionOpen(panel, true, { marginTop: 8 });
  };

  const toggleGroup = contextSafe((group: string) => {
    if (!isFull) {
      const isCurrentlyOpen = activeHomeGroupRef.current === group;

      if (isCurrentlyOpen) {
        closeGroupPanel(group);
        activeHomeGroupRef.current = null;
        setActiveHomeGroup(null);
        return;
      }

      if (activeHomeGroupRef.current) {
        closeGroupPanel(activeHomeGroupRef.current);
      }

      openGroupPanel(group);
      activeHomeGroupRef.current = group;
      setActiveHomeGroup(group);
      return;
    }

    const isCurrentlyOpen = Boolean(expandedGroupsRef.current[group]);
    const nextOpen = !isCurrentlyOpen;

    expandedGroupsRef.current = {
      ...expandedGroupsRef.current,
      [group]: nextOpen,
    };
    setExpandedGroups((current) => ({
      ...current,
      [group]: nextOpen,
    }));

    if (nextOpen) {
      openGroupPanel(group);
      return;
    }

    closeGroupPanel(group);
  });

  const isGroupExpanded = (group: string) =>
    isFull ? Boolean(expandedGroups[group]) : activeHomeGroup === group;

  const onHover = contextSafe((index: number) => {
    const dividerPulse = dividerPulseRefs.current[index];

    if (dividerPulse) {
      gsap.fromTo(
        dividerPulse,
        { x: "-100%", opacity: 0 },
        {
          x: "100%",
          opacity: 1,
          duration: 1.2,
          repeat: -1,
          repeatDelay: 0.2,
          ease: "power2.inOut",
        },
      );
    }
  });

  const onLeave = contextSafe((index: number) => {
    const dividerPulse = dividerPulseRefs.current[index];

    if (dividerPulse) {
      gsap.killTweensOf(dividerPulse);
      gsap.set(dividerPulse, { x: "-100%", opacity: 0 });
    }
  });

  useGSAP(
    () => {
      if (isFull) return;

      const items = itemsRef.current.filter((item) => item !== null);
      const titleLines = titleLinesRef.current.filter((line) => line !== null);
      const dividerLines = dividerLinesRef.current.filter(
        (line) => line !== null,
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        headerLineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1.5, ease: "power4.inOut" },
      );

      if (items.length > 0) {
        tl.fromTo(
          items,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out" },
          "-=1.2",
        );
      }

      const initialLines = [
        ...titleLines.slice(0, topLevelProjects.length + groupNames.length),
        ...dividerLines.slice(0, topLevelProjects.length + groupNames.length),
      ];

      if (initialLines.length > 0) {
        tl.fromTo(
          initialLines,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 1.2, stagger: 0.05, ease: "power4.inOut" },
          "-=1",
        );
      }

      groupNames.forEach((group) => {
        tl.fromTo(
          chevronRefs.current[group],
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
          "-=0.6",
        );

        const groupTitleLine = groupTitleLineRefs.current[group];
        if (groupTitleLine) {
          tl.fromTo(
            groupTitleLine,
            { scaleX: 0, transformOrigin: "left" },
            { scaleX: 1, duration: 1.2, ease: "power4.inOut" },
            "-=1",
          );
        }
      });
    },
    {
      scope: containerRef,
      dependencies: [topLevelProjects.length, groupNames.length, isFull],
    },
  );

  let itemIndex = 0;

  const renderProjectItem = (
    project: Project,
    options: {
      noAnimation?: boolean;
      animationIndex?: number;
      nested?: boolean;
    } = {},
  ) => {
    const index = itemIndex++;
    const animationIndex = options.animationIndex ?? index;
    const trackForScroll = !options.nested;

    return (
      <ProjectItem
        key={project.id}
        project={project}
        index={animationIndex}
        noAnimation={options.noAnimation ?? (options.nested || isFull)}
        nested={options.nested}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onLeave(index)}
        itemsRef={(el) => {
          if (trackForScroll) itemsRef.current[index] = el;
        }}
        titleLinesRef={(el) => {
          if (trackForScroll) titleLinesRef.current[index] = el;
        }}
        dividerLinesRef={(el) => {
          if (trackForScroll) dividerLinesRef.current[index] = el;
        }}
        dividerPulseRefs={(el) => {
          dividerPulseRefs.current[index] = el;
        }}
      />
    );
  };

  return (
    <section ref={containerRef} className="w-full flex flex-col gap-2">
      <div className="relative pb-2 mb-2 flex items-baseline justify-between">
        <div
          ref={headerLineRef}
          className="absolute bottom-0 left-0 w-full h-px bg-(--border)"
          style={
            isFull
              ? undefined
              : { transform: "scaleX(0)", transformOrigin: "left" }
          }
        />
        <h2 className="font-body-sm font-medium">
          {isFull ? (
            <span className="text-(--body)">{sectionTitle}</span>
          ) : (
            <DiaTextReveal
              text={sectionTitle}
              delay={0.2}
              duration={1.2}
              textColor="var(--body)"
            />
          )}
        </h2>
        <span className="font-body-sm font-medium text-(--subtext)">
          {isFull ? (
            <span>{String(projects.length).padStart(2, "0")}</span>
          ) : (
            <DiaTextReveal
              text={`0${projects.length}`}
              delay={0.4}
              duration={1.2}
              textColor="var(--subtext)"
            />
          )}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {topLevelProjects.map((project, index) =>
          renderProjectItem(project, { animationIndex: index }),
        )}

        {groupNames.map((group) => {
          const groupProjects = getProjectsForGroup(projects, group);
          const toggleIndex = itemIndex++;
          const isExpanded = isGroupExpanded(group);

          return (
            <div key={group} className="flex flex-col gap-2 w-full">
              <div
                ref={(el) => {
                  itemsRef.current[toggleIndex] = el;
                }}
                className="flex flex-col items-start group/toggle relative w-full"
                style={
                  isFull
                    ? undefined
                    : { opacity: 0, transform: "translateY(30px)" }
                }
                onMouseEnter={() => onHover(toggleIndex)}
                onMouseLeave={() => onLeave(toggleIndex)}
              >
                <div className="mb-2 flex w-full items-baseline justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => toggleGroup(group)}
                    className="group/toggle-btn relative z-10 flex items-center gap-1.5 text-left"
                    aria-expanded={isExpanded}
                  >
                    <span className="flex flex-col items-start gap-1">
                      <span
                        className={`font-body-sm font-medium transition-colors group-hover/toggle:text-(--body) group-hover/toggle-btn:text-(--accent) ${
                          isExpanded ? "text-(--body)" : "text-(--subtext)"
                        }`}
                      >
                        {formatGroupLabel(group)}
                      </span>
                      <div
                        ref={(el) => {
                          groupTitleLineRefs.current[group] = el;
                        }}
                        className="h-px w-full bg-(--body) relative overflow-hidden"
                        style={
                          isFull
                            ? undefined
                            : {
                                transform: "scaleX(0)",
                                transformOrigin: "left",
                              }
                        }
                      />
                    </span>
                    <div
                      ref={(el) => {
                        chevronRefs.current[group] = el;
                      }}
                      className="shrink-0 opacity-70 transition-opacity group-hover/toggle:opacity-100"
                    >
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>
                  {(!isFull || isExpanded) && (
                    <span className="shrink-0 font-body-sm font-medium text-(--subtext)">
                      {String(groupProjects.length).padStart(2, "0")}
                    </span>
                  )}
                </div>

                <div
                  ref={(el) => {
                    dividerLinesRef.current[toggleIndex] = el;
                  }}
                  className="absolute bottom-0 left-0 w-full h-px overflow-hidden bg-(--border)/40"
                  style={
                    isFull
                      ? undefined
                      : { transform: "scaleX(0)", transformOrigin: "left" }
                  }
                >
                  <div
                    ref={(el) => {
                      dividerPulseRefs.current[toggleIndex] = el;
                    }}
                    className="line-pulse"
                  />
                </div>
              </div>

              <div
                ref={(el) => {
                  groupPanelRefs.current[group] = el;
                }}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <div className="flex flex-col gap-2 w-full pl-1">
                  {groupProjects.map((project) =>
                    renderProjectItem(project, {
                      noAnimation: true,
                      nested: true,
                    }),
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showViewAllLink && totalGroupCount > groupNames.length && (
        <div className="pt-2">
          <TransitionLink
            href="/projects"
            className="inline-flex items-center gap-2 font-body-sm font-light text-(--subtext) transition-colors hover:text-(--accent)"
          >
            <span>View all projects</span>
            <span className="text-[10px] opacity-60">
              ({totalGroupCount} stacks)
            </span>
          </TransitionLink>
        </div>
      )}
    </section>
  );
}
