"use client";

import React, { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { casesData, Project } from "@/data/cases";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

// Modular Components
import CasesHeader from "./CasesHeader";
import CasesFilter from "./CasesFilter";
import ProjectRow from "./ProjectRow";

const CasesDesktop = () => {
  const { language } = useLanguage();
  const t = casesData[language];
  const [filter, setFilter] = useState("All");
  const [displayProjects, setDisplayProjects] = useState<Project[]>(
    t.projects as unknown as Project[]
  );
  // Track selected project ID
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const detailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollPosRef = useRef(0); // Store scroll position

  const handleFilterChange = (newFilter: string) => {
    if (newFilter === filter) return;

    // Helper to get new projects list
    const getNewProjects = (filterKey: string) => {
      const allLabel = language === "jp" ? "すべて" : "All";
      if (filterKey === "All" || filterKey === allLabel) return t.projects;
      return t.projects.filter((p) =>
        (p.tags as unknown as string[]).includes(filterKey)
      );
    };

    const projectElements =
      listContainerRef.current?.querySelectorAll(".project-row");

    if (projectElements && projectElements.length > 0) {
      gsap.to(projectElements, {
        y: 20,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
        onComplete: () => {
          setFilter(newFilter);
          setDisplayProjects(getNewProjects(newFilter) as unknown as Project[]);
        },
      });
    } else {
      setFilter(newFilter);
      setDisplayProjects(getNewProjects(newFilter) as unknown as Project[]);
    }
  };

  useGSAP(
    () => {
      // INTRO ANIMATION (Run only if no project is selected)
      if (!selectedProjectId) {
        const rows = listContainerRef.current?.querySelectorAll(".project-row");
        if (rows && rows.length > 0) {
          gsap.fromTo(
            rows,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              delay: 0.1,
            }
          );
        }
      }
    },
    { dependencies: [displayProjects], scope: containerRef }
  );

  const handleOpen = (project: Project, index: number) => {
    setSelectedProjectId(project.id);

    const header = headerRef.current;
    const allRows = rowRefs.current;

    // Store current scroll position before animating
    scrollPosRef.current = window.scrollY;

    // Smoothly scroll to top instead of jumping
    gsap.to(window, {
      scrollTo: 0,
      duration: 0.8,
      ease: "power3.inOut",
    });

    // Animate Header to 0 Height
    if (header) {
      gsap.to(header, {
        height: 0,
        opacity: 0,
        marginBottom: 0,
        overflow: "hidden",
        duration: 0.8,
        ease: "power3.inOut",
      });
    }

    // Animate Main Container Padding
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        paddingTop: 0,
        paddingBottom: 0,
        duration: 0.8,
        ease: "power3.inOut",
      });
    }

    // Animate Siblings to 0 Height
    allRows.forEach((row, i) => {
      if (!row) return;
      if (i === index) {
        // Ensure selected row is fully visible and reset transforms
        gsap.to(row, {
          y: 0,
          opacity: 1,
          height: "auto",
          minHeight: "100vh", // Animate to full screen
          paddingTop: "15vh", // Animate to center concurrently
          duration: 0.8,
          ease: "power3.inOut",
        });
      } else {
        // Collapse siblings
        gsap.to(row, {
          height: 0,
          opacity: 0,
          minHeight: 0, // Ensure siblings don't keep minHeight
          duration: 0.8,
          ease: "power3.inOut",
          overwrite: true,
        });
      }
    });
  };

  const handleClose = () => {
    setSelectedProjectId(null);

    const header = headerRef.current;
    const allRows = rowRefs.current;

    // Restore Main Container Padding
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        paddingTop: "10rem", // 160px/10rem matches pt-40
        paddingBottom: "10rem",
        duration: 0.8,
        ease: "power3.inOut",
      });
    }

    // Smoothly scroll back to original position
    gsap.to(window, {
      scrollTo: scrollPosRef.current,
      duration: 0.8,
      ease: "power3.inOut",
    });

    // Restore Header
    if (header) {
      gsap.to(header, {
        height: "auto",
        opacity: 1,
        marginBottom: "6rem", // mb-24 -> 6rem
        duration: 0.8,
        ease: "power3.inOut",
        clearProps: "overflow", // Allow overflow after animation if needed
      });
    }

    // Restore All Rows
    allRows.forEach((row) => {
      if (!row) return;
      gsap.to(row, {
        height: "auto",
        minHeight: 0, // Reset min-height
        paddingTop: 0,
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.inOut",
      });
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen pt-40 px-6 lg:px-12 text-[#963531] max-w-[1440px] mx-auto pb-40"
    >
      <div ref={headerRef} className="pointer-events-auto mb-24">
        <CasesHeader title={t.title} description={t.description} />
        <CasesFilter
          filters={t.filters as unknown as string[]}
          activeFilter={filter}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div ref={listContainerRef} className="flex flex-col gap-0 mt-0">
        {displayProjects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            isSelected={selectedProjectId === project.id}
            onOpen={handleOpen}
            onClose={handleClose}
            rowRef={(el) => (rowRefs.current[index] = el)}
            detailRef={(el) => (detailRefs.current[index] = el)}
          />
        ))}
      </div>
    </div>
  );
};

export default CasesDesktop;
