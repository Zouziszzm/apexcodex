"use client";

import { useEffect, useState } from "react";
import Copy from "@/components/Copy";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { contactData } from "@/data/contact";

export default function ContactClient() {
  const { language } = useLanguage();
  const [istTime, setIstTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const formatted = new Intl.DateTimeFormat("en-US", options).format(
        new Date()
      );
      setIstTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000); // Update every 10 seconds for better accuracy
    return () => clearInterval(interval);
  }, []);

  const t = contactData[language];

  return (
    <main className="relative min-h-screen w-full flex flex-col lg:flex-row text-(--text-primary) transition-colors duration-700 pt-20 lg:pt-0">
      {/* Left Column: Content (Flex-3 to match Menu's content ratio) */}
      <div className="lg:h-screen w-full lg:flex-[1.5] flex flex-col justify-center px-6 lg:px-0">
        <div className="w-full lg:w-3/4 mx-auto flex flex-col justify-center h-full gap-8 lg:gap-12 py-12 lg:py-0">
          {/* Header Section */}
          <div className="flex flex-col gap-8 lg:gap-12">
            <Copy delay={0.2} stagger={0.1}>
              {/* Reduced text size as requested */}
              <h1
                className={`text-[40px] lg:text-[60px] font-medium leading-[100%] tracking-tight ${
                  language === "jp" ? "font-['Noto_Sans_JP']" : ""
                }`}
              >
                {t.title}
              </h1>
            </Copy>

            <Copy delay={0.4}>
              <p
                className={`text-[16px] lg:text-[18px] leading-[150%] max-w-[500px] text-(--text-secondary) ${
                  language === "jp" ? "font-['Noto_Sans_JP']" : ""
                }`}
              >
                {t.message}
              </p>
            </Copy>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {/* Email */}
            <div className="flex flex-col gap-1">
              <Copy delay={0.6}>
                <div>
                  <p
                    className={`text-xs uppercase tracking-widest opacity-60 ${
                      language === "jp" ? "font-['Noto_Sans_JP']" : ""
                    }`}
                  >
                    {t.emailLabel}
                  </p>
                  <div className="h-px w-full bg-[var(--text-primary)]/20 my-3" />
                  <Link
                    href={`mailto:${t.email}`}
                    className="text-base lg:text-lg hover:opacity-70 transition-opacity block w-fit"
                  >
                    {t.email}
                  </Link>
                </div>
              </Copy>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-1">
              <Copy delay={0.8}>
                <div>
                  <p
                    className={`text-xs uppercase tracking-widest opacity-60 ${
                      language === "jp" ? "font-['Noto_Sans_JP']" : ""
                    }`}
                  >
                    {t.addressLabel}
                  </p>
                  <div className="h-px w-full bg-[var(--text-primary)]/20 my-3" />
                  <p
                    className={`text-base lg:text-lg ${
                      language === "jp" ? "font-['Noto_Sans_JP']" : ""
                    }`}
                  >
                    {t.address.line1}
                    <br />
                    {t.address.line2}
                  </p>
                </div>
              </Copy>
            </div>

            {/* Timezone */}
            <div className="flex flex-col gap-1">
              <Copy delay={0.7}>
                <div>
                  <p
                    className={`text-xs uppercase tracking-widest opacity-60 ${
                      language === "jp" ? "font-['Noto_Sans_JP']" : ""
                    }`}
                  >
                    {t.timeZoneLabel}
                  </p>
                  <div className="h-px w-full bg-(--text-primary)/20 my-3" />
                  <p className="text-base lg:text-lg font-medium">
                    {istTime || "--:--"}
                  </p>
                </div>
              </Copy>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-1">
              <div>
                <Copy delay={0.9}>
                  <p
                    className={`text-xs uppercase tracking-widest opacity-60 ${
                      language === "jp" ? "font-['Noto_Sans_JP']" : ""
                    }`}
                  >
                    {t.socialsLabel}
                  </p>
                </Copy>
                <div className="h-px w-full bg-(--text-primary)/20 my-3" />
                <div className="flex flex-wrap gap-x-12 gap-y-4 w-full">
                  {t.socials.map((social, index) => (
                    <Copy key={social.label} delay={1.0 + index * 0.05}>
                      <Link
                        href={social.href}
                        target="_blank"
                        className="text-base lg:text-lg hover:underline underline-offset-4 decoration-(--text-primary)/30 hover:opacity-70 transition-all block w-fit"
                      >
                        {social.label}
                      </Link>
                    </Copy>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Image */}
      <div className="hidden lg:block lg:h-screen lg:flex-1 border-l border-(--text-primary) transition-colors duration-700">
        <Image
          src="/menu-sakura.jpg"
          alt="Contact Image"
          width={800}
          height={1200}
          className="w-full h-full object-cover opacity-25"
        />
      </div>
    </main>
  );
}
