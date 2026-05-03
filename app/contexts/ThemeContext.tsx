"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Season = "spring" | "summer" | "autumn" | "winter";
export type TimeOfDay =
  | "night-00"
  | "dawn"
  | "morning"
  | "noon"
  | "afternoon"
  | "dusk"
  | "evening";

interface ThemeContextType {
  season: Season;
  time: TimeOfDay;
  setSeason: (season: Season) => void;
  setTime: (time: TimeOfDay) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeState, setThemeState] = useState<{ season: Season; time: TimeOfDay }>({
    season: "spring",
    time: "morning",
  });

  const updateAttributes = useCallback((season: Season, time: TimeOfDay) => {
    document.documentElement.setAttribute("data-season", season);
    document.documentElement.setAttribute("data-time", time);

    const icons = document.querySelectorAll("link[rel~='icon']");
    const href = `/favicons/${season}@2x.svg`;
    
    if (icons.length > 0) {
      icons.forEach((icon) => {
        (icon as HTMLLinkElement).href = href;
      });
    } else {
      const newLink = document.createElement("link");
      newLink.rel = "icon";
      newLink.type = "image/svg+xml";
      newLink.href = href;
      document.head.appendChild(newLink);
    }
  }, []);

  const setSeason = useCallback((season: Season) => {
    setThemeState(prev => {
      const newState = { ...prev, season };
      updateAttributes(newState.season, newState.time);
      return newState;
    });
  }, [updateAttributes]);

  const setTime = useCallback((time: TimeOfDay) => {
    setThemeState(prev => {
      const newState = { ...prev, time };
      updateAttributes(newState.season, newState.time);
      return newState;
    });
  }, [updateAttributes]);

  useEffect(() => {
    const getInitialTheme = () => {
      const now = new Date();
      const month = now.getMonth();
      const hour = now.getHours();

      let currentSeason: Season = "spring";
      if (month >= 2 && month <= 4) currentSeason = "spring";
      else if (month >= 5 && month <= 7) currentSeason = "summer";
      else if (month >= 8 && month <= 10) currentSeason = "autumn";
      else currentSeason = "winter";

      let currentTime: TimeOfDay = "morning";
      if (hour >= 0 && hour < 5) currentTime = "night-00";
      else if (hour >= 5 && hour < 7) currentTime = "dawn";
      else if (hour >= 7 && hour < 11) currentTime = "morning";
      else if (hour >= 11 && hour < 14) currentTime = "noon";
      else if (hour >= 14 && hour < 17) currentTime = "afternoon";
      else if (hour >= 17 && hour < 19) currentTime = "dusk";
      else currentTime = "evening";

      return { season: currentSeason, time: currentTime };
    };

    const initial = getInitialTheme();
    setThemeState(initial);
    updateAttributes(initial.season, initial.time);

    const interval = setInterval(() => {
      const current = getInitialTheme();
      // Only auto-update if not in dev mode or no manual override (simplified here)
      if (process.env.NEXT_PUBLIC_IS_DEV !== "true") {
        setThemeState(current);
        updateAttributes(current.season, current.time);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [updateAttributes]);

  return (
    <ThemeContext.Provider value={{ ...themeState, setSeason, setTime }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
