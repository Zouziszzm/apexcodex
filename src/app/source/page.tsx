"use client";

import Copy from "@/components/Copy";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Page() {
  const { language } = useLanguage();

  const content = {
    en: {
      message:
        "The source code is currently being 'optimized' (read: refactored because I found a better way at 3 AM). It will be pushed ASAP once the commit messages are clean enough. Goodness takes time.",
      linkGithub: "Visit my GitHub if you're brave.",
      linkAbout: "Or learn about me here.",
    },
    jp: {
      message:
        "ソースコードは現在「最適化」中です（午前3時にマシな方法を思いついたのでリファクタリングしているだけです）。コミットメッセージが綺麗になったら至急PUSHします。良いものには時間がかかります。",
      linkGithub: "勇気があればGitHubを覗いてみてください。",
      linkAbout: "または、こちらで私について知ってください。",
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
        <div className="flex flex-col gap-4 items-center">
          <Copy delay={1.2}>
            <Link
              href="https://github.com/zouziszzm"
              target="_blank"
              className={`text-sm underline hover:text-[#5f5f5f] transition-colors duration-300 ${
                language === "jp" ? "font-['Noto_Sans_JP']" : ""
              }`}
            >
              {t.linkGithub}
            </Link>
          </Copy>
          <Copy delay={1.4}>
            <Link
              href="/about"
              className={`text-sm underline hover:text-[#5f5f5f] transition-colors duration-300 ${
                language === "jp" ? "font-['Noto_Sans_JP']" : ""
              }`}
            >
              {t.linkAbout}
            </Link>
          </Copy>
        </div>
      </div>
    </main>
  );
}
