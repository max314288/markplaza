# MarkPlaza · Design tokens (Emerald Velvet)

Paleta única, portada del proyecto Stitch **Plaza Marks V2** (`projects/3197217780565975981`). Todos los tokens viven en [app/globals.css](../app/globals.css) bajo `@theme inline`, y Tailwind v4 los expone automáticamente como utilidades (`bg-primary`, `text-on-surface`, etc.).

## Paleta

| Token | Valor | Uso típico |
|---|---|---|
| `--color-background` | `#001711` | Fondo HTML base |
| `--color-surface-container-lowest` | `#00110c` | Fondo de página por defecto |
| `--color-surface` | `#06120b` | Tarjetas y secciones |
| `--color-surface-container` | `#081c11` | Glass-panels |
| `--color-surface-container-high` | `#0d2117` | Iconos en píldora (DirectChannels) |
| `--color-on-background` | `#c2ebdc` | Texto cuerpo |
| `--color-on-surface` | `#e1e8e4` | Títulos |
| `--color-on-surface-variant` | `#b8c7be` | Texto secundario |
| `--color-primary` | `#e5d3b2` | Champagne · acento principal, marca |
| `--color-primary-fixed-dim` | `#d4c19d` | Hovers, links del nav |
| `--color-primary-container` | `#c9b68d` | Gradient inicio del botón primary |
| `--color-on-primary-container` | `#2c2410` | Texto sobre botones primary |
| `--color-tertiary` | `#95d3ba` | Verde accent (resaltes en `/nosotros`) |
| `--color-tertiary-container` | `#064e3b` | Fondo del `::selection` |

> El tema es siempre oscuro: `<html class="dark">` se setea en [app/layout.tsx](../app/layout.tsx). No hay variante clara en v1.

## Tipografía

| Token | Valor |
|---|---|
| `--font-serif` | `Noto Serif` (display, italic en marca) |
| `--font-sans` | `Manrope` (body, labels, nav) |

Cargadas con `next/font/google` y expuestas como variables en [app/layout.tsx](../app/layout.tsx). Se usan vía `font-serif` / `font-sans` (Tailwind v4 mapea `--font-*` a clases automáticamente).

**Convenciones tipográficas portadas de Stitch:**

- Titulares de hero: `font-serif italic text-5xl font-semibold leading-[1.1]`
- Eyebrows / labels: `font-sans text-[10px] font-semibold uppercase tracking-[0.3em]`
- Botones: `font-sans text-[11px] font-semibold uppercase tracking-[0.3em]`
- Body: `font-serif text-[17px] leading-relaxed` en `/nosotros`, `font-sans` en formularios

## Radius

| Token | Valor |
|---|---|
| `--radius-sm` | `0.5rem` |
| `--radius-md` | `0.75rem` |
| `--radius-lg` | `1rem` |
| `--radius-xl` | `1.5rem` |
| `--radius-2xl` | `2rem` |
| `--radius-3xl` | `2.5rem` |

Stitch usa `roundness: ROUND_TWELVE` (12px). En la práctica, los glass-panels usan `rounded-2xl` o `rounded-3xl` y los botones `rounded-xl` (excepto el "Transmitir mensaje" que es `rounded-full`).

## Utilidades CSS reutilizables

Definidas en [app/globals.css](../app/globals.css), `@layer utilities`:

| Clase | Qué hace | Dónde se usa |
|---|---|---|
| `glass-panel` | Backdrop-blur 40px + gradient verde + borde champagne sutil + sombra fuerte | Login card, Header, secciones aside |
| `glass-panel-soft` | Variante con blur 24px y sin sombra | `VisionShowcase` |
| `gold-glow` | Box-shadow champagne suave + lift al hover | Botones primary, dock del Inicio, mapa pin |
| `gold-text-glow` | Text-shadow champagne | Título "Servicios de Concierge" |
| `input-glass` | Input semi-transparente con focus champagne | Inputs y textarea |
| `gold-divider` | Línea horizontal con gradient champagne centrado | Separadores |
| `animate-float` | Animación `transform: translateY` 6s loop | `LoginCard` |

Todas respetan `prefers-reduced-motion` cuando aplica (la animación `float` se desactiva).

## Convenciones de uso

1. **Colores siempre por token**, nunca hex literal en componentes (excepto sombras/gradients muy específicas declaradas en `globals.css`).
2. **Imágenes siempre locales** (`/images/...` desde `public/images/`). Sustituir un asset es un drop-in, no requiere cambios de código.
3. **Componentes de presentación = Server Components**. Solo añadir `"use client"` si necesitas hooks (caso real: `SiteHeader` usa `usePathname`, `LoginCard`/`InquiryForm` tienen `onSubmit` con `e.preventDefault()`).
4. **Iconos**: lucide-react con `strokeWidth={1.5}` para coherencia con la estética minimal de Stitch (no usar `Material Symbols Outlined`).

## Mapeo Stitch → tokens

| Stitch tailwind.config | Token MarkPlaza |
|---|---|
| `surface-container-lowest: #06120b` (Login) → `#00110c` (Visión) | `--color-surface-container-lowest: #00110c` (priorizamos Visión) |
| `primary: #e5d3b2` (Login) → `#95d3ba` (Visión) | `--color-primary: #e5d3b2` champagne (Login gana, es el acento brand); `--color-tertiary: #95d3ba` (verde Visión queda como secundario) |
| `font-headline-xl: Noto Serif 48px` | `font-serif text-5xl font-semibold` (Tailwind clases) |

La pantalla **Concierge** original usaba paleta Volcanic Amber (`#0e0e0e` + `#ff5625` + `#ffdb3c`). Adaptación a Emerald:

| Concierge original | Reemplazo Emerald |
|---|---|
| `bloom-button` (gradient red→yellow) | Variante `primary` del `Button` |
| `amber-glow` (text-shadow rojo) | `gold-text-glow` |
| `molten-glow` (box-shadow rojo) | `gold-glow` |
| Fondo Unsplash ciudad cálida | `/images/login-bg-distrito.jpg` con gradient verde overlay |
