import { gsap } from "gsap";

export interface TweenBlurOptions {
  from?: number;
  to: number;
  duration: number;
  delay?: number;
  ease?: string;
  clearOnZero?: boolean;
}

type WebkitStylable = HTMLElement & {
  style: CSSStyleDeclaration & { webkitFilter?: string };
};

const activeTweens = new WeakMap<HTMLElement, gsap.core.Tween>();

function setBlurStyle(el: WebkitStylable, px: number) {
  const val = `blur(${px.toFixed(2)}px)`;
  el.style.filter = val;
  el.style.webkitFilter = val;
}

function clearBlurStyle(el: WebkitStylable) {
  el.style.filter = "";
  el.style.webkitFilter = "";
  el.style.willChange = "";
  if (
    el.style.transform === "translate3d(0, 0, 0)" ||
    el.style.transform === "translate3d(0,0,0)"
  ) {
    el.style.transform = "";
  }
}

/**
 * Animates CSS blur (including `-webkit-filter` for iOS/Mobile Safari)
 * via a numeric proxy with GPU layer keep-alive.
 */
export function tweenBlur(
  el: HTMLElement,
  {
    from,
    to,
    duration,
    delay = 0,
    ease = "power2.out",
    clearOnZero = true,
  }: TweenBlurOptions,
) {
  const target = el as WebkitStylable;
  const prev = activeTweens.get(el);
  if (prev) {
    prev.kill();
  }

  const rawFilter = target.style.filter || target.style.webkitFilter || "";
  const match = rawFilter.match(/blur\(([\d.]+)px\)/);
  const current = match ? parseFloat(match[1]) : 0;
  const state = { b: from ?? current };

  target.style.willChange = "filter, opacity, transform";
  if (!target.style.transform) {
    target.style.transform = "translate3d(0,0,0)";
  }
  setBlurStyle(target, state.b);

  const tween = gsap.to(state, {
    b: to,
    duration,
    delay,
    ease,
    onUpdate: () => {
      setBlurStyle(target, state.b);
    },
    onComplete: () => {
      if (activeTweens.get(el) === tween) {
        activeTweens.delete(el);
      }
      if (to === 0 && clearOnZero) {
        clearBlurStyle(target);
      }
    },
  });

  activeTweens.set(el, tween);
  return tween;
}
