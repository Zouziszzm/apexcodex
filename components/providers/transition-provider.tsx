"use client";

import React, { createContext, useContext, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";
import { tweenBlur } from "@/lib/blur-tween";

interface TransitionContextProps {
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextProps | undefined>(
  undefined,
);

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
};

export const TransitionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const container = contentRef.current;
    if (container) {
      gsap.fromTo(
        container,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: "power2.out" },
      );
      tweenBlur(container, {
        from: 8,
        to: 0,
        duration: 0.65,
        ease: "power3.out",
      });
    }
  }, [pathname]);

  const navigate = (href: string) => {
    if (href === pathname) return;

    const container = contentRef.current;
    if (!container) {
      router.push(href);
      return;
    }

    // Blur out all active doodles first/alongside the page transition
    const doodles = Array.from(
      container.querySelectorAll<HTMLElement>("[data-doodle]"),
    );
    doodles.forEach((doodle) => {
      gsap.killTweensOf(doodle);
      tweenBlur(doodle, {
        to: 14,
        duration: 0.36,
        ease: "power2.in",
        clearOnZero: false,
      });
      gsap.to(doodle, {
        opacity: 0,
        y: -4,
        duration: 0.32,
        ease: "power2.in",
      });
    });

    tweenBlur(container, {
      to: 8,
      duration: 0.4,
      ease: "power2.in",
      clearOnZero: false,
    });
    gsap.to(container, {
      opacity: 0,
      duration: 0.42,
      ease: "power2.inOut",
      onComplete: () => router.push(href),
    });
  };

  return (
    <TransitionContext.Provider value={{ navigate }}>
      <div ref={contentRef}>{children}</div>
    </TransitionContext.Provider>
  );
};
