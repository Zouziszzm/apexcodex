"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@/data/cases";
import { useLanguage } from "@/contexts/LanguageContext";

import { ArrowUpRight } from "lucide-react";
import Copy from "@/components/Copy";
import Line from "@/components/Line";
import Image from "next/image";

interface ProjectDetailProps {
  project: Project;
  isSelected: boolean;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  isSelected,
}) => {
  const { language } = useLanguage();
  const [showContent, setShowContent] = useState(false);
  // Track active image index for gallery
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (isSelected) {
      // Wait for expansion to finish before animating in
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
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
          <p className="text-[17px] lg:text-[18px] leading-[1.45] text-[var(--text-primary)] max-w-[95%]">
            {project.description}
          </p>
        </Copy>
      </div>

      {/* META GRID */}
      <div className="relative">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 relative">
          <div className="flex justify-between items-center py-4 mr-10 pr-0 md:pr-10 relative">
            <Copy forceReady={showContent} delay={0.1}>
              <span className="text-[14px] text-[var(--text-primary)]/50 uppercase tracking-widest">
                {language === "jp" ? "日付" : "Date"}
              </span>
            </Copy>
            <Copy forceReady={showContent} delay={0.1}>
              <span className="text-[16px] font-medium uppercase">
                {project.date}
              </span>
            </Copy>
            <Line
              forceReady={showContent}
              className="absolute bottom-0 left-0 w-full"
            />
          </div>
          <div className="flex justify-between items-center py-4 pl-0  relative">
            <Copy forceReady={showContent} delay={0.2}>
              <span className="text-[14px] text-[var(--text-primary)]/50 uppercase tracking-widest">
                {language === "jp" ? "貢献" : "Contribution"}
              </span>
            </Copy>
            <Copy forceReady={showContent} delay={0.2}>
              <span className="text-[16px] font-medium uppercase">
                {project.contribution}
              </span>
            </Copy>
            <Line
              forceReady={showContent}
              className="absolute bottom-0 left-0 w-full"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 relative">
          <div className="flex justify-between items-center py-4 mr-10 pr-0 md:pr-10 relative">
            <Copy forceReady={showContent} delay={0.3}>
              <span className="text-[14px] text-[var(--text-primary)]/50 uppercase tracking-widest">
                {language === "jp" ? "範囲" : "Extent"}
              </span>
            </Copy>
            <Copy forceReady={showContent} delay={0.3}>
              <span className="text-[16px] font-medium uppercase">
                {project.extent.join(", ")}
              </span>
            </Copy>
            <Line
              forceReady={showContent}
              className="absolute bottom-0 left-0 w-full"
            />
          </div>
          <div className="flex items-center gap-8 py-4 pl-0  relative">
            {project.liveUrl && (
              <Copy forceReady={showContent} delay={0.4}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[16px] font-medium uppercase hover:opacity-60 transition-opacity"
                >
                  {language === "jp" ? "ライブ" : "Live"}{" "}
                  <ArrowUpRight size={14} />
                </a>
              </Copy>
            )}
            {project.iosUrl && (
              <Copy forceReady={showContent} delay={0.4}>
                <a
                  href={project.iosUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[16px] font-medium uppercase hover:opacity-60 transition-opacity"
                >
                  iOS <ArrowUpRight size={14} />
                </a>
              </Copy>
            )}
            {project.androidUrl && (
              <Copy forceReady={showContent} delay={0.4}>
                <a
                  href={project.androidUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[16px] font-medium uppercase hover:opacity-60 transition-opacity"
                >
                  Android <ArrowUpRight size={14} />
                </a>
              </Copy>
            )}
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 relative">
          <div className="flex justify-between items-center py-4 mr-10 pr-0 md:pr-10 relative">
            <Copy forceReady={showContent} delay={0.5}>
              <span className="text-[14px] text-[var(--text-primary)]/50 uppercase tracking-widest">
                {language === "jp" ? "スタック" : "Stack"}
              </span>
            </Copy>
            <Copy forceReady={showContent} delay={0.5}>
              <span className="text-[16px] font-medium uppercase text-right">
                {project.stack.join(", ")}
              </span>
            </Copy>
            <Line
              forceReady={showContent}
              className="absolute bottom-0 left-0 w-full"
            />
          </div>
        </div>

        {/* Copyright */}
        {project.copyright && (
          <div className="grid grid-cols-1 relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 relative gap-2 md:gap-0">
              <Copy forceReady={showContent} delay={0.6}>
                <span className="text-[14px] text-[var(--text-primary)]/50 uppercase tracking-widest flex-shrink-0">
                  {language === "jp" ? "知的財産" : "Intellectual Property"}
                </span>
              </Copy>
              <Copy forceReady={showContent} delay={0.6}>
                <span className="text-[14px] font-medium text-[var(--text-primary)] text-left md:text-right">
                  {project.copyright}
                </span>
              </Copy>
              <Line
                forceReady={showContent}
                className="absolute bottom-0 left-0 w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* MAIN IMAGE DISPLAY */}
      <div
        className={`mt-20 w-full max-w-[800px] mx-auto group transition-opacity duration-700 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="aspect-[1.6/1] border border-[var(--text-primary)]/10 bg-[var(--text-primary)]/5 flex items-center justify-center relative overflow-hidden transition-all duration-500"
          key={activeImageIndex} // Key forces re-render/anim on change if needed
        >
          <Image
            src={project.images[activeImageIndex]}
            alt={`${project.title} Visual ${activeImageIndex + 1}`}
            className="object-cover opacity-90"
            fill
          />
          {/* Subtle corner accents */}
          <div className="absolute top-4 left-4 w-4 h-px bg-[var(--text-primary)]/10"></div>
          <div className="absolute top-4 left-4 h-4 w-px bg-[var(--text-primary)]/10"></div>
          <div className="absolute bottom-4 right-4 w-4 h-px bg-[var(--text-primary)]/10"></div>
          <div className="absolute bottom-4 right-4 h-4 w-px bg-[var(--text-primary)]/10"></div>
        </div>
      </div>

      {/* GALLERY THUMBNAILS (Clickable) */}
      <div
        className={`mt-8 flex justify-center gap-4 transition-opacity duration-700 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        {project.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImageIndex(i)}
            className={`w-16 h-16 border transition-all duration-300 flex items-center justify-center p-1 ${
              activeImageIndex === i
                ? "border-[var(--text-primary)] bg-[var(--text-primary)]/10"
                : "border-[var(--text-primary)]/10 bg-[var(--text-primary)]/5 hover:border-[var(--text-primary)]/50"
            }`}
          >
            {/* Render actual image thumbnail */}
            <div className="relative w-full h-full">
              <Image
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className="object-cover opacity-80"
                fill
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;
