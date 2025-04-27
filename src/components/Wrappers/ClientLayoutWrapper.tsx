'use client';
import React from 'react';
import { useState } from 'react';
import { TransitionProvider } from '../../context/Transition/TransitionProvider';
import PageTransitionWrapper from '../Wrappers/PageTransitionWrapper';
import { LanguageProvider } from '../../context/Language/LanguageContext';
import { ThemeProvider } from '../../context/Theme/ThemeContext';
import InitialSplash from '../Uniqcomps/Loader/InitialSplash';

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <ThemeProvider>
      <TransitionProvider>
        <PageTransitionWrapper>
          <LanguageProvider>
            {!splashDone && (
              <InitialSplash onDoneAction={() => setSplashDone(true)} />
            )}
            {splashDone && children}
          </LanguageProvider>
        </PageTransitionWrapper>
      </TransitionProvider>
    </ThemeProvider>
  );
}
