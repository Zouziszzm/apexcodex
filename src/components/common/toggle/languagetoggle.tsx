"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react"; // Keep for animation later

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
    { code: "ja", label: "中文" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center rounded p-2"
        aria-label="Select language"
      >
        <span className="text-lg font-medium">EN</span>
      </button>

      {/* AnimatePresence wraps the dropdown so exit animation works correctly */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="border-bgs bg-background absolute top-[50px] right-0 z-50 w-[200px] overflow-hidden rounded-sm border-1"
          >
            {/* Language Buttons Section */}
            <div className="flex justify-around gap-2">
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => {
                    // No-op for now (no context or state)
                  }}
                  className={`${code === "en" ? "border-bgs text-sm border-r px-2 py-2" : ""} ${
                    code === "ja"
                      ? "border-bgs border-l px-4 py-2"
                      : "px-4 py-2"
                  } text-left transition-colors`}
                >
                  {label}
                </button>
              ))}
            </div>

            <hr className="border-bgs border-t" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageDropdown;
