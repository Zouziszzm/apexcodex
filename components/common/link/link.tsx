"use client";

import { MouseEvent, ReactNode } from "react";
import { useLink } from "@/lib/context/link-context";

export interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  active?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export default function TransitionLink({
  href,
  children,
  className = "",
  active = false,
  onClick,
}: TransitionLinkProps) {
  const { setLinkClicked, canClick } = useLink();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick first
    onClick?.(e);

    // Don't proceed if clicks are disabled or link is active
    if (!canClick || active) {
      e.preventDefault();
      console.log('Click prevented:', active ? 'active link' : 'not allowed');
      return;
    }

    // Handle different link types
    if (href.startsWith('http') || href === '#') {
      // External links or anchors - navigate immediately without animation
      if (href.startsWith('http')) {
        // External links - let default behavior handle it with target="_blank"
        return; // Don't prevent default for external links
      } else {
        // Anchor links - prevent default but don't navigate
        e.preventDefault();
        return;
      }
    } else {
      // ALL internal links (including home "/") - use animation flow
      e.preventDefault();
      console.log('Starting animated navigation to:', href);
      setLinkClicked(href);
    }
  };

  const activeClass = active ? "opacity-70 cursor-default" : "";
  const disabledClass = !canClick ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:opacity-80';

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`transition-colors duration-200 ${activeClass} ${disabledClass} ${className}`}
      style={{
        pointerEvents: active || !canClick ? 'none' : 'auto',
      }}
      {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}