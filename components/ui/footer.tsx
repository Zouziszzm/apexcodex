"use client";

import React from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 border-t border-(--border)/30 mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 flex justify-center items-center">
        <p className="font-body-sm text-[11px] font-light text-(--subtext)">
          Copyright © {currentYear} alfarhaankhan. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
