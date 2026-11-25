"use client"

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { gsap } from "gsap"

import { cn } from "@/lib/utils"

const DEFAULT_COLORS = ["var(--accent)", "var(--body)", "var(--title)", "var(--subtext)", "var(--display)"]
const BAND_HALF = 17
const SWEEP_START = -BAND_HALF
const SWEEP_END = 100 + BAND_HALF

function subscribeReducedMotion(listener: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
  mql.addEventListener("change", listener)
  return () => mql.removeEventListener("change", listener)
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function getReducedMotionServerSnapshot(): boolean {
  return false
}

function buildGradient(pos: number, colors: string[], textColor: string) {
  const bandStart = pos - BAND_HALF
  const bandEnd = pos + BAND_HALF

  if (bandStart >= 100) {
    return `linear-gradient(90deg, ${textColor}, ${textColor})`
  }
  const n = colors.length
  const parts: string[] = []

  if (bandStart > 0)
    parts.push(`${textColor} 0%`, `${textColor} ${bandStart.toFixed(2)}%`)

  colors.forEach((c, i) => {
    const pct = n === 1 ? pos : bandStart + (i / (n - 1)) * BAND_HALF * 2
    parts.push(`${c} ${pct.toFixed(2)}%`)
  })

  if (bandEnd < 100)
    parts.push(`transparent ${bandEnd.toFixed(2)}%`, `transparent 100%`)

  return `linear-gradient(90deg, ${parts.join(", ")})`
}

function measureWidths(el: HTMLElement, texts: string[]) {
  const ghost = el.cloneNode() as HTMLElement
  Object.assign(ghost.style, {
    position: "absolute",
    visibility: "hidden",
    pointerEvents: "none",
    width: "auto",
    whiteSpace: "nowrap",
  })
  el.parentElement!.appendChild(ghost)
  const widths = texts.map((t) => {
    ghost.textContent = t
    return ghost.getBoundingClientRect().width
  })
  ghost.remove()
  return widths
}

export interface DiaTextRevealProps extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "children" | "style" | "color"
> {
  children?: React.ReactNode
  text?: string | string[]
  colors?: string[]
  textColor?: string
  duration?: number
  delay?: number
  repeat?: boolean
  repeatDelay?: number
  startOnView?: boolean
  once?: boolean
  className?: string
  fixedWidth?: boolean
  lineHeightGap?: string | number
}

export function DiaTextReveal({
  children,
  text = "",
  colors = DEFAULT_COLORS,
  textColor = "var(--title)",
  duration = 1.5,
  delay = 0,
  repeat = false,
  repeatDelay = 0.5,
  startOnView = false,
  once = true,
  className,
  fixedWidth = false,
  lineHeightGap,
  ...props
}: DiaTextRevealProps) {
  const texts = Array.isArray(text) ? text : [text]
  const isMulti = texts.length > 1

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  )
  const [hasCompleted, setHasCompleted] = useState(false)
  const hasCompletedRef = useRef(false)
  const spanRef = useRef<HTMLSpanElement>(null)
  const optsRef = useRef({
    colors,
    textColor,
    duration,
    delay,
    repeat,
    repeatDelay,
    texts,
  })

  useEffect(() => {
    optsRef.current = {
      colors,
      textColor,
      duration,
      delay,
      repeat,
      repeatDelay,
      texts,
    }
  })

  const indexRef = useRef(0)
  const hasPlayedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [measuredWidths, setMeasuredWidths] = useState<number[]>([])
  const [isInView, setIsInView] = useState(!startOnView)

  useEffect(() => {
    const handleForceSnap = () => {
      if (tweenRef.current) {
        tweenRef.current.kill()
        tweenRef.current = null
      }
      if (spanRef.current && !optsRef.current.repeat) {
        spanRef.current.style.backgroundImage = buildGradient(
          SWEEP_END,
          optsRef.current.colors,
          optsRef.current.textColor,
        )
      }
      hasCompletedRef.current = true
      setHasCompleted(true)
    }

    const handleThemeClass = () => {
      if (tweenRef.current) return
      const el = spanRef.current
      if (!el) return
      el.style.backgroundImage = buildGradient(
        SWEEP_END,
        optsRef.current.colors,
        optsRef.current.textColor,
      )
    }

    window.addEventListener("dia-snap-visible", handleForceSnap)
    const observer = new MutationObserver(handleThemeClass)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => {
      window.removeEventListener("dia-snap-visible", handleForceSnap)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!startOnView) return
    const el = spanRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.disconnect()
        } else {
          if (!once) setIsInView(false)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [startOnView, once])

  const joinedText = Array.isArray(text) ? text.join("\0") : text

  useEffect(() => {
    const el = spanRef.current
    if (!el || !isMulti) return
    const rafId = requestAnimationFrame(() => {
      if (spanRef.current) {
        setMeasuredWidths(measureWidths(spanRef.current, optsRef.current.texts))
      }
    })
    return () => cancelAnimationFrame(rafId)
  }, [joinedText, isMulti])

  useEffect(() => {
    if (prefersReducedMotion) {
      if (spanRef.current) {
        spanRef.current.style.backgroundImage = buildGradient(
          SWEEP_END,
          optsRef.current.colors,
          optsRef.current.textColor,
        )
      }
      hasCompletedRef.current = true
      return
    }

    if (startOnView && !isInView) return
    if (once && hasPlayedRef.current) return
    if (hasCompletedRef.current) return
    hasPlayedRef.current = true

    const runSweep = () => {
      const {
        duration: d,
        delay: dl,
        repeat: rep,
        repeatDelay: repDl,
        texts: txts,
        colors: cols,
        textColor: tc,
      } = optsRef.current
      const el = spanRef.current
      if (!el) return

      if (tweenRef.current) tweenRef.current.kill()

      const obj = { pos: SWEEP_START }
      el.style.backgroundImage = buildGradient(obj.pos, cols, tc)

      tweenRef.current = gsap.to(obj, {
        pos: SWEEP_END,
        duration: d,
        delay: dl,
        ease: "power3.inOut",
        onUpdate: () => {
          if (spanRef.current && !hasCompletedRef.current) {
            spanRef.current.style.backgroundImage = buildGradient(
              obj.pos,
              cols,
              tc,
            )
          }
        },
        onComplete: () => {
          tweenRef.current = null
          if (!rep) {
            if (spanRef.current) {
              spanRef.current.style.backgroundImage = buildGradient(
                SWEEP_END,
                cols,
                tc,
              )
            }
            hasCompletedRef.current = true
            setHasCompleted(true)
            return
          }
          timerRef.current = setTimeout(() => {
            const next = (indexRef.current + 1) % txts.length
            indexRef.current = next
            setActiveIndex(next)
            runSweep()
          }, repDl * 1000)
        },
      })
    }

    runSweep()

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill()
        tweenRef.current = null
      }
      clearTimeout(timerRef.current)
      hasPlayedRef.current = false
    }
  }, [isInView, startOnView, once, prefersReducedMotion])

  const fixedW =
    isMulti && fixedWidth && measuredWidths.length > 0
      ? Math.max(...measuredWidths)
      : undefined

  const animatedW =
    isMulti && !fixedWidth && measuredWidths[activeIndex] != null
      ? measuredWidths[activeIndex]
      : undefined

  useEffect(() => {
    if (animatedW != null && spanRef.current) {
      gsap.to(spanRef.current, {
        width: animatedW,
        duration: 0.4,
        ease: "power1.inOut",
      })
    }
  }, [animatedW])

  const showEndGradient = (hasCompleted || prefersReducedMotion) && !repeat

  return (
    <span
      ref={spanRef}
      className={cn("text-inherit", className)}
      style={{
        color: "transparent",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
        backgroundSize: "100% 100%",
        backgroundImage: buildGradient(
          showEndGradient ? SWEEP_END : SWEEP_START,
          colors,
          textColor,
        ),
        ...(lineHeightGap !== undefined && { lineHeight: lineHeightGap }),
        ...(isMulti && {
          display: "inline-block",
          overflow: "hidden",
          whiteSpace: "nowrap",
          verticalAlign: "text-center",
          ...(fixedW != null && { width: fixedW }),
        }),
      }}
      {...props}
    >
      {children ?? texts[activeIndex]}
    </span>
  )
}
