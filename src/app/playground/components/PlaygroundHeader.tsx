"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Copy from "@/components/Copy";
import { useLanguage } from "@/contexts/LanguageContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface PlaygroundHeaderProps {
  title: string;
  description: readonly string[];
  previewImage: string;
}

const PlaygroundHeader: React.FC<PlaygroundHeaderProps> = ({
  title,
  description,
  previewImage,
}) => {
  const { language } = useLanguage();
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  useGSAP(
    () => {
      // Only animate if we have an image and haven't animated yet
      if (previewImage && !hasAnimated && previewContainerRef.current) {
        gsap.fromTo(
          previewContainerRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power3.inOut",
            onComplete: () => {
              // Clear inline opacity so CSS class controls it (which will be updated by state)
              gsap.set(previewContainerRef.current, { clearProps: "opacity" });
              setHasAnimated(true);
            },
          }
        );
      }
    },
    { dependencies: [previewImage], scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex flex-col gap-8 md:gap-12">
      <Copy key={`title-${language}`} delay={0.2} stagger={0.2}>
        <h1
          className={`text-[24px] font-semibold leading-[100%] cursor-default text-[var(--text-primary)] ${
            language === "jp" ? "font-['Noto_Sans_JP']" : ""
          }`}
        >
          {title}
        </h1>
      </Copy>

      <div className="flex flex-col md:flex-row gap-8 md:justify-between items-start">
        <div className="max-w-[600px] flex flex-col gap-6">
          <Copy
            key={`desc-${language}`}
            delay={0.4}
            stagger={0.1}
            className="flex flex-col gap-6"
          >
            {description.map((paragraph, index) => (
              <p
                key={index}
                className={`text-[16px] font-normal text-justify leading-[1.3] tracking-[0.02rem] cursor-default text-[var(--text-primary)] ${
                  language === "jp" ? "font-['Noto_Sans_JP']" : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
          </Copy>
        </div>

        {/* Persistent Preview Box */}
        <div
          ref={previewContainerRef}
          className={`hidden md:block w-full md:w-[400px] aspect-video bg-[var(--bg-cases)] border border-[var(--text-primary)]/20 overflow-hidden relative ${
            hasAnimated ? "" : "opacity-0"
          }`}
        >
          {previewImage && (
            <Image
              src={previewImage}
              alt="Preview"
              fill
              className="object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaygroundHeader;
