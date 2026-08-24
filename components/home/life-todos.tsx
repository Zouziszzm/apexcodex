"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { EMOJI_QUOTES, EMOJIS } from "@/data/emoji-moods";

function pickEmoji(exclude?: string) {
  const pool = exclude ? EMOJIS.filter((e) => e !== exclude) : EMOJIS;
  return pool[Math.floor(Math.random() * pool.length)];
}

function revealEmoji(el: HTMLElement, delay = 0) {
  gsap.fromTo(
    el,
    { opacity: 0, filter: "blur(6px)" },
    {
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.2,
      delay,
      ease: "power2.out",
    },
  );
}

export function LifeTodosTrigger() {
  const [emoji, setEmoji] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const emojiRef = useRef<HTMLSpanElement>(null);
  const readyRef = useRef(false);

  useEffect(() => {
    setEmoji(pickEmoji());
  }, []);

  useGSAP(
    () => {
      const el = emojiRef.current;
      if (!el || !emoji || readyRef.current) return;
      readyRef.current = true;
      revealEmoji(el, 0.25);
    },
    { dependencies: [emoji] },
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const el = emojiRef.current;
      if (!el) return;

      gsap.to(el, {
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          setEmoji((prev) => pickEmoji(prev ?? undefined));
          requestAnimationFrame(() => {
            if (emojiRef.current) revealEmoji(emojiRef.current, 0);
          });
        },
      });
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  const quote = emoji ? (EMOJI_QUOTES[emoji] ?? "Hello, wanderer.") : "";

  return (
    <span
      className="relative inline-flex items-baseline min-w-[1.15em] overflow-visible"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {emoji && (
        <span
          ref={emojiRef}
          className="inline-flex items-center justify-center text-[1.15em] leading-none select-none opacity-0"
          aria-label={quote}
          role="img"
        >
          {emoji}
        </span>
      )}
      {emoji && (
        <span
          className={cn(
            "absolute left-1/2 bottom-[calc(100%+0.45rem)] -translate-x-1/2 z-100",
            "pointer-events-none whitespace-normal text-center w-max max-w-[min(260px,72vw)]",
            "font-body-xs font-light italic text-(--subtext)/75 tracking-wide",
            "transition-all duration-300 ease-out",
            hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1",
          )}
          aria-hidden={!hovered}
        >
          &ldquo;{quote}&rdquo;
        </span>
      )}
    </span>
  );
}
