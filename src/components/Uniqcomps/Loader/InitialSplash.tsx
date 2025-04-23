// components/commons/InitialSplash.tsx
'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LangText } from '../LangText/LangText';
import { paths } from '../../../../public/svgs/sakura';
import { AnimatedPaths } from '../../Uniqcomps/SvgAnimate/AnimatedPaths';

export default function InitialSplash({
  onDoneAction,
}: {
  onDoneAction: () => void;
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false); // Start fade out
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDoneAction}>
      {isVisible && (
        <>
          <motion.div
            className="fixed inset-0 z-[9999] flex h-screen w-full items-center justify-center flex-col"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <motion.div
              className="font-Cm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{
                duration: 1,
                ease: 'easeInOut',
              }}
            >
              <LangText
                en="Alfarhaan Khan"
                jp="アルファルハンカン"
                styleEn="font-En text-7xl"
                styleJp="font-Jp text-6xl"
              />
              <div className="w-[400px] h-[300px]">
                <AnimatedPaths paths={paths} animate={false} stroke="" />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
