import type { Metadata } from "next";
import { neueMontreal, notoSansJp } from "./fonts";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import Menu from "@/components/Menu";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://alfarhaankhan.vercel.app"),
  title: {
    default: "farhaan's codex",
    template: "%s | farhaan's codex",
  },
  description: "This is the codex of alfarhaans profesional journey.",
  openGraph: {
    title: "farhaan's codex",
    description: "This is the codex of alfarhaans profesional journey.",
    url: "https://alfarhaankhan.vercel.app",
    siteName: "alfarhaankhan",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "farhaan's codex",
    description: "This is the codex of alfarhaans profesional journey.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${neueMontreal.className}
          ${notoSansJp.variable}
          antialiased
          bg-[#D4CFCB]
        `}
      >
        <LanguageProvider>
          <Menu />
          <PageTransition>
            <div
              id="main-container"
              className="relative transform will-change-transform bg-[#D4CFCB]"
            >
              {children}
            </div>
          </PageTransition>
        </LanguageProvider>
      </body>
    </html>
  );
}
