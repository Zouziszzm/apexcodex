"use client";

import {
  useEffect,
  useRef,
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  ElementType,
  useCallback,
  useState,
} from "react";
import gsap from "gsap";
import { useLink } from "@/lib/context/link-context";
import { useLanguage } from "@/lib/context/language-context";

interface AnimatedTextProps {
  children: ReactNode;
  japanese?: ReactNode;
  className?: string;            // common classes (size, alignment, etc.)
  classNameEnglish?: string;     // wrapper classes when EN is active
  classNameJapanese?: string;    // wrapper classes when JP is active
  as?: ElementType;
}

export default function AnimatedText({
  children,
  japanese,
  className = "",
  classNameEnglish = "",
  classNameJapanese = "font-family-jp",
  as: Component = "span" as ElementType,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const { linkClicked, whatLink, completeNavigation } = useLink();
  const { language, isChanging, setIsChanging } = useLanguage();
  const previousLanguageRef = useRef<"en" | "jp">(language as "en" | "jp");

  // 👇 Controls which language's classes are applied on the wrapper
  const [classLanguage, setClassLanguage] = useState<"en" | "jp">(
    language as "en" | "jp"
  );

  const ENGLISH_STAGGER = 0.004;
  const ASIAN_STAGGER = 0.002;
  const EXIT_DURATION = 0.35;
  const ENTER_DURATION = 0.6;
  const LANGUAGE_PAUSE = 0.2; // pause between exit & enter for language switch

  // 👇 detect mobile once (you can make this fancier if needed)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsMobile(window.innerWidth < 768);
  }, []);

  const useWordLevelAnimation = !isMobile; // desktop: words; mobile: block

  const hasAsianChars = (text: string): boolean => {
    return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF]/.test(text);
  };

  // Initial content based on language
  const getInitialContent = () => {
    return language === "jp" && japanese ? japanese : children;
  };

  const [displayedContent, setDisplayedContent] = useState<ReactNode>(
    getInitialContent()
  );
  const isInitialMountRef = useRef(true);

  const processChildren = (childrenNode: ReactNode): ReactNode[] => {
    const elements: ReactNode[] = [];
    let wordIndex = 0;

    const processNode = (node: ReactNode) => {
      if (typeof node === "string") {
        if (node.trim() === "") {
          if (node.length > 0) elements.push(node);
          return;
        }

        if (hasAsianChars(node)) {
          // JP characters → force JP font on glyph spans
          Array.from(node).forEach((char) => {
            if (char === " ") {
              elements.push(" ");
            } else {
              elements.push(
                <span
                  key={`char-${wordIndex++}`}
                  className="animated-word animated-asian inline-block font-family-jp"
                  style={{
                    display: "inline-block",
                    opacity: 0,
                    transform: "translateY(20px)",
                  }}
                >
                  {char}
                </span>
              );
            }
          });
        } else {
          const words = node.split(" ");
          words.forEach((word, i) => {
            if (word.trim() !== "") {
              elements.push(
                <span
                  key={`word-${wordIndex++}`}
                  className="animated-word inline-block mr-1"
                  style={{
                    display: "inline-block",
                    opacity: 0,
                    transform: "translateY(20px)",
                  }}
                >
                  {word}
                </span>
              );
            }
            if (i < words.length - 1) {
              elements.push(" ");
            }
          });
        }
      } else if (isValidElement(node)) {
        const nodeProps = node.props as { className?: string };
        elements.push(
          <span
            key={`component-${wordIndex++}`}
            className="animated-word inline-block"
            style={{
              display: "inline-block",
              opacity: 0,
              transform: "translateY(20px)",
            }}
          >
            {cloneElement(node as React.ReactElement<{ className?: string }>, {
              className: `${nodeProps.className || ""} inline-block`,
            })}
          </span>
        );
      }
    };

    Children.forEach(childrenNode, (child) => {
      if (Array.isArray(child)) {
        child.forEach(processNode);
      } else {
        processNode(child);
      }
    });

    return elements;
  };

  // Target content whenever language / props change
  const targetContent = language === "jp" && japanese ? japanese : children;
  const animatedElements = processChildren(displayedContent);

  // Shared exit animation helper (used for both link + language exit)
  const animateExit = useCallback(
    (onComplete?: () => void) => {
      if (!containerRef.current) return;

      const container = containerRef.current;

      // 🟣 Mobile / simple mode → fade whole block
      if (!useWordLevelAnimation) {
        const tl = gsap.timeline({
          defaults: { ease: "power2.in" },
          onComplete,
        });

        tl.to(container, {
          opacity: 0,
          y: -10,
          duration: EXIT_DURATION,
        });

        return tl;
      }

      // 🖥 Desktop → word/char exit
      const wordElems =
        container.querySelectorAll(".animated-word:not(.animated-asian)");
      const asianElems = container.querySelectorAll(".animated-asian");

      const tl = gsap.timeline({
        defaults: { ease: "power2.in" },
        onComplete,
      });

      if (wordElems.length > 0) {
        tl.to(
          wordElems,
          {
            y: -20,
            opacity: 0,
            duration: EXIT_DURATION,
            stagger: ENGLISH_STAGGER,
          },
          0
        );
      }

      if (asianElems.length > 0) {
        tl.to(
          asianElems,
          {
            y: -20,
            opacity: 0,
            duration: EXIT_DURATION,
            stagger: ASIAN_STAGGER,
          },
          0
        );
      }

      return tl;
    },
    [useWordLevelAnimation]
  );

  // Page transition exit (unchanged behavior)
  const runExitAnimation = useCallback(() => {
    return animateExit(completeNavigation);
  }, [animateExit, completeNavigation]);

  // Update displayed content when target content changes (and we're not mid-language transition)
  useEffect(() => {
    if (!isChanging && targetContent !== displayedContent) {
      setDisplayedContent(targetContent);
    }
  }, [targetContent, isChanging, displayedContent]);

  // Handle language change animation (EN <-> JP)
  useEffect(() => {
    if (!containerRef.current) return;

    const languageChanged = previousLanguageRef.current !== language;

    if (isChanging && languageChanged) {
      // 1️⃣ Exit animation with OLD wrapper classes
      animateExit(() => {
        // 2️⃣ Small pause to mimic page transition feel
        setTimeout(() => {
          // 3️⃣ Swap content to new language
          setDisplayedContent(targetContent);
          previousLanguageRef.current = language as "en" | "jp";

          // 4️⃣ Wait for React to render new language DOM
          requestAnimationFrame(() => {
            // 5️⃣ Flip wrapper classes to NEW language before enter
            setClassLanguage(language as "en" | "jp");

            // 6️⃣ Next frame: animate new content in
            requestAnimationFrame(() => {
              if (!containerRef.current) return;

              const container = containerRef.current;

              if (!useWordLevelAnimation) {
                // 🟣 Mobile: show all words instantly, animate block
                const nodes = container.querySelectorAll(".animated-word");
                gsap.set(nodes, { y: 0, opacity: 1 });

                const enterTl = gsap.timeline({
                  defaults: { ease: "power2.out" },
                  onComplete: () => {
                    setIsChanging(false);
                  },
                });

                enterTl.fromTo(
                  container,
                  { opacity: 0, y: 10 },
                  { opacity: 1, y: 0, duration: ENTER_DURATION }
                );

                return;
              }

              // 🖥 Desktop: word/char enter
              const newWordElems =
                container.querySelectorAll(
                  ".animated-word:not(.animated-asian)"
                );
              const newAsianElems =
                container.querySelectorAll(".animated-asian");

              newWordElems.forEach((elem) => {
                gsap.set(elem, { y: 20, opacity: 0 });
              });
              newAsianElems.forEach((elem) => {
                gsap.set(elem, { y: 20, opacity: 0 });
              });

              const enterTl = gsap.timeline({
                defaults: { ease: "power2.out" },
                onComplete: () => {
                  setIsChanging(false);
                },
              });

              if (newWordElems.length > 0) {
                enterTl.to(
                  newWordElems,
                  {
                    y: 0,
                    opacity: 1,
                    duration: ENTER_DURATION,
                    stagger: ENGLISH_STAGGER,
                  },
                  0
                );
              }

              if (newAsianElems.length > 0) {
                enterTl.to(
                  newAsianElems,
                  {
                    y: 0,
                    opacity: 1,
                    duration: ENTER_DURATION,
                    stagger: ASIAN_STAGGER,
                  },
                  0
                );
              }
            });
          });
        }, LANGUAGE_PAUSE * 1000);
      });
    } else if (isInitialMountRef.current || (!isChanging && !languageChanged)) {
      // Initial load or no language change – just animate in
      const container = containerRef.current;
      const wordElems =
        container.querySelectorAll(".animated-word:not(.animated-asian)");
      const asianElems = container.querySelectorAll(".animated-asian");

      if (isInitialMountRef.current) {
        isInitialMountRef.current = false;
        previousLanguageRef.current = language as "en" | "jp";
        setClassLanguage(language as "en" | "jp");
      }

      if (!useWordLevelAnimation) {
        // 🟣 Mobile: make words visible and fade block in
        const nodes = container.querySelectorAll(".animated-word");
        gsap.set(nodes, { y: 0, opacity: 1 });

        gsap.fromTo(
          container,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: ENTER_DURATION, ease: "power2.out" }
        );
        return;
      }

      // 🖥 Desktop: per-word/char animation
      if (wordElems.length > 0) {
        gsap.to(wordElems, {
          y: 0,
          opacity: 1,
          duration: ENTER_DURATION,
          ease: "power2.out",
          stagger: ENGLISH_STAGGER,
        });
      }

      if (asianElems.length > 0) {
        gsap.to(asianElems, {
          y: 0,
          opacity: 1,
          duration: ENTER_DURATION,
          ease: "power2.out",
          stagger: ASIAN_STAGGER,
        });
      }
    }
  }, [
    language,
    isChanging,
    setIsChanging,
    targetContent,
    displayedContent,
    animateExit,
    useWordLevelAnimation,
  ]);

  // Exit animation on link navigation (page transitions)
  useEffect(() => {
    if (!linkClicked || !whatLink || !containerRef.current) return;

    const exitTl = runExitAnimation();

    return () => {
      if (exitTl) {
        exitTl.kill(); // ✅ cleanup returns void, TS is happy
      }
    };
  }, [linkClicked, whatLink, runExitAnimation]);

  // Cleanup on unmount
  useEffect(() => {
    const container = containerRef.current;

    return () => {
      if (container) {
        const animatedWords = container.querySelectorAll(".animated-word");
        gsap.killTweensOf(animatedWords);
      }
    };
  }, []);

  // ✅ Wrapper classes follow classLanguage, NOT raw language
  const languageSpecificClass =
    classLanguage === "jp" ? classNameJapanese : classNameEnglish;

  return (
    <Component
      ref={containerRef}
      className={`inline-flex items-center flex-wrap h-fit ${className} ${languageSpecificClass}`}
      style={{ overflow: "hidden" }}
    >
      {animatedElements}
    </Component>
  );
}
