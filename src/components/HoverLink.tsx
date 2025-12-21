"use client";

import React from "react";
import Link from "next/link";
import Line from "./Line";

interface HoverLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  animateOnScroll?: boolean;
  delay?: number;
  duration?: number;
}

/**
 * HoverLink component that combines a Link with an animated Line.
 * The line reveals on scroll (matching the site aesthetic) and
 * provides a hover expansion effect.
 */
export default function HoverLink({
  href,
  children,
  className = "",
  animateOnScroll = true,
  delay = 0,
  duration = 1.2,
}: HoverLinkProps) {
  return (
    <div className={`w-fit group ${className}`}>
      <Link href={href}>
        <div className="relative pb-1">
          {children}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <Line
              animateOnScroll={animateOnScroll}
              delay={delay}
              duration={duration}
              className="transition-all duration-500 ease-in-out group-hover:bg-[#5f5f5f]"
            />
            {/* 
              Optional: If we want a dynamic expansion effect where a 
              second line slides over the first one:
            */}
            <div className="absolute top-0 left-0 h-px bg-[#1C1C1E] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] -translate-x-full group-hover:translate-x-0 w-full" />
          </div>
        </div>
      </Link>
    </div>
  );
}
