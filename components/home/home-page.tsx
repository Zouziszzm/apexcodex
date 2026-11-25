"use client";

import dynamic from "next/dynamic";
import { DiaTextReveal } from "@/components/ui/dia-text-rv";
import { Highlighter } from "@/components/ui/marker";
import { LifeTodosTrigger } from "@/components/home/life-todos";
import { SpotifyNowPlaying } from "@/components/home/spotify-now-playing";
import { ExperienceSection } from "@/components/sections/home/experience";
import { ProjectsSection } from "@/components/sections/home/projects";
import { ContactSection } from "@/components/sections/home/contact";
import { LocalTime } from "@/components/ui/local-time";
import { HeaderControls } from "@/components/home/header-controls";
import {
  NameHintDoodle,
  VoxelHintDoodle,
} from "@/components/ui/editorial-doodles";
import { useLocale } from "@/app/contexts/LocaleContext";
import { UI_COPY } from "@/data/i18n";
import type { Project } from "@/types/projects";

const VoxelDog = dynamic(
  () => import("@/components/ui/voxel-dog").then((m) => m.VoxelDog),
  { ssr: false },
);

interface HomePageProps {
  projects: Project[];
}

const HomePage = ({ projects }: HomePageProps) => {
  const { locale, hasSwitched } = useLocale();
  const copy = UI_COPY[locale];
  const isJp = locale === "jp";
  const hlDelay = (initialMs: number) => (hasSwitched ? 260 : initialMs);

  return (
    <main className="max-w-[1440px] mx-auto flex flex-col flex-1 px-6 pb-0 w-full overflow-x-clip">
      <div className="flex justify-center w-full">
        <div className="flex flex-col gap-4 w-full max-w-3xl pt-[clamp(6rem,15vw,9rem)]">
          <h1 className="relative font-body font-medium flex flex-col gap-2.5 w-full min-w-0 overflow-visible lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-x-3">
            <NameHintDoodle />

            <div className="flex items-center justify-between gap-3 w-full lg:hidden">
              <LocalTime />
              <HeaderControls className="ml-auto" />
            </div>

            <span className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 min-w-0 lg:flex-nowrap lg:shrink-0 lg:col-start-1 lg:justify-self-start overflow-visible">
              <span
                data-locale-blur
                className="font-light text-(--subtext) opacity-65 shrink-0"
              >
                <DiaTextReveal
                  text={copy.namePrefix}
                  textColor="var(--subtext)"
                  once={false}
                />
              </span>
              <span data-locale-blur className="inline-block min-w-0 break-words">
                <DiaTextReveal text={copy.name} once={false} />
              </span>
              <span
                data-locale-blur
                className="relative z-20 overflow-visible self-center shrink-0"
              >
                <LifeTodosTrigger />
              </span>
            </span>

            <div
              data-locale-blur
              className="w-full min-w-0 lg:col-start-2 lg:row-start-1 lg:self-center"
            >
              <SpotifyNowPlaying variant="inline" className="w-full min-w-0" />
            </div>

            <div className="hidden lg:flex items-center gap-2 shrink-0 lg:col-start-3 lg:justify-self-end">
              <LocalTime />
              <HeaderControls showLocaleHint />
            </div>
          </h1>

          <p data-locale-blur className="font-body-sm font-light">
            <DiaTextReveal
              textColor="var(--body)"
              lineHeightGap="var(--lh-body)"
              once={false}
            >
              {isJp ? (
                <>
                  Web・モバイル・デスクトップ向けに、動きとパフォーマンスに優れた体験を制作しています。主に{" "}
                  <Highlighter
                    key="jp-react"
                    action="underline"
                    color="#b7d7f0"
                    strokeWidth={2}
                    delay={hlDelay(1500)}
                    padding={2}
                  >
                    React
                  </Highlighter>
                  、{" "}
                  <Highlighter
                    key="jp-ts"
                    action="underline"
                    color="#d8c7f2"
                    strokeWidth={2}
                    delay={hlDelay(1600)}
                    padding={2}
                  >
                    TypeScript
                  </Highlighter>
                  、{" "}
                  <Highlighter
                    key="jp-rust"
                    action="underline"
                    color="#f2c9c9"
                    strokeWidth={2}
                    delay={hlDelay(1700)}
                    padding={2}
                  >
                    Rust
                  </Highlighter>
                  、{" "}
                  <Highlighter
                    key="jp-go"
                    action="underline"
                    color="#cfe8cf"
                    strokeWidth={2}
                    delay={hlDelay(1800)}
                    padding={2}
                  >
                    Go
                  </Highlighter>
                  、{" "}
                  <Highlighter
                    key="jp-tauri"
                    action="underline"
                    color="#FF7477"
                    strokeWidth={2}
                    delay={hlDelay(1900)}
                    padding={2}
                  >
                    Tauri
                  </Highlighter>{" "}
                  を使用。現在 <span className="font-normal">日本語</span>{" "}
                  を学習中。
                  <span className="font-medium">ベンガルール</span>{" "}
                  拠点で <span className="font-normal">フロントエンド</span>・
                  <span className="font-normal">フルスタック</span>{" "}
                  の機会を探しています。
                </>
              ) : (
                <>
                  I create cross-platform experiences for web, mobile, and
                  desktop with a focus on interaction, motion, and performance.
                  Working primarily with{" "}
                  <Highlighter
                    key="en-react"
                    action="underline"
                    color="#b7d7f0"
                    strokeWidth={2}
                    delay={hlDelay(1500)}
                    padding={2}
                  >
                    React
                  </Highlighter>
                  ,{" "}
                  <Highlighter
                    key="en-ts"
                    action="underline"
                    color="#d8c7f2"
                    strokeWidth={2}
                    delay={hlDelay(1600)}
                    padding={2}
                  >
                    TypeScript
                  </Highlighter>
                  ,{" "}
                  <Highlighter
                    key="en-rust"
                    action="underline"
                    color="#f2c9c9"
                    strokeWidth={2}
                    delay={hlDelay(1700)}
                    padding={2}
                  >
                    Rust
                  </Highlighter>
                  ,{" "}
                  <Highlighter
                    key="en-go"
                    action="underline"
                    color="#cfe8cf"
                    strokeWidth={2}
                    delay={hlDelay(1800)}
                    padding={2}
                  >
                    Go
                  </Highlighter>
                  , and{" "}
                  <Highlighter
                    key="en-tauri"
                    action="underline"
                    color="#FF7477"
                    strokeWidth={2}
                    delay={hlDelay(1900)}
                    padding={2}
                  >
                    Tauri
                  </Highlighter>
                  . Currently learning{" "}
                  <span className="italic font-normal">Japanese.</span> Based in{" "}
                  <span className="font-medium italic">Bengaluru, India.</span>{" "}
                  Open to creative{" "}
                  <span className="font-normal">frontend</span> and{" "}
                  <span className="font-normal">full-stack</span> opportunities.
                </>
              )}
            </DiaTextReveal>
          </p>

          <p data-locale-blur className="font-body-sm font-light">
            <DiaTextReveal
              textColor="var(--subtext)"
              lineHeightGap="var(--lh-body)"
              delay={1.0}
              duration={1.5}
            >
              {isJp ? (
                <>
                  新しい環境での挑戦を求めており、{" "}
                  <Highlighter
                    key="jp-intl"
                    action="underline"
                    color="#d8c7f2"
                    strokeWidth={2}
                    delay={hlDelay(2400)}
                    padding={2}
                  >
                    海外・グローバルな機会
                  </Highlighter>{" "}
                  （リモート・移住）を歓迎しています。
                </>
              ) : (
                <>
                  I&apos;m looking for a change in environment and open to{" "}
                  <Highlighter
                    key="en-intl"
                    action="underline"
                    color="#d8c7f2"
                    strokeWidth={2}
                    delay={hlDelay(2400)}
                    padding={2}
                  >
                    international opportunities
                  </Highlighter>
                  — remote or relocation.
                </>
              )}
            </DiaTextReveal>
          </p>

          <div className="relative overflow-visible">
            <div className="hidden lg:block lg:absolute lg:-left-6 xl:-left-20 lg:top-1/2 lg:-translate-y-1/2 z-10">
              <VoxelHintDoodle />
            </div>
            <div className="w-full max-w-[450px] aspect-450/240 mx-auto">
              <div className="w-full h-full">
                <VoxelDog />
              </div>
            </div>
            <p
              data-locale-blur
              className="text-center w-full font-light text-[12px] whitespace-normal sm:whitespace-nowrap mt-4"
            >
              <DiaTextReveal textColor="var(--subtext)" delay={0.6}>
                <>
                  {copy.voxelTitle}
                  <span className="font-extralight">{copy.voxelSubtitle}</span>
                </>
              </DiaTextReveal>
            </p>
          </div>

          <ExperienceSection />
          <ProjectsSection projects={projects} />
          <ContactSection />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
