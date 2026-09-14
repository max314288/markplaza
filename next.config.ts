import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hosting compartido (GoDaddy/cPanel): `next build` genera HTML estático en
  // `out/`, que se sube tal cual a `public_html`. No hay servidor Node.
  output: "export",
  // `/tiendas/` -> `tiendas/index.html`: Apache lo sirve sin reglas de rewrite.
  trailingSlash: true,
  images: {
    // Sin servidor no hay optimizador: las imágenes de `public/` se sirven tal
    // cual, así que deben subirse ya comprimidas (el fondo va en WebP).
    unoptimized: true,
  },
};

export default nextConfig;
