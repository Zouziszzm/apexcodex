"use client";

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface LinkContextType {
  linkClicked: boolean;
  whatLink: string | null;
  setLinkClicked: (url: string) => void;
  resetLink: () => void;
  completeNavigation: () => void;
  canClick: boolean;
}

const LinkContext = createContext<LinkContextType | undefined>(undefined);

interface LinkProviderProps {
  children: ReactNode;
}

export function LinkProvider({ children }: LinkProviderProps) {
  const [linkClicked, setLinkClickedState] = useState<boolean>(false);
  const [whatLink, setWhatLink] = useState<string | null>(null);
  const [canClick, setCanClick] = useState<boolean>(true);
  
  const navigationState = useRef({
    isNavigating: false,
    pendingUrl: null as string | null,
    fallbackTimer: null as NodeJS.Timeout | null,
    cleanupTimer: null as NodeJS.Timeout | null
  });
  
  const router = useRouter();
  const pathname = usePathname();

  const cleanupTimers = useCallback(() => {
    const state = navigationState.current;
    if (state.fallbackTimer) {
      clearTimeout(state.fallbackTimer);
      state.fallbackTimer = null;
    }
    if (state.cleanupTimer) {
      clearTimeout(state.cleanupTimer);
      state.cleanupTimer = null;
    }
  }, []);

  // Remove resetNavigationState and handle state reset directly in useEffect
  const completeNavigation = useCallback((): void => {
    const state = navigationState.current;
    
    if (!state.isNavigating || !state.pendingUrl) {
      console.log('No pending navigation to complete');
      return;
    }

    console.log('Completing navigation to:', state.pendingUrl);
    
    cleanupTimers();

    state.cleanupTimer = setTimeout(() => {
      try {
        router.push(state.pendingUrl!);
        console.log('Navigation initiated');
      } catch (e) {
        console.error('Navigation failed', e);
        // Reset state on failure
        state.isNavigating = false;
        state.pendingUrl = null;
        setCanClick(true);
        setLinkClickedState(false);
        setWhatLink(null);
      }
    }, 200);
  }, [router, cleanupTimers]);

  const setLinkClicked = useCallback((url: string): void => {
    const state = navigationState.current;
    
    if (state.isNavigating || !canClick) {
      console.log('Click blocked - already navigating or clicks disabled');
      return;
    }

    console.log('Starting navigation to:', url);
    
    state.isNavigating = true;
    state.pendingUrl = url;
    setCanClick(false);
    setLinkClickedState(true);
    setWhatLink(url);

    cleanupTimers();

    state.fallbackTimer = setTimeout(() => {
      console.log('Fallback timer triggered');
      completeNavigation();
    }, 1200);
  }, [canClick, cleanupTimers, completeNavigation]);

  const resetLink = useCallback((): void => {
    console.log('Resetting link state (animation complete)');
    setLinkClickedState(false);
    setWhatLink(null);
  }, []);

  // Handle page changes - reset navigation state when pathname changes
  useEffect(() => {
    console.log('Page changed, resetting navigation state');
    
    // Clean up any pending timers
    cleanupTimers();
    
    // Reset navigation state using ref first, then update React state asynchronously
    const state = navigationState.current;
    state.isNavigating = false;
    state.pendingUrl = null;
    
    // Use setTimeout to batch state updates and avoid synchronous updates in useEffect
    const timeoutId = setTimeout(() => {
      setCanClick(true);
      setLinkClickedState(false);
      setWhatLink(null);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname, cleanupTimers]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanupTimers;
  }, [cleanupTimers]);

  const contextValue: LinkContextType = {
    linkClicked,
    whatLink,
    setLinkClicked,
    resetLink,
    completeNavigation,
    canClick,
  };

  return (
    <LinkContext.Provider value={contextValue}>
      {children}
    </LinkContext.Provider>
  );
}

export function useLink(): LinkContextType {
  const context = useContext(LinkContext);
  if (context === undefined) {
    throw new Error('useLink must be used within a LinkProvider');
  }
  return context;
}