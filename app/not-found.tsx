import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-container-lowest relative overflow-hidden">
      <SiteHeader />

      <div className="relative z-10 pt-44 pb-24 max-w-[1440px] mx-auto px-6 md:px-10 text-center">
        <span className="font-sans text-[11px] font-bold text-primary-fixed-dim uppercase tracking-[0.4em] mb-6 block">
          Error 404
        </span>
        <h1 className="font-serif italic text-on-surface text-4xl md:text-6xl leading-tight font-semibold">
          No encontramos este local.
        </h1>
        <p className="font-serif text-on-surface-variant text-[17px] leading-relaxed mt-6 max-w-xl mx-auto">
          La dirección no existe o el local se mudó de sitio. Puedes volver al distrito o recorrer
          las tiendas disponibles.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button as={Link} href="/" variant="primary">
            Volver al distrito
          </Button>
          <Button as={Link} href="/tiendas" variant="outline">
            Ver tiendas
          </Button>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
