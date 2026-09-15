# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # dev server on http://localhost:3000
npm run build    # production build (also runs type checking)
npm run lint     # ESLint (next/core-web-vitals + next/typescript)
```

There is no test suite. Type errors surface through `npm run build` or the TypeScript language server.

## Stack versions — read before writing code

| Package | Version | Notes |
|---|---|---|
| Next.js | **16** | App Router. APIs may differ from training data — check `node_modules/next/dist/docs/` |
| React | **19** | |
| Tailwind CSS | **4** | Config via CSS `@theme`, not `tailwind.config.js` |
| Motion | **12** | Replaces framer-motion |

## Architecture

### Routing

App Router: `/` (portal), `/nosotros`, `/contacto`, `/login`, `/tiendas`, `/tiendas/[slug]`,
`/libro-de-reclamaciones`. `SHOPS`/`MARKETS` (`lib/plaza/shops.ts`) are the single source of shop
data — `/`, `/tiendas`, and `/tiendas/[slug]` (`generateStaticParams`) all read from it.

### Deploy — static export

`next.config.ts` sets `output: "export"` + `trailingSlash: true` + `images.unoptimized`: the site is
hosted on GoDaddy shared hosting (Apache, no Node). `npm run build` writes `out/`, whose contents go
into `public_html`. Consequences:
- No Server Actions, route handlers with dynamic logic, `proxy`, ISR, or cookies/headers at request time.
- `next/image` does **not** optimize — compress assets before putting them in `public/` (WebP for big images).
- `public/.htaccess` is copied to `out/` (404 page, caching).
- Asset filenames are lowercase kebab-case: Apache on Linux is case-sensitive, Windows is not.
- `postbuild` runs `scripts/fix-export-windows.mjs` automatically after every `npm run build`. On
  Windows, Next 16's exporter writes each route's RSC prefetch segments into a subfolder instead of
  flattening the path into the filename (`__next.login/__PAGE__.txt` instead of
  `__next.login.__PAGE__.txt`), which 404s at runtime. The script flattens them; it's a no-op on
  Linux/macOS. Always test `out/` served statically (not just `npm run dev`) after touching routing.
- No backend: `/login` and the `/contacto` form (`InquiryForm`) call `e.preventDefault()` and submit
  nothing. `/libro-de-reclamaciones` (`ComplaintBook`) fakes submission by building a `mailto:` link
  client-side — not a legally compliant Libro de Reclamaciones (no correlativo), just a stopgap.

Three layout patterns exist — do not mix them:
- **Portal layout** (`/`): fullscreen illustrated day scene, light palette, no SiteHeader/SiteFooter. See "Plaza scene" below.
- **Standard layout** (`/nosotros`, `/contacto`, `/tiendas`, `/tiendas/[slug]`): `SiteHeader` + `SiteFooter`, dark Emerald Velvet, max-w-[1440px] centered content.
- **Standalone layout** (`/login`): no shared nav, self-contained page with its own footer.

The root `app/layout.tsx` wraps children in `<main id="main-content">` — the skip link in `SiteHeader` targets this id.

### Plaza scene — the `/` portal

The home page reproduces `docs/disegnefront/ORIGINAL.png` (1376×768 hand-drawn street) by
compositing the layered PNGs in `public/escena/` over the clean background plate `fondo-plaza.webp`
(lossless source: `docs/disegnefront/fondo-plaza-original.png`).

- **Design canvas is 1376×768.** Every measurement in `lib/plaza/manifest.ts` and `app/plaza.css`
  is in px of that canvas. `--px` (defined on `.plaza-frame`, in `cqw`) equals exactly 1 canvas px,
  so measurements taken off the reference image go into the code literally:
  `font-size: calc(89 * var(--px))`.
- **Sprites are trim-aware.** Each PNG has transparent padding. `Sprite.box` is where the *drawing*
  must land; `Sprite.trim` is where the drawing sits inside the PNG. `frame()` combines both.
  Positioning a raw PNG at `box` renders it too small and offset.
- **Layer order** (`PlazaScene.tsx`): background → pole signs → shops (facade + plate + text) →
  props → `PlazaAmbience` (cars, walkers) → sign hotspots. The pole signs are clipped with
  `clip-path: inset(...)`, never with `height` + `overflow` — a shorter layer would rebase the
  `top:%` of every sprite inside it.
- **Shop nameplate PNGs are blank**; the label is real DOM text on top.
- **Hit areas** use `clip-path: polygon(...)` on the anchor (it clips hit-testing too, so
  transparent corners don't swallow clicks). `clip-path` also clips `outline`/`box-shadow`, so the
  focus ring lives on a separate unclipped `<span>` driven by `group-has-[a:focus-visible]:`.
- The light palette is scoped by `html:has(#plaza-dia)` in `globals.css`, written **outside any
  `@layer`** — the existing `html {}` / `body {}` rules are unlayered and would otherwise win.
- If the H1 or subtitle copy changes, re-measure its width: the title is sized to occupy the same
  946 px band as the reference.

### Design system — Emerald Velvet

All color tokens are defined in `app/globals.css` under `@theme inline`. Do not use raw hex values — use the token names (`surface`, `primary-fixed-dim`, `tertiary`, etc.). The palette is dark green surfaces + champagne/gold accents.

Reusable CSS utilities (also in `globals.css`, under `@layer utilities`):

| Class | Purpose |
|---|---|
| `.glass-panel` | Heavy frosted glass card (blur 40px, gold border) |
| `.glass-panel-soft` | Lighter glass variant |
| `.gold-glow` | Box shadow glow + hover lift; lists explicit properties (not `transition: all`) and gates the lift under `prefers-reduced-motion: no-preference`, so it's safe to combine with `transition-*` Tailwind classes |
| `.gold-text-glow` | Text glow for hero headings |
| `.input-glass` | Input background + focus border (already handles `outline: none` internally) |
| `.gold-divider` | 1px gradient horizontal rule |
| `.animate-float` | Gentle float animation; CSS already includes `prefers-reduced-motion: reduce` guard |

### Typography

Two fonts loaded in `layout.tsx` via `next/font/google`:
- `--font-serif` → Noto Serif (headings, body copy)
- `--font-sans` → Manrope (labels, UI text, uppercase tracking)

Apply via Tailwind: `font-serif` / `font-sans`.

### Motion

Import **components** (motion elements) from `"motion/react-client"`:
```tsx
import * as motion from "motion/react-client";
```

Import **hooks** from `"motion/react"`:
```tsx
import { useReducedMotion } from "motion/react";
```

`FadeIn` (`components/motion/FadeIn.tsx`) uses `useReducedMotion()` to disable y-movement and set duration to 0 when the user prefers reduced motion. Always wrap scroll-triggered animations in `FadeIn` rather than writing raw motion components.

### Shared UI primitives

- `Button` — polymorphic via `as` prop, three variants: `primary | ghost | outline`
- `Field` — uses `useId()` to auto-link `<label htmlFor>` to its child input via `cloneElement`; always wrap inputs in `Field` when a visible label is needed
- `Input`, `Textarea`, `Select` — receive `id` injected by `Field`; pass `name` and `autoComplete` at the call site

### Path alias

`@/*` resolves to the repo root. Example: `import { cn } from "@/lib/utils"`.

### Accessibility conventions

- Decorative icons: `aria-hidden="true"` on the Lucide icon component
- Icon-only interactive elements: `aria-label` on the button/link
- Focus styles: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed-dim/70` — never `outline-none` without a replacement. On the plaza scene the ring is `ring-plaza-ink-strong` sized in `--px`.
- Scale/transform hover animations: prefix with `motion-safe:` (e.g., `motion-safe:group-hover:scale-110`)
- Avoid `transition-all` — list properties explicitly (e.g., `transition-[color,transform]`)
