"use client";

import React from "react";
import Line from "@/components/Line";
import { Project } from "@/data/cases";
import ProjectDetail from "./ProjectDetail";

interface ProjectRowProps {
  project: Project;
  index: number;
  isSelected: boolean;
  onOpen: (project: Project, index: number) => void;
  onClose: () => void;
  rowRef: (el: HTMLDivElement | null) => void;
  detailRef: (el: HTMLDivElement | null) => void;
}

import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";

const ProjectRow: React.FC<ProjectRowProps> = ({
  project,
  index,
  isSelected,
  onOpen,
  onClose,
  rowRef,
  detailRef,
}) => {
  const { language } = useLanguage();

  return (
    <div
      ref={rowRef}
      className={`project-row w-full overflow-hidden ${isSelected ? "" : ""}`}
    >
      <div className={`w-full py-2 md:py-4`}>
        <div className="w-full mx-auto">
          {/* BACK BUTTON: RELATIVE POSITION WITH SMOOTH REVEAL */}
          <div
            className={`overflow-hidden transition-all duration-700 ease-in-out ${
              isSelected
                ? "max-h-[100px] opacity-100 mb-6 delay-800"
                : "max-h-0 opacity-0 mb-0 pointer-events-none"
            }`}
          >
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-[16px] text-[var(--text-primary)] hover:opacity-70 transition-opacity uppercase tracking-wider font-medium pointer-events-auto"
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
              {language === "jp" ? "戻る" : "Back"}
            </button>
          </div>

          {/* ROW SUMMARY: VISIBLE IN LIST, STAYS VISIBLE ON EXPAND */}
          <div
            onClick={() => {
              if (!isSelected) onOpen(project, index);
            }}
            className={`w-full flex flex-col md:flex-row justify-between items-start md:items-center group cursor-pointer ${
              isSelected ? "pointer-events-none" : ""
            }`}
          >
            <p className="text-[var(--text-primary)] text-[20px] mb-2 md:mb-0 group-hover:translate-x-2 transition-transform duration-300">
              {project.title}
            </p>
            <div className="w-full md:w-[45%] flex justify-between items-center">
              <p className="text-[#5C5C5C]/50 text-[14px]">
                {project.tags.join(" | ")}
              </p>
              <p className="text-[var(--text-primary)] text-[18px]">
                {project.category}
              </p>
            </div>
          </div>

          <Line
            className="line-divider mt-4"
            delay={0.1 * index}
            animateOnScroll={false}
          />

          {/* INLINE DETAIL VIEW: EXPANDS ON CLICK */}
          <div
            ref={detailRef}
            className={`overflow-hidden transition-all duration-1000 ease-in-out ${
              isSelected
                ? "max-h-[3000px] opacity-100 mt-12 "
                : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <ProjectDetail project={project} isSelected={isSelected} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectRow;
