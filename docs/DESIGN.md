# Design System: MarkPlaza — Emerald Velvet (PlazaMarks v3 adaptation)

This document codifies the dark-mode design language for MarkPlaza, adapted from the
Stitch project **PlazaMarks v3** (`projects/7976895084811266934`). It exists to keep
future Stitch generations and human-written components aligned with one curated taste.

The home (`/`) is a **fullscreen marketplace plaza** — a stylized nocturnal street with
three storefronts (Amazon Store, eBay, Mercado Libre), glowing signs, and external links.
Other routes (`/nosotros`, `/contacto`, `/login`) use the same tokens but a calmer,
editorial standard layout.

---

## 1. Visual Theme & Atmosphere

**Density 4 / Variance 6 / Motion 5** — Daily-App Balanced, Offset Asymmetric, Fluid CSS.

A nocturnal commercial district seen from across the street. The atmosphere is warm-dark:
deep emerald surfaces lit by champagne signage that glows like aged brass. Storefronts
sit on a soft gradient horizon between forest-green and the faintest dawn. The plaza
should feel curated, unhurried, *premium* — never a flat dashboard, never a hype-y
neon arcade.

Hierarchy is built through **light, not borders**. Active elements are the brightest;
ambient ones recede into the green. Asymmetry is welcome (storefronts vary in width,
the search bar floats high, the dock anchors low) but every element gets clean space.

---

## 2. Color Palette & Roles

All tokens live in `app/globals.css` under `@theme inline`. Never write raw hex in
components — always reference the token (`bg-surface`, `text-primary-fixed-dim`).

| Token | Hex | Role |
|---|---|---|
| `surface-container-lowest` | `#00110c` | Page base — the night sky / asphalt |
| `surface` | `#06120b` | Default block background |
| `surface-container` | `#081c11` | Mid-tier panels (search bar, dock) |
| `surface-container-high` | `#0d2117` | Hover/active panels |
| `surface-bright` | `#1a3a2a` | Storefront facades, "lit" tiles |
| `on-background` | `#c2ebdc` | Primary text on dark canvas |
| `on-surface` | `#e1e8e4` | Strong text inside panels |
| `on-surface-variant` | `#b8c7be` | Secondary / metadata text |
| `primary-fixed-dim` | `#d4c19d` | **Champagne accent** — signs, focus rings, CTA glow |
| `primary` / `primary-fixed` | `#e5d3b2` | Active text on accent, hover-bright variant |
| `tertiary` | `#95d3ba` | Secondary mint accent (visión, success) |
| `outline-variant` | `#4d4635` | Ultra-subtle 1px structural lines |

**Hard rules:**
- The Emerald Velvet identity is verde + champagne. **Never** introduce indigo / blue /
  neon purple, even when adapting Stitch designs that use them.
- Pure black is banned. Lowest surface is `#00110c`.
- Saturation stays below 80%. The single saturated accent is `primary-fixed-dim` /
  `primary-fixed`. Mint `tertiary` is a supporting, low-saturation hue — not a second
  brand color.

---

## 3. Typography Rules

Loaded via `next/font/google` in `app/layout.tsx`:

- **Headlines & body editorial:** `Noto Serif` (`--font-serif`). Track default,
  weight 500–700 for headlines, 400 for long-form copy. Used for storefront names,
  page titles, hero phrases.
- **UI, labels, navigation:** `Manrope` (`--font-sans`). Uppercase tracking
  `0.15em–0.25em` at 9–11px for chrome labels (dock items, CTA pills, search input).
- **No monospace** in this product — there are no code samples or dashboard numbers.

**Hard rules:**
- Never introduce a third font family. Plus Jakarta Sans (the Stitch v3 default) is
  **not** used here.
- Use `font-serif` / `font-sans` Tailwind utilities. Never inline `font-family`.
- Headlines on dark backgrounds may use `.gold-text-glow` (text-shadow champagne) for
  hero impact — keep it for top-of-page only, never on body copy.
- Body line-height stays generous (`leading-relaxed` or higher). Max measure ~65ch.

---

## 4. Component Stylings

### Buttons (`components/ui/Button.tsx`)
Three variants — `primary | ghost | outline`. Tactile, no neon glow.

- **Primary:** `bg-primary-fixed-dim text-on-primary` with `.gold-glow` for ambient
  shadow. Hover: shadow expands to 35px; `translateY(-1px)`. Active: returns to baseline.
- **Ghost:** transparent background, champagne text, hover deepens to `surface-container-high`.
- **Outline:** `border-outline-variant text-on-surface`. Focus ring follows the global
  convention.

Banned: drop-shadow gradients, scaling beyond 1.02, sparkle / blur-radial effects.

### Storefront CTAs (home `/` only)
Each storefront in `MarketplaceScene` is a single focusable `<a>` containing:

1. The **SVG facade** (awning, door, vidriera) — strokes in `currentColor` so they tint
   with the active state.
2. The **glowing sign** above the facade — `<text>` with `fill="#d4c19d"` and
   `filter` driving a champagne `drop-shadow` whose blur radius doubles on hover.
3. A **glass pill CTA** ("Visitar →") absolutely positioned over the entrance —
   reuses `.glass-panel` + `.gold-glow`, Manrope 10px uppercase `tracking-[0.25em]`,
   champagne text. Always visible at idle; shadow intensifies on `group-hover`.

States:
- **Idle:** sign at 55% champagne, pill in low-glow.
- **Hover / focus-within:** sign brightens to 100%, pill upgrades to gold-glow hover
  shadow, whole `<a>` lifts `translateY(-2px)`.
- **Focus-visible:** outline ring `ring-2 ring-primary-fixed-dim/70 rounded-2xl`.
- **External link:** `target="_blank" rel="noopener noreferrer"`; aria-label says
  "Visitar {Marketplace} (se abre en una pestaña nueva)".

### Cards / Glass Panels
Reuse `.glass-panel` (heavy frost) and `.glass-panel-soft` (lighter) from
`app/globals.css`. Glass is used for the search bar, dock, CTA pills, and any modal —
nothing else needs elevation.

### Inputs (`components/ui/Input.tsx`)
Apply `.input-glass`. Label above (`Field` wrapper), error text below. Focus ring is
handled inside the utility — never write `outline: none` without a replacement.

### Loading & Empty States
No spinners. Skeleton blocks reuse `surface-container` to `surface-container-high`
gradient with a slow shimmer (3s, ease-in-out). Empty states are illustrated panels with
copy and a single CTA, never a "No data found" stub.

---

## 5. Layout Principles

- Home `/` is **fullscreen immersive** — no SiteHeader / SiteFooter. The viewport itself
  is the canvas; the dock anchors at the bottom; the search bar floats at the top; the
  marketplace scene fills the middle.
- Other routes use a **standard editorial layout**: SiteHeader + `<main>` + SiteFooter,
  content centered at `max-w-[1440px]`, generous vertical padding (`py-24` desktop,
  `py-12` mobile).
- Use **CSS Grid** for any 2D arrangement. Never `flex` with `calc()` percentage hacks.
- Full-height blocks always `min-h-[100dvh]`, never `h-screen` (iOS Safari jump).
- Hero is **asymmetric** — the storefront row is left-anchored on the SVG canvas, the
  CTA pills offset horizontally so no two land on the same vertical axis. Centered hero
  blocks are banned on `/`.

---

## 6. Motion & Interaction

- Use **Motion 12** (`motion/react-client` for elements, `motion/react` for hooks). Never
  import `framer-motion`.
- Scroll-triggered reveals: wrap in `<FadeIn>` (already handles `useReducedMotion`).
- Storefronts get a perpetual gentle **float** (`.animate-float` already respects
  `prefers-reduced-motion`). Letters on signs do not float.
- Hover transitions: list properties explicitly (`transition-[color,transform,box-shadow]`).
  `transition-all` is banned — it animates layout properties and tanks paint perf.
- Transform-based hovers (scale, translate) are prefixed `motion-safe:`.
- Animate via `transform` / `opacity` only. Never animate `top`, `left`, `width`,
  `height`, `filter` on hover (use class swaps for drop-shadow instead).

---

## 7. Anti-Patterns (Banned)

- **No emojis** in UI text. Spanish typography only.
- **No Inter, Plus Jakarta, Times New Roman, Georgia, Garamond, Palatino.** Project
  uses Noto Serif + Manrope, both already loaded.
- **No pure black (`#000000`).** Lowest surface is `#00110c`.
- **No indigo / neon purple / cyan glow.** The Emerald Velvet identity is verde +
  champagne. Adapting Stitch designs ≠ adopting their accent.
- **No outer-neon glows / radial-gradient halos** behind buttons.
- **No emoji-style success / error icons.** Use Lucide React, currentColor tint.
- **No centered hero on `/`** — variance ≥ 5 demands asymmetric anchoring.
- **No 3-equal-card feature rows.** If three things must be shown, vary widths,
  stagger vertical alignment, or use a zig-zag.
- **No `transition-all`, no `h-screen`, no `flex calc()` hacks.**
- **No "Scroll to explore" hints, bouncing chevrons, "swipe down" arrows.** The plaza
  pulls users in by composition.
- **No fake round numbers** (`99.99%`, `1.000+ tiendas`). If a metric appears, it must
  be real or visibly stylized as illustrative.
- **No placeholder names** ("Acme", "John Doe"). Use real marketplace names and real
  Spanish microcopy.
- **No broken external imagery.** Background art for the home lives in
  `public/images/marketplaces-bg.png` (committed). Avatars / placeholders use
  `picsum.photos` or inline SVG.
- **No `framer-motion` imports.** Motion 12 only.
- **No raw hex in components.** Always tokenized.
- **No `outline-none` without a replacement focus ring.**

---

## 8. Hero Pattern: "Plaza Hybrid"

Signature pattern of this product — codified so Stitch (or any future generator) can
reproduce it consistently.

**Layers, back to front:**

1. **Background PNG** — `public/images/marketplaces-bg.png`. Night-time city silhouette
   in `surface` to `surface-container-lowest`, soft champagne dawn at the horizon,
   sidewalk + street in the lower third with two stylized silhouetted cars and two
   pedestrian silhouettes. Three empty storefront "shells" sit in the middle band so
   the SVG layer above can overlay clean facades.
2. **Gradient veil** — `bg-gradient-to-b from-surface/30 via-transparent to-surface/85`,
   `absolute inset-0`. Smooths the PNG into chrome.
3. **Interactive SVG** — `<svg viewBox="0 0 2880 1620" preserveAspectRatio="xMidYMid slice">`,
   `absolute inset-0`. Holds three `<a>` groups (one per marketplace). Each contains
   the facade + sign.
4. **HTML CTA layer** — three glass pills positioned absolutely (`%` units) over each
   storefront entrance. HTML, not SVG, so type rendering stays crisp at all sizes.
5. **Chrome** — floating search bar at top, dock at bottom (`PortalDock`).

**Why hybrid:** SVG gives interactive precision (focus, click, hover, accessibility);
PNG carries the rasterized warmth and texture of a hand-drawn illustration that would
be tedious to reproduce in path data.

**Responsive behavior:** below `md` (768px), the SVG and CTA pills scale uniformly via
viewBox + percentage positioning. The search bar shrinks to `calc(100%-2rem)`; the dock
docks to `bottom-4`. No horizontal scroll, ever.

---

## 9. Accessibility Floor

Non-negotiables for every component:

- Focus ring: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed-dim/70`.
- Decorative icons: `aria-hidden="true"`.
- Icon-only buttons / links: `aria-label="…"`.
- External links: `target="_blank" rel="noopener noreferrer"` + aria-label suffix
  "(se abre en una pestaña nueva)".
- Animations honor `prefers-reduced-motion: reduce` — use `motion-safe:` prefix or
  `useReducedMotion()`.
- Color contrast: text on `surface` ≥ 4.5:1 (`on-background` passes); CTA pill text on
  glass-panel ≥ 4.5:1 (`primary-fixed-dim` on glass passes — verified).
- All marketplace links are keyboard-reachable in a logical Tab order:
  Search → Login → Amazon → eBay → Mercado Libre → Dock items.
