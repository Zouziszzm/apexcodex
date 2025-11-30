"use client";
import React from "react";

interface SvgProps {
  paths: string[];
  width?: string;
  height?: string;
}

export const Svg = ({
  paths,
  width = "100%",
  height = "100%",
}: SvgProps) => {

  const strokeColor = "#000"

  return (
    <svg
      viewBox="0 0 575 250"
      stroke={strokeColor}
      width={width}
      height={height}
      fill={strokeColor}
      className="scale-120"
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths.map((d: string, idx: number) => (
        <path
          key={idx}
          d={d}
          strokeWidth={0}
          stroke={strokeColor}
        />
      ))}
    </svg>
  );
};
