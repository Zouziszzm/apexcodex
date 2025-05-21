// components/commons/InitialSplash.tsxgg
'use client';
import React, { useEffect, useState } from 'react';
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
        <motion.div
          className="fixed inset-0 z-[9999] flex h-screen w-full items-center justify-center flex-col"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <motion.div
            className="font-Cm text-center px-4"
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
              styleEn="font-En text-4xl sm:text-6xl md:text-7xl"
              styleJp="font-Jp text-3xl sm:text-5xl md:text-6xl"
            />
            <div className="w-[80vw] max-w-[400px] h-[60vw] max-h-[300px] mx-auto mt-4">
              <AnimatedPaths paths={paths} animate={false} stroke="" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
