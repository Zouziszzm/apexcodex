"use client";

import React from "react";
import CasesDesktop from "./components/CasesDesktop";
import CasesMobile from "./components/CasesMobile";
import { useLanguage } from "@/contexts/LanguageContext";

const CasesClient = () => {
  const { language } = useLanguage();
  return (
    <main className="bg-[var(--bg-cases)] min-h-screen w-full relative">
      {/* Mobile View (Visible on < lg, Hidden on >= lg) */}
      <div className="block lg:hidden w-full h-full">
        <CasesMobile key={language} />
      </div>

      {/* Desktop View (Hidden on < lg, Visible on >= lg) */}
      <div className="hidden lg:block w-full h-full">
        <CasesDesktop key={language} />
      </div>
    </main>
  );
};

export default CasesClient;
