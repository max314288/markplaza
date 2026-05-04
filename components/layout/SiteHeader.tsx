"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Inicio", href: "/" as const },
  { label: "Nosotros", href: "/nosotros" as const },
  { label: "Archivos", href: "/nosotros#archivos" as const },
  { label: "Visión", href: "/nosotros#vision" as const },
  { label: "Contacto", href: "/contacto" as const },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-[1440px]">
      <div className="glass-panel rounded-2xl flex items-center justify-between h-20 px-8 md:px-12">
        <Link
          href="/"
          className="font-serif italic text-2xl text-primary-fixed-dim tracking-tighter hover:text-primary transition-colors"
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
                  "font-sans text-[10px] font-semibold uppercase tracking-[0.25em] transition-all",
                  isActive
                    ? "text-primary-fixed-dim border-b border-primary-fixed-dim pb-1"
                    : "text-on-surface-variant/80 hover:text-primary-fixed-dim",
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
            className="text-primary-fixed-dim hover:scale-110 transition-transform"
          >
            <User className="size-5" strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            aria-label="Bolsa de compras"
            className="text-primary-fixed-dim hover:scale-110 transition-transform"
          >
            <ShoppingBag className="size-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  );
}
