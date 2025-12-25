import type { Metadata } from "next";
import CasesClient from "./CasesClient";

export const metadata: Metadata = {
  title: "Cases",
  description:
    "A curated collection of my works — the things I've designed, built, and occasionally lost sleep over.",
};

export default function Page() {
  return <CasesClient />;
}
