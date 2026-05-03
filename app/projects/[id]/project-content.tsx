"use client";

import React, { useRef, useState } from "react";
import { useParams } from "next/navigation";
import { TransitionLink } from "@/components/ui/transition-link";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { projects } from "@/data/projects";
import { DiaTextReveal } from "@/components/ui/dia-text-rv";
import { ArrowLeft } from "lucide-react";
import { useSound } from "@/hooks/use-sound";

export default function ProjectContent() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
      className="relative min-h-screen pt-32 text-(--body) bg-(--bg)"
    >
      <nav className="absolute top-10 left-6 lg:left-12" aria-label="Breadcrumb">
        <TransitionLink
          href="/"
          className="group flex items-center gap-2 text-[var(--font-body-sm)] transition-all duration-500"
          aria-label="Back to Home"
        >
          <ArrowLeft
            size={11}
            className="opacity-40 group-hover:opacity-100 group-hover:-translate-x-1 transition-all"
            aria-hidden="true"
          />
          <span className="font-medium text-body-xs text-(--body) opacity-100">
            Home
          </span>
          <span className="opacity-20" aria-hidden="true">/</span>
          <span className="font-light text-body-xs text-(--subtext) opacity-50">
            Projects
          </span>
        </TransitionLink>
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

        <section className="mt-6 w-full max-w-[800px] mx-auto group" aria-label="Project Visual">
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
            <div className="absolute top-4 left-4 w-4 h-px bg-(--accent)/10" aria-hidden="true"></div>
            <div className="absolute top-4 left-4 h-4 w-px bg-(--accent)/10" aria-hidden="true"></div>
            <div className="absolute bottom-4 right-4 w-4 h-px bg-(--accent)/10" aria-hidden="true"></div>
            <div className="absolute bottom-4 right-4 h-4 w-px bg-(--accent)/10" aria-hidden="true"></div>
          </div>
        </section>

        {project.images.length > 1 && (
          <nav className="mt-8 flex justify-center gap-4 transition-opacity duration-700 opacity-0" ref={thumbsRef} aria-label="Gallery thumbnails">
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

        <section className="mt-20 w-full flex flex-col gap-10" aria-label="Project Details">
          <div className="font-light text-[var(--font-body-sm)] text-(--body)/80 leading-relaxed text-justify">
            <DiaTextReveal
              text={project.description}
              delay={0.6}
              duration={1.5}
            />
          </div>

          <div className="flex flex-col gap-0 mt-4 border-t border-(--body)/10">
            <div className="flex justify-between items-center py-5 border-b border-(--body)/10">
              <span className="text-[10px] font-medium text-(--subtext) opacity-40 uppercase tracking-widest">
                <DiaTextReveal text="Date" delay={0.7} />
              </span>
              <span className="text-body-xs font-medium text-(--body) uppercase">
                <DiaTextReveal text={project.date} delay={0.7} />
              </span>
            </div>
            <div className="flex justify-between items-center py-5 border-b border-(--body)/10">
              <span className="text-[10px] font-medium text-(--subtext) opacity-40 uppercase tracking-widest">
                <DiaTextReveal text="Contribution" delay={0.75} />
              </span>
              <span className="text-body-xs font-medium text-(--body) uppercase text-right max-w-[60%]">
                <DiaTextReveal text={project.contribution} delay={0.75} />
              </span>
            </div>
            <div className="flex justify-between items-center py-5 border-b border-(--body)/10">
              <span className="text-[10px] font-medium text-(--subtext) opacity-40 uppercase tracking-widest">
                <DiaTextReveal text="Extent" delay={0.8} />
              </span>
              <span className="text-body-xs font-medium text-(--body) uppercase">
                <DiaTextReveal text={project.extent.join(", ")} delay={0.8} />
              </span>
            </div>
            <div className="flex justify-between items-center py-5 border-b border-(--body)/10">
              <span className="text-[10px] font-medium text-(--subtext) opacity-40 uppercase tracking-widest">
                <DiaTextReveal text="Stack" delay={0.85} />
              </span>
              <span className="text-body-xs font-medium text-(--body) uppercase">
                <DiaTextReveal text={project.stack.join(", ")} delay={0.85} />
              </span>
            </div>
          </div>

          {project.devNotes && (
            <div className="flex flex-col gap-4 mt-8">
              <h2 className="text-[10px] font-medium text-(--subtext) opacity-40 uppercase tracking-widest">
                <DiaTextReveal text="Technical Overview" delay={1.0} duration={1.2} />
              </h2>
              <div className="font-light text-[var(--font-body-sm)] text-(--body)/70 leading-relaxed bg-(--body)/5 p-6 border-l-2 border-(--accent)/20">
                <DiaTextReveal
                  text={project.devNotes}
                  delay={1.2}
                  duration={1.5}
                />
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
