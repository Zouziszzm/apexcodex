"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DiaTextReveal } from "@/components/ui/dia-text-rv";
import { useSound } from "@/hooks/use-sound";
import { socialLinks } from "@/data/socials";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ContactSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerLineRef = useRef<HTMLDivElement>(null);
  const linkLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const pulseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { playClick } = useSound();

  const { contextSafe } = useGSAP({ scope: containerRef });

  const onHover = contextSafe((index: number) => {
    const pulse = pulseRefs.current[index];
    if (pulse) {
      gsap.fromTo(
        pulse,
        { x: "-100%", opacity: 0 },
        {
          x: "100%",
          opacity: 1,
          duration: 1,
          repeat: -1,
          repeatDelay: 0.2,
          ease: "power2.inOut",
        },
      );
    }
  });

  const onLeave = contextSafe((index: number) => {
    const pulse = pulseRefs.current[index];
    if (pulse) {
      gsap.killTweensOf(pulse);
      gsap.set(pulse, { x: "-100%", opacity: 0 });
    }
  });

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        headerLineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1.5, ease: "power4.inOut" },
      );

      const lines = linkLinesRef.current.filter(Boolean);
      if (lines.length > 0) {
        tl.fromTo(
          lines,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 1, stagger: 0.1, ease: "power4.inOut" },
          "-=0.5",
        );
      }
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="w-full mt-6 flex flex-col gap-6 pb-20"
    >
      <div className="relative pb-2 mb-2">
        <div
          ref={headerLineRef}
          className="absolute bottom-0 left-0 w-full h-px bg-(--border)"
          style={{ transform: "scaleX(0)", transformOrigin: "left" }}
        />
        <h2 className="font-body-sm font-medium">
          <DiaTextReveal
            text="03 Contact"
            delay={0.2}
            duration={1.2}
            textColor="var(--body)"
          />
        </h2>
      </div>

      <div className="flex flex-col gap-8 max-w-xl">
        <p className="font-light text-[13px] text-(--subtext) leading-relaxed">
          <DiaTextReveal
            text="If something here resonates, please reach out! I'd love to connect :)"
            delay={0.4}
            duration={1.5}
            textColor="var(--subtext)"
          />
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-4">
          {socialLinks.map((link, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => onHover(index)}
              onMouseLeave={() => onLeave(index)}
            >
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick()}
                className="font-body-sm font-medium text-(--body) hover:text-(--accent) transition-colors pb-1 block"
              >
                <DiaTextReveal
                  text={link.label}
                  delay={0.6 + index * 0.1}
                  duration={1}
                  textColor="var(--body)"
                />
              </Link>
              <div
                ref={(el) => {
                  linkLinesRef.current[index] = el;
                }}
                className="absolute bottom-0 left-0 w-full h-px bg-(--body) overflow-hidden"
                style={{ transform: "scaleX(0)", transformOrigin: "left" }}
              >
                <div
                  ref={(el) => {
                    pulseRefs.current[index] = el;
                  }}
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/90 to-transparent -translate-x-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
