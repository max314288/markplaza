import Image from "next/image";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { InquiryForm } from "@/components/contacto/InquiryForm";
import { DirectChannels } from "@/components/contacto/DirectChannels";
import { MapWidget } from "@/components/contacto/MapWidget";
import { SocialLinks } from "@/components/contacto/SocialLinks";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Contacto · Atención al Cliente",
  description:
    "Contacta con el equipo de MarkPlaza para asistencia en tus compras, consultas sobre productos exclusivos o soporte de tu cuenta.",
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
            Atención al Cliente
          </h1>
          <p className="font-serif text-on-surface-variant text-[18px] leading-relaxed max-w-3xl">
            Conecta con nuestro equipo de soporte especializado. Ya sea que busques
            asesoramiento sobre productos exclusivos, asistencia con tus pedidos o
            consultas generales, estamos a tu disposición para ofrecerte una experiencia
            de compra fluida y premium en MarkPlaza.
          </p>
        </FadeIn>

        {/* Form */}
        <FadeIn className="col-span-12 lg:col-span-7" delay={0.1}>
          <InquiryForm />
        </FadeIn>

        {/* Aside con canales + mapa */}
        <FadeIn
          as="section"
          className="col-span-12 lg:col-span-5 flex flex-col gap-4"
          delay={0.2}
        >
          <DirectChannels className="flex-none" />
          <MapWidget className="flex-1 min-h-[140px]" />
          <SocialLinks
            className="flex-none p-6"
            whatsapp="https://wa.me/18888627529"
            instagram="https://instagram.com/markplaza"
            facebook="https://facebook.com/markplaza"
            tiktok="https://tiktok.com/@markplaza"
          />
        </FadeIn>
      </main>

      <SiteFooter />
    </div>
  );
}
