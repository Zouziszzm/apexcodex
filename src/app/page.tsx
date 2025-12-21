"use client";

import Copy from "@/components/Copy";
import Reveal from "@/components/Reveal";
import { ArrowUpRight, Asterisk } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { homeData } from "@/data/home";
import HoverLink from "@/components/HoverLink";

const Page = () => {
  const { language } = useLanguage();
  const t = homeData[language];

  console.log("Page rendering with language:", language, "Title:", t.title);

  return (
    <main className="relative min-h-screen pt-40 px-6 lg:px-18 text-[#1C1C1E] max-w-[1440px] mx-auto">
      <div className="flex flex-col gap-4">
        <Copy key={`title-${language}`} stagger={0.2} delay={0.5}>
          <h1
            className={`text-[24px] font-semibold leading-[100%] cursor-default ${
              language === "jp" ? "font-['Noto_Sans_JP']" : ""
            }`}
            style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
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
        <Copy
          key={`working-${language}`}
          delay={0.5}
          stagger={0.2}
          animateOnScroll
        >
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
              delay={0.5}
              stagger={0.2}
              animateOnScroll
              className="flex gap-2  items-center "
            >
              <div>
                <Asterisk className="text-[#1C1C1E]" />
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
                  <ArrowUpRight size={16} className="text-[#1C1C1E]" />
                </div>
              </Link>
            </Copy>
          </li>
          <li>
            <Copy
              key={`project2-${language}`}
              delay={0.5}
              stagger={0.2}
              animateOnScroll
              className="flex gap-2  items-center "
            >
              <div>
                <Asterisk className="text-[#1C1C1E]" />
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
        <HoverLink
          href="/about"
          delay={0.5}
          animateOnScroll
          className="cursor-pointer"
        >
          <Copy delay={0.5} stagger={0.2} animateOnScroll={false}>
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

      {/* SHOWCASE SECTION */}
      {/* 
      <Reveal delay={0.5} stagger={0.2} animateOnScroll>
        <div
          className="
          relative mt-12 w-full aspect-video bg-transparent border border-black 
          transition-[width,margin,bottom,right,max-width] duration-1000 ease-in-out
          lg:absolute lg:bottom-10 lg:right-10 lg:w-[480px] lg:mt-0 lg:mb-0
          2xl:relative 2xl:mx-auto 2xl:w-[1200px] 2xl:bottom-auto 2xl:right-auto 2xl:mt-32 2xl:mb-20
        "
        >
          
        </div>
      </Reveal>
      */}
    </main>
  );
};

export default Page;
