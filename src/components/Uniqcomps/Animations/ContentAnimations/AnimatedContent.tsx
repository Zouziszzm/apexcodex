'use client';
import React from 'react';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { useInView } from 'motion/react';
import { useLanguage } from '../../../../context/Language/LanguageContext';
import type { ReactNode } from 'react';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { ease: 'easeOut', duration: 0.5 },
  },
};

export default function AnimatedContainer({
  children,
}: {
  children: ReactNode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const { language } = useLanguage();

  // Combine view state and language to trigger animation
  const shouldAnimate = isInView || language;

  return (
    <motion.div
      ref={ref}
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate={shouldAnimate ? 'show' : 'hidden'}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={`${language}-${index}`} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>{children}</motion.div>
      )}
    </motion.div>
  );
}
