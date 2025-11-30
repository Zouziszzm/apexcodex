import "./globals.css";
import type { ReactNode } from "react";
import AppWrapper from "@/components/common/wrappers/wrapper";
import { neueMontreal, notoSansJp } from "./fonts";
import { RootLayoutProps } from "@/lib/types";

export const metadata = {
  title: "AlfarhaanKhan",
  description: "A Codex of my proffesional Journey",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${neueMontreal.variable} ${notoSansJp.variable}`}>
      <body
        className={`
          ${neueMontreal.className} 
          ${notoSansJp.variable} 
          antialiased
          h-screen
        `}
      >
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
