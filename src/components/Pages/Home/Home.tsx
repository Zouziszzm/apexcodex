import React from 'react';
import Image from 'next/image';
import { LangText } from '../../Uniqcomps/LangText/LangText';

const Home = () => {
  return (
    <div className="w-full flex justify-center md:w-[70%]">
      <div className="flex justify-between w-full">
        <div>
          <Image
            src="/profile.png"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
        <div>
          <div>
            <LangText
              en="About"
              jp="自己紹介"
              styleJp="font-Jp text-4xl"
              styleEn="font-En text-4xl"
              classname="pb-4"
            />
          </div>
          <div>
            <LangText
              en="I am a versatile digital creator based in Karnataka, India, deeply immersed in frontend development and freelancing as a backend developer. With a rich background in technology, I infuse creativity seamlessly into diverse projects, crafting intuitive designs to empower businesses in the digital landscape."
              jp="私はインド・カルナータカ州を拠点に活動する多才なデジタルクリエイターです。フロントエンド開発に深く携わる一方で、バックエンド開発のフリーランスとしても活動しています。テクノロジーに関する豊富な経験を活かし、直感的なデザインを通じて、さまざまなプロジェクトに創造性を吹き込み、ビジネスのデジタル展開を支援しています。"
              classname="font-Cm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
