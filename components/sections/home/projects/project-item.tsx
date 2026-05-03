"use client";

import React from "react";
import { TransitionLink } from "@/components/ui/transition-link";
import { DiaTextReveal } from "@/components/ui/dia-text-rv";

interface ProjectItemProps {
  project: {
    id: string;
    title: string;
    subtext: string;
  };
  index: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  itemsRef: (el: HTMLDivElement | null) => void;
  titleLinesRef: (el: HTMLDivElement | null) => void;
  pulseRefs: (el: HTMLDivElement | null) => void;
  dividerLinesRef: (el: HTMLDivElement | null) => void;
  dividerPulseRefs: (el: HTMLDivElement | null) => void;
  noAnimation?: boolean;
}

export const ProjectItem = ({
  project,
  index,
  onMouseEnter,
  onMouseLeave,
  itemsRef,
  titleLinesRef,
  pulseRefs,
  dividerLinesRef,
  dividerPulseRefs,
  noAnimation = false,
}: ProjectItemProps) => {
  return (
    <div
      ref={itemsRef}
      className="flex flex-col items-start group relative "
      style={{
        opacity: noAnimation ? 1 : 0,
        transform: noAnimation ? "none" : "translateY(30px)",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-col items-start gap-1 w-fit mb-2">
        <TransitionLink
          href={`/projects/${project.id}`}
          className="font-body-sm font-medium transition-colors hover:text-(--accent)"
        >
          {noAnimation ? (
            <span className="text-(--body)">{project.title}</span>
          ) : (
            <DiaTextReveal
              text={project.title}
              delay={0.4 + index * 0.1}
              duration={1.2}
              textColor="var(--body)"
            />
          )}
        </TransitionLink>
        <div
          ref={titleLinesRef}
          className="w-full h-px bg-(--body) relative overflow-hidden"
          style={{
            transform: noAnimation ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
          }}
        >
          <div
            ref={pulseRefs}
            className="absolute inset-0 bg-linear-to-r from-transparent via-(--accent) to-transparent -translate-x-full"
          />
        </div>
      </div>

      {noAnimation ? (
        <p className="font-light text-[13px] text-(--subtext)">
          {project.subtext}
        </p>
      ) : (
        <p className="font-light text-[13px] text-(--subtext)">
          <DiaTextReveal
            text={project.subtext}
            delay={0.6 + index * 0.1}
            duration={1.5}
            textColor="var(--subtext)"
          />
        </p>
      )}

      <div
        ref={dividerLinesRef}
        className="absolute bottom-0 left-0 w-full h-px bg-(--border)/40 relative overflow-hidden"
        style={{
          transform: noAnimation ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
        }}
      >
        <div
          ref={dividerPulseRefs}
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/90 to-transparent -translate-x-full"
        />
      </div>
    </div>
  );
};
