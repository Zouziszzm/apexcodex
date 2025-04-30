'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../../context/Theme/ThemeContext';
import { useLanguage } from '../../context/Language/LanguageContext';

type LinkedItem = {
  label: { en: string; jp: string };
  href?: string;
  size?: number;
  styleEn?: string;
  styleJp?: string;
  commonClass?: string;
};

interface LinkedProps {
  items: LinkedItem[];
  className?: string;
}

const Linked: React.FC<LinkedProps> = ({ items, className = '' }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {items.map((item, index) => {
        const currentLabel = language === 'en' ? item.label.en : item.label.jp;
        const currentStyle = language === 'en' ? item.styleEn : item.styleJp;
        const iconSrc =
          theme === 'dark' ? '/svgs/linkwhite.svg' : '/svgs/linkdark.svg';

        return (
          <div key={index} className="flex items-center gap-1">
            {item.href ? (
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${item.commonClass || ''} ${currentStyle || ''}`}
              >
                {currentLabel}
              </Link>
            ) : (
              <p className={`${item.commonClass || ''} ${currentStyle || ''}`}>
                {currentLabel}
              </p>
            )}
            <Image
              src={iconSrc}
              alt={`${currentLabel} icon`}
              width={item.size || 21}
              height={item.size || 21}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Linked;
