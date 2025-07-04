"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/Theme/Theme";
const Switch = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-[1px]"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme == "dark" ? (
        <Sun className="text-bgs h-5 w-5" />
      ) : (
        <Moon className="text-bgs h-5 w-5" />
      )}
    </button>
  );
};

export default Switch;
