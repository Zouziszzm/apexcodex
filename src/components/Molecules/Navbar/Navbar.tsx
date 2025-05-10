'use client';
import React from 'react';
import { useTheme } from '../../../context/Theme/ThemeContext';
import AnimatedLink from '../../Uniqcomps/Animations/AnimatedLink/AnimatedLink';
import { useLanguage } from '../../../context/Language/LanguageContext';

const Navbar = () => {
  const Links = [
    { title: 'Home', url: '/' },
    { title: 'Projects', url: '/Projects' },
    { title: 'Theme', url: '#' }, // We'll handle the theme toggle separately
    { title: 'Lang', url: '#' }, // We'll handle the language toggle separately
    { title: 'Langs', url: '#' }, // We'll handle the language toggle separately

  ];

  const { toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  return (
    <nav className="w-full h-9 sticky flex justify-center items-center">
      <div className="w-full md:w-[70%] h-full flex gap-4 justify-center items-center">
        {Links.map((link) => (
          <div key={link.title} className="p-1.5 m-0.5 font-bold">
            {link.title === 'Theme' ? (
              <button
                onClick={toggleTheme}
                className="cursor-pointer hover:underline"
              >
                Toggle Theme
              </button>
            ) : link.title === 'Lang' ? (
              <button
                onClick={toggleLanguage}
                className="cursor-pointer hover:underline"
              >
                {language === 'en' ? 'En' : 'Jp'}
              </button>
            ) : (
              <AnimatedLink href={link.url} className="hover:underline">
                {link.title}
              </AnimatedLink>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
