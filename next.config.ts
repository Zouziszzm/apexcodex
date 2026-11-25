import os from "os";
import type { NextConfig } from "next";

function getLocalNetworkOrigins(): string[] {
  const origins = new Set<string>([
    "192.168.*.*",
    "10.*.*.*",
    "172.*.*.*",
    "*.local",
  ]);

  const interfaces = os.networkInterfaces();
  for (const list of Object.values(interfaces)) {
    if (!list) continue;
    for (const iface of list) {
      if (iface.family === "IPv4" && !iface.internal && iface.address) {
        origins.add(iface.address);
      }
    }
  }

  return Array.from(origins);
}

const nextConfig: NextConfig = {
  allowedDevOrigins: getLocalNetworkOrigins(),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
