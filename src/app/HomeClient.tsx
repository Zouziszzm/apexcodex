"use client";

import Copy from "@/components/Copy";
import { ArrowUpRight, Asterisk } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { homeData } from "@/data/home";
import HoverLink from "@/components/HoverLink";
import dynamic from "next/dynamic";

const VoxelDog = dynamic(() => import("@/components/VoxelDog"), {
  ssr: false,
  loading: () => <div className="w-[280px] h-[280px]" />,
});

const HomeClient = () => {
  const { language } = useLanguage();
  const t = homeData[language];

  return (
    <main className="relative min-h-screen pt-40 px-6 lg:px-12 text-[var(--text-primary)] max-w-[1440px] mx-auto pb-[320px] lg:pb-0 transition-colors duration-700">
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
        {/* LEARNING SECTION */}
        <div className="flex flex-col gap-2 mt-4">
          <Copy key={`learning-${language}`} stagger={0.2} animateOnScroll>
            <p
              className={`text-[14px] font-medium uppercase tracking-widest ${
                language === "jp" ? "font-['Noto_Sans_JP']" : ""
              }`}
            >
              {t.learning.title}
            </p>
          </Copy>
          <Copy key={`learn-items-${language}`} stagger={0.1} animateOnScroll>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[15px] text-[var(--text-primary)]">
              {t.learning.items.map((item, i) => (
                <span
                  key={i}
                  className={language === "jp" ? "font-['Noto_Sans_JP']" : ""}
                >
                  {item}
                  {i < t.learning.items.length - 1 && (
                    <span className="text-[var(--text-secondary)]/50 ml-4">
                      /
                    </span>
                  )}
                </span>
              ))}
            </div>
          </Copy>
        </div>

        <Copy key={`working-${language}`} stagger={0.2} animateOnScroll>
          <p
            className={`cursor-default mt-4 ${
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
                <Asterisk className="text-[var(--text-primary)] transition-colors duration-700" />
              </div>
              <Link
                href="https://www.github.com/zouziszzm"
                target="_blank"
                className="flex gap-0.5 lg:gap-2 items-center group transition-colors duration-700"
              >
                <p
                  className={`${
                    language === "jp" ? "font-['Noto_Sans_JP']" : ""
                  } text-[var(--text-primary)] transition-colors duration-700`}
                >
                  {t.projects[0]}
                </p>
                <div>
                  <ArrowUpRight
                    size={16}
                    className="text-[var(--text-primary)] transition-colors duration-700"
                  />
                </div>
              </Link>
            </Copy>
          </li>
        </ul>
        <HoverLink
          href="/about"
          animateOnScroll
          className="cursor-pointer"
          variant="wave"
        >
          <Copy stagger={0.2} animateOnScroll={false}>
            <p
              className={`cursor-pointer ${
                language === "jp" ? "font-['Noto_Sans_JP']" : ""
              } text-[var(--text-primary)] transition-colors duration-700`}
            >
              {t.readmore}
            </p>
          </Copy>
        </HoverLink>
        <div className="w-full flex items-center justify-center lg:justify-end transition-all duration-700 ease-out mt-12 lg:mt-0">
          <div className=" transition-all duration-700 ease-out border border-[var(--text-primary)/20] bg-[var(--text-primary)/5] pointer-events-none overflow-hidden w-fit">
            <div className="pointer-events-auto">
              <VoxelDog />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeClient;
