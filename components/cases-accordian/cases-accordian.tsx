"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  MouseEvent,
  useRef,
} from "react";

import { useLink } from "@/lib/context/link-context";
import AnimatedLine from "../common/animated-comps/line";

// ─────────────────────────────
// Context setup
// ─────────────────────────────

type AccordionRootContextType = {
  openValue: string | null;
  setOpenValue: (value: string | null) => void;
  hoveredValue: string | null;
  setHoveredValue: (value: string | null) => void;
  previewImage: string | null;
  setPreviewImage: (src: string | null) => void;
  showHoverImage: boolean;
  setShowHoverImage: (show: boolean) => void;
  cursor: { x: number; y: number };
  setCursor: (pos: { x: number; y: number }) => void;
};

const AccordionRootContext = createContext<AccordionRootContextType | null>(
  null
);

type AccordionItemContextType = {
  value: string;
  image?: string;
};

const AccordionItemContext = createContext<AccordionItemContextType | null>(
  null
);

const useAccordionRoot = () => {
  const ctx = useContext(AccordionRootContext);
  if (!ctx)
    throw new Error("CasesAccordion.* must be used inside <CasesAccordion>");
  return ctx;
};

const useAccordionItem = () => {
  const ctx = useContext(AccordionItemContext);
  if (!ctx)
    throw new Error(
      "CasesAccordionItem.* must be used inside <CasesAccordionItem>"
    );
  return ctx;
};

// ─────────────────────────────
// Root
// ─────────────────────────────

type CasesAccordionProps = {
  children: ReactNode;
  className?: string;
};

function CasesAccordion({ children, className }: CasesAccordionProps) {
  const [openValue, setOpenValue] = useState<string | null>(null);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showHoverImage, setShowHoverImage] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const { linkClicked } = useLink();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    // Only move follower image when nothing is open AND no navigation in progress
    if (openValue || linkClicked) return;
    setCursor({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setShowHoverImage(false);
    setHoveredValue(null);
  };

  // Close accordion + clear hover when navigation starts
  useEffect(() => {
    if (!linkClicked) return;

    if (openValue !== null) {
      setOpenValue(null);
    }

    setHoveredValue(null);
    setShowHoverImage(false);
    setPreviewImage(null);
  }, [linkClicked, openValue]);

  return (
    <AccordionRootContext.Provider
      value={{
        openValue,
        setOpenValue,
        hoveredValue,
        setHoveredValue,
        previewImage,
        setPreviewImage,
        showHoverImage,
        setShowHoverImage,
        cursor,
        setCursor,
      }}
    >
      <div
        className={`relative w-full ${className ?? ""}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}

        {/* Hover follower image (only when no item is open and no navigation in progress) */}
        {previewImage && !openValue && !linkClicked && (
          <div
            className={`
              fixed pointer-events-none z-[60]
              w-[200px] h-[150px]
              -translate-x-1/2 -translate-y-1/2
              overflow-hidden 
              border border-neutral-700/40
              bg-transparent
              shadow-2xl backdrop-blur-none
              transition-opacity duration-300
              ${showHoverImage ? "opacity-100" : "opacity-0"}
            `}
            style={{
              left: `${cursor.x}px`,
              top: `${cursor.y}px`,
            }}
          >
            <img
              src={previewImage}
              alt=""
              className="h-full w-full object-cover opacity-70"
            />
          </div>
        )}
      </div>
    </AccordionRootContext.Provider>
  );
}

// ─────────────────────────────
// Item (With immediate entrance animations)
// ─────────────────────────────

type CasesAccordionItemProps = {
  value: string;
  image?: string;
  children: ReactNode;
  className?: string;
  index?: number;
};

function CasesAccordionItem({
  value,
  image,
  children,
  className,
  index = 0,
}: CasesAccordionItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.5, // triggers when 50% is visible
        rootMargin: "20px 0px 20px 0px", // Triggers 20px before entering viewport
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [isVisible]);

  // Stagger delay based on index (80ms between each item)
  const animationDelay = `${index * 80}ms`;

  return (
    <AccordionItemContext.Provider value={{ value, image }}>
      <div
        ref={ref}
        className={`
          transform transition-all duration-600 ease-out
          ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }
          ${className ?? ""}
        `}
        style={{
          transitionDelay: isVisible ? animationDelay : "0ms",
          // Force hardware acceleration
          willChange: "transform, opacity",
        }}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

// ─────────────────────────────
// Header
// ─────────────────────────────

type CasesAccordionHeaderProps = {
  children: ReactNode;
  className?: string;
};

function CasesAccordionHeader({
  children,
  className,
}: CasesAccordionHeaderProps) {
  const {
    openValue,
    setOpenValue,
    setHoveredValue,
    setPreviewImage,
    setShowHoverImage,
  } = useAccordionRoot();
  const { value, image } = useAccordionItem();
  const { linkClicked } = useLink();

  const isOpen = openValue === value;

  return (
    <>
      <AnimatedLine />
      <button
        type="button"
        className={`
          w-full text-left cursor-pointer
          py-4 md:py-5
          transition-colors
          ${className ?? ""}
        `}
        onMouseEnter={() => {
          // Don't show hover image while an item is open or during navigation
          if (openValue || linkClicked) return;
          setHoveredValue(value);
          if (image) {
            setPreviewImage(image);
            setShowHoverImage(true);
          }
        }}
        onMouseLeave={() => {
          if (openValue || linkClicked) return;
          setHoveredValue(null);
          setShowHoverImage(false);
        }}
        onClick={() => {
          // Optionally: block toggling while navigation is in progress
          if (linkClicked) return;

          if (isOpen) {
            setOpenValue(null);
          } else {
            setOpenValue(value);
          }
          setShowHoverImage(false);
          setHoveredValue(null);
        }}
      >
        {children}
      </button>
    </>
  );
}

// ─────────────────────────────
// Content
// ─────────────────────────────

type CasesAccordionContentProps = {
  children: ReactNode;
  className?: string;
};

function CasesAccordionContent({
  children,
  className,
}: CasesAccordionContentProps) {
  const { openValue } = useAccordionRoot();
  const { value } = useAccordionItem();

  const isOpen = openValue === value;

  return (
    <div
      className={`
        transition-all duration-300 ease-out
        grid overflow-hidden
        ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 pb-6 pt-4"
            : "grid-rows-[0fr] opacity-0 pb-0 pt-0"
        }
        ${className ?? ""}
      `}
    >
      <div className="overflow-hidden">
        <div key={`${value}-content-${isOpen}`}>{children}</div>
      </div>
    </div>
  );
}

export {
  CasesAccordion,
  CasesAccordionItem,
  CasesAccordionHeader,
  CasesAccordionContent,
};
