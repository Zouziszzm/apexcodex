"use client";

import Copy from "@/components/Copy";
import HoverLink from "@/components/HoverLink";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  en: {
    title: "404.",
    description: "You're looking for something of mine that even I can't find.",
    subtext: "It's either very well hidden, or I forgot I ever made it.",
    cta: "Best to head back before we both get lost.",
    link: "Return Home",
  },
  jp: {
    title: "404.",
    description: "私自身も見つけられない何かを探しているようですね。",
    subtext:
      "どこかに隠されているのか、それとも作ったこと自体を忘れてしまったのか。",
    cta: "二人とも迷子になる前に、戻ったほうがよさそうです。",
    link: "ホームに戻る",
  },
};

export default function NotFoundClient() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="relative min-h-screen pt-40 px-6 lg:px-18 text-[#1C1C1E] max-w-[1440px] mx-auto">
      <div className="flex flex-col gap-4">
        <Copy key={`title-${language}`} stagger={0.2} delay={0.5}>
          <h1
            className={`text-[24px] font-semibold leading-[100%] cursor-default ${
              language === "jp" ? "font-['Noto_Sans_JP']" : ""
            }`}
          >
            {t.title}
          </h1>
        </Copy>
        <Copy
          key={`desc-${language}`}
          delay={0.5}
          stagger={0.2}
          animateOnScroll
        >
          <div className="flex flex-col gap-2">
            <p
              className={`text-[16px] font-normal leading-[130%] tracking-[0.02rem] max-w-[600px] cursor-default ${
                language === "jp" ? "font-['Noto_Sans_JP']" : ""
              }`}
            >
              {t.description}
            </p>
            <p
              className={`text-[16px] font-normal leading-[130%] tracking-[0.02rem] max-w-[600px] cursor-default opacity-60 ${
                language === "jp" ? "font-['Noto_Sans_JP']" : ""
              }`}
            >
              {t.subtext}
            </p>
          </div>
        </Copy>
      </div>

      <div className="flex flex-col gap-6 pt-12">
        <Copy key={`cta-${language}`} delay={0.7} stagger={0.2} animateOnScroll>
          <p
            className={`text-[16px] font-normal leading-[130%] tracking-[0.02rem] cursor-default ${
              language === "jp" ? "font-['Noto_Sans_JP']" : ""
            }`}
          >
            {t.cta}
          </p>
        </Copy>

        <HoverLink
          href="/"
          delay={0.9}
          animateOnScroll
          className="cursor-pointer inline-flex"
        >
          <Copy delay={0.9} stagger={0.2} animateOnScroll={false}>
            <p
              className={`cursor-pointer ${
                language === "jp" ? "font-['Noto_Sans_JP']" : ""
              }`}
            >
              {t.link}
            </p>
          </Copy>
        </HoverLink>
      </div>
    </main>
  );
}
