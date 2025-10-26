"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  Children,
  cloneElement,
  isValidElement,
} from "react";
import gsap from "gsap";
import { useLink } from "@/lib/context/link-context";

export default function AnimatedText({
  children,
  className = "",
  as: Component = "span",
}) {
  const containerRef = useRef(null);
  const { linkClicked, whatLink, resetLink } = useLink();
  const router = useRouter();


  const ENGLISH_STAGGER = 0.004;
  const ASIAN_STAGGER = 0.002;

  const hasAsianChars = (text) => {
    return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF]/.test(text);
  };


  const processChildren = (children) => {
    const elements = [];
    let wordIndex = 0;

    const processNode = (node) => {
      if (typeof node === "string") {
        if (node.trim() === "") {
          // Preserve spaces
          if (node.length > 0) elements.push(node);
          return;
        }

        if (hasAsianChars(node)) {

          Array.from(node).forEach((char) => {
            if (char === ' ') {
              elements.push(' ');
            } else {
              elements.push(
                <span
                  key={`char-${wordIndex++}`}
                  className="animated-word animated-asian inline-block"
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
            {cloneElement(node, {
              className: `${node.props.className || ""} inline-block`,
            })}
          </span>
        );
      }
    };

    Children.forEach(children, (child) => {
      if (Array.isArray(child)) {
        child.forEach(processNode);
      } else {
        processNode(child);
      }
    });

    return elements;
  };

  const animatedElements = processChildren(children);

  useEffect(() => {
    if (!containerRef.current) return;

    const wordElems = containerRef.current.querySelectorAll(".animated-word:not(.animated-asian)");
    const asianElems = containerRef.current.querySelectorAll(".animated-asian");

    // Animate English words with faster speed
    if (wordElems.length > 0) {
      gsap.to(wordElems, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: ENGLISH_STAGGER,
      });
    }

    // Animate Asian characters with slower speed
    if (asianElems.length > 0) {
      gsap.to(asianElems, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: ASIAN_STAGGER,
      });
    }
  }, []);

  useEffect(() => {
    if (linkClicked && whatLink && containerRef.current) {
      const wordElems = containerRef.current.querySelectorAll(".animated-word:not(.animated-asian)");
      const asianElems = containerRef.current.querySelectorAll(".animated-asian");

      const animations = [];

      // Animate English words out
      if (wordElems.length > 0) {
        animations.push(
          gsap.to(wordElems, {
            y: -20,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            stagger: ENGLISH_STAGGER,
          })
        );
      }

      // Animate Asian characters out
      if (asianElems.length > 0) {
        animations.push(
          gsap.to(asianElems, {
            y: -20,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            stagger: ASIAN_STAGGER,
          })
        );
      }

      // Wait for the longest animation to complete
      if (animations.length > 0) {
        Promise.all(animations.map(anim => anim.then())).then(() => {
          router.push(whatLink);
          resetLink();
        });
      }
    }
  }, [linkClicked, whatLink, resetLink, router]);

  return (
    <Component
      ref={containerRef}
      className={`inline-flex items-center flex-wrap h-fit ${className}`}
      style={{ overflow: "hidden" }}
    >
      {animatedElements}
    </Component>
  );
}
