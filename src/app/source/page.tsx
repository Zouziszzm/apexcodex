import React from "react";
export const dynamic = "force-dynamic";
import { getGithubStats } from "@/lib/github";

import SourceClient from "./SourceClient";

export const metadata = {
  title: "Apex Codex | Source",
};

export default async function Page() {
  const stats = await getGithubStats("Zouziszzm");

  return <SourceClient githubStats={stats} />;
}
