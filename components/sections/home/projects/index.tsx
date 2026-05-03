"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DiaTextReveal } from "@/components/ui/dia-text-rv";
import { projects } from "@/data/projects";
import { ProjectItem } from "./project-item";
import { ChevronDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerLineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const dividerLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const pulseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dividerPulseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const expandedRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  const [isExpanded, setIsExpanded] = React.useState(false);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const onHover = contextSafe((index: number) => {
    const pulse = pulseRefs.current[index];
    const dividerPulse = dividerPulseRefs.current[index];

    if (pulse) {
      gsap.fromTo(
        pulse,
        { x: "-100%", opacity: 0 },
        {
          x: "100%",
          opacity: 1,
          duration: 1,
          repeat: -1,
          repeatDelay: 0.2,
          ease: "power2.inOut",
        },
      );
    }

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
    const pulse = pulseRefs.current[index];
    const dividerPulse = dividerPulseRefs.current[index];

    if (pulse) {
      gsap.killTweensOf(pulse);
      gsap.set(pulse, { x: "-100%", opacity: 0 });
    }

    if (dividerPulse) {
      gsap.killTweensOf(dividerPulse);
      gsap.set(dividerPulse, { x: "-100%", opacity: 0 });
    }
  });

  const toggleAccordion = contextSafe(() => {
    const nextState = !isExpanded;
    setIsExpanded(nextState);

    if (expandedRef.current) {
      if (nextState) {
        gsap.fromTo(
          expandedRef.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.8, ease: "expo.out" },
        );
      } else {
        gsap.to(expandedRef.current, {
          height: 0,
          opacity: 0,
          duration: 1,
          ease: "expo.inOut",
        });
      }
    }
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

      // Initial visible items lines
      const initialLines = [
        ...titleLines.slice(0, 2),
        ...dividerLines.slice(0, 2),
      ];
      if (initialLines.length > 0) {
        tl.fromTo(
          initialLines,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 1.2, stagger: 0.05, ease: "power4.inOut" },
          "-=1",
        );
      }

      tl.fromTo(
        chevronRef.current,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
        "-=0.6",
      );
    },
    { scope: containerRef },
  );

  const latestProjects = projects.slice(0, 2);
  const pastProjects = projects.slice(2);

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
        {latestProjects.map((project, index) => (
          <ProjectItem
            key={project.id}
            project={project}
            index={index}
            onMouseEnter={() => onHover(index)}
            onMouseLeave={() => onLeave(index)}
            itemsRef={(el) => {
              itemsRef.current[index] = el;
            }}
            titleLinesRef={(el) => {
              titleLinesRef.current[index] = el;
            }}
            pulseRefs={(el) => {
              pulseRefs.current[index] = el;
            }}
            dividerLinesRef={(el) => {
              dividerLinesRef.current[index] = el;
            }}
            dividerPulseRefs={(el) => {
              dividerPulseRefs.current[index] = el;
            }}
          />
        ))}

        {pastProjects.length > 0 && (
          <div className="flex flex-col gap-2 w-full ">
            <button
              ref={(el) => {
                itemsRef.current[2] = el as any;
              }}
              onClick={toggleAccordion}
              className="flex items-center gap-2 text-[12px] font-medium text-(--subtext) hover:text-(--body) transition-colors group/toggle w-fit"
              style={{ opacity: 0, transform: "translateY(30px)" }}
              aria-expanded={isExpanded}
            >
              <DiaTextReveal
                text="Archived Projects"
                delay={0.8}
                duration={1.2}
                textColor="var(--subtext)"
              />
              <div ref={chevronRef} className="opacity-0">
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                />
              </div>
            </button>

            <div
              ref={expandedRef}
              className="overflow-hidden h-0 opacity-0 flex flex-col gap-2 w-full"
            >
              {pastProjects.map((project, idx) => {
                const index = idx + 3; // Start from 3 to avoid collision with button at index 2
                return (
                  <ProjectItem
                    key={project.id}
                    project={project}
                    index={index}
                    noAnimation={true}
                    onMouseEnter={() => onHover(index)}
                    onMouseLeave={() => onLeave(index)}
                    itemsRef={(el) => {
                      itemsRef.current[index] = el;
                    }}
                    titleLinesRef={(el) => {
                      titleLinesRef.current[index] = el;
                    }}
                    pulseRefs={(el) => {
                      pulseRefs.current[index] = el;
                    }}
                    dividerLinesRef={(el) => {
                      dividerLinesRef.current[index] = el;
                    }}
                    dividerPulseRefs={(el) => {
                      dividerPulseRefs.current[index] = el;
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
