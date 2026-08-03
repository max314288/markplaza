# Napkin Runbook

## Curation Rules
- Re-prioritize on every read.
- Keep recurring, high-value notes only.
- Max 10 items per category.
- Each item includes date + "Do instead".

## Execution & Validation (Highest Priority)
1. **[2026-05-11] Tailwind v4: config lives in CSS, not JS**
   Do instead: edit `app/globals.css` `@theme inline { … }` for color/font/radius tokens. Do NOT create `tailwind.config.ts` — it is ignored.
2. **[2026-05-11] Motion 12, not framer-motion**
   Do instead: `import * as motion from "motion/react-client"` for elements; `import { useReducedMotion } from "motion/react"` for hooks. Never import from `framer-motion`.
3. **[2026-05-11] Next.js 16 App Router, React 19**
   Do instead: server components by default; add `"use client"` only when state/effects/event handlers are needed. Validate types with `npm run build`.
4. **[2026-05-11] Dark mode is the only mode**
   Do instead: `<html class="dark">` is set in `app/layout.tsx`. Never write a light-mode variant; never gate on `prefers-color-scheme`.

## Shell & Command Reliability
1. **[2026-05-11] Bash tool resets cwd after each call**
   Do instead: prefix every command with `cd L:/Workspace/markplaza && …` or use absolute paths. Don't rely on chained `cd` from a previous Bash call.
2. **[2026-05-11] PowerShell is the host shell**
   Do instead: use `$null` not `/dev/null`, `$env:VAR` not `$VAR`, backtick for line continuation. Bash tool is available for POSIX scripts.
3. **[2026-05-11] No test suite — `npm run build` is the validator**
   Do instead: run `npm run build` for type+compile validation; `npm run lint` for ESLint. Never claim "tests pass" — there are none.

## Domain Behavior Guardrails
1. **[2026-05-11] Use design tokens by name, never raw hex**
   Do instead: `bg-surface`, `text-primary-fixed-dim`, `border-outline-variant`. Tokens defined in `app/globals.css`. Raw hex breaks the theme.
2. **[2026-05-11] Reusable utilities live in `globals.css @layer utilities`**
   Do instead: prefer `.glass-panel`, `.glass-panel-soft`, `.gold-glow`, `.gold-text-glow`, `.input-glass`, `.gold-divider`, `.animate-float` before writing new CSS.
3. **[2026-05-11] Two layout patterns — never mix**
   Do instead: `/` is Portal (fullscreen, no SiteHeader/SiteFooter). `/nosotros`, `/contacto` use SiteHeader+SiteFooter. `/login` is standalone. Pick one per route.
4. **[2026-05-11] A11y conventions are non-negotiable**
   Do instead: focus rings `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed-dim/70`; decorative icons `aria-hidden="true"`; icon-only buttons need `aria-label`; transform hovers prefixed `motion-safe:`.
5. **[2026-05-11] Never use `transition-all`**
   Do instead: list properties explicitly, e.g. `transition-[color,transform]`. Prevents accidental transitions on layout properties.
6. **[2026-05-11] Use `FadeIn` for scroll-triggered motion**
   Do instead: wrap reveals in `components/motion/FadeIn.tsx` — it already handles `useReducedMotion()`. Don't write raw motion components for fade-ins.
7. **[2026-05-11] Path alias `@/*` resolves to repo root**
   Do instead: `import { cn } from "@/lib/utils"`. Never use deep relative paths like `../../../lib/utils`.

## User Directives
1. **[2026-05-11] Home `/` is redesigned around PlazaMarks v3 marketplaces**
   Do instead: hero shows Amazon Store / eBay / Mercado Libre as interactive shops + glowing signs + explicit "Visitar →" CTA pill. Links open external URLs in new tab.
2. **[2026-05-11] Marketplaces are visual + external-link only**
   Do instead: no API, no product catalog, no auth — just `<a target="_blank" rel="noopener noreferrer">` to amazon.com / ebay.com / mercadolibre.com.
3. **[2026-05-11] Keep Emerald Velvet (verde + champagne dorado) — never indigo**
   Do instead: even when adapting Stitch designs with other accents (e.g. `#4b2bee`), translate them to existing tokens. Identity stays green+gold.
4. **[2026-05-11] Hybrid hero: PNG background + SVG/HTML overlay**
   Do instead: scenery (city, street, cars, pedestrians) goes as a PNG in `public/images/`; interactive shops + signs + CTAs go as SVG/HTML on top so they're clickable, focusable, and scale cleanly.
