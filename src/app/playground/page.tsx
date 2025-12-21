"use client";

import Copy from "@/components/Copy";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Page() {
  const { language } = useLanguage();

  const content = {
    en: {
      message:
        "This area is currently a heap of experiments I'm afraid to show in public. Working on making it presentable without breaking the internet. Expect a lot of 'it works on my machine' vibes soon. Goodness takes time.",
      link: "Learn about the experimenter here.",
    },
    jp: {
      message:
        "ここは現在、人様に見せるには少し怖い実験の山です。インターネットを壊さずに公開できるよう調整中です。「手元の環境では動いています」という雰囲気を近々お届けします。良いものには時間がかかります。",
      link: "実験者についてはこちらをご覧ください。",
    },
  };

  const t = content[language];

  return (
    <main className="relative min-h-screen pt-20 px-6 lg:px-18 text-[#1C1C1E] max-w-[1440px] mx-auto flex flex-col items-center justify-center text-center pb-20">
      <div className="max-w-[700px]">
        <Copy delay={0.5} stagger={0.2}>
          <h1
            className={`text-[20px] lg:text-[24px] font-medium leading-[140%] cursor-default mb-10 ${
              language === "jp" ? "font-['Noto_Sans_JP']" : ""
            }`}
          >
            {t.message}
          </h1>
        </Copy>
        <Copy delay={1.2}>
          <Link
            href="/about"
            className={`text-sm underline hover:text-[#5f5f5f] transition-colors duration-300 ${
              language === "jp" ? "font-['Noto_Sans_JP']" : ""
            }`}
          >
            {t.link}
          </Link>
        </Copy>
      </div>
    </main>
  );
}
