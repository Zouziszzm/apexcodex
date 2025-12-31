"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { casesData } from "@/data/cases";
import Image from "next/image";

const CasesMobile = () => {
  const { language } = useLanguage();
  const t = casesData[language];
  const allProjects = t.projects as readonly import("@/data/cases").Project[];

  // Filter State
  const [activeFilter, setActiveFilter] = useState<string>(t.filters[0]);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  // Filter Logic
  const projects = useMemo(() => {
    const allLabel = t.filters[0];
    if (activeFilter === allLabel) return allProjects;

    return allProjects.filter((p) => {
      const tags = p.tags;
      return tags.includes(activeFilter);
    });
  }, [activeFilter, allProjects, t.filters]);

  // Minimap refs
  const minimapRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const snapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const state = useRef({
    currentTranslate: 0,
    targetTranslate: 0,
    maxTranslate: 0,
    containerSize: 0,
    isDragging: false,
    startX: 0,
  });

  // Reset scroll when filter changes
  useEffect(() => {
    // eslint-disable-next-line
    setActiveProjectIndex(0);
    state.current.currentTranslate = 0;
    state.current.targetTranslate = 0;
    if (itemsRef.current) {
      itemsRef.current.style.transform = `translateX(0px)`;
    }

    // Re-calc dimensions immediately
    const itemWidth = 72;
    state.current.maxTranslate = -(projects.length - 1) * itemWidth;
  }, [activeFilter, projects.length]);

  useEffect(() => {
    const items = itemsRef.current;
    if (!items) return;

    // Dimensions
    const updateDimensions = () => {
      const itemWidth = 72; // 64px w + 8px gap approx
      state.current.containerSize = items.scrollWidth;
      state.current.maxTranslate = -(projects.length - 1) * itemWidth;
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // Lerp
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      const s = state.current;
      const lerpFactor = s.isDragging ? 0.2 : 0.1;
      s.currentTranslate = lerp(
        s.currentTranslate,
        s.targetTranslate,
        lerpFactor
      );

      if (Math.abs(s.currentTranslate - s.targetTranslate) > 0.05) {
        items.style.transform = `translateX(${s.currentTranslate}px)`;

        const itemWidth = 72;
        const index = Math.round(-s.currentTranslate / itemWidth);
        setActiveProjectIndex(
          Math.max(0, Math.min(index, projects.length - 1))
        );
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);

    // Touch/Wheel Handlers (Global / Container level)
    const handleStart = (e: TouchEvent | MouseEvent) => {
      state.current.isDragging = true;
      state.current.startX = "touches" in e ? e.touches[0].clientX : e.clientX;
      // Clear snap timeout on user interaction
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    };

    const handleMove = (e: TouchEvent | MouseEvent) => {
      if (!state.current.isDragging) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const delta = x - state.current.startX;
      state.current.startX = x;
      state.current.targetTranslate += delta * 1.5;
      clamp();
    };

    const snapToNearest = () => {
      const itemWidth = 72;
      const index = Math.round(-state.current.targetTranslate / itemWidth);
      const clampedIndex = Math.max(0, Math.min(index, projects.length - 1));
      state.current.targetTranslate = -clampedIndex * itemWidth;
    };

    const handleEnd = () => {
      state.current.isDragging = false;
      snapToNearest();
    };

    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY;
      state.current.targetTranslate -= delta * 0.8;
      clamp();

      // Clear existing timeout
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);

      // Set new timeout to snap after scroll stops
      snapTimeoutRef.current = setTimeout(() => {
        snapToNearest();
      }, 100);
    };

    const clamp = () => {
      if (state.current.targetTranslate > 0) state.current.targetTranslate = 0;
      if (state.current.targetTranslate < state.current.maxTranslate)
        state.current.targetTranslate = state.current.maxTranslate;
    };

    window.addEventListener("touchstart", handleStart, { passive: true });
    window.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("touchend", handleEnd);
    window.addEventListener("mousedown", handleStart);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("resize", updateDimensions);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);

      window.removeEventListener("touchstart", handleStart);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
      window.removeEventListener("mousedown", handleStart);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [projects]);

  const activeProject = projects[activeProjectIndex] || projects[0];

  return (
    <div className="min-h-screen bg-(--bg-mobile-cases) px-6 pt-32 pb-12 flex flex-col relative overflow-hidden">
      {/* Title Group */}
      <div className="mb-8">
        <h1 className="text-(--text-primary) text-[18px] font-bold mb-4">
          {t.title}
        </h1>
        <p className="text-(--text-primary) text-[15px] leading-snug w-[90%]">
          {t.description}
        </p>
      </div>

      {/* Filters List */}
      <div className="flex flex-col mb-10 gap-1">
        {t.filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            aria-label={
              language === "jp" ? `${filter} フィルター` : `${filter} filter`
            }
            aria-pressed={activeFilter === filter}
            className={`text-[14px] text-left transition-colors duration-700 ${
              activeFilter === filter
                ? "text-(--text-primary) font-medium"
                : "text-(--text-primary)/40 hover:text-(--text-primary)/70"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      {activeProject ? (
        <div className="flex-1 flex flex-col min-h-0 mb-32">
          {/* Image */}
          <div className="w-full aspect-3/2 bg-(--text-primary)/10 border border-(--text-primary)/20 mb-6 relative overflow-hidden">
            {/* Visual Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={activeProject.images[0]}
                alt={activeProject.title}
                className="object-cover opacity-80"
                fill
              />
            </div>
            {/* Decorative Lines from image */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjOTYzNTMxIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')]"></div>
          </div>

          {/* Text */}
          <h2 className="text-(--text-primary) text-[18px] mb-4">
            {activeProject.title}
          </h2>
          {/* Grid Stack for fixed height */}
          <div className="grid grid-cols-1 grid-rows-1">
            {/* Invisible spacer with longest description */}
            <p className="text-(--text-primary) text-[15px] leading-snug col-start-1 row-start-1 invisible pointer-events-none">
              {projects.reduce(
                (longest, current) =>
                  current.description.length > longest.length
                    ? current.description
                    : longest,
                ""
              )}
            </p>
            {/* Visible content */}
            <p className="text-(--text-primary) text-[15px] leading-snug col-start-1 row-start-1">
              {activeProject.description}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center mb-32 text-(--text-primary)/50 italic">
          {language === "jp"
            ? "プロジェクトが見つかりません。"
            : "No projects found."}
        </div>
      )}

      {/* Bottom Minimap */}
      {activeProject && (
        <div className="absolute bottom-12 left-6 right-6 h-16">
          <div className="relative w-full h-full" ref={minimapRef}>
            {/* Focus Indicator (Static Box at Left) */}
            <div className="absolute top-0 left-0 w-16 h-16 border border-(--text-primary) z-20 pointer-events-none bg-transparent"></div>

            {/* Scrollable Strip */}
            <div
              ref={itemsRef}
              className="flex gap-2 h-full absolute top-0 left-0 will-change-transform cursor-grab active:cursor-grabbing"
            >
              {projects.map((p, i) => (
                <div
                  key={p.id}
                  className="w-16 h-16 bg-(--text-primary)/10 border border-(--text-primary)/10 shrink-0 flex items-center justify-center overflow-hidden duration-700 transition-all"
                  style={{
                    opacity: i === activeProjectIndex ? 1 : 0.8,
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={p.images[0]}
                      alt={p.title}
                      className="object-cover"
                      fill
                    />
                  </div>
                </div>
              ))}
              {/* Extra space to allow last item to reach first slot */}
              <div className="w-[calc(100vw-6rem)] h-16 shrink-0"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CasesMobile;
