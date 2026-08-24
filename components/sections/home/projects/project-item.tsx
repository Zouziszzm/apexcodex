"use client";

import React from "react";
import { TransitionLink } from "@/components/ui/transition-link";
import { DiaTextReveal } from "@/components/ui/dia-text-rv";
import { formatProjectTitle } from "@/lib/format-project-title";

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
  dividerLinesRef: (el: HTMLDivElement | null) => void;
  dividerPulseRefs: (el: HTMLDivElement | null) => void;
  noAnimation?: boolean;
  nested?: boolean;
}

export const ProjectItem = ({
  project,
  index,
  onMouseEnter,
  onMouseLeave,
  itemsRef,
  titleLinesRef,
  dividerLinesRef,
  dividerPulseRefs,
  noAnimation = false,
  nested = false,
}: ProjectItemProps) => {
  const titleClass = nested ? "text-[13px]" : "";
  const subtextClass = nested ? "text-[11px]" : "text-[13px]";

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
            <span className={`text-(--body) ${titleClass}`}>
              {formatProjectTitle(project.title)}
            </span>
          ) : (
            <DiaTextReveal
              text={formatProjectTitle(project.title)}
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
        />
      </div>

      {noAnimation ? (
        <p className={`font-light ${subtextClass} text-(--subtext)`}>
          {project.subtext}
        </p>
      ) : (
        <p className={`font-light ${subtextClass} text-(--subtext)`}>
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
        className="absolute bottom-0 left-0 w-full h-px overflow-hidden bg-(--border)/40"
        style={{
          transform: noAnimation ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
        }}
      >
        <div
          ref={dividerPulseRefs}
          className="line-pulse"
        />
      </div>
    </div>
  );
};
