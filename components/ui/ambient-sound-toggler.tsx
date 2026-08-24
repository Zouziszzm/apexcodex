"use client";

import { Volume2, VolumeX } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAmbientSound } from "@/components/providers/ambient-sound-provider";

interface AmbientSoundTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {}

export function AmbientSoundToggler({
  className,
  ...props
}: AmbientSoundTogglerProps) {
  const { enabled, toggle } = useAmbientSound();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={enabled ? "Turn ambient sound off" : "Turn ambient sound on"}
      title={enabled ? "Turn ambient sound off" : "Turn ambient sound on"}
      aria-pressed={enabled}
      className={cn(
        "p-2 border border-theme bg-surface hover:bg-theme/10 transition-colors flex items-center justify-center",
        className,
      )}
      {...props}
    >
      {enabled ? (
        <Volume2 className="w-4 h-4" aria-hidden="true" />
      ) : (
        <VolumeX className="w-4 h-4" aria-hidden="true" />
      )}
      <span className="sr-only">Toggle ambient sound</span>
    </button>
  );
}
