"use client";

import Copy from "@/components/Copy";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Page() {
  const { language } = useLanguage();

  const content = {
    en: {
      message:
        "I'm currently away from the keyboard, likely hunting a ghost bug or reconsidering my life choices as a developer. I'll be back online soon (hopefully after a coffee). Goodness takes time.",
      emailMsg:
        "Or if you send me an email, my phone will vibrate, I'll panic for a second, and then I'll probably reply with a smiley face.",
      email: "farhumaid@gmail.com",
      link: "Read my lore on the About page while you wait.",
    },
    jp: {
      message:
        "現在席を外しています。おそらく幽霊バグを追いかけているか、エンジニアとしての人生の選択肢を見つめ直しています。コーヒーを飲んだら戻ってきます。良いものには時間がかかります。",
      emailMsg:
        "もしメールをくれたら、スマホが震えて一瞬パニックになりますが、その後おそらく笑顔の絵文字付きで返信します。",
      email: "farhumaid@gmail.com",
      link: "待っている間に、私の履歴書でも読んでみてください。",
    },
  };

  const t = content[language];

  return (
    <main className="relative min-h-screen pt-20 px-6 lg:px-12 text-[var(--text-primary)] max-w-[1440px] mx-auto flex flex-col items-center justify-center text-center pb-20">
      <div className="max-w-[700px]">
        <Copy delay={0.5} stagger={0.2}>
          <h1
            className={`text-[20px] lg:text-[24px] font-medium leading-[140%] cursor-default mb-6 ${
              language === "jp" ? "font-['Noto_Sans_JP']" : ""
            }`}
          >
            {t.message}
          </h1>
        </Copy>

        <Copy delay={1.0} stagger={0.2}>
          <p
            className={`text-[16px] lg:text-[18px] text-[#5f5f5f] leading-[150%] mb-4 ${
              language === "jp" ? "font-['Noto_Sans_JP']" : ""
            }`}
          >
            {t.emailMsg}
          </p>
          <Link
            href={`mailto:${t.email}`}
            className="text-[18px] lg:text-[20px] font-medium underline hover:text-[#5f5f5f] transition-colors duration-300 block mb-10"
          >
            {t.email}
          </Link>
        </Copy>

        <Copy delay={1.5}>
          <Link
            href="/about"
            className={`text-sm underline hover:text-[#5f5f5f] transition-colors duration-300 ${
              language === "jp" ? "font-['Noto_Sans_JP']" : ""
            }`}
          >
            {t.link}
          </Link>
        </Copy>
      </div>
    </main>
  );
}
