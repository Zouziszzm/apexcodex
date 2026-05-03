"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { DiaTextReveal } from "@/components/ui/dia-text-rv";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out", delay: 0.5 },
      );
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="flex min-h-screen flex-col items-center justify-center p-6 text-center"
    >
      <div className="flex flex-col items-center gap-4 max-w-md">
        <h1 className="text-display font-medium tracking-tighter opacity-10">
          404
        </h1>

        <h2 className="text-title font-medium text-2xl tracking-tight">
          <DiaTextReveal
            text="You've wandered into the Heart of the Forest."
            delay={0.2}
          />
        </h2>

        <p className="text-body-sm font-light text-(--subtext) leading-relaxed">
          <DiaTextReveal
            text="Even the quiet spirit wandering the deep woods can't find this page. It might have been taken down, or maybe it's hidden behind the ancient trees."
            delay={0.4}
          />
        </p>

        <Link
          href="/"
          className="mt-8 group relative flex items-center gap-2 text-caption font-medium text-(--body) hover:text-(--accent) transition-colors"
        >
          <span className="w-8 h-px bg-(--border) group-hover:bg-(--accent) transition-colors" />
          Back to Index
        </Link>
      </div>

      {/* Subtle background decoration */}
      <div className="fixed inset-0 -z-10 flex items-center justify-center pointer-events-none opacity-5">
        <div className="w-[500px] h-[500px] rounded-full bg-radial from-(--accent) to-transparent blur-3xl" />
      </div>
    </main>
  );
}
