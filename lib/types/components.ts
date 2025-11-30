import { ReactNode } from 'react';

export interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  extraScale?: number;
  children: ReactNode;
}

export interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

export interface LoaderProps {
  onComplete?: () => void;
}

export interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface HoverLineProps {
  children: ReactNode;
  className?: string;
  lineClassName?: string;
  duration?: number;
}

export interface AnimatedLineProps {
  className?: string;
  lineClassName?: string;
  duration?: number;
  delay?: number;
  ease?: string;
}

export interface NavItem {
  id: number;
  label: string;
  labelJp?: string;
  href: string;
}

