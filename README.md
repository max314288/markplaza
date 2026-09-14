# MarkPlaza

> Sitio web para MarkPlaza — un distrito comercial virtual.

Construido con **Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Motion · lucide-react**. Se publica como **sitio estático** (`output: "export"`).

## Páginas

| Ruta | Pantalla |
|---|---|
| [`/`](app/page.tsx) | **Inicio** — calle ilustrada de día: cinco tiendas clicables y letreros de Amazon, eBay y Mercado Libre (abren en pestaña nueva). |
| [`/tiendas`](app/tiendas/page.tsx) | **Directorio** de las cinco tiendas. |
| [`/tiendas/[slug]`](app/tiendas/[slug]/page.tsx) | **Ficha de tienda** (placeholder "Próximamente"). |
| [`/nosotros`](app/nosotros/page.tsx) | **Visión** — manifiesto del distrito. |
| [`/contacto`](app/contacto/page.tsx) | **Atención al cliente** — formulario, canales directos y mapa. |
| [`/login`](app/login/page.tsx) | **Acceso** — solo visual, sin autenticación. |

## Cómo arrancar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev     # Dev server
npm run build   # Build estático -> carpeta out/
npm run lint    # ESLint
```

## Publicar (GoDaddy / cPanel)

1. `npm run build` → genera `out/`.
2. En cPanel → Administrador de archivos → `public_html`: borrar el contenido anterior.
3. Subir **el contenido** de `out/` (no la carpeta), incluido `.htaccess` (archivo oculto).
4. Cuando el SSL del dominio esté activo, descomentar el bloque "Forzar HTTPS" en `public/.htaccess` y volver a publicar.

## Estructura

```
app/                  # App Router
  plaza.css           # Escena de la portada (medidas en px del lienzo 1376x768)
components/
  plaza/              # Portada: PlazaScene, ShopFront, MarketSign, PlazaAmbience, PlazaHud, Sprite
  layout/             # SiteHeader, SiteFooter
  ui/                 # GlassPanel, Button, Input, Divider
  motion/             # FadeIn, Float
  login/ vision/ contacto/
lib/plaza/            # manifest.ts (posición de cada sprite), shops.ts (tiendas + marketplaces)
public/escena/        # Sprites de la portada (PNG) + fondo-plaza.webp
public/images/        # Fotos de Login, Nosotros y Contacto
docs/
  disegnefront/       # ORIGINAL.png (referencia) + fondo original sin comprimir (no se publican)
  references/         # Capturas de referencia (no se publican)
```

## Imágenes

Nombres en minúsculas con guiones (el servidor Linux distingue mayúsculas). Sin optimizador de imágenes en el hosting: comprimir antes de subir a `public/`. Las rutas de los sprites viven solo en [`lib/plaza/manifest.ts`](lib/plaza/manifest.ts).

## Sin backend

Los formularios de Login y Contacto hacen `e.preventDefault()` y no envían datos. No hay usuarios, base de datos ni catálogo.
