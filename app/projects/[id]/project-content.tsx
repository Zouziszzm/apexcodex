"use client";

import React, { useRef, useState } from "react";
import { useParams } from "next/navigation";
import { TransitionLink } from "@/components/ui/transition-link";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { projects } from "@/data/projects";
import { DiaTextReveal } from "@/components/ui/dia-text-rv";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useSound } from "@/hooks/use-sound";

export default function ProjectContent() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const devNotesBgRef = useRef<HTMLDivElement>(null);
  const githubRef = useRef<HTMLDivElement>(null);
  const { playClick } = useSound();

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
      if (devNotesBgRef.current) {
        gsap.fromTo(
          devNotesBgRef.current,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power2.out",
            delay: 1.0,
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

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-body-sm bg-(--bg) text-(--body)">
        <p className="mb-4">Project not found.</p>
        <TransitionLink
          href="/"
          className="underline opacity-60 hover:opacity-100 transition-opacity"
        >
          Return Home
        </TransitionLink>
      </div>
    );
  }

  return (
    <main
      ref={containerRef}
      className="relative flex flex-col flex-1 pt-24 text-(--body) bg-(--bg)"
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
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(0)matrix(1, 0, 0, -1, 0, 0)"
              className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:-translate-x-1 transition-all"
              aria-hidden="true"
            >
              <path
                d="M4 10L3.29289 10.7071L2.58579 10L3.29289 9.29289L4 10ZM21 18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18L21 18ZM8.29289 15.7071L3.29289 10.7071L4.70711 9.29289L9.70711 14.2929L8.29289 15.7071ZM3.29289 9.29289L8.29289 4.29289L9.70711 5.70711L4.70711 10.7071L3.29289 9.29289ZM4 9L14 9L14 11L4 11L4 9ZM21 16L21 18L19 18L19 16L21 16ZM14 9C17.866 9 21 12.134 21 16L19 16C19 13.2386 16.7614 11 14 11L14 9Z"
                fill="currentColor"
              />
            </svg>
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

      <div className="max-w-2xl mx-auto px-6 flex flex-col items-center">
        <header className="flex flex-col items-center gap-1 text-center mt-4">
          <h1 className="font-medium text-[var(--font-body-sm)]">
            <DiaTextReveal text={project.title} delay={0.2} duration={1.2} />
          </h1>
          <div className="text-(--subtext) text-[10px] font-medium opacity-40">
            <DiaTextReveal text={project.date} delay={0.4} duration={1.2} />
          </div>
        </header>

        {project.images.length > 0 && (
          <section
            className="mt-6 w-full max-w-[800px] mx-auto group"
            aria-label="Project Visual"
          >
            <div
              ref={imageRef}
              className="aspect-[1.6/1] border border-(--accent)/10 bg-(--accent)/5 flex items-center justify-center relative overflow-hidden transition-all duration-700 opacity-0"
            >
              <Image
                src={project.images[currentImageIndex]}
                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover opacity-90 transition-all duration-1000"
                priority
              />
              <div
                className="absolute top-4 left-4 w-4 h-px bg-(--accent)/10"
                aria-hidden="true"
              ></div>
              <div
                className="absolute top-4 left-4 h-4 w-px bg-(--accent)/10"
                aria-hidden="true"
              ></div>
              <div
                className="absolute bottom-4 right-4 w-4 h-px bg-(--accent)/10"
                aria-hidden="true"
              ></div>
              <div
                className="absolute bottom-4 right-4 h-4 w-px bg-(--accent)/10"
                aria-hidden="true"
              ></div>
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
                  playClick();
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
          className="mt-12 w-full flex flex-col gap-8"
          aria-label="Project Details"
        >
          <div className="font-light text-body-sm leading-relaxed text-justify">
            <DiaTextReveal delay={0.6} duration={1.5}>
              {project.description}
            </DiaTextReveal>
            {(project.github || project.liveUrl) && (
              <div
                ref={githubRef}
                className="flex justify-center gap-6 mt-6 opacity-0"
              >
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm font-light transition-opacity flex items-center gap-2 group/github border-b border-transparent hover:border-(--body)/20 pb-0.5 underline-offset-4"
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
                    className="text-body-sm font-light transition-opacity flex items-center gap-2 group/live border-b border-transparent hover:border-(--body)/20 pb-0.5 underline-offset-4"
                  >
                    <ExternalLink size={12} className="opacity-100" />
                    <DiaTextReveal text="Live Site" delay={0.8} />
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-0 mt-4">
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

          {project.devNotes && (
            <div className="flex flex-col gap-4 mt-8">
              <h2 className="text-caption font-light opacity-50">
                <DiaTextReveal text="Dev Notes" delay={1.0} duration={1.2} />
              </h2>
              <div
                ref={devNotesBgRef}
                className="font-light text-caption bg-(--body)/5 p-4 border-l-2 border-(--accent)/20"
              >
                <DiaTextReveal
                  delay={1.2}
                  duration={1.5}
                  textColor="var(--body)"
                >
                  {project.devNotes}
                </DiaTextReveal>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
