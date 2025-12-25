"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@/data/cases";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowUpRight } from "lucide-react";
import Copy from "@/components/Copy";

interface ProjectDetailProps {
  project: Project;
  isSelected: boolean;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  isSelected,
}) => {
  const { language } = useLanguage();
  const [showContent, setShowContent] = useState(isSelected);
  // Track active image index for gallery
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Sync state with prop: if selected, show immediately
  if (isSelected && !showContent) {
    setShowContent(true);
  }

  useEffect(() => {
    if (!isSelected) {
      const timer = setTimeout(() => {
        setShowContent(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isSelected]);

  return (
    <div className="pt-2 w-full mx-auto flex flex-col">
      {/* DESCRIPTION */}
      <div className="mb-16">
        <Copy forceReady={showContent} delay={0.2}>
          <p className="text-[17px] lg:text-[18px] leading-[1.45] text-[#963531] max-w-[95%]">
            {project.description}
          </p>
        </Copy>
      </div>

      {/* META GRID */}
      <div className="border-t border-[#963531]/20">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex justify-between items-center py-4 border-b border-[#963531]/20 pr-0 md:pr-10">
            <span className="text-[14px] text-[#963531]/50 uppercase tracking-widest">
              {language === "jp" ? "日付" : "Date"}
            </span>
            <span className="text-[16px] font-medium uppercase">
              {project.date}
            </span>
          </div>
          <div className="flex justify-between items-center py-4 border-b border-[#963531]/20 pl-0 md:pl-10">
            <span className="text-[14px] text-[#963531]/50 uppercase tracking-widest">
              {language === "jp" ? "貢献" : "Contribution"}
            </span>
            <span className="text-[16px] font-medium uppercase">
              {project.contribution}
            </span>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex justify-between items-center py-4 border-b border-[#963531]/20 pr-0 md:pr-10">
            <span className="text-[14px] text-[#963531]/50 uppercase tracking-widest">
              {language === "jp" ? "範囲" : "Extent"}
            </span>
            <span className="text-[16px] font-medium uppercase">
              {project.extent.join(", ")}
            </span>
          </div>
          <div className="flex items-center gap-8 py-4 border-b border-[#963531]/20 pl-0 md:pl-10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[16px] font-medium uppercase hover:opacity-60 transition-opacity"
              >
                {language === "jp" ? "ライブ" : "Live"}{" "}
                <ArrowUpRight size={14} />
              </a>
            )}
            {project.iosUrl && (
              <a
                href={project.iosUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[16px] font-medium uppercase hover:opacity-60 transition-opacity"
              >
                IOS <ArrowUpRight size={14} />
              </a>
            )}
            {project.androidUrl && (
              <a
                href={project.androidUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[16px] font-medium uppercase hover:opacity-60 transition-opacity"
              >
                Android <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex justify-between items-center py-4 border-b border-[#963531]/20 pr-0 md:pr-10">
            <span className="text-[14px] text-[#963531]/50 uppercase tracking-widest">
              Stack
            </span>
            <span className="text-[16px] font-medium uppercase text-right">
              {project.stack.join(", ")}
            </span>
          </div>
          <div className="py-4 border-b border-[#963531]/20 pl-0 md:pl-10"></div>
        </div>
      </div>

      {/* MAIN IMAGE DISPLAY */}
      <div className="mt-20 w-full max-w-[800px] mx-auto group">
        <div
          className="aspect-[1.6/1] border border-[#963531]/10 bg-[#963531]/5 flex items-center justify-center relative overflow-hidden transition-all duration-500"
          key={activeImageIndex} // Key forces re-render/anim on change if needed
        >
          <span className="text-[12px] uppercase tracking-[0.3em] opacity-30 select-none">
            {project.title} Visual {activeImageIndex + 1}
          </span>
          {/* Subtle corner accents */}
          <div className="absolute top-4 left-4 w-4 h-px bg-[#963531]/10"></div>
          <div className="absolute top-4 left-4 h-4 w-px bg-[#963531]/10"></div>
          <div className="absolute bottom-4 right-4 w-4 h-px bg-[#963531]/10"></div>
          <div className="absolute bottom-4 right-4 h-4 w-px bg-[#963531]/10"></div>
        </div>
      </div>

      {/* GALLERY THUMBNAILS (Clickable) */}
      <div className="mt-8 flex justify-center gap-4">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => setActiveImageIndex(i)}
            className={`w-16 h-16 border transition-all duration-300 flex items-center justify-center ${
              activeImageIndex === i
                ? "border-[#963531] bg-[#963531]/10"
                : "border-[#963531]/10 bg-[#963531]/5 hover:border-[#963531]/50"
            }`}
          >
            <div
              className={`w-1 h-1 rounded-full transition-colors ${
                activeImageIndex === i ? "bg-[#963531]" : "bg-[#963531]/10"
              }`}
            ></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;
