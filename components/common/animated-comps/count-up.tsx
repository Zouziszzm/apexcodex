"use client";

import gsap from "gsap";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;        // seconds
  duration?: number;     // seconds
  className?: string;
  startWhen?: boolean;   // external control
  separator?: string;    // e.g. "," or " · "
  onStart?: () => void;
  onEnd?: () => void;
}

export default function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
}: CountUpProps) {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const valueRef = useRef<{ value: number }>({
    value: direction === "down" ? to : from,
  });

  const [isInView, setIsInView] = useState(false);



  const getDecimalPlaces = (num: number): number => {
    const str = num.toString();
    if (str.includes(".")) {
      const decimals = str.split(".")[1];
      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }
    return 0;
  };

  const maxDecimals = Math.max(
    getDecimalPlaces(from),
    getDecimalPlaces(to)
  );

  const formatValue = useCallback(
    (latest: number) => {
      const hasDecimals = maxDecimals > 0;

      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0,
      };

      const formattedNumber = Intl.NumberFormat("en-US", options).format(
        latest
      );

      return separator
        ? formattedNumber.replace(/,/g, separator)
        : formattedNumber;
    },
    [maxDecimals, separator]
  );

  // Set initial text content
  useEffect(() => {
    if (!spanRef.current) return;

    const initialValue =
      direction === "down" ? to : from;

    valueRef.current.value = initialValue;
    spanRef.current.textContent = formatValue(initialValue);
  }, [from, to, direction, formatValue]);

  // In-view detection using IntersectionObserver
  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el); // run only once
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // Trigger GSAP animation when in view + allowed
  useEffect(() => {
    if (!isInView || !startWhen || !spanRef.current) return;

    // kill any previous tween
    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    const startValue =
      direction === "down" ? to : from;
    const endValue =
      direction === "down" ? from : to;

    valueRef.current.value = startValue;
    spanRef.current.textContent = formatValue(startValue);

    if (onStart) onStart();

    const tween = gsap.to(valueRef.current, {
      value: endValue,
      delay,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        if (!spanRef.current) return;
        spanRef.current.textContent = formatValue(
          valueRef.current.value
        );
      },
      onComplete: () => {
        if (!spanRef.current) return;
        spanRef.current.textContent = formatValue(endValue);
        if (onEnd) onEnd();
      },
    });

    tweenRef.current = tween;

    return () => {
      tween.kill();
    };
  }, [
    isInView,
    startWhen,
    direction,
    from,
    to,
    delay,
    duration,
    formatValue,
    onStart,
    onEnd,
  ]);

  return <span ref={spanRef} className={className} />;
}
