"use client";

import { useState, useEffect } from "react";
import { useTheme, Season, TimeOfDay } from "@/app/contexts/ThemeContext";
import { Settings, Activity, Clock, SunDim } from "lucide-react";

export const DevToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { season, time, setSeason, setTime } = useTheme();
  const [fps, setFps] = useState(0);
  const [loadTime, setLoadTime] = useState(0);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_IS_DEV !== "true") return;

    // FPS Counter
    let frames = 0;
    let prevTime = performance.now();
    const updateFps = () => {
      frames++;
      const time = performance.now();
      if (time >= prevTime + 1000) {
        setFps(Math.round((frames * 1000) / (time - prevTime)));
        frames = 0;
        prevTime = time;
      }
      requestAnimationFrame(updateFps);
    };
    const frameId = requestAnimationFrame(updateFps);

    // Load Time
    if (window.performance) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      setLoadTime(pageLoadTime > 0 ? pageLoadTime : 0);
    }

    return () => cancelAnimationFrame(frameId);
  }, []);

  if (process.env.NEXT_PUBLIC_IS_DEV !== "true") return null;

  const seasons: Season[] = ["spring", "summer", "autumn", "winter"];
  const times: TimeOfDay[] = [
    "night-00",
    "dawn",
    "morning",
    "noon",
    "afternoon",
    "dusk",
    "evening",
  ];

  return (
    <div className="fixed bottom-4 left-4 z-[9999] font-mono text-[10px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-(--body) text-(--bg) rounded-full shadow-lg hover:scale-110 transition-transform flex items-center gap-2"
        aria-label="Toggle Dev Toolbar"
      >
        <Settings size={14} className={isOpen ? "rotate-90 transition-transform" : ""} />
        {isOpen && <span>DEV TOOLBAR</span>}
      </button>

      {isOpen && (
        <div className="mt-2 p-4 bg-(--bg) border border-(--border) rounded-lg shadow-2xl flex flex-col gap-4 min-w-[200px] backdrop-blur-xl bg-opacity-80">
          {/* Performance Metrics */}
          <div className="flex flex-col gap-1 border-b border-(--border) pb-2">
            <div className="flex items-center gap-2 text-(--subtext)">
              <Activity size={12} />
              <span>Performance</span>
            </div>
            <div className="flex justify-between">
              <span>FPS:</span>
              <span className={fps > 50 ? "text-green-500" : "text-yellow-500"}>{fps}</span>
            </div>
            <div className="flex justify-between">
              <span>Load:</span>
              <span>{loadTime}ms</span>
            </div>
          </div>

          {/* Season Switcher */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-(--subtext)">
              <SunDim size={12} />
              <span>Season Override</span>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {seasons.map((s) => (
                <button
                  key={s}
                  onClick={() => setSeason(s)}
                  className={`px-2 py-1 rounded border border-(--border) transition-colors ${
                    season === s ? "bg-(--accent) text-white" : "hover:bg-(--border)"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Time Switcher */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-(--subtext)">
              <Clock size={12} />
              <span>Time Override</span>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {times.map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={`px-2 py-1 rounded border border-(--border) transition-colors ${
                    time === t ? "bg-(--accent) text-white" : "hover:bg-(--border)"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
