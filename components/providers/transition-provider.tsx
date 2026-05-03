"use client";

import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";

interface TransitionContextProps {
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextProps | undefined>(undefined);

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
};

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Entrance animation when pathname changes
  useEffect(() => {
    // This runs after the router has pushed the new page
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          setIsTransitioning(false);
          gsap.set(overlayRef.current, { display: "none" });
        },
      });
    }
  }, [pathname]);

  const navigate = (href: string) => {
    if (href === pathname) return;
    
    setIsTransitioning(true);
    
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { display: "block", opacity: 0 });
      
      // Exit animation
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          // Navigate only AFTER exit animation is done
          router.push(href);
        },
      });
    }
  };

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      {/* Global Transition Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[9999] bg-(--bg) pointer-events-none opacity-0 hidden"
      />
    </TransitionContext.Provider>
  );
};
