"use client";
import React from "react";
import { motion } from "motion/react"; // Assuming you're using framer-motion
import { useTheme } from "@/context/Theme/Theme";
interface AnimatedPathsProps {
  paths: string[];
  animate?: boolean;
  stroke?: string; // This prop is now optional since we're using theme colors
  duration?: number;
  delayStep?: number;
  width?: string;
  height?: string;
}

export const AnimatedPaths = ({
  paths,
  stroke,
  width = "100%",
  height = "100%",
}: AnimatedPathsProps) => {
  const { theme } = useTheme(); // Removed unused toggleTheme

  const darkModeStroke = "#fff"; // Light color for dark mode
  const lightModeStroke = "#000"; // Dark color for light mode

  const strokeColor = stroke
    ? stroke
    : theme === "dark"
      ? darkModeStroke
      : lightModeStroke;

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
        <motion.path
          key={idx}
          d={d}
          strokeWidth={0}
          stroke={strokeColor} // Also applied stroke color to each path
        />
      ))}
    </svg>
  );
};
