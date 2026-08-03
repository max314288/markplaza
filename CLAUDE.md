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

App Router with four routes: `/` (portal), `/nosotros`, `/contacto`, `/login`.

Two layout patterns exist — do not mix them:
- **Portal layout** (`/`): fullscreen immersive, no SiteHeader/SiteFooter, uses `MarketplaceScene` (SVG hero con Amazon Store / eBay / Mercado Libre) + `PortalDock`.
- **Standard layout** (`/nosotros`, `/contacto`): `SiteHeader` + `<main>` + `SiteFooter`, max-w-[1440px] centered content.
- **Standalone layout** (`/login`): no shared nav, self-contained page with its own footer.

The root `app/layout.tsx` wraps children in `<main id="main-content">` — the skip link in `SiteHeader` targets this id.

### Design system — Emerald Velvet

All color tokens are defined in `app/globals.css` under `@theme inline`. Do not use raw hex values — use the token names (`surface`, `primary-fixed-dim`, `tertiary`, etc.). The palette is dark green surfaces + champagne/gold accents.

Reusable CSS utilities (also in `globals.css`, under `@layer utilities`):

| Class | Purpose |
|---|---|
| `.glass-panel` | Heavy frosted glass card (blur 40px, gold border) |
| `.glass-panel-soft` | Lighter glass variant |
| `.gold-glow` | Box shadow glow + hover lift — avoid on elements that also have `transition-*` Tailwind classes |
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
- Focus styles: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed-dim/70` — never `outline-none` without a replacement
- Scale/transform hover animations: prefix with `motion-safe:` (e.g., `motion-safe:group-hover:scale-110`)
- Avoid `transition-all` — list properties explicitly (e.g., `transition-[color,transform]`)
