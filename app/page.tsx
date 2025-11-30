import HoverLine from "@/components/common/animated-comps/underline";
import { ArrowUpRight, Asterisk } from "lucide-react";
import Link from "next/link";
import TransitionLink from "@/components/common/link/link";
import AnimatedText from "@/components/common/text/text";

export default function Home() {
  return (
    <div className="h-full w-full max-w-[1440px] mx-auto">
      <div className="px-[4.29%] h-full">
        <div className="pt-[10vh]">
          <AnimatedText 
            className=" font-family-heading text-size-2xl text-left font-medium w-full"
            japanese="開発者ポートフォリオ"
            classNameJapanese="text-size-xl"
          >
            Developer Portfolio
          </AnimatedText>
        </div>
        <div className=" w-full xl:max-w-[50%] pt-4">
          <AnimatedText 
            className=" font-family-heading text-size-base font-normal"
            japanese="バンガロールを拠点とするフロントエンドエンジニアとして、流動的なアニメーションとモーションを通じてインターフェースに命を吹き込むことを専門としています。直感的で魅力的で忘れられないユーザー体験を生み出すための、繊細な動きの力を信じています。React、Next.js、TypeScriptを基盤として、フルスタック開発への継続的な旅を進めています。"
          classNameJapanese="text-size-sm"
          >
            A Frontend Engineer Based in Bangalore, I specialize in bringing
            interfaces to life through fluid animation and motion. I believe in
            the power of subtle movement to create intuitive, engaging, and
            unforgettable user experiences. My foundation in React, Next.js, and
            TypeScript fuels my ongoing journey into full-stack development.
          </AnimatedText>
        </div>
        <div className="pt-4">
          <AnimatedText 
            className=" font-family-heading text-size-sm font-normal"
            japanese="現在取り組んでいること"
            classNameJapanese="text-size-base"
          >
            Currently Working On
          </AnimatedText>
          <div className="flex items-center w-fit gap-2 pt-2">
            <Link href="https://www.github.com/zouziszzm" target="_blank">
              <div className="flex items-center w-fit gap-2">
                <AnimatedText>
                  <Asterisk />
                </AnimatedText>
                <div className="flex">
                  <HoverLine lineClassName="h-[1px] bg-foreground">
                    <AnimatedText 
                      className=""
                      japanese="ライフジャーナル -  Rust アプリケーション"
                      classNameJapanese="text-size-sm"
                    >
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
              <div className="flex items-center w-fit gap-2">
                <AnimatedText>
                  <Asterisk />
                </AnimatedText>
                <AnimatedText 
                  className=""
                  japanese="日本語N4"
                  classNameJapanese="text-size-sm"
                >
                  Japanese N4
                </AnimatedText>
              </div>
         
          </div>
        </div>
        <div className="pt-6 w-fit">
          <TransitionLink href="/about">
            <HoverLine lineClassName="h-[1px] bg-foreground">
              <AnimatedText 
                className="font-family-heading text-size-sm font-normal"
                japanese="もっと知る"
              >
                Know More
              </AnimatedText>
            </HoverLine>
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}

