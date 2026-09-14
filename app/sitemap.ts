import type { MetadataRoute } from "next";
import { SHOPS } from "@/lib/plaza/shops";

// Export estático: obligatorio con `output: "export"`.
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://savemarks.com";
  const staticRoutes = ["", "/tiendas", "/nosotros", "/contacto", "/libro-de-reclamaciones"];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })),
    ...SHOPS.map((shop) => ({
      url: `${base}/tiendas/${shop.slug}`,
      lastModified: new Date(),
    })),
  ];
}
