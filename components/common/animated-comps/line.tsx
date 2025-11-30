"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLink } from "@/lib/context/link-context";
import { useLanguage } from "@/lib/context/language-context";
import { AnimatedLineProps } from "@/lib/types";

export default function AnimatedLine({
  className = "",
  lineClassName = "h-[1px] bg-[#5C5C5C]",
  duration = 0.8,
  delay = 0.3,
  ease = "power2.out",
}: AnimatedLineProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const { linkClicked, whatLink, completeNavigation } = useLink();
  const { isChanging, language } = useLanguage(); // Add language to dependencies

  // Track animation state
  const hasAnimatedOut = useRef(false);

  // Main animation controller
  useEffect(() => {
    if (!lineRef.current) return;

    const line = lineRef.current;

    // If language is changing or link is clicked, animate out
    if ((linkClicked && whatLink) || isChanging) {
      hasAnimatedOut.current = true;
      
      gsap.to(line, {
        scaleX: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          if (linkClicked && whatLink) {
            completeNavigation();
          }
          // For language changes, we'll animate back in when isChanging becomes false
        },
      });
    } 
    // If we've previously animated out and now conditions are normal, animate back in
    else if (hasAnimatedOut.current) {
      gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
      
      gsap.to(line, {
        scaleX: 1,
        duration,
        ease,
        delay,
        onComplete: () => {
          hasAnimatedOut.current = false;
        },
      });
    }
  }, [linkClicked, whatLink, isChanging, language, completeNavigation, duration, delay, ease]);

  // Initial enter animation on mount
  useEffect(() => {
    if (!lineRef.current || hasAnimatedOut.current) return;

    const line = lineRef.current;

    gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
    
    const tween = gsap.to(line, {
      scaleX: 1,
      duration,
      ease,
      delay,
    });

    return () => {
      tween.kill();
    };
  }, [duration, delay, ease]);

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={lineRef}
        className={`w-full ${lineClassName} origin-left`}
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}