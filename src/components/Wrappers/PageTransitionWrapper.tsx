'use client';
import { motion, AnimatePresence } from 'motion/react'; // Note: Corrected import
import React, { ReactNode } from 'react';
import { useTransition } from '../../context/Transition/TransitionProvider';
import { usePathname } from 'next/navigation';

interface PageTransitionWrapperProps {
  children: ReactNode;
}

export default function PageTransitionWrapper({
  children,
}: PageTransitionWrapperProps) {
  const { isExiting } = useTransition();
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          key={pathname}
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
