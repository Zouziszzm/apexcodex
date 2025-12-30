"use client";

import { useEffect, useState } from "react";
import Copy from "@/components/Copy";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactClient() {
  const { language } = useLanguage();
  const [timeData, setTimeData] = useState<{
    istTime: string;
    timeDiff: string;
    isAhead: boolean;
  } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // IST Time
      const istOptions: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const istTime = new Intl.DateTimeFormat("en-US", istOptions).format(now);

      const getOffset = (timeZone: string) => {
        const date = new Date();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const utcDate = new Date(
          date.toLocaleString("en-US", { timeZone: "UTC" })
        );
        const tzDate = new Date(date.toLocaleString("en-US", { timeZone }));
        // Approximate offset calculation if needed, but simplified logic below is robust enough for display
        return (tzDate.getTime() - date.getTime()) / 60000;
        // Note: The previous logic was slightly complex. Simplest way to get IST offset is hardcoding or library,
        // but raw calculation:
      };

      // IST is UTC+5:30.
      // User local time offset (minutes behind UTC): new Date().getTimezoneOffset()
      const istOffset = 330;
      const localOffset = -now.getTimezoneOffset();

      const diffMinutes = istOffset - localOffset;
      const diffHours = Math.abs(Math.round(diffMinutes / 60));
      const isAhead = diffMinutes > 0;

      let timeDiffString = "";
      if (diffHours === 0) {
        timeDiffString = language === "jp" ? "同じ時間帯" : "Same time zone";
      } else {
        const hoursLabel = language === "jp" ? "時間" : "hours";
        const aheadLabel = language === "jp" ? "進んでいます" : "ahead";
        const behindLabel = language === "jp" ? "遅れています" : "behind";

        if (language === "jp") {
          timeDiffString = `${diffHours}${hoursLabel}${
            isAhead ? aheadLabel : behindLabel
          }`;
        } else {
          timeDiffString = `${diffHours} ${hoursLabel} ${
            isAhead ? "ahead" : "behind"
          }`;
        }
      }

      setTimeData({
        istTime,
        timeDiff: timeDiffString,
        isAhead: diffMinutes > 0,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [language]);

  const content = {
    en: {
      title: "CONTACT",
      message:
        "I'm currently away from the keyboard, likely hunting a ghost bug or reconsidering my life choices as a developer. I'll be back online soon (hopefully after a coffee). Goodness takes time.",
      emailLabel: "General Inquiries",
      socialsLabel: "Follow us",
      timeZoneLabel: "Current Time (India)",
      timeZoneDiffLabel: "Time Difference",
      email: "farhumaid@gmail.com",
    },
    jp: {
      title: "CONTACT",
      message:
        "現在席を外しています。おそらく幽霊バグを追いかけているか、エンジニアとしての人生の選択肢を見つめ直しています。コーヒーを飲んだら戻ってきます。良いものには時間がかかります。",
      emailLabel: "お問い合わせ",
      socialsLabel: "フォローする",
      timeZoneLabel: "現在時刻 (インド)",
      timeZoneDiffLabel: "時差",
      email: "farhumaid@gmail.com",
    },
  };

  const t = content[language];

  return (
    <main className="relative min-h-screen w-full flex flex-col lg:flex-row text-[var(--text-primary)] transition-colors duration-700 pt-20 lg:pt-0">
      {/* Left Column: Content (Flex-3 to match Menu's content ratio) */}
      <div className="lg:h-screen w-full lg:flex-[1.5] flex flex-col justify-center px-6 lg:px-0">
        <div className="w-full lg:w-3/4 mx-auto flex flex-col justify-center h-full gap-12 lg:gap-24 py-12 lg:py-0">
          {/* Header Section */}
          <div className="flex flex-col gap-12">
            <Copy delay={0.2} stagger={0.1}>
              {/* Responsive scaling text similar to Menu items */}
              <h1
                className={`text-[15vw] lg:text-[9vw] font-bold leading-[0.8] tracking-tighter mix-blend-difference ${
                  language === "jp" ? "font-['Noto_Sans_JP']" : ""
                }`}
              >
                {t.title}
              </h1>
            </Copy>

            <Copy delay={0.4}>
              <p
                className={`text-[16px] lg:text-[18px] leading-[150%] max-w-[500px] ${
                  language === "jp" ? "font-['Noto_Sans_JP']" : ""
                }`}
              >
                {t.message}
              </p>
            </Copy>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
              <Copy delay={0.6}>
                <div>
                  <p
                    className={`text-xs uppercase tracking-widest opacity-60 mb-2 ${
                      language === "jp" ? "font-['Noto_Sans_JP']" : ""
                    }`}
                  >
                    {t.emailLabel}
                  </p>
                  <Link
                    href={`mailto:${t.email}`}
                    className="text-lg hover:opacity-70 transition-opacity block w-fit underline"
                  >
                    {t.email}
                  </Link>
                </div>
              </Copy>
            </div>

            <div className="flex flex-col gap-6">
              <Copy delay={0.7}>
                <div>
                  <p
                    className={`text-xs uppercase tracking-widest opacity-60 mb-2 ${
                      language === "jp" ? "font-['Noto_Sans_JP']" : ""
                    }`}
                  >
                    {t.timeZoneLabel}
                  </p>
                  <p className="text-lg font-medium">
                    {timeData ? timeData.istTime : "--:--"}
                  </p>
                  <p
                    className={`text-sm opacity-60 mt-1 ${
                      language === "jp" ? "font-['Noto_Sans_JP']" : ""
                    }`}
                  >
                    {timeData ? timeData.timeDiff : "Calculating..."}
                  </p>
                </div>
              </Copy>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Image Placeholder (Flex-2 to match Menu's media ratio) */}
      <div className="hidden lg:block lg:h-screen lg:flex-1 border-l border-[var(--text-primary)] transition-colors duration-700 opacity-50">
        {/* Placeholder purely for layout as requested */}
      </div>
    </main>
  );
}
