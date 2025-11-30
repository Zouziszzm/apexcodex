// app/AppWrapper.tsx
"use client";

import { useState } from "react";
import { LinkProvider } from "@/lib/context/link-context";
import { LanguageProvider } from "@/lib/context/language-context";
import Loader from "@/components/common/loader/loader";
import ClickSpark from "../animated-comps/spark";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <LanguageProvider>
      <LinkProvider>
        <ClickSpark
          sparkColor="#1C1C1E50"
          sparkSize={7}
          sparkRadius={14}
          sparkCount={7}
          duration={400}
        >
          {isLoading && <Loader onComplete={handleLoaderComplete} />}
          {!isLoading && children}
        </ClickSpark>
      </LinkProvider>
    </LanguageProvider>
  );
}
