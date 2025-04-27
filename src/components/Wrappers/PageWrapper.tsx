'use client';
import { motion } from 'motion/react';
import React from 'react';
import { ReactNode } from 'react';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeOut',
      duration: 0.4,
      staggerChildren: 0.1,
    },
  },
};

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      key="page-wrapper" // Stable key to prevent retriggers
    >
      {children}
    </motion.div>
  );
}
