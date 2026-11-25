import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://alfarhaankhan.com/sitemap.xml",
    host: "https://alfarhaankhan.com",
  };
}
