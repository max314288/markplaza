import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FadeIn } from "@/components/motion/FadeIn";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Divider } from "@/components/ui/Divider";
import { SHOPS } from "@/lib/plaza/shops";

export const metadata: Metadata = {
  title: "Tiendas · El Distrito",
  description:
    "El registro de locales del distrito MarkPlaza: ferretería, boutique, estampados, juguetería y librería.",
};

export default function TiendasPage() {
  return (
    <div className="min-h-screen bg-surface-container-lowest relative overflow-hidden">
      <SiteHeader />

      {/* Encabezado a la vista sin scroll: sin `FadeIn` para no dejarlo en
          blanco durante el primer render (sí se anima la grilla de abajo). */}
      <div className="relative z-10 pt-36 pb-24 max-w-[1440px] mx-auto px-6 md:px-10">
        <div>
          <span className="font-sans text-[11px] font-bold text-primary-fixed-dim uppercase tracking-[0.4em] mb-6 block">
            Directorio
          </span>
          <h1 className="font-serif italic text-on-surface text-4xl md:text-5xl leading-tight font-semibold max-w-3xl">
            Los locales del distrito.
          </h1>
          <p className="font-serif text-on-surface-variant text-[17px] leading-relaxed mt-6 max-w-2xl">
            Cinco fachadas, cinco oficios. Cada local abre con sus propias
            proporciones y su propia luz.
          </p>
          <Divider className="mt-12 opacity-60" />
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SHOPS.map((shop, i) => (
            <FadeIn as="li" key={shop.slug} delay={i * 0.06}>
              <GlassPanel className="h-full p-8">
                <Link
                  href={`/tiendas/${shop.slug}`}
                  className="group flex h-full flex-col gap-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed-dim/70"
                >
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-primary-fixed-dim/70">
                    {shop.slug}
                  </span>
                  <span className="font-serif text-2xl text-on-surface transition-colors group-hover:text-primary-fixed-dim">
                    {shop.label}
                  </span>
                  <span className="font-serif text-[15px] leading-relaxed text-on-surface-variant/80">
                    {shop.tagline}
                  </span>
                  <span className="mt-auto flex items-center gap-2 pt-4 font-sans text-[10px] uppercase tracking-[0.25em] text-primary-fixed-dim">
                    Entrar
                    <ArrowUpRight
                      className="size-3 transition-transform motion-safe:group-hover:translate-x-0.5"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </GlassPanel>
            </FadeIn>
          ))}
        </ul>
      </div>

      <SiteFooter />
    </div>
  );
}
