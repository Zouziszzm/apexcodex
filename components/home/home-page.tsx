import { DiaTextReveal } from "@/components/ui/dia-text-rv";
import { Highlighter } from "@/components/ui/marker";
import { IndieDevLink } from "@/components/home/indie-dev-link";
import { VoxelDog } from "@/components/ui/voxel-dog";
import { LifeTodosTrigger } from "@/components/home/life-todos";
import { SpotifyNowPlaying } from "@/components/home/spotify-now-playing";
import { ExperienceSection } from "@/components/sections/home/experience";
import { ProjectsSection } from "@/components/sections/home/projects";
import { ContactSection } from "@/components/sections/home/contact";
import { LocalTime } from "@/components/ui/local-time";
import { HeaderControls } from "@/components/home/header-controls";
import type { Project } from "@/types/projects";

interface HomePageProps {
  projects: Project[];
}

const HomePage = ({ projects }: HomePageProps) => {
  return (
    <main className="max-w-[1440px] mx-auto flex flex-col flex-1 px-6 pb-0 w-full">
      <div className="flex justify-center w-full">
        <div className="flex flex-col gap-4 w-full max-w-3xl pt-[clamp(6rem,15vw,9rem)]">
          <h1 className="font-body font-medium flex flex-col gap-2 w-full min-w-0 overflow-visible lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-x-3">
            <span className="flex items-center justify-between gap-3 min-w-0 lg:col-start-1 lg:justify-self-start">
              <span className="flex items-center gap-x-2 min-w-0 shrink-0 overflow-visible">
                <DiaTextReveal
                  text={["Alfarhaankhan Inamdar"]}
                  once={false}
                />
                <span className="relative z-20 overflow-visible">
                  <LifeTodosTrigger />
                </span>
              </span>
              <HeaderControls className="lg:hidden" />
            </span>

            <LocalTime className="lg:hidden" />

            <SpotifyNowPlaying
              variant="inline"
              className="w-full min-w-0 lg:col-start-2 lg:row-start-1 lg:self-center"
            />

            <div className="hidden lg:flex items-center gap-2 shrink-0 lg:col-start-3 lg:justify-self-end">
              <LocalTime />
              <HeaderControls />
            </div>
          </h1>
          <p className="font-body-sm font-light">
            <DiaTextReveal
              textColor="var(--body)"
              lineHeightGap="1"
              once={false}
            >
              <>
                I create cross-platform experiences for web, mobile, and desktop
                with a focus on interaction, motion, and performance. Working
                primarily with{" "}
                <Highlighter
                  action="underline"
                  color="#b7d7f0"
                  strokeWidth={2}
                  delay={1500}
                  padding={5}
                >
                  React
                </Highlighter>
                ,{" "}
                <Highlighter
                  action="underline"
                  color="#d8c7f2"
                  strokeWidth={2}
                  delay={1600}
                  padding={5}
                >
                  TypeScript
                </Highlighter>
                ,{" "}
                <Highlighter
                  action="underline"
                  color="#f2c9c9"
                  strokeWidth={2}
                  delay={1700}
                  padding={5}
                >
                  Rust
                </Highlighter>
                ,{" "}
                <Highlighter
                  action="underline"
                  color="#cfe8cf"
                  strokeWidth={2}
                  delay={1800}
                  padding={5}
                >
                  Go
                </Highlighter>
                , and{" "}
                <Highlighter
                  action="underline"
                  color="#FF7477"
                  strokeWidth={2}
                  delay={1900}
                  padding={5}
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
            </DiaTextReveal>
          </p>
          <p className="font-body-sm font-light">
            <DiaTextReveal
              textColor="var(--subtext)"
              lineHeightGap="1"
              delay={1.0}
              duration={1.5}
            >
              <>
                As an <IndieDevLink />
                , I&apos;m looking for a change in environment and open to{" "}
                <Highlighter
                  action="underline"
                  color="#d8c7f2"
                  strokeWidth={2}
                  delay={2400}
                  padding={5}
                >
                  international opportunities
                </Highlighter>
                — remote or relocation.
              </>
            </DiaTextReveal>
          </p>
          <div>
            <div className="w-full max-w-[450px] aspect-450/240 mx-auto">
              <div className="w-full h-full">
                <VoxelDog />
              </div>
            </div>
            <p className="text-center w-full font-light text-[12px] whitespace-normal sm:whitespace-nowrap mt-4">
              <DiaTextReveal textColor="var(--subtext)" delay={0.6}>
                <>
                  Heart of the Forest —{" "}
                  <span className="font-extralight">
                    A quiet spirit wandering the deep woods.
                  </span>
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
