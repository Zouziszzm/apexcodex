import React from "react";
import { getGithubStats } from "@/lib/github";

import SourceClient from "./SourceClient";

export const metadata = {
  title: "Apex Codex | Source",
};

export default async function Page() {
  const stats = await getGithubStats("Zouziszzm");

  return <SourceClient githubStats={stats} />;
}
