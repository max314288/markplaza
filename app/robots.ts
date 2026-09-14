import type { MetadataRoute } from "next";

// Export estático: obligatorio con `output: "export"`.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/login" },
    ],
    sitemap: "https://savemarks.com/sitemap.xml",
  };
}
