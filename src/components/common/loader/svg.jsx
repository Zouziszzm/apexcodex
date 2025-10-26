"use client";
import React from "react";

export const Svg = ({
  paths,
  width = "100%",
  height = "100%",
}) => {

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
      {paths.map((d, idx) => (
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
