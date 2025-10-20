"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { animate } from "motion/react";
import { paths } from "../../../public/Sakura";
import { AnimatedPaths } from "@/src/components/common/svg/AnimatedSvg";
import { motion } from "motion/react";

type TransitionContextType = {
  triggerRouteChange: (href: string) => Promise<void>;
};

const TransitionContext = createContext<TransitionContextType | null>(null);
export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
};

const SPLASH_DURATION = 2500;
const FADE_DURATION = 0.3;

export const TransitionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const svgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const pendingRouteRef = useRef<string | null>(null);
  const hasRunRef = useRef(false);

  // First load splash animation
  useEffect(() => {
    if (!isFirstLoad || !svgRef.current || hasRunRef.current) return;
    hasRunRef.current = true;

    const runSplashSequence = async () => {
      try {
        const svgEl = svgRef.current;
        if (!svgEl) return;

        // Initial fade in
        await animate(svgEl, { opacity: 1 }, { duration: FADE_DURATION })
          .finished;

        // Wait for splash duration
        await new Promise((resolve) => setTimeout(resolve, SPLASH_DURATION));

        // Fade out
        await animate(svgEl, { opacity: 0 }, { duration: FADE_DURATION })
          .finished;

        setShowContent(true);
        setIsFirstLoad(false);
      } catch (error) {
        console.error("Splash animation error:", error);
        setShowContent(true);
        setIsFirstLoad(false);
      }
    };

    runSplashSequence();
  }, [isFirstLoad]);

  // Fade in content when route changes or after first load
  useEffect(() => {
    if (!showContent || !containerRef.current) return;

    const container = containerRef.current;
    container.style.opacity = "0";

    const animation = animate(
      container,
      { opacity: 1 },
      { duration: FADE_DURATION },
    );

    return () => {
      animation.stop();
    };
  }, [pathname, showContent]);

  const triggerRouteChange = async (href: string) => {
    // Cancel any pending animations
    if (animationRef.current) {
      animationRef.current.stop();
    }

    // Skip animation if already on the target route
    if (href === pathname) return;

    pendingRouteRef.current = href;

    try {
      if (containerRef.current) {
        animationRef.current = animate(
          containerRef.current,
          { opacity: 0 },
          {
            duration: FADE_DURATION * 1.6, // Slightly longer for route transitions
            onComplete: () => {
              if (pendingRouteRef.current === href) {
                router.push(href);
                pendingRouteRef.current = null;
              }
            },
          },
        );
      } else {
        // Fallback if container isn't available
        router.push(href);
        pendingRouteRef.current = null;
      }
    } catch (error) {
      console.error("Route transition error:", error);
      router.push(href);
      pendingRouteRef.current = null;
    }
  };

  return (
    <TransitionContext.Provider value={{ triggerRouteChange }}>
      {isFirstLoad ? (
        <div
          ref={svgRef}
          className="z-[999] flex h-screen w-full items-center justify-center opacity-0"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: FADE_DURATION }}
          >
            <AnimatedPaths paths={paths} />
          </motion.div>
        </div>
      ) : showContent ? (
        <div ref={containerRef} key={pathname} className="opacity-0">
          {children}
        </div>
      ) : null}
    </TransitionContext.Provider>
  );
};
