import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TransitionProvider } from "@/components/providers/transition-provider";
import { AmbientSoundProvider } from "@/components/providers/ambient-sound-provider";
import { hankenGrotesk } from "./font";
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

const themeScript = `
  (function() {
    try {
      var now = new Date();
      var month = now.getMonth();
      var hour = now.getHours();
      var season = "spring";
      if (month >= 2 && month <= 4) season = "spring";
      else if (month >= 5 && month <= 7) season = "summer";
      else if (month >= 8 && month <= 10) season = "autumn";
      else season = "winter";
      var time = "morning";
      if (hour >= 0 && hour < 5) time = "night-00";
      else if (hour >= 5 && hour < 7) time = "dawn";
      else if (hour >= 7 && hour < 11) time = "morning";
      else if (hour >= 11 && hour < 14) time = "noon";
      else if (hour >= 14 && hour < 17) time = "afternoon";
      else if (hour >= 17 && hour < 19) time = "dusk";
      else time = "evening";
      document.documentElement.setAttribute("data-season", season);
      document.documentElement.setAttribute("data-time", time);

      var storedTheme = localStorage.getItem("theme");
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      var link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/svg+xml";
      link.href = "/favicons/" + season + "@2x.svg";
      document.head.appendChild(link);
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${hankenGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
