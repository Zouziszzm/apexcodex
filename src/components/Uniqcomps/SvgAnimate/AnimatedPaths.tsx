'use client';
import React from 'react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface AnimatedPathsProps {
  paths: string[];
  animate?: boolean;
  stroke?: string;
  duration?: number;
  delayStep?: number;
  width?: string;
  height?: string;
}

export const AnimatedPaths = ({
  paths,
  animate = true,
  stroke = 'black',
  duration = 2.5,
  delayStep = 0.1,
  width = '100%',
  height = '100%',
}: AnimatedPathsProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Set initial theme based on system preference
    setIsDarkMode(mediaQuery.matches);

    // Listen for changes in the user's theme preference
    const listener = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', listener);

    // Cleanup listener on component unmount
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const fillColor = isDarkMode ? 'fill-[#f8f8ff]' : 'fill-[#3c3b3a]';

  return (
    <svg
      viewBox="0 0 575 106"
      stroke={stroke}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths.map((d, idx) => (
        <motion.path
          key={idx}
          d={d}
          strokeWidth={2}
          className={animate ? 'fill-none' : fillColor}
          initial={animate ? { pathLength: 0 } : undefined}
          animate={animate ? { pathLength: 1 } : undefined}
          transition={
            animate
              ? {
                  duration,
                  delay: idx * delayStep,
                  ease: 'linear',
                }
              : undefined
          }
        />
      ))}
    </svg>
  );
};
