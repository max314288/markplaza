"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Distrito", href: "/" as const },
  { label: "Tiendas", href: "/tiendas" as const },
  { label: "Nosotros", href: "/nosotros" as const },
  { label: "Contacto", href: "/contacto" as const },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed-dim/70 focus-visible:rounded";

export function SiteHeader() {
  // `trailingSlash: true` (export estático) puede dejar `/tiendas/`.
  const pathname = usePathname().replace(/(.)\/$/, "$1");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Cierra el menú al navegar: ajustar estado durante el render (no en un
  // efecto) cuando cambia una prop es el patrón que recomienda React.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    firstLinkRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function isActive(href: (typeof navItems)[number]["href"]) {
    return href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-primary-fixed-dim focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none"
      >
        Saltar al contenido
      </a>

      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-[1440px]">
        <div className="glass-panel rounded-2xl">
          <div className="flex items-center justify-between h-20 px-6 md:px-12">
            <Link
              href="/"
              className={cn(
                "font-serif italic text-2xl text-primary-fixed-dim tracking-tighter hover:text-primary transition-colors",
                focusRing,
              )}
            >
              MarkPlaza
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "font-sans text-[10px] font-semibold uppercase tracking-[0.25em] transition-colors",
                    isActive(item.href)
                      ? "text-primary-fixed-dim border-b border-primary-fixed-dim pb-1"
                      : "text-on-surface-variant/80 hover:text-primary-fixed-dim",
                    focusRing,
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3 md:gap-5">
              <Link
                href="/login"
                aria-label="Acceso al portal"
                className={cn(
                  "text-primary-fixed-dim motion-safe:hover:scale-110 transition-transform",
                  focusRing,
                )}
              >
                <User className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </Link>

              <button
                ref={menuButtonRef}
                type="button"
                aria-expanded={menuOpen}
                aria-controls={menuId}
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                onClick={() => setMenuOpen((v) => !v)}
                className={cn(
                  "md:hidden text-primary-fixed-dim p-1 -mr-1",
                  focusRing,
                )}
              >
                {menuOpen ? (
                  <X className="size-6" strokeWidth={1.5} aria-hidden="true" />
                ) : (
                  <Menu className="size-6" strokeWidth={1.5} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Panel móvil: mismo `navItems` que el header, sin duplicar la lista. */}
          {/*
            `.glass-panel` es translúcida a propósito (20-40% + blur) para una
            barra corta sobre fotos: al crecer con este panel, deja leerse el
            texto de la página debajo. Fondo sólido propio para el desplegable.
          */}
          <nav
            id={menuId}
            hidden={!menuOpen}
            aria-label="Navegación principal"
            className="md:hidden flex flex-col gap-1 px-6 pb-6 pt-2 rounded-b-2xl bg-surface-container-lowest"
          >
            {navItems.map((item, i) => (
              <Link
                key={item.label}
                ref={i === 0 ? firstLinkRef : undefined}
                href={item.href}
                className={cn(
                  "font-sans text-[13px] font-semibold uppercase tracking-[0.2em] py-3 border-b border-primary-fixed-dim/10 last:border-0 transition-colors",
                  isActive(item.href)
                    ? "text-primary-fixed-dim"
                    : "text-on-surface-variant/80 hover:text-primary-fixed-dim",
                  focusRing,
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
