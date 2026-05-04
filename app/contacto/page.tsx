import Image from "next/image";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { InquiryForm } from "@/components/contacto/InquiryForm";
import { DirectChannels } from "@/components/contacto/DirectChannels";
import { MapWidget } from "@/components/contacto/MapWidget";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Contacto · Servicios de Concierge",
  description:
    "Contacta con los stewards virtuales de MarkPlaza para personalización Atelier, adquisición de propiedad o soporte del distrito.",
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-surface-container-lowest relative overflow-hidden">
      {/* Fondo cinematográfico tintado a Emerald */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <Image
          src="/images/login-bg-distrito.jpg"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105 opacity-25 mix-blend-luminosity"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,17,12,0.98) 0%, rgba(0,17,12,0.65) 40%, rgba(0,17,12,0.98) 100%)",
          }}
        />
      </div>

      <SiteHeader />

      <main className="relative z-10 pt-44 pb-20 max-w-[1440px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-x-10 gap-y-12">
        {/* Hero */}
        <FadeIn className="col-span-12">
          <h1 className="font-serif text-on-surface text-4xl md:text-5xl lg:text-[3rem] font-semibold mb-6 gold-text-glow">
            Servicios de Concierge
          </h1>
          <p className="font-serif text-on-surface-variant text-[18px] leading-relaxed max-w-3xl">
            Conecta con nuestros stewards virtuales dedicados. Ya sea que busques
            personalización arquitectónica a medida o consultas sobre propiedades,
            nuestro escritorio está a tu disposición para una transición fluida
            al distrito MarkPlaza.
          </p>
        </FadeIn>

        {/* Form */}
        <FadeIn className="col-span-12 lg:col-span-7" delay={0.1}>
          <InquiryForm />
        </FadeIn>

        {/* Aside con canales + mapa */}
        <FadeIn
          as="section"
          className="col-span-12 lg:col-span-5 space-y-10"
          delay={0.2}
        >
          <DirectChannels />
          <MapWidget />
        </FadeIn>
      </main>

      <SiteFooter />
    </div>
  );
}
