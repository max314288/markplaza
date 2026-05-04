# MarkPlaza

> Sitio web para MarkPlaza — un distrito comercial virtual premium.

Construido con **Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Motion · lucide-react**, basado en los diseños del proyecto Stitch _Plaza Marks V2_.

## Páginas v1

| Ruta | Pantalla |
|---|---|
| [`/`](app/page.tsx) | **Inicio** — escena 3D isométrica del distrito al atardecer con barra de búsqueda y dock inferior. |
| [`/login`](app/login/page.tsx) | **Acceso al portal** — card glass flotante con form de identidad. |
| [`/nosotros`](app/nosotros/page.tsx) | **Visión** — manifiesto del distrito + secciones `#vision` y `#archivos`. |
| [`/contacto`](app/contacto/page.tsx) | **Concierge** — formulario de consulta + canales directos + mapa. |

## Cómo arrancar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev     # Dev server con Turbopack
npm run build   # Build de producción
npm start       # Servir el build
npm run lint    # ESLint
```

## Estructura

```
app/                # App Router (4 rutas)
components/
  layout/           # SiteHeader, SiteFooter
  ui/               # GlassPanel, Button, Input, Divider (primitivos)
  motion/           # FadeIn, Float (wrappers Motion)
  portal/           # Inicio: PortalScene, PortalDock
  login/            # LoginCard
  vision/           # VisionHero, VisionShowcase
  contacto/         # InquiryForm, DirectChannels, MapWidget
lib/utils.ts        # cn()
public/images/      # Assets (descargados de Stitch)
docs/
  design-tokens.md  # Mapa de tokens Emerald Velvet
  references/       # Screenshots de referencia (no se sirven)
```

## Design system

Paleta única **Emerald Velvet** (`#06120b` + champagne `#e5d3b2`). Tokens en [app/globals.css](app/globals.css). Detalles y convenciones en [docs/design-tokens.md](docs/design-tokens.md).

## Imágenes

Todas las imágenes son locales en `public/images/`:

- `portal-distrito.png` — escena 3D del Inicio
- `login-bg-distrito.jpg` — fondo cinematográfico (Login y Contacto)
- `vision-boutique.jpg` — boutique 3D del hero de Nosotros
- `mapa-distrito.jpg` — mapa estilizado en Contacto

Sustituir cualquier archivo por una versión propia con el mismo nombre no requiere cambios de código.

## Sin backend

v1 es estrictamente presentacional: los formularios de Login y Contacto hacen `e.preventDefault()` y no envían datos. No hay catálogo de tiendas, carrito, autenticación ni base de datos.
