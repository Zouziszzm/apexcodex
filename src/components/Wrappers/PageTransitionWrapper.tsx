'use client';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTransition } from '../../context/Transition/TransitionProvider';
import { ReactNode, useEffect, useState } from 'react';

export default function PageTransitionWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { isExiting } = useTransition();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsInitialLoad(false);
    }, 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence mode="wait" initial={true}>
      {!isExiting && (
        <motion.div
          key={isInitialLoad ? 'normal' : 'normal'}
          initial={{ opacity: 0, y: -20 }} // New page enters from top
          animate={{ opacity: 1, y: 0 }} // New page moves into place
          exit={{ opacity: 0, y: 20 }} // Old page exits downward
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
