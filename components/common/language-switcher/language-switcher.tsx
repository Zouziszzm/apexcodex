"use client";

import { useLanguage } from "@/lib/context/language-context";

const LanguageSwitcher = () => {
  const { language, setLanguage, isChanging } = useLanguage();

  const toggleLanguage = () => {
    if (isChanging) return;
    const newLanguage = language === "en" ? "jp" : "en";
    setLanguage(newLanguage);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="relative flex text-size-sm font-medium font-family-heading h-[32px] items-center justify-center cursor-pointer hover:opacity-75 transition-opacity"
      aria-label={`Switch to ${language === "en" ? "Japanese" : "English"}`}
      disabled={isChanging}
    >
      <span>{language === "en" ? "日" :  "EN"}</span>
    </button>
  );
};

export default LanguageSwitcher;
