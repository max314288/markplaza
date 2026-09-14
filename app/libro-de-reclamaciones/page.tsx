import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FadeIn } from "@/components/motion/FadeIn";
import { ComplaintBook } from "@/components/legal/ComplaintBook";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones",
  description:
    "Hoja de reclamación virtual de MarkPlaza: registra un reclamo o una queja conforme al Código de Protección y Defensa del Consumidor.",
};

export default function LibroDeReclamacionesPage() {
  return (
    <div className="min-h-screen bg-surface-container-lowest relative overflow-hidden">
      <SiteHeader />

      <div className="relative z-10 pt-36 pb-24 max-w-[1440px] mx-auto px-6 md:px-10">
        <FadeIn>
          <span className="font-sans text-[11px] font-bold text-primary-fixed-dim uppercase tracking-[0.4em] mb-6 block">
            Protección al consumidor
          </span>
          <h1 className="font-serif italic text-on-surface text-4xl md:text-5xl leading-tight font-semibold max-w-3xl">
            Libro de Reclamaciones
          </h1>
          <p className="font-serif text-on-surface-variant text-[17px] leading-relaxed mt-6 max-w-2xl">
            Este establecimiento cuenta con un Libro de Reclamaciones a tu disposición. Puedes registrar
            aquí tu reclamo o queja; te responderemos en un plazo máximo de 15 días hábiles.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-14 max-w-3xl">
          <ComplaintBook />
        </FadeIn>
      </div>

      <SiteFooter />
    </div>
  );
}
