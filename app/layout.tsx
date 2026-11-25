import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LocaleProvider } from "./contexts/LocaleContext";
import { TransitionProvider } from "@/components/providers/transition-provider";
import { AmbientSoundProvider } from "@/components/providers/ambient-sound-provider";
import {
  doodleEn,
  doodleJp,
  hankenGrotesk,
  hankenJpScale,
  notoSansJP,
} from "./font";
import { Footer } from "@/components/ui/footer";
import { DevToolbar } from "@/components/ui/dev-toolbar";
import ClickSpark from "@/components/ui/click-spark";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alfarhaankhan.com"),
  title: {
    template: "%s | Alfarhaankhan",
    default: "Alfarhaankhan",
  },
  description: "A collection of my professional journey as engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${hankenGrotesk.variable} ${hankenJpScale.variable} ${notoSansJP.variable} ${doodleEn.variable} ${doodleJp.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-script"
          src="/theme-init.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <LocaleProvider>
            <AmbientSoundProvider>
              <ClickSpark
                sparkColor="var(--title)"
                sparkSize={7}
                sparkRadius={7}
                sparkCount={7}
                duration={300}
                sparkLineWidth={1}
              >
                <DevToolbar />
                <TransitionProvider>
                  {children}
                  <Footer />
                </TransitionProvider>
              </ClickSpark>
            </AmbientSoundProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
