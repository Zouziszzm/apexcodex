import { Metadata } from "next";
import "./globals.css";
import {
  Inconsolata,
  Bebas_Neue,
  Yuji_Boku,
  Yusei_Magic,
} from "next/font/google";
import { TransitionProvider } from "@/context/Transition/Transition";
import { ThemeProvider } from "@/context/Theme/Theme";

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin"],
  weight: ["400", "700", "900", "300", "200", "800", "600", "500"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

const yuji = Yuji_Boku({
  variable: "--font-Yuji-Boku",
  subsets: ["latin"],
  weight: ["400"],
});

const yusi = Yusei_Magic({
  variable: "--font-yusei-magic",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Alfarhaan",
  description: "personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inconsolata.variable} ${bebas.variable} ${yuji.variable} ${yusi.variable}`}
      >
        <ThemeProvider>
          <TransitionProvider>{children}</TransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
