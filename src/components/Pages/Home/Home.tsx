import React from 'react';
import Image from 'next/image';
import { LangText } from '../../Uniqcomps/LangText/LangText';
import AnimatedContainer from '../../Uniqcomps/Animations/ContentAnimations/AnimatedContent';

const Home = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-8xl w-full">
        <div className="flex-col flex w-full justify-center items-center 4xl:flex-row  mt-14">
          <div className="w-[150px] h-[150px] 4xl:w-[25%] 4xl:h-[700px] relative">
            <Image
              src="/profile.svg"
              fill
              alt="Picture of the author"
              className="rounded-full border-1 border-white w-fit h-fit 4xl:rounded-none 4xl:border-0"
            />
          </div>
          <div className="w-fit 4xl:w-2/3 p-2">
            <AnimatedContainer>
              <LangText
                en="About me"
                jp="自己紹介"
                styleJp="font-Jp"
                styleEn="font-En"
                classname="font-medium text-4xl text-center 4xl:text-left"
              />
            </AnimatedContainer>
            <AnimatedContainer>
              <div className="flex flex-col gap-4">
                <LangText
                  en="I'm a digital creator from Karnataka, India, focused on frontend development and freelancing as a backend developer. I bring a creative touch to tech, building intuitive designs that help businesses thrive online."
                  jp="私はインド・カルナータカ州出身のデジタルクリエイターで、フロントエンド開発を中心に、バックエンド開発のフリーランスとしても活動しています。創造性を活かして、直感的なデザインを構築し、企業のデジタル成長をサポートしています。"
                  styleJp=""
                  styleEn="text-justify"
                  classname="font-Cm 3xl:text-lg font-light "
                />

                <LangText
                  en="My journey blends frontend finesse with backend architecture and a passion for seamless user experiences. Outside of coding, I unwind through gaming—a fun break from deadlines that keeps my creativity sharp."
                  jp="フロントエンドの洗練された技術とバックエンドの設計を融合させ、シームレスなユーザー体験を追求しています。コードの世界を離れるときは、ゲームでリフレッシュしながら、創造力を保っています。"
                  styleJp=""
                  styleEn="text-justify"
                  classname="font-Cm 3xl:text-lg font-light"
                />
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
