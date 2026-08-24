"use client";

import React, { createContext, useContext, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";

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

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.inOut" },
      );
    }
  }, [pathname]);

  const navigate = (href: string) => {
    if (href === pathname) return;

    if (!contentRef.current) {
      router.push(href);
      return;
    }

    gsap.to(contentRef.current, {
      opacity: 0,
      duration: 0.4,
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
