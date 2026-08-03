import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { VisionHero } from "@/components/vision/VisionHero";
import { VisionShowcase } from "@/components/vision/VisionShowcase";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Nosotros · El Portal",
  description:
    "MarkPlaza redefine la experiencia de compra en línea. Conoce nuestra esencia y descubre un portal de compras exclusivo.",
};

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-surface-container-lowest relative overflow-hidden">
      {/* Halos ambientales sutiles */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(149,211,186,0.06) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(229,211,178,0.05) 0%, transparent 40%)",
        }}
      />

      <SiteHeader />

      <main className="relative z-10 pt-36 pb-20 max-w-[1440px] mx-auto px-6 md:px-10">
        {/* Hero principal */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[70vh]">
          <FadeIn className="lg:col-span-5">
            <VisionHero />
          </FadeIn>
          <FadeIn className="lg:col-span-7" delay={0.15}>
            <VisionShowcase />
          </FadeIn>
        </section>

        {/* Sección Visión (manifiesto extendido) */}
        <section
          id="vision"
          className="mt-40 max-w-3xl mx-auto text-center scroll-mt-32"
        >
          <FadeIn>
            <span className="font-sans text-[11px] font-bold text-primary-fixed-dim uppercase tracking-[0.4em] mb-6 block">
              Manifiesto
            </span>
            <h2 className="font-serif italic text-on-surface text-3xl md:text-4xl leading-tight mb-8 font-semibold">
              Cada local del distrito es una obra de arquitectura, no un
              listado.
            </h2>
            <p className="font-serif text-on-surface-variant text-[17px] leading-relaxed">
              Construimos MarkPlaza para los visitantes que quieren caminar por
              un mercado, no escanear una grilla. Cada tienda diseñada con sus
              propias proporciones, su propia luz, su propia voz. El comercio
              recupera su ritual.
            </p>
          </FadeIn>
        </section>

        {/* Sección Archivos (placeholder) */}
        <section
          id="archivos"
          className="mt-40 max-w-3xl mx-auto text-center scroll-mt-32"
        >
          <FadeIn>
            <span className="font-sans text-[11px] font-bold text-primary-fixed-dim uppercase tracking-[0.4em] mb-6 block">
              Archivos
            </span>
            <h2 className="font-serif italic text-on-surface text-3xl md:text-4xl leading-tight mb-8 font-semibold">
              El registro de obras del distrito.
            </h2>
            <p className="font-serif text-on-surface-variant text-[17px] leading-relaxed mb-10">
              Colecciones, ediciones limitadas y memoria del MarkPlaza. Próximamente.
            </p>
            <div className="gold-divider w-24 mx-auto opacity-50" />
          </FadeIn>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
