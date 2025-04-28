import React from 'react';
import Image from 'next/image';
import { LangText } from '../../Uniqcomps/LangText/LangText';
import AnimatedContainer from '../../Uniqcomps/Animations/ContentAnimations/AnimatedContent';

const Home = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-8xl w-full justify-center items-center flex flex-col pt-20 4xlpt-40 ">
        <div className="w-[150px] h-[150px] relative">
          <Image
            src="/profile.png"
            width={150}
            height={150}
            alt="Picture of the author"
            className="rounded-full border-1 border-borders w-fit h-fit"
          />
        </div>
        <div className="w-fit 4xl:w-2/3 ">
          <div className="p-4">
            <AnimatedContainer>
              <div className="py-4">
                <LangText
                  en="About me"
                  jp="自己紹介"
                  styleJp="font-Jp"
                  styleEn="font-En"
                  classname=" text-4xl"
                />
              </div>
            </AnimatedContainer>
            <AnimatedContainer>
              <div className="flex flex-col gap-4">
                <LangText
                  en="I'm a digital creator from Karnataka, India, focused on frontend development and freelancing as a backend developer. I bring a creative touch to tech, building intuitive designs that help businesses thrive online."
                  jp="私はインド・カルナータカ州出身のデジタルクリエイターで、フロントエンド開発を中心に、バックエンド開発のフリーランスとしても活動しています。創造性を活かして、直感的なデザインを構築し、企業のデジタル成長をサポートしています。"
                  styleJp=""
                  styleEn="text-justify"
                  classname="font-Cm 3xl:text-lg "
                />

                <LangText
                  en="My journey blends frontend finesse with backend architecture and a passion for seamless user experiences. Outside of coding, I unwind through gaming—a fun break from deadlines that keeps my creativity sharp."
                  jp="フロントエンドの洗練された技術とバックエンドの設計を融合させ、シームレスなユーザー体験を追求しています。コードの世界を離れるときは、ゲームでリフレッシュしながら、創造力を保っています。"
                  styleJp=""
                  styleEn="text-justify"
                  classname="font-Cm 3xl:text-lg "
                />
              </div>
            </AnimatedContainer>
          </div>
          <div className="p-4 flex flex-col gap-4 3xl:flex-row">
            <AnimatedContainer>
              <div className="py-4">
                <LangText
                  en="Eucation"
                  jp="学歴"
                  styleJp="font-Jp"
                  styleEn="font-En"
                  classname=" text-4xl"
                />
              </div>
              <div className="flex flex-col 3xl:flex-row gap-4 3xl:gap-20">
                <div className="font-Cm">
                  <p>2022</p>
                  <p>Masters&apos;s In Computer Applications</p>
                  <p>P.E.S</p>
                </div>
                <div className="font-Cm">
                  <p>2020</p>
                  <p>Bachelor&apos;s In Computer Applications</p>
                  <p>P.E.S</p>
                </div>
              </div>
            </AnimatedContainer>
            {/*
            <AnimatedContainer>
              <div className="py-4">
                <LangText
                  en="Eucation"
                  jp="学歴"
                  styleJp="font-Jp"
                  styleEn="font-En"
                  classname=" text-4xl"
                />
              </div>
            </AnimatedContainer>
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
