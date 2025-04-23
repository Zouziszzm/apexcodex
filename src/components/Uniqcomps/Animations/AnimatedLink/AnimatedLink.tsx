'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useTransition } from '../../../../context/Transition/TransitionProvider';
import { ReactNode } from 'react';

export default function AnimatedLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const { triggerExit } = useTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerExit(() => router.push(href));
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
