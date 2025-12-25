"use client";

import React from "react";
import CasesDesktop from "./components/CasesDesktop";
import CasesMobile from "./components/CasesMobile";

const CasesClient = () => {
  return (
    <main className="bg-[#EBE9E4] min-h-screen w-full relative">
      {/* Mobile View (Visible on < lg, Hidden on >= lg) */}
      <div className="block lg:hidden w-full h-full">
        <CasesMobile />
      </div>

      {/* Desktop View (Hidden on < lg, Visible on >= lg) */}
      <div className="hidden lg:block w-full h-full">
        <CasesDesktop />
      </div>
    </main>
  );
};

export default CasesClient;
