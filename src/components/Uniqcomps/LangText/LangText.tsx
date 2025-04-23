'use client';
import React from 'react';
import { useLanguage } from '../../../context/Language/LanguageContext';

interface LangTextProps {
  en: string;
  jp: string;
  styleEn?: string;
  styleJp?: string;
  classname?: string;
}

export const LangText = ({
  en,
  jp,
  styleEn,
  styleJp,
  classname,
}: LangTextProps) => {
  const { language } = useLanguage();

  const className = language === 'en' ? styleEn : styleJp;
  const text = language === 'en' ? en : jp;

  return <span className={`${classname} ${className}`}>{text}</span>;
};
