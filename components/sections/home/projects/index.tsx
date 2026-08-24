"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DiaTextReveal } from "@/components/ui/dia-text-rv";
import type { Project } from "@/types/projects";
import { ProjectItem } from "./project-item";
import { ChevronDown } from "lucide-react";
import { setAccordionOpen } from "@/lib/animate-accordion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectsSectionProps {
  projects: Project[];
}

function formatGroupLabel(group: string): string {
  return group.charAt(0).toUpperCase() + group.slice(1);
}

export const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerLineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);
  const titleLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const dividerLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const dividerPulseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const expandedRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const chevronRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [expandedGroups, setExpandedGroups] = React.useState<
    Record<string, boolean>
  >({});
  const expandedGroupsRef = useRef<Record<string, boolean>>({});

  const { contextSafe } = useGSAP({ scope: containerRef });

  const topLevelProjects = projects.filter((project) => !project.group);
  const groupNames = [
    ...new Set(
      projects
        .map((project) => project.group)
        .filter((group): group is string => Boolean(group)),
    ),
  ];

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

  const toggleGroup = contextSafe((group: string) => {
    const nextState = !expandedGroupsRef.current[group];
    const expandedEl = expandedRefs.current[group];

    if (!expandedEl) return;

    expandedGroupsRef.current[group] = nextState;
    setExpandedGroups((current) => ({ ...current, [group]: nextState }));
    setAccordionOpen(expandedEl, nextState);
  });

  useGSAP(
    () => {
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
      });
    },
    { scope: containerRef, dependencies: [topLevelProjects.length, groupNames.length] },
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

    return (
      <ProjectItem
        key={project.id}
        project={project}
        index={animationIndex}
        noAnimation={options.noAnimation}
        nested={options.nested}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onLeave(index)}
        itemsRef={(el) => {
          itemsRef.current[index] = el;
        }}
        titleLinesRef={(el) => {
          titleLinesRef.current[index] = el;
        }}
        dividerLinesRef={(el) => {
          dividerLinesRef.current[index] = el;
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
          style={{ transform: "scaleX(0)", transformOrigin: "left" }}
        />
        <h2 className="font-body-sm font-medium">
          <DiaTextReveal
            text="02 Projects"
            delay={0.2}
            duration={1.2}
            textColor="var(--body)"
          />
        </h2>
        <span className="font-body-sm font-medium text-(--subtext)">
          <DiaTextReveal
            text={`0${projects.length}`}
            delay={0.4}
            duration={1.2}
            textColor="var(--subtext)"
          />
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {topLevelProjects.map((project, index) =>
          renderProjectItem(project, { animationIndex: index }),
        )}

        {groupNames.map((group, groupIndex) => {
          const groupProjects = projects
            .filter((project) => project.group === group)
            .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
          const toggleIndex = itemIndex++;
          const isExpanded = expandedGroups[group] ?? false;

          return (
            <div key={group} className="flex flex-col gap-2 w-full">
              <div
                ref={(el) => {
                  itemsRef.current[toggleIndex] = el;
                }}
                className="flex flex-col items-start group/toggle relative w-full"
                style={{ opacity: 0, transform: "translateY(30px)" }}
                onMouseEnter={() => onHover(toggleIndex)}
                onMouseLeave={() => onLeave(toggleIndex)}
              >
                <div className="mb-2 flex w-full items-baseline justify-between gap-4">
                  <button
                    onClick={() => toggleGroup(group)}
                    className="group/toggle-btn flex items-center gap-1.5 text-left"
                    aria-expanded={isExpanded}
                  >
                    <span className="flex flex-col items-start gap-1">
                      <span className="font-body-sm font-medium text-(--subtext) transition-colors group-hover/toggle:text-(--body) group-hover/toggle-btn:text-(--accent)">
                        <DiaTextReveal
                          text={formatGroupLabel(group)}
                          delay={0.6 + groupIndex * 0.1}
                          duration={1.2}
                          textColor="var(--subtext)"
                        />
                      </span>
                      <div
                        ref={(el) => {
                          titleLinesRef.current[toggleIndex] = el;
                        }}
                        className="w-full h-px bg-(--body) relative overflow-hidden"
                        style={{
                          transform: "scaleX(0)",
                          transformOrigin: "left",
                        }}
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
                  <span className="shrink-0 font-body-sm font-medium text-(--subtext)">
                    {String(groupProjects.length).padStart(2, "0")}
                  </span>
                </div>

                <div
                  ref={(el) => {
                    dividerLinesRef.current[toggleIndex] = el;
                  }}
                  className="absolute bottom-0 left-0 w-full h-px overflow-hidden bg-(--border)/40"
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
                  expandedRefs.current[group] = el;
                }}
                className="overflow-hidden flex flex-col gap-2 w-full pl-1"
                style={{ height: 0, opacity: 0 }}
              >
                {groupProjects.map((project) =>
                  renderProjectItem(project, {
                    noAnimation: true,
                    nested: true,
                  }),
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
