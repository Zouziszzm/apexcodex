// app/template.tsx
"use client";

import React from "react";
import Silk from "@/components/BG/silk";

interface TemplateProps {
  children: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen">
      {/* Fixed Silk background */}
      <div className="fixed inset-0 -z-10">
        <Silk
          color="#edf2f4"
          waveColor="#2b2d42"
          bgColor="#ef476f"
          speed={2.5}
          scale={0.5}
          noiseIntensity={5}
          rotation={1.5}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Template;
