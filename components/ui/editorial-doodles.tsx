"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLocale } from "@/app/contexts/LocaleContext";
import { doodleEn, doodleJp } from "@/app/font";
import { tweenBlur } from "@/lib/blur-tween";
import { cn } from "@/lib/utils";
import {
  EXPERIENCE_HINTS,
  LOCALE_HINTS,
  NAME_HINTS,
  PROJECTS_HINTS,
  VOXEL_HINTS,
  getSessionExpIdx,
  getSessionLocaleIdx,
  getSessionNameIdx,
  getSessionProjectsIdx,
  getSessionVoxelIdx,
  subscribeNoop,
} from "@/data/doodle-hints";

/**
 * Shared blur-in entrance hook for all editorial doodles.
 * Starts blurred (`12px`) and invisible (`opacity: 0`), then smoothly deblurs
 * either after `delay` (for hero doodles) or when scrolled into view (`onScroll`).
 */
function useDoodleBlurIn(
  ref: React.RefObject<HTMLElement | null>,
  { delay = 0.6, onScroll = false }: { delay?: number; onScroll?: boolean } = {},
) {
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasPlayedRef.current) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      hasPlayedRef.current = true;
      gsap.set(el, { opacity: 1, y: 0 });
      el.style.filter = "";
      return;
    }

    const reveal = () => {
      if (hasPlayedRef.current) return;
      hasPlayedRef.current = true;

      gsap.fromTo(
        el,
        { opacity: 0, y: 6 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          delay,
          ease: "power3.out",
          clearProps: "transform",
        },
      );
      tweenBlur(el, {
        from: 12,
        to: 0,
        duration: 1.25,
        delay,
        ease: "power4.out",
      });
    };

    if (!onScroll) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, delay, onScroll]);
}

/**
 * Hand-drawn double underline accent — desktop only (`hidden lg:block`)
 */
export function DoodleUnderline({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  useDoodleBlurIn(ref as unknown as React.RefObject<HTMLElement | null>, {
    delay: 0.35,
    onScroll: true,
  });

  return (
    <svg
      ref={ref}
      data-doodle
      width="68"
      height="10"
      viewBox="0 0 68 12"
      fill="none"
      style={{ opacity: 0, filter: "blur(12px)" }}
      className={cn(
        "pointer-events-none hidden lg:block w-[52px] h-auto text-(--subtext)/65 select-none",
        className,
      )}
      aria-hidden="true"
    >
      <path
        d="M2 5.2 C22 2.8 46 2.8 66 4.6"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M12 9.4 C28 8.2 44 8.3 56 9.1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Handwritten note + downward arrow anchored directly above the author's name
 * (using the exact downward NameHintArrow shape from farhaan).
 * Hidden on mobile and tablet (`hidden lg:flex`).
 */
export function NameHintDoodle({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useDoodleBlurIn(ref, { delay: 0.65 });

  const { locale } = useLocale();
  const isJp = locale === "jp";
  const idx = React.useSyncExternalStore(
    subscribeNoop,
    getSessionNameIdx,
    () => 0,
  );
  const note = NAME_HINTS[locale]?.[idx] ?? NAME_HINTS[locale][0];

  return (
    <div
      className={cn(
        "pointer-events-none absolute bottom-[calc(100%+8px)] -left-6 xl:-left-12 hidden lg:flex",
        className,
      )}
      aria-hidden="true"
    >
      <div
        ref={ref}
        data-doodle
        data-locale-blur
        style={{ opacity: 0, filter: "blur(12px)" }}
        className="flex flex-col items-start gap-0.5 whitespace-nowrap select-none text-(--subtext)/80"
      >
        <span
          className={cn(
            "leading-tight -rotate-[1.2deg] text-(--subtext)/85",
            isJp
              ? `${doodleJp.className} doodle-jp-text text-[10px] xl:text-[11px]`
              : `${doodleEn.className} doodle-en-text text-[17px] xl:text-[19px]`,
          )}
        >
          {note}
        </span>
        <svg
          width="28"
          height="26"
          viewBox="0 0 28 28"
          fill="none"
          className="ml-[114px] xl:ml-[138px] w-[18px] xl:w-[20px] h-auto shrink-0 text-(--subtext)/70"
        >
          <path
            d="M8 2 C10 11 14.5 19 16 26"
            stroke="currentColor"
            strokeWidth="1.45"
            strokeLinecap="round"
          />
          <path
            d="M9 19.5 C12 22 14.5 24.5 16 26 C17.5 24 19.8 21 22.5 18.2"
            stroke="currentColor"
            strokeWidth="1.45"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

/**
 * Handwritten note + curving downward arrow extending beyond max-w-3xl on the right
 * above the Locale toggle button. Hidden on mobile and tablet (`hidden lg:flex`).
 */
export function LocaleHintDoodle({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useDoodleBlurIn(ref, { delay: 0.85 });

  const { locale } = useLocale();
  const isJp = locale === "jp";
  const idx = React.useSyncExternalStore(
    subscribeNoop,
    getSessionLocaleIdx,
    () => 0,
  );
  const text = LOCALE_HINTS[locale]?.[idx] ?? LOCALE_HINTS[locale][0];

  return (
    <div
      ref={ref}
      data-doodle
      data-locale-blur
      style={{ opacity: 0, filter: "blur(12px)" }}
      className={cn(
        "pointer-events-none absolute left-1/2 -ml-2 bottom-[calc(100%+6px)] hidden lg:flex items-start gap-1.5 whitespace-nowrap select-none text-(--subtext)/75",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        width="32"
        height="22"
        viewBox="0 0 36 24"
        fill="none"
        className="w-[24px] xl:w-[28px] h-auto shrink-0 translate-y-1 text-(--subtext)/70 -scale-x-100"
      >
        <path
          d="M2 3 C16 3 26 9 30 21"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
        />
        <path
          d="M23 17 C26 18.8 28.5 20 30 21 C31 18.5 32 15.8 33 13"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={cn(
          "leading-none -translate-y-0.5 rotate-[1.8deg] text-(--subtext)/85",
          isJp
            ? `${doodleJp.className} doodle-jp-text text-[9.5px] xl:text-[10.5px]`
            : `${doodleEn.className} doodle-en-text text-[17px] xl:text-[18px]`,
        )}
      >
        {text}
      </span>
    </div>
  );
}

/**
 * Subtle doodle extending into the left margin pointing at the 3D Voxel Dog canvas.
 * Hidden on mobile and tablet (`hidden lg:flex`).
 */
export function VoxelHintDoodle({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useDoodleBlurIn(ref, { delay: 1.05 });

  const { locale } = useLocale();
  const isJp = locale === "jp";
  const idx = React.useSyncExternalStore(
    subscribeNoop,
    getSessionVoxelIdx,
    () => 0,
  );
  const hint = VOXEL_HINTS[locale]?.[idx] ?? VOXEL_HINTS[locale][0];

  return (
    <div
      ref={ref}
      data-doodle
      data-locale-blur
      style={{ opacity: 0, filter: "blur(12px)" }}
      className={cn(
        "pointer-events-none hidden lg:flex flex-col items-end gap-1 whitespace-nowrap select-none text-(--subtext)/75",
        className,
      )}
      aria-hidden="true"
    >
      <span
        className={cn(
          "leading-tight -rotate-[2.5deg] text-right text-(--subtext)/85",
          isJp
            ? `${doodleJp.className} doodle-jp-text text-[9.5px] xl:text-[10.5px]`
            : `${doodleEn.className} doodle-en-text text-[17px] xl:text-[18px]`,
        )}
      >
        {hint}
      </span>
      <svg
        width="36"
        height="20"
        viewBox="0 0 38 20"
        fill="none"
        className="w-[26px] h-auto shrink-0 text-(--subtext)/70"
      >
        <path
          d="M2 6 C13 3 23 9 34 11"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
        />
        <path
          d="M26 6 C29 8.5 32 10 34 11 C31 12.5 28 14.5 25 17"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/**
 * Doodle arrow pointing at "Past Experience" — desktop only (`hidden lg:inline-flex`).
 */
export function ExperienceHintDoodle({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useDoodleBlurIn(ref, { delay: 0.45, onScroll: true });

  const { locale } = useLocale();
  const isJp = locale === "jp";
  const idx = React.useSyncExternalStore(
    subscribeNoop,
    getSessionExpIdx,
    () => 0,
  );
  const hint = EXPERIENCE_HINTS[locale]?.[idx] ?? EXPERIENCE_HINTS[locale][0];

  return (
    <span
      ref={ref}
      data-doodle
      data-locale-blur
      style={{ opacity: 0, filter: "blur(12px)" }}
      className={cn(
        "pointer-events-none hidden lg:inline-flex items-center gap-1.5 whitespace-nowrap select-none text-(--subtext)/70 ml-2",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        width="28"
        height="14"
        viewBox="0 0 32 16"
        fill="none"
        className="w-[22px] h-auto shrink-0 text-(--subtext)/65"
      >
        <path
          d="M30 9 C20 12 11 10 3 7"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M9 4 C6.5 5.2 4.5 6.2 3 7 C5 8.8 7.2 10.5 9.5 12"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={cn(
          "leading-none -rotate-[1.5deg] text-(--subtext)/80",
          isJp
            ? `${doodleJp.className} doodle-jp-text text-[9.5px] xl:text-[10.5px]`
            : `${doodleEn.className} doodle-en-text text-[16px] xl:text-[18px]`,
        )}
      >
        {hint}
      </span>
    </span>
  );
}

/**
 * Doodle hint extending beyond max-w-3xl on the right of 02 Projects — desktop only (`hidden xl:inline-flex`).
 */
export function ProjectsHintDoodle({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useDoodleBlurIn(ref, { delay: 0.4, onScroll: true });

  const { locale } = useLocale();
  const isJp = locale === "jp";
  const idx = React.useSyncExternalStore(
    subscribeNoop,
    getSessionProjectsIdx,
    () => 0,
  );
  const hint = PROJECTS_HINTS[locale]?.[idx] ?? PROJECTS_HINTS[locale][0];

  return (
    <span
      ref={ref}
      data-doodle
      data-locale-blur
      style={{ opacity: 0, filter: "blur(12px)" }}
      className={cn(
        "pointer-events-none hidden xl:inline-flex absolute left-[calc(100%+14px)] top-0 items-center gap-1.5 whitespace-nowrap select-none text-(--subtext)/75",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        width="28"
        height="18"
        viewBox="0 0 32 20"
        fill="none"
        className="w-[22px] h-auto shrink-0 translate-y-1 text-(--subtext)/65"
      >
        <path
          d="M30 5 C20 3 11 8 3 15"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M10 15 C7 15.2 4.8 15.2 3 15 C4.2 12.8 5.8 10.2 7.5 8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={cn(
          "leading-none rotate-[1.6deg] text-(--subtext)/80 -translate-y-0.5",
          isJp
            ? `${doodleJp.className} doodle-jp-text text-[9.5px] xl:text-[10.5px]`
            : `${doodleEn.className} doodle-en-text text-[16px] xl:text-[18px]`,
        )}
      >
        {hint}
      </span>
    </span>
  );
}
