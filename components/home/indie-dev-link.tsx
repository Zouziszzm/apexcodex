"use client";

import { Highlighter } from "@/components/ui/marker";
import { useShimmerHover } from "@/hooks/use-shimmer-hover";

export function IndieDevLink() {
  const { ref, onMouseEnter, onMouseLeave } = useShimmerHover("var(--subtext)");

  return (
    <span
      className="inline"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Highlighter
        action="underline"
        color="#e8d4f5"
        strokeWidth={2}
        delay={2100}
        padding={5}
      >
        <span
          ref={ref}
          role="link"
          tabIndex={0}
          className="cursor-pointer inline"
          onClick={() =>
            window.open(
              "https://ginink-web.vercel.app",
              "_blank",
              "noopener,noreferrer",
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              window.open(
                "https://ginink-web.vercel.app",
                "_blank",
                "noopener,noreferrer",
              );
            }
          }}
        >
          indie developer
          <span
            className="ml-0.5 text-[0.82em] opacity-55 select-none"
            aria-hidden="true"
          >
            ↗
          </span>
        </span>
      </Highlighter>
    </span>
  );
}
