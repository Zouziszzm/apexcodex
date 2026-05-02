"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Season = "spring" | "summer" | "autumn" | "winter";
type TimeOfDay =
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
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeState, setThemeState] = useState<ThemeContextType>({
    season: "spring",
    time: "morning",
  });

  useEffect(() => {
    const updateTheme = () => {
      const now = new Date();
      const month = now.getMonth(); // 0-11
      const hour = now.getHours(); // 0-23

      let currentSeason: Season = "spring";
      // Northern Hemisphere seasons
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

      setThemeState({ season: currentSeason, time: currentTime });

      // Apply dataset to html tag
      document.documentElement.setAttribute("data-season", currentSeason);
      document.documentElement.setAttribute("data-time", currentTime);

      // Update favicon
      const icons = document.querySelectorAll("link[rel~='icon']");
      if (icons.length > 0) {
        icons.forEach((icon) => {
          (icon as HTMLLinkElement).href = `/favicons/${currentSeason}@2x.svg`;
          (icon as HTMLLinkElement).type = "image/svg+xml";
        });
      } else {
        const newLink = document.createElement("link");
        newLink.rel = "icon";
        newLink.type = "image/svg+xml";
        newLink.href = `/favicons/${currentSeason}@2x.svg`;
        document.head.appendChild(newLink);
      }
    };

    updateTheme();

    // Check periodically if the time has crossed an hour boundary
    const interval = setInterval(updateTheme, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeContext.Provider value={themeState}>
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
