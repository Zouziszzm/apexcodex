import HomePage from "@/components/pages/home/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Index | Alfarhaankhan",
};

export default function Home() {
  return (
    <main>
      <HomePage />
    </main>
  );
}
