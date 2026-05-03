import { type ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

export interface AnimatedGradientTextProps extends ComponentPropsWithoutRef<"span"> {
  speed?: number
  colorFrom?: string
  colorTo?: string
}

export function AnimatedGradientText({
  children,
  className,
  speed = 1,
  colorFrom = "var(--accent)",
  colorTo = "var(--body)",
  ...props
}: AnimatedGradientTextProps) {
  return (
    <span
      style={
        {
          "--bg-size": `${speed * 300}%`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
        } as React.CSSProperties
      }
      className={cn(
        `inline bg-linear-to-r from-(--color-from) via-(--color-to) to-(--color-from) bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent transition-all duration-500 hover:animate-gradient`,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
