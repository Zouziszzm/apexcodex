"use client";

import AnimatedText from "@/components/common/text/text";
import HoverLine from "@/components/common/animated-comps/underline";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import AnimatedLine from "@/components/common/animated-comps/line";
import { Experience, ExperienceItemProps } from "@/lib/types";
import CountUp from "@/components/common/animated-comps/count-up";

const about = () => {
  // Translation mappings
  const translateType = (type: string): string => {
    const translations: Record<string, string> = {
      "Full-Time": "正社員",
      "Full-Time ( contract )": "正社員（契約）",
      "Freelance": "フリーランス",
    };
    return translations[type] || type;
  };

  const translateWorkMode = (mode: string): string => {
    const translations: Record<string, string> = {
      Onsite: "オフィス勤務",
      Remote: "リモート",
    };
    return translations[mode] || mode;
  };

  const translateRole = (role: string): string => {
    const translations: Record<string, string> = {
      "Frontend Engineer": "フロントエンドエンジニア",
      "Mobile App Dev": "モバイルアプリ開発者",
      "Q.A.S Engineer": "品質保証エンジニア",
      "Software Developer": "ソフトウェア開発者",
      "Jr Frontend Developer": "ジュニアフロントエンド開発者",
    };
    return translations[role] || role;
  };

  const experienceData: Experience[] = [
    {
      company: "Mantiqh Technologies",
      href: "https://www.mantiqh.com",
      location: "Belgaum, Karnataka, India",
      type: "Full-Time",
      workMode: "Onsite",
      roles: [
        {
          title: "Frontend Engineer",
          duration: "9 Month",
          period: "Feb 2025 -- Present",
        },
        {
          title: "Mobile App Dev",
          duration: "6 Month",
          period: "Feb 2025 -- Present",
        },
      ],
    },
    {
      company: "NDTCCS",
      href: "https://www.ndtcorrosion.com/",
      location: "Dammam, Kingdom of Saudi Arabia",
      type: "Full-Time ( contract )",
      workMode: "Onsite",
      roles: [
        {
          title: "Q.A.S Engineer",
          duration: "6 Month",
          period: "Aug 2024 -- Feb 2025",
        },
      ],
    },
    {
      company: "MetaLine X",
      href: "https://linktr.ee/MetaLineX",
      location: "Shanghai, China",
      type: "Freelance",
      workMode: "Remote",
      roles: [
        {
          title: "Software Developer",
          duration: "12 Month",
          period: "Nov 2023 -- Nov 2024",
        },
      ],
    },
    {
      company: "IT BigBang",
      href: "https://linktr.ee/MetaLineX",
      location: "Chennai, India",
      type: "Full-Time",
      workMode: "Remote",
      roles: [
        {
          title: "Jr Frontend Developer",
          duration: "14 Month",
          period: "Aug 2022 -- Sep 2023",
        },
      ],
    },
  ];

  const ExperienceItem = ({ experience }: ExperienceItemProps) => (
    <div className="mb-8">
      <div className="w-full flex justify-start gap-4 mt-4 mb-1.5">
        <div className="flex justify-between w-full gap-2">
          <Link href={experience.href} className="flex">
            <HoverLine lineClassName="!h-[1px] bg-foreground">
              <AnimatedText
                className="font-family-body text-size-sm tracking-wide font-normal flex items-center gap-1"
                japanese={experience.company}
                classNameJapanese="text-size-xs"
              >
                {experience.company}
              </AnimatedText>
            </HoverLine>
            <AnimatedText>
              <ArrowUpRight size={20} />
            </AnimatedText>
          </Link>
          <AnimatedText
            className="font-family-body text-size-sm tracking-wide font-normal"
            japanese={experience.location}
            classNameJapanese="text-size-xs"
          >
            {experience.location}
          </AnimatedText>
        </div>
      </div>
      <AnimatedLine />
      <div className="mt-1.5">
        <div className="flex justify-between xl:w-[25%] gap-2">
          <AnimatedText
            className="font-family-body text-size-xs tracking-wide font-normal"
            japanese={translateType(experience.type)}
          >
            {experience.type}
          </AnimatedText>
          <AnimatedText
            className="font-family-body text-size-xs tracking-wide font-normal"
            japanese={translateWorkMode(experience.workMode)}
          >
            {experience.workMode}
          </AnimatedText>
        </div>
        <div className="flex flex-col gap-2 mt-1.5">
          {experience.roles.map((role, index) => (
            <div key={index}>
              <div className="flex justify-between w-full gap-2">
                <AnimatedText
                  className="font-family-body text-size-xs tracking-wide font-normal"
                  japanese={translateRole(role.title)}
                >
                  {role.title}
                </AnimatedText>
                <div className="xl:w-[35%] flex justify-between">
                  <div className="hidden lg:block gap-1">
                    <AnimatedText
                      className="font-family-body text-size-xs tracking-wide font-normal text-[#5C5C5C]"
                      japanese={role.duration.split(" ")[0]}
                    >
                      {role.duration.split(" ")[0]}
                    </AnimatedText>
                    <AnimatedText
                      className="font-family-body text-size-xs tracking-wide font-normal text-[#5C5C5C]"
                      japanese={
                        role.duration.split(" ")[1] === "Month"
                          ? "ヶ月"
                          : role.duration.split(" ")[1]
                      }
                    >
                      {role.duration.split(" ")[1]}
                    </AnimatedText>
                  </div>
                  <AnimatedText
                    className="font-family-body text-size-xs tracking-wide font-normal"
                    japanese={role.period}
                  >
                    {role.period}
                  </AnimatedText>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Tech stack groups, rendered with same layout/line style as Experience items
  const techStacks = [
    {
      label: "Frontend",
      japaneseLabel: "フロントエンド",
      value:
        "HTML5, CSS3, JavaScript (ES6+), TypeScript, React.js, Next.js, Astro.js, Tailwind CSS, Material UI, Shadcn UI, Three.js, WebGL, Canvas API, Zustand, Redux Toolkit",
    },
    {
      label: "Backend",
      japaneseLabel: "バックエンド",
      value:
        "Node.js, Express.js, MongoDB, Firebase, Supabase, REST APIs, Basic API Design, Server-Side Rendering (Next.js)",
    },
    {
      label: "Tools",
      japaneseLabel: "ツール",
      value:
        "Git, GitHub, VS Code, Neovim, Postman, Jira, Notion, Figma, Slack, Discord, GitHub Actions (CI/CD), Docker",
    },
    {
      label: "OS",
      japaneseLabel: "OS",
      value: "Linux (CLI and GUI), macOS, Windows",
    },
  ];

  const TechStackItem = ({
    label,
    japaneseLabel,
    value,
  }: {
    label: string;
    japaneseLabel: string;
    value: string;
  }) => (
    <div className="mb-6">
      {/* Heading row – mirrors ExperienceItem top row */}
      <div className="w-full flex justify-start gap-4 mt-4 mb-1.5">
        <div className="flex justify-between w-full gap-2">
          <AnimatedText
            className="font-family-body text-size-sm tracking-wide font-medium"
            japanese={japaneseLabel}
            classNameJapanese="text-size-xs"
          >
            {label}
          </AnimatedText>
        </div>
      </div>
      {/* Same line animation */}
      <AnimatedLine />
      {/* Content below line */}
      <div className="mt-1.5">
        <AnimatedText
          className="font-family-body text-size-xs tracking-wide font-normal text-neutral-600 leading-relaxed"
          japanese={value}
          classNameJapanese="text-size-xs leading-relaxed"
        >
          {value}
        </AnimatedText>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full max-w-[1440px] mx-auto">
      <div className="px-[4.29%]">
        <div className="pt-[10vh]">
          <AnimatedText
            className="font-family-heading text-size-2xl text-left font-medium w-full"
            japanese="について"
            classNameJapanese="text-size-xl "
          >
            ABOUT
          </AnimatedText>
        </div>

        <div className="flex w-full justify-center flex-col items-center gap-4">
          {/* Intro */}
          <div className="w-full xl:max-w-[50%]">
            <AnimatedText
              className="font-normal font-family-body text-size-base"
              japanese="こんにちは！私はアル・ファルハーン・カーン・イナムダールと申します。インドのバンガロール出身のフロントエンドエンジニアです。デザインと開発の分野で3年以上の経験があり、特に情緒豊かでアニメーションのあるウェブ体験を構築することに情熱を注いでいます。私は、インタラクションとモーションの力がユーザーの訪問を特別な体験へと変え、強い印象を残すと信じています。私の仕事は、その視覚的な楽しさと喜びの瞬間を生み出すことに捧げています。"
              classNameJapanese="text-size-sm"
            >
              Hello! I&apos;m Al Farhaan Khan Inamdar, a frontend engineer from
              Bangalore, India. With over 3 years of experience in design and
              development, I focus on what I love most: building expressive,
              animated web experiences. I believe in the power of interactivity
              and motion to transform a user&apos;s visit into a lasting impression.
              My work is dedicated to creating that moment of visual enjoyment
              and delight.
            </AnimatedText>
          </div>

          {/* Right side: Tech stack + Experience */}
          <div className="w-full xl:max-w-[50%]">
            {/* Tech Stack section using same layout/line style */}
            <div className="my-6">
              <AnimatedText
                className="font-family-body text-size-xl font-medium"
                japanese="技術スタック："
                classNameJapanese="text-size-base"
              >
                Tech Stack:
              </AnimatedText>

              {techStacks.map((stack) => (
                <TechStackItem
                  key={stack.label}
                  label={stack.label}
                  japaneseLabel={stack.japaneseLabel}
                  value={stack.value}
                />
              ))}
            </div>

            {/* Experience heading + animated total years */}
            <div className="w-full flex justify-start gap-4 mb-2">
              <AnimatedText
                className="font-family-body text-size-xl font-medium"
                japanese="経験："
                classNameJapanese="text-size-base"
              >
                Experience:
              </AnimatedText>
              <AnimatedText
                className="font-family-body text-size-xl font-medium"
                japanese="3.8年"
                classNameJapanese="text-size-base"
              >
                <CountUp from={0} to={3.8} duration={2} /> years
              </AnimatedText>
            </div>

            {experienceData.map((experience, index) => (
              <ExperienceItem key={index} experience={experience} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default about;
