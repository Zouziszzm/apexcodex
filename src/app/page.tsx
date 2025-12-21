import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "faraan's codex",
  description: "Crafting digital experiences with precision.",
};

export default function Page() {
  return <HomeClient />;
}
