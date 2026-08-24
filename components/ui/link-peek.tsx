"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import {
  buildShimmerGradient,
  SHIMMER_COLORS,
  SHIMMER_SWEEP_END,
  SHIMMER_SWEEP_START,
} from "@/lib/shimmer-text";

interface ShimmerLinkProps {
  href: string;
  children: React.ReactNode;
  textColor?: string;
  className?: string;
}

export function ShimmerLink({
  href,
  children,
  textColor = "var(--subtext)",
  className,
}: ShimmerLinkProps) {
  const [hovered, setHovered] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const openLink = () => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const setIdleState = () => {
    const el = spanRef.current;
    if (!el) return;
    el.style.color = textColor;
    el.style.backgroundImage = "none";
    el.style.backgroundClip = "border-box";
    el.style.webkitBackgroundClip = "border-box";
    el.style.backgroundSize = "";
  };

  useGSAP(
    () => {
      const el = spanRef.current;
      if (!el) return;

      if (tweenRef.current) tweenRef.current.kill();

      if (!hovered) {
        setIdleState();
        return;
      }

      el.style.color = "transparent";
      el.style.backgroundClip = "text";
      el.style.webkitBackgroundClip = "text";
      el.style.backgroundSize = "100% 100%";

      const obj = { pos: SHIMMER_SWEEP_START };
      el.style.backgroundImage = buildShimmerGradient(
        obj.pos,
        SHIMMER_COLORS,
        textColor,
      );

      tweenRef.current = gsap.to(obj, {
        pos: SHIMMER_SWEEP_END,
        duration: 1.8,
        ease: "none",
        repeat: -1,
        onUpdate: () => {
          if (spanRef.current) {
            spanRef.current.style.backgroundImage = buildShimmerGradient(
              obj.pos,
              SHIMMER_COLORS,
              textColor,
            );
          }
        },
      });
    },
    { dependencies: [hovered, textColor] },
  );

  useGSAP(() => {
    setIdleState();
  }, []);

  return (
    <span
      ref={spanRef}
      role="link"
      tabIndex={0}
      onClick={openLink}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLink();
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative inline cursor-pointer font-normal text-(--subtext)",
        className,
      )}
    >
      {children}
    </span>
  );
}
