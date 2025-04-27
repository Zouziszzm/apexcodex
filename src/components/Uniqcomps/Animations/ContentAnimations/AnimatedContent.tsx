'use client';
import { motion, useInView } from 'motion/react'; // Ensure correct import
import React, { useRef } from 'react';
import { useLanguage } from '../../../../context/Language/LanguageContext';
import { ReactNode, useEffect } from 'react';

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
  const isInView = useInView(ref, { once: true, margin: '-100px' }); // `once: true` prevents retriggers
  const { language } = useLanguage();

  // Reset animation state when language changes
  useEffect(() => {
    // Force re-render by changing the key
  }, [language]);

  return (
    <motion.div
      ref={ref}
      key={`animate-${language}`} // Force remount on language change
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
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
