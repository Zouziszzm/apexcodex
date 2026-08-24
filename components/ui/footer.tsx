"use client";

import React from "react";
import { DiaTextReveal } from "./dia-text-rv";
import { AnimatedGradientText } from "./animated-gradient-text";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 border-t border-(--border)/30 mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 flex flex-col items-center gap-1">
        <p className="font-body-sm text-[12px] font-light text-(--subtext)">
          <DiaTextReveal delay={0.8} textColor="var(--subtext)">
            <AnimatedGradientText speed={1.5}>
              Made with caffeine and happy vibes by Farhaan.
            </AnimatedGradientText>
          </DiaTextReveal>
        </p>
        <p className="font-body-sm text-[11px] font-light text-(--subtext)">
          <DiaTextReveal
            text={`Copyright © ${currentYear} alfarhaankhan. All rights reserved.`}
            delay={1.0}
            textColor="var(--subtext)"
          />
        </p>
      </div>
    </footer>
  );
};
