'use client';
import { motion, AnimatePresence } from 'motion/react';
import { useTransition } from '../../context/Transition/TransitionProvider';
import { ReactNode } from 'react';
import React from 'react';

export default function PageTransitionWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { isExiting } = useTransition();

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
