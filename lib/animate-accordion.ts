import { gsap } from "gsap";

type AccordionOptions = {
  openDuration?: number;
  closeDuration?: number;
  marginTop?: number;
  onComplete?: () => void;
};

function measureAccordionHeight(element: HTMLElement) {
  const previousStyles = {
    height: element.style.height,
    overflow: element.style.overflow,
    opacity: element.style.opacity,
    marginTop: element.style.marginTop,
    display: element.style.display,
  };

  element.style.height = "auto";
  element.style.overflow = "hidden";
  element.style.opacity = "1";
  element.style.display = "block";

  const height = element.scrollHeight;

  element.style.height = previousStyles.height;
  element.style.overflow = previousStyles.overflow;
  element.style.opacity = previousStyles.opacity;
  element.style.marginTop = previousStyles.marginTop;
  element.style.display = previousStyles.display;

  return height;
}

export function setAccordionOpen(
  element: HTMLElement,
  open: boolean,
  options: AccordionOptions = {},
) {
  const {
    openDuration = 0.85,
    closeDuration = 0.7,
    marginTop = 0,
    onComplete,
  } = options;

  gsap.killTweensOf(element);

  if (open) {
    const targetHeight = measureAccordionHeight(element);

    gsap.set(element, { overflow: "hidden", height: 0, opacity: 0, marginTop: 0 });
    gsap.to(element, {
      height: targetHeight,
      opacity: 1,
      marginTop,
      duration: openDuration,
      ease: "power3.out",
      onComplete: () => {
        gsap.set(element, { height: "auto", overflow: "visible" });
        onComplete?.();
      },
    });
    return;
  }

  const startHeight = element.offsetHeight;

  gsap.set(element, { overflow: "hidden", height: startHeight });
  gsap.to(element, {
    height: 0,
    opacity: 0,
    marginTop: 0,
    duration: closeDuration,
    ease: "power3.inOut",
    onComplete: () => {
      gsap.set(element, { overflow: "hidden", height: 0 });
      onComplete?.();
    },
  });
}
