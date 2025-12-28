"use client";

import React from "react";
import Line from "@/components/Line";
import { PlaygroundItem } from "@/data/playground";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface PlaygroundRowProps {
  item: PlaygroundItem;
  index: number;
  onHover: () => void;
}

const PlaygroundRow: React.FC<PlaygroundRowProps> = ({
  item,
  index,
  onHover,
}) => {
  return (
    <Link
      href={item.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full group cursor-pointer"
      onMouseEnter={onHover}
    >
      <div className="w-full py-2 md:py-4">
        <div className="w-full mx-auto flex flex-row justify-between items-center">
          {/* Left Side: Title */}
          <div className="flex items-center gap-6">
            <p className="text-[#963531] text-[20px] group-hover:translate-x-2 transition-transform duration-300">
              {item.title}
            </p>
          </div>

          {/* Right Side: Tags and Arrow */}
          <div className="flex items-center gap-4">
            <p className="text-[#5C5C5C]/50 text-[14px]">
              {item.tags.join(" | ")}
            </p>
          </div>
        </div>

        <Line
          className="line-divider mt-4"
          delay={0.1 * index}
          animateOnScroll={false}
        />
      </div>
    </Link>
  );
};

export default PlaygroundRow;
