"use client"

import React, { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

import { cn } from "@/lib/utils"

const DEFAULT_COLORS = ["var(--accent)", "var(--body)", "var(--title)", "var(--subtext)", "var(--display)"]
const BAND_HALF = 17
const SWEEP_START = -BAND_HALF
const SWEEP_END = 100 + BAND_HALF

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
  fixedWidth?: boolean
  lineHeightGap?: string | number
  priority?: boolean
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
  startOnView = true,
  once = true,
  className,
  fixedWidth = false,
  lineHeightGap,
  priority = false,
  ...props
}: DiaTextRevealProps) {
  const texts = Array.isArray(text) ? text : [text]
  const isMulti = texts.length > 1

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mql.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [])

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
  optsRef.current = {
    colors,
    textColor,
    duration,
    delay,
    repeat,
    repeatDelay,
    texts,
  }

  const indexRef = useRef(0)
  const hasPlayedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [measuredWidths, setMeasuredWidths] = useState<number[]>([])
  const [isInView, setIsInView] = useState(priority || !startOnView)

  useEffect(() => {
    if (!startOnView || priority) return
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
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [startOnView, once])

  useEffect(() => {
    const el = spanRef.current
    if (!el || !isMulti) return
    // Wait for initial render to measure correctly
    setMeasuredWidths(measureWidths(el, texts))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Array.isArray(text) ? text.join("\0") : text, isMulti])

  const play = () => {
    const { duration, delay, repeat, repeatDelay, texts, colors, textColor } = optsRef.current
    const el = spanRef.current
    if (!el) return

    if (tweenRef.current) tweenRef.current.kill()

    const obj = { pos: SWEEP_START }

    el.style.backgroundImage = buildGradient(obj.pos, colors, textColor)

    tweenRef.current = gsap.to(obj, {
      pos: SWEEP_END,
      duration,
      delay,
      ease: "power3.inOut",
      onUpdate: () => {
        if (spanRef.current) {
          spanRef.current.style.backgroundImage = buildGradient(obj.pos, colors, textColor)
        }
      },
      onComplete: () => {
        if (!repeat) return
        timerRef.current = setTimeout(() => {
          const next = (indexRef.current + 1) % texts.length
          indexRef.current = next
          setActiveIndex(next)
          play()
        }, repeatDelay * 1000)
      },
    })
  }

  useEffect(() => {
    if (prefersReducedMotion) {
      if (spanRef.current) {
        spanRef.current.style.backgroundImage = buildGradient(
          SWEEP_END,
          optsRef.current.colors,
          optsRef.current.textColor
        )
      }
      return
    }

    if (startOnView && !isInView) return
    if (once && hasPlayedRef.current) return
    hasPlayedRef.current = true

    play()

    return () => {
      if (tweenRef.current) tweenRef.current.kill()
      clearTimeout(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        backgroundImage: buildGradient(SWEEP_START, colors, textColor),
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
