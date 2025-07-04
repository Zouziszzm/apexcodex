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
  stroke, // Made optional since we'll use theme by default
  width = "100%",
  height = "100%",
}: AnimatedPathsProps) => {
  const { theme } = useTheme(); // Removed unused toggleTheme

  // Theme-based colors
  const darkModeStroke = "#fff"; // Light color for dark mode
  const lightModeStroke = "#000"; // Dark color for light mode

  // Use provided stroke color or theme-based color
  const strokeColor = stroke
    ? stroke
    : theme === "dark"
      ? darkModeStroke
      : lightModeStroke;

  return (
    <svg
      viewBox="0 0 575 250"
      stroke={strokeColor} // Applied theme-based stroke color here
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths.map((d, idx) => (
        <motion.path
          key={idx}
          d={d}
          strokeWidth={0.8}
          stroke={strokeColor} // Also applied stroke color to each path
        />
      ))}
    </svg>
  );
};
