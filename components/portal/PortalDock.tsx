"use client";

import Link from "next/link";
import { Bell, Home, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type DockItem = {
  label: string;
  icon: LucideIcon;
  href: string;
  active?: boolean;
};

const items: DockItem[] = [
  { label: "Inicio", icon: Home, href: "/", active: true },
  { label: "Nosotros", icon: ShoppingBag, href: "/nosotros" },
  { label: "Contacto", icon: Bell, href: "/contacto" },
];

export function PortalDock() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-[min(calc(100%-3rem),720px)]">
      <nav className="glass-panel rounded-full flex items-center justify-around px-6 py-3 gold-glow">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "group flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all",
              item.active && "bg-primary/10",
            )}
          >
            <item.icon
              className={cn(
                "size-5 transition-all",
                item.active
                  ? "text-primary-fixed-dim"
                  : "text-on-surface-variant/60 group-hover:text-primary-fixed-dim group-hover:scale-110",
              )}
              strokeWidth={1.5}
            />
            <span
              className={cn(
                "font-sans text-[10px] uppercase tracking-[0.15em] transition-colors",
                item.active
                  ? "text-primary-fixed-dim"
                  : "text-on-surface-variant/60 group-hover:text-primary-fixed-dim",
              )}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
