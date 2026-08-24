"use client";

import { AnimatedThemeToggler } from "@/components/ui/theme-toggler";
import { AmbientSoundToggler } from "@/components/ui/ambient-sound-toggler";
import { cn } from "@/lib/utils";

export function HeaderControls({ className }: { className?: string }) {
  return (
    <div className={cn("relative z-20 flex shrink-0 items-center gap-2", className)}>
      <AmbientSoundToggler />
      <AnimatedThemeToggler variant="circle" className="opacity-100" />
    </div>
  );
}
