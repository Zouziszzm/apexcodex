import { DiaTextReveal } from "@/components/ui/dia-text-rv";
import { Highlighter } from "@/components/ui/marker";
import { VoxelDog } from "@/components/ui/voxel-dog";
import { ExperienceSection } from "@/components/sections/home/experience";
import { ProjectsSection } from "@/components/sections/home/projects";
import { ContactSection } from "@/components/sections/home/contact";
import { LocalTime } from "@/components/ui/local-time";
import { AnimatedThemeToggler } from "@/components/ui/theme-toggler";

const HomePage = () => {
  return (
    <main className="max-w-[1440px] mx-auto min-h-screen px-6 pb-24">
      <div className="flex justify-center w-full">
        <div className="flex flex-col gap-4 w-full max-w-3xl pt-[clamp(6rem,15vw,9rem)]">
          <h1 className="font-body font-medium flex flex-col sm:flex-row sm:justify-between items-start sm:items-baseline gap-3 w-full">
            <DiaTextReveal text={["Alfarhaankhan Inamdar"]} priority={true} once={false} />
            <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
              <LocalTime />
              <AnimatedThemeToggler variant="circle" />
            </div>

          </h1>
          <p className="font-body-sm font-light">
            <DiaTextReveal textColor="var(--body)" lineHeightGap="1" priority={true} once={false}>
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
                <span className="italic font-normal">Japanese.</span> Based in
                Bengaluru, India. Open to creative{" "}
                <span className="font-normal">frontend</span> and{" "}
                <span className="font-normal">full-stack</span> opportunities.
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
          <ProjectsSection />
          <ContactSection />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
