"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DiaTextReveal } from "@/components/ui/dia-text-rv";
import { projects } from "@/data/projects";
import { ProjectItem } from "./project-item";

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

      const allLines = [...titleLines, ...dividerLines];
      if (allLines.length > 0) {
        tl.fromTo(
          allLines,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 1.2, stagger: 0.05, ease: "power4.inOut" },
          "-=1",
        );
      }
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="w-full mt-6 flex flex-col gap-2">
      <div className="relative pb-2 mb-2">
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
      </div>

      <div className="flex flex-col gap-2">
        {projects.map((project, index) => (
          <ProjectItem
            key={project.id}
            project={project}
            index={index}
            onMouseEnter={() => onHover(index)}
            onMouseLeave={() => onLeave(index)}
            itemsRef={(el) => { itemsRef.current[index] = el; }}
            titleLinesRef={(el) => { titleLinesRef.current[index] = el; }}
            pulseRefs={(el) => { pulseRefs.current[index] = el; }}
            dividerLinesRef={(el) => { dividerLinesRef.current[index] = el; }}
            dividerPulseRefs={(el) => { dividerPulseRefs.current[index] = el; }}
          />
        ))}
      </div>
    </section>
  );
};
