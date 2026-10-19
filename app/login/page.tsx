import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { LoginCard } from "@/components/login/LoginCard";

export const metadata: Metadata = {
  title: "Acceso al portal",
  description:
    "Accede al distrito MarkPlaza con tu identidad universal. Verificación segura para residentes y visitantes.",
};

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-surface-container-lowest">
      {/* Fondo cinematográfico */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <Image
          src="/images/login-bg-distrito.jpg"
          alt=""
          aria-hidden
          fill
          preload
          sizes="100vw"
          className="object-cover scale-105 opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-surface/95 via-surface-bright/40 to-surface/95" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center gap-16 px-6 py-24">
        <LoginCard />

        {/* Footer minimalista: en flujo normal, no `fixed` — con poca altura de
            viewport tapaba la tarjeta de login. */}
        <footer className="w-full">
          <div className="max-w-[1440px] mx-auto pt-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-primary-fixed-dim/10">
            <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-on-surface-variant/30">
              © {new Date().getFullYear()} MarkPlaza · Distrito Comercial Virtual
            </p>
            <div className="flex gap-10">
              <Link
                href="/privacidad"
                className="font-sans text-[9px] uppercase tracking-[0.3em] text-on-surface-variant/30 hover:text-primary-fixed-dim transition-colors"
              >
                Privacidad
              </Link>
              <Link
                href="/terminos"
                className="font-sans text-[9px] uppercase tracking-[0.3em] text-on-surface-variant/30 hover:text-primary-fixed-dim transition-colors"
              >
                Términos
              </Link>
              <Link
                href="/contacto"
                className="font-sans text-[9px] uppercase tracking-[0.3em] text-on-surface-variant/30 hover:text-primary-fixed-dim transition-colors"
              >
                Soporte
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
