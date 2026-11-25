"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { AnimatedThemeToggler } from "@/components/ui/theme-toggler";
import { AmbientSoundToggler } from "@/components/ui/ambient-sound-toggler";
import { LocaleToggler } from "@/components/ui/locale-toggler";
import { tweenBlur } from "@/lib/blur-tween";
import { cn } from "@/lib/utils";

export function HeaderControls({
  className,
  showLocaleHint = false,
  delay = 0.45,
}: {
  className?: string;
  showLocaleHint?: boolean;
  delay?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const els = itemRefs.current.filter((el): el is HTMLDivElement =>
        Boolean(el),
      );
      if (els.length === 0) return;

      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        els.forEach((el) => {
          gsap.set(el, { opacity: 1, y: 0, clearProps: "filter,transform" });
        });
        return;
      }

      els.forEach((el, idx) => {
        const itemDelay = delay + idx * 0.08;
        gsap.fromTo(
          el,
          { opacity: 0, y: 6 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: itemDelay,
            ease: "power3.out",
            clearProps: "transform",
          },
        );
        tweenBlur(el, {
          from: 10,
          to: 0,
          duration: 1.15,
          delay: itemDelay,
          ease: "power4.out",
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative z-20 flex shrink-0 items-center gap-2 overflow-visible",
        className,
      )}
    >
      <div
        ref={(el) => {
          itemRefs.current[0] = el;
        }}
        className="overflow-visible"
        style={{ opacity: 0, filter: "blur(10px)" }}
      >
        <LocaleToggler showHint={showLocaleHint} />
      </div>
      <div
        ref={(el) => {
          itemRefs.current[1] = el;
        }}
        data-locale-blur
        style={{ opacity: 0, filter: "blur(10px)" }}
      >
        <AmbientSoundToggler />
      </div>
      <div
        ref={(el) => {
          itemRefs.current[2] = el;
        }}
        data-locale-blur
        style={{ opacity: 0, filter: "blur(10px)" }}
      >
        <AnimatedThemeToggler variant="circle" className="opacity-100" />
      </div>
    </div>
  );
}
