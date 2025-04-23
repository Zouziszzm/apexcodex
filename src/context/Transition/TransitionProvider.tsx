'use client';
import React from 'react';
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';

type TransitionContextType = {
  isExiting: boolean;
  triggerExit: (onComplete: () => void) => void;
};

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined
);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isExiting, setIsExiting] = useState(false);

  const triggerExit = useCallback(async (onComplete: () => void) => {
    setIsExiting(true);
    await new Promise((r) => setTimeout(r, 500)); // match your exit animation duration
    onComplete();
    setIsExiting(false);
  }, []);

  return (
    <TransitionContext.Provider value={{ isExiting, triggerExit }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error('useTransition must be used inside a provider');
  return ctx;
};
