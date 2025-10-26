import gsap from 'gsap';

export const animatePageOut = () => {
  // Animate all AnimatedText components to height: 0
  return gsap.to('[data-animated-text]', {
    height: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.in'
  });
};

export const animatePageIn = () => {
  // Animate all AnimatedText components from height: 0 to 'auto'
  return gsap.fromTo('[data-animated-text]',
    { height: 0 },
    {
      height: 'auto',
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    }
  );
};
