"use client"
import { Noto_Sans_JP } from "next/font/google";
import { LinkProvider } from "@/lib/context/link-context";
import "./globals.css";
import { useState } from "react";
import Loader from "@/components/common/loader/loader";
import ClickSpark from "@/components/common/animated-comps/click";

const notoSansJp = Noto_Sans_JP({
  variable: '--font_sans_JP',
  subsets: ["cyrillic"],
  weight: ["400", '700', "900", "300", "200", "800", "600", "500"]
})

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <html lang="en">
      <body className={`${notoSansJp.variable} antialiased`}>
        <LinkProvider>
          <ClickSpark
            sparkColor='#1C1C1E50'
            sparkSize={7}
            sparkRadius={14}
            sparkCount={7}
            duration={400}
          >
            {isLoading && <Loader onComplete={handleLoaderComplete} />}
            {!isLoading && children}
          </ClickSpark>
        </LinkProvider>
      </body>
    </html >
  );
}
