
'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const LinkContext = createContext();

export function LinkProvider({ children }) {
  const [linkClicked, setLinkClickedState] = useState(false);
  const [whatLink, setWhatLink] = useState(null);
  const [canClick, setCanClick] = useState(true);
  const isNavigatingRef = useRef(false);
  const pathname = usePathname();

  // Reset everything when page fully loads
  useEffect(() => {
    console.log('Page changed, enabling clicks');
    setCanClick(true);
    isNavigatingRef.current = false;
    setLinkClickedState(false);
    setWhatLink(null);
  }, [pathname]);

  const setLinkClicked = (url) => {
    console.log('Link clicked, canClick:', canClick, 'isNavigating:', isNavigatingRef.current);

    // If already navigating or not allowed to click, ignore
    if (isNavigatingRef.current || !canClick) {
      console.log('Click blocked');
      return;
    }

    console.log('Starting navigation to:', url);
    isNavigatingRef.current = true;
    setCanClick(false); // Disable all links immediately
    setLinkClickedState(true);
    setWhatLink(url);
  };

  const resetLink = () => {
    console.log('Resetting link state (animation complete)');
    setLinkClickedState(false);
    setWhatLink(null);
    // Don't reset canClick here - wait for page load
  };

  return (
    <LinkContext.Provider
      value={{
        linkClicked,
        whatLink,
        setLinkClicked,
        resetLink,
        canClick,
      }}
    >
      {children}
    </LinkContext.Provider>
  );
}

export function useLink() {
  const context = useContext(LinkContext);
  if (context === undefined) {
    throw new Error('useLink must be used within a LinkProvider');
  }
  return context;
}
