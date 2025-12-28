import React from "react";
import PlaygroundClient from "./PlaygroundClient";

export const metadata = {
  title: "Apex Codex | Playground",
};

export default function Page() {
  return (
    <main className="bg-[#EBE9E4] min-h-screen w-full relative">
      <PlaygroundClient />
    </main>
  );
}
