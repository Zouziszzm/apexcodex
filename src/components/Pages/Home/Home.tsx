import React from 'react';
import Image from 'next/image';
import { LangText } from '../../Uniqcomps/LangText/LangText';
import AnimatedContainer from '../../Uniqcomps/Animations/ContentAnimations/AnimatedContent';

const Home = () => {
  return (
    <div className="w-full flex justify-center pt-[20%] 2xl:pt-[10%]">
      <div className="w-full 6xl:w-[80%] 9xl:w-[50%]">
        <div className="flex flex-col 6xl:flex-row gap-4 6xl:gap-8 items-center 6xl:items-start">
          <div className="bg-gray-300 flex justify-center items-center w-fit h-fit border rounded-full 2xl:rounded-none ">
            <Image
              src="/profile.svg"
              width={504}
              height={798}
              alt="Picture of the author"
              className="5xl:w-[400px] "
            />
          </div>
          <div className="h-fit flex-1 w-full">
            <AnimatedContainer>
              <div className=" flex-col justify-center items-center flex w-full 2xl:items-start">
                <LangText
                  en="About"
                  jp="自己紹介"
                  styleJp="font-Jp text-4xl"
                  styleEn="font-En text-4xl text-justify"
                  classname="w-fit pb-4"
                />
                <div className="gap-4 flex flex-col">
                  <AnimatedContainer>
                    <div className="pb-4">
                      <LangText
                        en="I'm a digital creator from Karnataka, India, focused on frontend development and freelancing as a backend developer. I bring a creative touch to tech, building intuitive designs that help businesses thrive online."
                        jp="私はインド・カルナータカ州出身のデジタルクリエイターで、フロントエンド開発を中心に、バックエンド開発のフリーランスとしても活動しています。創造性を活かして、直感的なデザインを構築し、企業のデジタル成長をサポートしています。"
                        classname="font-Cm"
                        styleJp=""
                        styleEn="text-justify"
                      />
                    </div>
                    <div className="pb-4">
                      <LangText
                        en="My journey blends frontend finesse with backend architecture and a passion for seamless user experiences. Outside of coding, I unwind through gaming—a fun break from deadlines that keeps my creativity sharp."
                        jp="フロントエンドの洗練された技術とバックエンドの設計を融合させ、シームレスなユーザー体験を追求しています。コードの世界を離れるときは、ゲームでリフレッシュしながら、創造力を保っています。"
                        classname="font-Cm"
                        styleJp=""
                        styleEn="text-justify"
                      />
                    </div>
                  </AnimatedContainer>
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
