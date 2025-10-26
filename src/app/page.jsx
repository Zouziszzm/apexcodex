import HoverLine from "@/components/common/animated-comps/underline";
import { ArrowUpRight, Asterisk } from "lucide-react";
import Link from "next/link";
import TransitionLink from "@/components/common/link/link";
import AnimatedText from "@/components/common/text/text";

export default function Home() {
  return (
    <div className="h-fit w-full">
      <div className="px-[4.29%]">
        <div className="pt-[10vh]">
          <AnimatedText className=" font-family-heading text-size-2xl text-left font-bold w-full">
            Developer Portfolio
          </AnimatedText>
        </div>
        <div className=" w-full xl:max-w-[50%] pt-4">
          <AnimatedText className=" font-family-heading text-size-base font-normal  ">
            A Frontend Engineer Based in Bangalore, I specialize in bringing
            interfaces to life through fluid animation and motion. I believe in
            the power of subtle movement to create intuitive, engaging, and
            unforgettable user experiences. My foundation in React, Next.js, and
            TypeScript fuels my ongoing journey into full-stack development.
          </AnimatedText>
        </div>
        <div className="pt-4">
          <AnimatedText className=" font-family-heading text-size-sm font-normal  ">
            Currently Working On
          </AnimatedText>
          <div className="flex items-center w-fit gap-2 pt-2">
            <Link href="https://www.github.com" target="_blank">
              <div className="flex items-center w-fit gap-2">
                <AnimatedText>
                  <Asterisk />
                </AnimatedText>
                <div className="flex">
                  <HoverLine lineClassName="h-[1px] bg-foreground">
                    <AnimatedText className="">
                      Life Journel -- A Tauri + Rust based Multi-Platform
                      Application
                    </AnimatedText>
                  </HoverLine>
                  <AnimatedText>
                    <ArrowUpRight />
                  </AnimatedText>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center w-fit gap-2 pt-2">
            <Link href="https://www.github.com" target="_blank">
              <div className="flex items-center w-fit gap-2">
                <AnimatedText>
                  <Asterisk />
                </AnimatedText>
                <AnimatedText className="">Japanese N4</AnimatedText>
              </div>
            </Link>
          </div>
        </div>
        <div className="pt-6 w-fit">
          <TransitionLink href="/about">
            <HoverLine lineClassName="h-[1px] bg-foreground">
              <AnimatedText className="font-family-heading text-size-sm font-normal">
                Know More
              </AnimatedText>
            </HoverLine>
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
