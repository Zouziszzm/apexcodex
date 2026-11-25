"use client";

import React from "react";
import { useLocale } from "@/app/contexts/LocaleContext";
import { LocaleHintDoodle } from "@/components/ui/editorial-doodles";
import { cn } from "@/lib/utils";

interface LocaleTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  showHint?: boolean;
}

export function LocaleToggler({
  className,
  showHint = false,
  ...props
}: LocaleTogglerProps) {
  const { locale, toggleLocale } = useLocale();
  const isJp = locale === "jp";

  return (
    <div className="relative inline-flex items-center">
      {showHint && <LocaleHintDoodle />}
      <button
        type="button"
        data-locale-blur
        onClick={toggleLocale}
        aria-label={isJp ? "Switch language to English" : "日本語に切り替える"}
        title={isJp ? "Switch to English" : "日本語に切り替える"}
        className={cn(
          "relative h-[34px] px-2.5 border border-theme bg-surface hover:bg-theme/10 transition-colors flex items-center justify-center text-[11px] font-medium leading-none tracking-tight text-(--body)",
          className,
        )}
        {...props}
      >
        <span>{isJp ? "EN" : "日本語"}</span>
      </button>
    </div>
  );
}
