'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import { useLink } from '@/lib/context/link-context';

export default function AnimatedLine({
  className = '',
  lineClassName = 'h-[1px] bg-[#5C5C5C]',
  duration = 0.8,
  delay = 0.3,
  ease = 'power2.out',
}) {
  const lineRef = useRef(null);
  const { linkClicked, whatLink, resetLink } = useLink();
  const router = useRouter();

  useEffect(() => {
    if (!lineRef.current) return;

    // Animate the line in from 0 to full width
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration,
        ease,
        delay,
      }
    );
  }, [duration, delay, ease]);

  useEffect(() => {
    if (linkClicked && whatLink && lineRef.current) {
      // Animate the line out (scale back to 0)
      gsap.to(lineRef.current, {
        scaleX: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          router.push(whatLink);
          resetLink();
        },
      });
    }
  }, [linkClicked, whatLink, resetLink, router]);

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={lineRef}
        className={`w-full ${lineClassName} origin-left`}
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
