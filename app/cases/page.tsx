"use client";

import AnimatedText from "@/components/common/text/text";
import {
  CasesAccordion,
  CasesAccordionContent,
  CasesAccordionHeader,
  CasesAccordionItem,
} from "@/components/cases-accordian/cases-accordian";
import { CASE_ITEMS } from "@/lib/data/case-items";
import { CaseStudy } from "@/lib/types";
import Link from "next/link";
import CountUp from "@/components/common/animated-comps/count-up";
import { ArrowUpRight } from "lucide-react";
import HoverLine from "@/components/common/animated-comps/underline";

const CasesPage = () => {
  // Sort cases by year (newest → oldest)
  const sortedCases = [...CASE_ITEMS].sort(
    (a, b) => Number(b.year) - Number(a.year)
  );

  return (
    <>
      <div className="h-full w-full max-w-[1440px] mx-auto">
        <div className="px-[4.29%]">
          {/* Section heading */}
          <div className="pt-[10vh] flex items-center">
            <AnimatedText
              className="font-family-heading text-size-2xl text-left font-medium w-full"
              japanese="事例"
              classNameJapanese="text-size-xl"
            >
              CASES
            </AnimatedText>
            <div className="flex items-center gap-2 w-[110%] justify-end lg:hidden">
              <AnimatedText
                className="font-medium font-family-body text-size-2xl text-justify leading-[100%] "
                japanese="01."
                classNameJapanese="text-size-2xl"
              >
                <CountUp from={0} to={sortedCases.length} duration={1.4} />
              </AnimatedText>
              <AnimatedText
                className="font-medium font-family-body text-size-2xl text-justify whitespace-nowrap  lg:w-fit"
                japanese="プロジェクト。"
                classNameJapanese="text-size-xl whitespace-nowrap"
              >
                Projects.
              </AnimatedText>

            </div>
          </div>

          <div className="block lg:flex justify-between h-fit items-end">
            <div className="mt-6 w-full xl:max-w-[50%]">
              <AnimatedText
                className="font-normal font-family-body text-size-base text-justify"
                japanese="私の作品の厳選されたコレクション — デザインし、構築し、時には（良い意味で）睡眠を失ったものたち。これらは私が心から誇りに思うプロジェクト — 「うん、これはかなりクールに仕上がった」と言わせてくれるような種類のものです。"
                classNameJapanese="text-size-sm"
              >
                A curated collection of my works — the things I&apos;ve designed,
                built, and occasionally lost sleep over (in a good way). These
                are the projects I&apos;m genuinely proud of — the kind that make
                me say, &quot;yeah, that turned out pretty cool.&quot;
              </AnimatedText>
            </div>

            <div className="hidden lg:flex w-full justify-end">
              <div className="flex gap-2 items-end">
                {/* Animated project count */}
                <AnimatedText
                  className="font-medium font-family-body text-size-5xl text-justify leading-[100%]"
                  japanese="01."
                  classNameJapanese="text-size-6xl"
                >
                  <CountUp from={0} to={sortedCases.length} duration={1.4} />.
                </AnimatedText>

                <AnimatedText
                  className="font-medium font-family-body text-size-2xl text-justify"
                  japanese="プロジェクト。"
                  classNameJapanese="text-size-xl"
                >
                  Projects.
                </AnimatedText>
              </div>
            </div>
          </div>

          {/* Accordion */}
          <div className="mt-8">
            <CasesAccordion>
              {sortedCases.map((item: CaseStudy, index: number) => (
                <CasesAccordionItem
                  key={item.id}
                  value={item.slug}
                  image={item.image}
                  className="w-full"
                >
                  <CasesAccordionHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-3 items-center w-full">
                        {/* Animated index */}
                        <AnimatedText className="font-family-body text-size-xs text-neutral-500 ">
                          <CountUp from={0} to={index + 1} duration={0.8} />
                        </AnimatedText>

                        <div className="flex justify-between items-center w-full">
                          <AnimatedText
                            as="p"
                            className="font-family-heading text-size-lg font-medium"
                            japanese={item.titleJapanese}
                            classNameJapanese=""
                          >
                            {item.title}
                          </AnimatedText>

                          <div className="flex w-[40%] justify-between">
                            <AnimatedText
                              as="p"
                              className="font-family-body text-size-vxs lg:text-size-xs capitalize text-neutral-500"
                              japanese=""
                              classNameJapanese=""
                            >
                              {item.technologies?.slice(0, 2).join(" · ")}
                            </AnimatedText>
                            <AnimatedText
                              as="span"
                              className="font-family-body text-size-xs text-neutral-500"
                              japanese=""
                              classNameJapanese=""
                            >
                              {item.year}
                            </AnimatedText>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CasesAccordionHeader>

                  <CasesAccordionContent className="px-4 md:px-6">
                    <div className="grid gap-6 md:grid-cols-2 items-start">
                      <div>
                        <div className="space-y-3">
                          <AnimatedText
                            as="p"
                            className="font-family-body text-size-sm text-neutral-700 m-2"
                            japanese={item.overviewJapanese}
                            classNameJapanese="text-size-xs"
                          >
                            {item.overview}
                          </AnimatedText>

                          <div className="space-y-2">
                            <AnimatedText
                              as="p"
                              className="font-family-body text-size-xs m-2 text-neutral-600"
                            >
                              Role: {item.teamSize}
                            </AnimatedText>

                            <AnimatedText
                              as="p"
                              className="font-family-body text-size-xs m-2 text-neutral-500"
                            >
                              Stack: {item.technologies?.join(" · ")}
                            </AnimatedText>

                            {item.duration && (
                              <AnimatedText
                                as="p"
                                className="font-family-body text-size-xs m-2 text-neutral-500"
                              >
                                Duration: {item.duration}
                              </AnimatedText>
                            )}

                            {item.client && (
                              <AnimatedText
                                as="p"
                                className="font-family-body text-size-xs m-2 text-neutral-500"
                              >
                                Client: {item.client}
                              </AnimatedText>
                            )}
                          </div>

                          {/* Links */}
                          <div className="flex gap-4 mt-4 m-2">
                            {item.demoLink && (
                              <AnimatedText>
                                <Link
                                  href={item.demoLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-family-body text-size-xs text-blue-600 hover:text-blue-800 underline"
                                >
                                  Live Demo
                                </Link>
                              </AnimatedText>
                            )}
                            {item.githubLink && (
                              <AnimatedText className="flex gap-2 items-center justify-center">
                                <HoverLine>
                                  <Link
                                    href={item.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-family-body text-size-xs text-gray-600 hover:text-gray-800"
                                  >
                                    GitHub
                                  </Link>
                                </HoverLine>
                                <ArrowUpRight size={18} />
                              </AnimatedText>
                            )}
                          </div>
                        </div>
                      </div>

                      {item.image && item.image.trim() !== "" && (
                        <div className="w-full flex justify-end">
                          <div className="border border-neutral-300 overflow-hidden transition-all duration-500 ease-out opacity-100 translate-y-0 w-fit h-fit">
                            <AnimatedText>
                              <img
                                src={item.image}
                                alt={item.title}
                                className="h-fit lg:h-[400px] w-auto object-cover"
                              />
                            </AnimatedText>
                          </div>
                        </div>
                      )}
                    </div>
                  </CasesAccordionContent>
                </CasesAccordionItem>
              ))}
            </CasesAccordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default CasesPage;
