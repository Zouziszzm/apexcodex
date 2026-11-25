"use client"

import { useLayoutEffect, useRef } from "react"
import type React from "react"
import { useInView } from "motion/react"
import { annotate } from "rough-notation"
import { type RoughAnnotation } from "rough-notation/lib/model"

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
  delay?: number
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
  delay = 0,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  })

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = !isView || isInView

  useLayoutEffect(() => {
    const element = elementRef.current
    let annotation: RoughAnnotation | null = null
    let resizeObserver: ResizeObserver | null = null
    let timeoutId: NodeJS.Timeout | undefined

    if (shouldShow && element) {
      const annotationConfig = {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      }

      const currentAnnotation = annotate(element, annotationConfig)
      annotation = currentAnnotation
      
      if (delay > 0) {
        timeoutId = setTimeout(() => currentAnnotation.show(), delay)
      } else {
        currentAnnotation.show()
      }

      let lastRect = element.getBoundingClientRect()
      const repositionIfMoved = () => {
        if (!currentAnnotation.isShowing()) return
        const nextRect = element.getBoundingClientRect()
        const moved =
          Math.abs(nextRect.left - lastRect.left) > 0.5 ||
          Math.abs(nextRect.top - lastRect.top) > 0.5 ||
          Math.abs(nextRect.width - lastRect.width) > 0.5 ||
          Math.abs(nextRect.height - lastRect.height) > 0.5
        if (!moved) return
        lastRect = nextRect
        currentAnnotation.hide()
        currentAnnotation.show()
      }

      resizeObserver = new ResizeObserver(repositionIfMoved)
      resizeObserver.observe(element)
      window.addEventListener("resize", repositionIfMoved)

      return () => {
        clearTimeout(timeoutId)
        annotation?.remove()
        resizeObserver?.disconnect()
        window.removeEventListener("resize", repositionIfMoved)
      }
    }

    return undefined
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
    delay,
  ])

  return (
    <span ref={elementRef} className="inline">
      {children}
    </span>
  )
}
