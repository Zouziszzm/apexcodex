'use client';

import { useRef } from 'react';
import gsap from 'gsap';

function HoverLine({
  children,
  className = '',
  lineClassName = 'h-[2px] bg-foreground',
  duration = 0.4
}) {
  const lineRef = useRef(null);
  const animationRef = useRef(null); // Store the GSAP timeline

  const handleMouseEnter = () => {
    if (!lineRef.current) return;

    // Kill any existing animation to prevent conflicts
    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = gsap.fromTo(lineRef.current,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration,
        ease: 'power2.out',
        overwrite: true // Ensures previous animations are properly overwritten
      }
    );
  };

  const handleMouseLeave = () => {
    if (!lineRef.current) return;

    // Kill any existing animation before starting the leave animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = gsap.to(lineRef.current, {
      scaleX: 0,
      opacity: 0,
      duration: duration * 0.75,
      ease: 'power2.in',
      overwrite: true
    });
  };

  return (
    <div
      className={`w-fit cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        ref={lineRef}
        className={`w-full ${lineClassName} transform scale-x-0 origin-left`}
        style={{ opacity: 0 }}
      />
    </div>
  );
}

export default HoverLine;
