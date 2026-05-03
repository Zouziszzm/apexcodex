"use client";

import React from "react";
import { useTransition } from "@/components/providers/transition-provider";
import { useSound } from "@/hooks/use-sound";

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export const TransitionLink = ({ href, children, className, ...props }: TransitionLinkProps) => {
  const { navigate } = useTransition();
  const { playClick } = useSound();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    playClick();
    navigate(href);
  };

  return (
    <a 
      href={href} 
      onClick={handleClick} 
      className={className}
      {...props}
    >
      {children}
    </a>
  );
};
