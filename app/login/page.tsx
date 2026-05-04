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
          priority
          sizes="100vw"
          className="object-cover scale-105 opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-surface/95 via-surface-bright/40 to-surface/95" />
      </div>

      {/* Contenido */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
        <LoginCard />
      </main>

      {/* Footer minimalista */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 px-10 pb-10">
        <div className="max-w-[1440px] mx-auto pt-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-primary-fixed-dim/10">
          <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-on-surface-variant/30">
            © {new Date().getFullYear()} MarkPlaza · Distrito Comercial Virtual
          </p>
          <div className="flex gap-10">
            <Link
              href="#"
              className="font-sans text-[9px] uppercase tracking-[0.3em] text-on-surface-variant/30 hover:text-primary-fixed-dim transition-colors"
            >
              Privacidad
            </Link>
            <Link
              href="#"
              className="font-sans text-[9px] uppercase tracking-[0.3em] text-on-surface-variant/30 hover:text-primary-fixed-dim transition-colors"
            >
              Términos
            </Link>
            <Link
              href="#"
              className="font-sans text-[9px] uppercase tracking-[0.3em] text-on-surface-variant/30 hover:text-primary-fixed-dim transition-colors"
            >
              Soporte
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
