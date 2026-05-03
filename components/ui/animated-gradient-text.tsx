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
        "inline transition-all duration-500 hover:animate-gradient hover:bg-linear-to-r hover:from-(--color-from) hover:via-(--color-to) hover:to-(--color-from) hover:bg-[length:var(--bg-size)_100%] hover:bg-clip-text hover:text-transparent cursor-default",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
