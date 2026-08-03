"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Distrito", href: "/" as const },
  { label: "Nosotros", href: "/nosotros" as const },
  { label: "Contacto", href: "/contacto" as const },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed-dim/70 focus-visible:rounded";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-primary-fixed-dim focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none"
      >
        Saltar al contenido
      </a>

      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-[1440px]">
        <div className="glass-panel rounded-2xl flex items-center justify-between h-20 px-8 md:px-12">
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
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href.split("#")[0];
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "font-sans text-[10px] font-semibold uppercase tracking-[0.25em] transition-colors",
                    isActive
                      ? "text-primary-fixed-dim border-b border-primary-fixed-dim pb-1"
                      : "text-on-surface-variant/80 hover:text-primary-fixed-dim",
                    focusRing,
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-5">
            <Link
              href="/login"
              aria-label="Acceso al portal"
              className={cn(
                "text-primary-fixed-dim hover:scale-110 transition-transform",
                focusRing,
              )}
            >
              <User className="size-5" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
