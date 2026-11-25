import type React from "react";
import { flushSync } from "react-dom";
import { gsap } from "gsap";
import { tweenBlur } from "@/lib/blur-tween";

export const LOCALE_SWITCH_TIMINGS = {
  peakBlurPx: 12,
  fadeOutDuration: 0.32,
  fadeInDuration: 0.48,
  deblurDuration: 0.85,
} as const;

/**
 * Two-stage language switch across desktop, tablet, and mobile:
 * 1. Blur & fade current text/icons completely out (`opacity -> 0`, `blur -> 12px`).
 * 2. Swap locale synchronously while invisible (`opacity === 0`).
 * 3. Fade new language text in (`opacity 0 -> 1`) while deblurring (`12px -> 0px`).
 */
export function runLocaleBlurSwap(
  applyLocale: () => void,
  switchingRef: React.MutableRefObject<boolean>,
) {
  if (
    typeof window === "undefined" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    window.dispatchEvent(new Event("dia-snap-visible"));
    applyLocale();
    return;
  }

  switchingRef.current = true;

  const { peakBlurPx, fadeOutDuration, fadeInDuration, deblurDuration } =
    LOCALE_SWITCH_TIMINGS;

  const candidateTargets = Array.from(
    document.querySelectorAll<HTMLElement>("[data-locale-blur]"),
  );

  const isVisible = (el: HTMLElement) => {
    const s = window.getComputedStyle(el);
    if (
      s.display === "none" ||
      s.visibility === "hidden" ||
      parseFloat(s.opacity) < 0.05
    ) {
      return false;
    }
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  };

  const visibleTargets = candidateTargets.filter(isVisible);
  const targets = visibleTargets.filter(
    (el) => !visibleTargets.some((other) => other !== el && other.contains(el)),
  );

  if (targets.length === 0) {
    window.dispatchEvent(new Event("dia-snap-visible"));
    applyLocale();
    switchingRef.current = false;
    return;
  }

  const targetStates = targets.map((el) => {
    const computed = window.getComputedStyle(el);
    const wasInline = computed.display === "inline";
    if (wasInline) {
      // Mobile Safari / WebKit ignores CSS `filter: blur()` on `display: inline` elements
      el.style.display = "inline-block";
    }
    return {
      el,
      opacity: parseFloat(computed.opacity) || 1,
      wasInline,
    };
  });

  // Stage 1: Blur + Fade completely out
  targetStates.forEach(({ el }) => {
    gsap.killTweensOf(el);
    gsap.to(el, {
      opacity: 0,
      duration: fadeOutDuration,
      ease: "power2.in",
    });
    tweenBlur(el, {
      from: 0,
      to: peakBlurPx,
      duration: fadeOutDuration,
      ease: "power2.in",
      clearOnZero: false,
    });
  });

  // Stage 2: Swap text while at 0 opacity, then Stage 3: Fade in + Deblur
  window.setTimeout(() => {
    flushSync(() => {
      window.dispatchEvent(new Event("dia-snap-visible"));
      applyLocale();
    });

    requestAnimationFrame(() => {
      targetStates.forEach(({ el, opacity, wasInline }) => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity,
            duration: fadeInDuration,
            ease: "power2.out",
            onComplete: () => {
              el.style.opacity = "";
            },
          },
        );

        tweenBlur(el, {
          from: peakBlurPx,
          to: 0,
          duration: deblurDuration,
          ease: "power3.out",
        });

        if (wasInline) {
          window.setTimeout(() => {
            el.style.display = "";
          }, Math.round(deblurDuration * 1000 + 40));
        }
      });

      window.setTimeout(() => {
        switchingRef.current = false;
      }, Math.round(deblurDuration * 1000 + 60));
    });
  }, Math.round(fadeOutDuration * 1000));
}
