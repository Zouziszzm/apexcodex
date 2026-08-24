"use client";

import { cn } from "@/lib/utils";

interface SiteConsentDialogProps {
  onAllow: () => void;
  onDecline: () => void;
}

export function SiteConsentDialog({
  onAllow,
  onDecline,
}: SiteConsentDialogProps) {
  return (
    <div
      className="fixed inset-0 z-[10000] bg-(--body)/10 backdrop-blur-md"
      role="presentation"
      onClick={onDecline}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-consent-title"
        aria-describedby="site-consent-description"
        onClick={(event) => event.stopPropagation()}
        className={cn(
          "fixed bottom-[35px] left-1/2 z-10 w-[min(100vw-2rem,20rem)] -translate-x-1/2",
          "border border-theme bg-surface/90 p-4 backdrop-blur-xl",
          "flex flex-col gap-4 shadow-[0_16px_48px_rgba(0,0,0,0.14)]",
          "sm:left-[35px] sm:translate-x-0",
        )}
      >
        <div className="flex flex-col gap-2">
          <h2
            id="site-consent-title"
            className="font-body-sm font-medium text-(--title)"
          >
            Sound & preferences
          </h2>
          <p
            id="site-consent-description"
            className="font-body-xs font-light leading-relaxed text-(--subtext)"
          >
            This site uses{" "}
            <span className="text-(--body)">local browser storage</span> to
            remember your theme and sound choices. There are no tracking
            cookies. Allow quiet ambient background audio?
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onAllow}
            className="flex-1 border border-theme bg-(--body) px-3 py-2 font-body-xs font-medium text-(--bg) transition-colors hover:opacity-90"
          >
            Allow
          </button>
          <button
            type="button"
            onClick={onDecline}
            className="flex-1 border border-theme bg-surface px-3 py-2 font-body-xs font-medium text-(--body) transition-colors hover:bg-theme/10"
          >
            Do not allow
          </button>
        </div>
      </div>
    </div>
  );
}
