"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  buildShimmerGradient,
  SHIMMER_COLORS,
  SHIMMER_SWEEP_END,
  SHIMMER_SWEEP_START,
} from "@/lib/shimmer-text";

export function useShimmerHover(textColor = "var(--subtext)") {
  const ref = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const clearShimmer = () => {
    const el = ref.current;
    if (!el) return;
    el.style.removeProperty("color");
    el.style.removeProperty("background-image");
    el.style.removeProperty("background-clip");
    el.style.removeProperty("-webkit-background-clip");
    el.style.removeProperty("background-size");
  };

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (tweenRef.current) tweenRef.current.kill();

      if (!hovered) {
        clearShimmer();
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
          if (ref.current) {
            ref.current.style.backgroundImage = buildShimmerGradient(
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

  return {
    ref,
    hovered,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };
}
