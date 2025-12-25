"use client";

import Copy from "@/components/Copy";
import { ArrowUpRight, Asterisk } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { homeData } from "@/data/home";
import HoverLink from "@/components/HoverLink";

const HomeClient = () => {
  const { language } = useLanguage();
  const t = homeData[language];

  return (
    <main className="relative min-h-screen pt-40 px-6 lg:px-12 text-[#963531] max-w-[1440px] mx-auto">
      <div className="flex flex-col gap-4">
        <Copy key={`title-${language}`} stagger={0.2} delay={0.2}>
          <h1
            className={`text-[24px] font-semibold leading-[100%] cursor-default ${
              language === "jp" ? "font-['Noto_Sans_JP']" : ""
            }`}
            style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
          >
            {t.title}
          </h1>
        </Copy>
        <Copy key={`desc-${language}`} stagger={0.2} animateOnScroll>
          <p
            className={`text-[16px] font-normal leading-[130%] tracking-[0.02rem] max-w-[600px] cursor-default ${
              language === "jp" ? "font-['Noto_Sans_JP']" : ""
            }`}
            style={{
              wordBreak: "normal",
              overflowWrap: "anywhere",
              lineBreak: "strict",
            }}
          >
            {t.description}
          </p>
        </Copy>
      </div>
      <div className="flex flex-col gap-4 pt-4">
        <Copy key={`working-${language}`} stagger={0.2} animateOnScroll>
          <p
            className={`cursor-default ${
              language === "jp" ? "font-['Noto_Sans_JP']" : ""
            }`}
          >
            {t.currentlyWorkingOn}
          </p>
        </Copy>
        <ul className="flex flex-col gap-2">
          <li>
            <Copy
              key={`project1-${language}`}
              stagger={0.2}
              animateOnScroll
              className="flex gap-2  items-center "
            >
              <div>
                <Asterisk className="text-[#963531]" />
              </div>
              <Link
                href="https://www.github.com/zouziszzm"
                target="_blank"
                className="flex gap-0.5 lg:gap-2 items-center"
              >
                <p className={language === "jp" ? "font-['Noto_Sans_JP']" : ""}>
                  {t.projects[0]}
                </p>
                <div>
                  <ArrowUpRight size={16} className="text-[#963531]" />
                </div>
              </Link>
            </Copy>
          </li>
          <li>
            <Copy
              key={`project2-${language}`}
              stagger={0.2}
              animateOnScroll
              className="flex gap-2  items-center "
            >
              <div>
                <Asterisk className="text-[#963531]" />
              </div>
              <p
                className={`cursor-default ${
                  language === "jp" ? "font-['Noto_Sans_JP']" : ""
                }`}
              >
                {t.projects[1]}
              </p>
            </Copy>
          </li>
        </ul>
        <HoverLink href="/about" animateOnScroll className="cursor-pointer">
          <Copy stagger={0.2} animateOnScroll={false}>
            <p
              className={`cursor-pointer ${
                language === "jp" ? "font-['Noto_Sans_JP']" : ""
              }`}
            >
              {t.readmore}
            </p>
          </Copy>
        </HoverLink>
      </div>
    </main>
  );
};

export default HomeClient;
