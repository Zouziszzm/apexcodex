import AnimatedText from "@/components/common/text/text";
import HoverLine from "@/components/common/animated-comps/underline";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import AnimatedLine from "@/components/common/animated-comps/line";

const about = () => {
  const experienceData = [
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

  const techStack = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "GSAP",
    "Framer Motion",
    "Node.js",
    "Python",
    "Git",
    "Figma",
    "React Native",
    "MongoDB",
    "Express.js",
    "Three.js",
  ];

  const ExperienceItem = ({ experience }) => (
    <div className="mb-8">
      <div className="w-full flex justify-start gap-4 mt-4 mb-1.5">
        <div className="flex justify-between w-full gap-2">
          <Link href={experience.href} className="flex">
            <HoverLine lineClassName="!h-[1px] bg-foreground">
              <AnimatedText className="font-family-body text-size-sm tracking-wide font-normal flex items-center gap-1">
                {experience.company}
              </AnimatedText>
            </HoverLine>
            <AnimatedText>
              <ArrowUpRight size={20} />
            </AnimatedText>
          </Link>
          <AnimatedText className="font-family-body text-size-sm tracking-wide font-normal">
            {experience.location}
          </AnimatedText>
        </div>
      </div>
      <AnimatedLine />
      <div className="mt-1.5">
        <div className="flex justify-between xl:w-[25%] gap-2">
          <AnimatedText className="font-family-body text-size-xs tracking-wide font-normal">
            {experience.type}
          </AnimatedText>
          <AnimatedText className="font-family-body text-size-xs tracking-wide font-normal">
            {experience.workMode}
          </AnimatedText>
        </div>
        <div className="flex flex-col gap-2 mt-1.5">
          {experience.roles.map((role, index) => (
            <div key={index}>
              <div className="flex justify-between w-full gap-2">
                <AnimatedText className="font-family-body text-size-xs tracking-wide font-normal">
                  {role.title}
                </AnimatedText>
                <div className="xl:w-[35%] flex justify-between">
                  <div className="flex gap-1">
                    <AnimatedText className="font-family-body text-size-xs tracking-wide font-normal text-[#5C5C5C]">
                      {role.duration.split(" ")[0]}
                    </AnimatedText>
                    <AnimatedText className="font-family-body text-size-xs tracking-wide font-normal text-[#5C5C5C]">
                      {role.duration.split(" ")[1]}
                    </AnimatedText>
                  </div>
                  <AnimatedText className="font-family-body text-size-xs tracking-wide font-normal">
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

  return (
    <div className="h-full w-full">
      <div className="px-[4.29%] py-[5vh]">
        <div className="pt-[10vh]">
          <AnimatedText className="font-family-heading text-size-2xl text-left font-bold w-full">
            ABOUT
          </AnimatedText>
        </div>

        <div className="flex w-full justify-center flex-col items-center gap-4">
          <div className="w-full xl:max-w-[50%]">
            <AnimatedText className="font-normal font-family-body text-size-base">
              Hello! I'm Al Farhaan Khan Inamdar, a frontend engineer from
              Bangalore, India. With over 3 years of experience in design and
              development, I focus on what I love most: building expressive,
              animated web experiences. I believe in the power of interactivity
              and motion to transform a user's visit into a lasting impression.
              My work is dedicated to creating that moment of visual enjoyment
              and delight.
            </AnimatedText>
          </div>
          <div className="w-full xl:max-w-[50%]">
            <AnimatedText className="font-light font-family-japanese text-size-sm text-[#5C5C5C]">
              こんにちは！
              私はアル・ファルハーン・カーン・イナムダールと申します。インドのバンガロール出身のフロントエンドエンジニアです。デザインと開発の分野で3年以上の経験があり、特に情緒豊かでアニメーションのあるウェブ体験を構築することに情熱を注いでいます。
              私は、インタラクションとモーションの力がユーザーの訪問を特別な体験へと変え、強い印象を残すと信じています。私の仕事は、その視覚的な楽しさと喜びの瞬間を生み出すことに捧げています。
            </AnimatedText>
          </div>
          <div className="w-full xl:max-w-[50%]">
            <div className="w-full flex justify-start gap-4">
              <AnimatedText className="font-family-body text-size-xl font-medium">
                Experience:
              </AnimatedText>
              <AnimatedText className="font-family-body text-size-xl font-medium">
                3.8 years
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
