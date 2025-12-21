import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description: "The person behind the code - journey, stack, and experience.",
};

export default function Page() {
  return <AboutClient />;
}
