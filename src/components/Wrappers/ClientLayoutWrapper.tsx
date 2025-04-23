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
    <TransitionProvider>
      <PageTransitionWrapper>
        <LanguageProvider>
          <ThemeProvider>
            {!splashDone && (
              <InitialSplash onDoneAction={() => setSplashDone(true)} />
            )}
            {splashDone && children}
          </ThemeProvider>
        </LanguageProvider>
      </PageTransitionWrapper>
    </TransitionProvider>
  );
}
