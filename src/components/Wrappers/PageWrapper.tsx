'use client';
import React from 'react';
import { motion } from 'motion/react';
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
    <motion.div initial="hidden" animate="show" variants={containerVariants}>
      {children}
    </motion.div>
  );
}
