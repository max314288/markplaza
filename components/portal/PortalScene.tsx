import Image from "next/image";
import Link from "next/link";
import { Search, User } from "lucide-react";

export function PortalScene() {
  return (
    <>
      {/* Escena 3D del distrito a pantalla completa */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <Image
          src="/images/portal-distrito.png"
          alt="Distrito MarkPlaza al atardecer: ferretería, boutique, juguetería y librería en un atardecer dorado sobre la ciudad"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-transparent to-surface/80" />
      </div>

      {/* Barra de búsqueda flotante */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 w-[min(calc(100%-3rem),720px)]">
        <div className="glass-panel rounded-full flex items-center gap-3 px-6 py-3.5 gold-glow">
          <Search
            className="size-4 text-primary-fixed-dim/70 shrink-0"
            strokeWidth={1.5}
          />
          <input
            type="search"
            placeholder="Buscar en el distrito..."
            className="flex-1 bg-transparent outline-none font-sans text-[14px] text-on-surface placeholder:text-on-surface-variant/40 tracking-wide"
          />
          <Link
            href="/login"
            aria-label="Acceder al portal"
            className="text-primary-fixed-dim hover:scale-110 transition-transform shrink-0"
          >
            <User className="size-5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </>
  );
}
