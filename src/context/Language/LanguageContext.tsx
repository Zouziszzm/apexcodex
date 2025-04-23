'use client';
import React from 'react';
import { createContext, useContext, useState, ReactNode } from 'react';
import { useTransition } from '../Transition/TransitionProvider'; // Import the useTransition hook

type Language = 'en' | 'jp';

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { triggerExit } = useTransition(); // Access transition context
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    triggerExit(() => {
      setLanguage((prev) => (prev === 'en' ? 'jp' : 'en'));
    });
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
