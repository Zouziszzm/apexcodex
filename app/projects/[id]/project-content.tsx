"use client";

import React, { useRef, useState } from "react";
import { TransitionLink } from "@/components/ui/transition-link";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { Project } from "@/types/projects";
import { PortfolioMarkdown } from "@/components/projects/portfolio-markdown";
import { DiaTextReveal } from "@/components/ui/dia-text-rv";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { formatProjectTitle } from "@/lib/format-project-title";

interface ProjectContentProps {
  project: Project;
  prevProject?: Project;
  nextProject?: Project;
}

function ProjectNavLink({
  href,
  label,
  direction,
}: {
  href: string;
  label: string;
  direction: "prev" | "next";
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const shortLabel = direction === "prev" ? "Previous" : "Next";

  return (
    <TransitionLink
      href={href}
      aria-label={
        direction === "prev" ? `Previous project: ${label}` : `Next project: ${label}`
      }
      className="group inline-flex max-w-full shrink-0 items-center gap-1.5 whitespace-nowrap text-[var(--font-body-sm)] transition-all duration-500"
    >
      {direction === "prev" ? (
        <>
          <Icon
            size={14}
            className="shrink-0 opacity-40 transition-all group-hover:-translate-x-0.5 group-hover:opacity-100"
            aria-hidden="true"
          />
          <span className="font-medium text-caption opacity-100 lg:hidden">
            {shortLabel}
          </span>
          <span className="hidden truncate font-medium text-caption opacity-100 lg:inline">
            {label}
          </span>
        </>
      ) : (
        <>
          <span className="font-medium text-caption opacity-100 lg:hidden">
            {shortLabel}
          </span>
          <span className="hidden truncate font-medium text-caption opacity-100 lg:inline">
            {label}
          </span>
          <Icon
            size={14}
            className="shrink-0 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
            aria-hidden="true"
          />
        </>
      )}
    </TransitionLink>
  );
}

export default function ProjectContent({
  project,
  prevProject,
  nextProject,
}: ProjectContentProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const githubRef = useRef<HTMLDivElement>(null);
  const displayTitle = formatProjectTitle(project.title);

  useGSAP(
    () => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
            delay: 0.2,
          },
        );
      }
      if (thumbsRef.current) {
        gsap.fromTo(
          thumbsRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.3,
          },
        );
      }
      if (githubRef.current) {
        gsap.fromTo(
          githubRef.current,
          { opacity: 0, y: 5 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
            delay: 0.8,
          },
        );
      }
    },
    { scope: containerRef, dependencies: [project] },
  );

  const description =
    typeof project.description === "string" ? project.description.trim() : "";
  const showDescription = description.length > 0;
  const showTechnicalDetails = Boolean(project.technicalDetails);

  return (
    <main
      ref={containerRef}
      className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col overflow-x-hidden px-6 pt-24 text-(--body)"
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

      <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col">
        <header className="mt-4 flex w-full flex-col items-center gap-3">
          <nav
            className="flex w-full items-center justify-between gap-4"
            aria-label="Project navigation"
          >
            <div className="min-w-0">
              {prevProject ? (
                <ProjectNavLink
                  href={`/projects/${prevProject.id}`}
                  label={formatProjectTitle(prevProject.title)}
                  direction="prev"
                />
              ) : (
                <span aria-hidden="true" />
              )}
            </div>
            <div className="min-w-0">
              {nextProject ? (
                <ProjectNavLink
                  href={`/projects/${nextProject.id}`}
                  label={formatProjectTitle(nextProject.title)}
                  direction="next"
                />
              ) : (
                <span aria-hidden="true" />
              )}
            </div>
          </nav>

          <div className="text-center">
            <h1 className="font-medium text-[var(--font-body-sm)]">
              <DiaTextReveal text={displayTitle} delay={0.2} duration={1.2} />
            </h1>
            <div className="text-(--subtext) text-[10px] font-medium opacity-40">
              <DiaTextReveal text={project.date} delay={0.4} duration={1.2} />
            </div>
          </div>
        </header>

        {project.images.length > 0 && (
          <section
            className="mt-6 w-full group"
            aria-label="Project Visual"
          >
            <div
              ref={imageRef}
              className="aspect-[1.6/1] border border-(--accent)/10 bg-(--accent)/5 flex items-center justify-center relative overflow-hidden transition-all duration-700 opacity-0"
            >
              <Image
                src={project.images[currentImageIndex]}
                alt={`${displayTitle} screenshot ${currentImageIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 72rem"
                className="object-cover opacity-90 transition-all duration-1000"
                priority
              />
            </div>
          </section>
        )}

        {project.images.length > 1 && (
          <nav
            className="mt-6 flex justify-center gap-4 transition-opacity duration-700 opacity-0"
            ref={thumbsRef}
            aria-label="Gallery thumbnails"
          >
            {project.images.map((img, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentImageIndex(i);
                }}
                aria-label={`Show visual ${i + 1}`}
                aria-pressed={currentImageIndex === i}
                className={`w-16 h-16 border transition-all duration-700 flex items-center justify-center p-1 ${
                  currentImageIndex === i
                    ? "border-(--accent) bg-(--accent)/10"
                    : "border-(--accent)/10 bg-(--accent)/5 hover:border-(--accent)/50"
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover opacity-80"
                  />
                </div>
              </button>
            ))}
          </nav>
        )}

        <section
          className="mt-12 flex w-full min-w-0 flex-col gap-8"
          aria-label="Project Details"
        >
          {showDescription && (
            <div className="w-full min-w-0 font-light text-body-sm leading-relaxed text-left">
              {project.markdown ? (
                <PortfolioMarkdown content={description} animate baseDelay={0.6} />
              ) : (
                <DiaTextReveal delay={0.6} duration={1.5}>
                  {project.description}
                </DiaTextReveal>
              )}
            </div>
          )}

          {(project.github || project.liveUrl) && (
            <div
              ref={githubRef}
              className="flex justify-center gap-6 opacity-0"
            >
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm font-light transition-opacity flex items-center gap-2 border-b border-transparent hover:border-(--body)/20 pb-0.5 underline-offset-4"
                >
                  <ExternalLink size={12} className="opacity-100" />
                  <DiaTextReveal text="GitHub" delay={0.8} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm font-light transition-opacity flex items-center gap-2 border-b border-transparent hover:border-(--body)/20 pb-0.5 underline-offset-4"
                >
                  <ExternalLink size={12} className="opacity-100" />
                  <DiaTextReveal text="Live Site" delay={0.8} />
                </a>
              )}
            </div>
          )}

          <div className="mt-2 flex w-full min-w-0 flex-col gap-0">
            <div className="flex justify-between items-center py-3.5">
              <span className="text-caption font-light opacity-40 ">
                <DiaTextReveal text="Date" delay={0.7} />
              </span>
              <span className="text-caption font-light ">
                <DiaTextReveal text={project.date} delay={0.7} />
              </span>
            </div>
            <div className="flex justify-between items-center py-3.5 ">
              <span className="text-caption font-light opacity-40">
                <DiaTextReveal text="Contribution" delay={0.75} />
              </span>
              <span className="text-caption font-light text-right max-w-[60%]">
                <DiaTextReveal text={project.contribution} delay={0.75} />
              </span>
            </div>
            <div className="flex justify-between items-center py-3.5 ">
              <span className="text-caption font-light opacity-40">
                <DiaTextReveal text="Extent" delay={0.8} />
              </span>
              <span className="text-caption font-light   ">
                <DiaTextReveal text={project.extent.join(", ")} delay={0.8} />
              </span>
            </div>
            <div className="flex justify-between items-center py-3.5 ">
              <span className="text-caption font-light opacity-40">
                <DiaTextReveal text="Stack" delay={0.85} />
              </span>
              <span className="text-caption font-light   ">
                <DiaTextReveal text={project.stack.join(", ")} delay={0.85} />
              </span>
            </div>
          </div>

          {showTechnicalDetails && project.technicalDetails && (
            <details
              className="w-full border border-(--accent)/10 bg-(--body)/5"
              open={!project.detailsCollapsed}
            >
              <summary className="cursor-pointer px-4 py-3 text-caption font-light opacity-60 hover:opacity-100 transition-opacity">
                Technical details
              </summary>
              <div className="px-4 pb-4">
                <PortfolioMarkdown
                  content={project.technicalDetails}
                  animate
                  baseDelay={0.9}
                />
              </div>
            </details>
          )}
        </section>
      </div>
    </main>
  );
}
