import React from "react";
import PlaygroundClient from "./PlaygroundClient";

export const metadata = {
  title: "Apex Codex | Playground",
};

export default function Page() {
  return (
    <main className="bg-[var(--background)] min-h-screen w-full relative">
      <PlaygroundClient />
    </main>
  );
}
