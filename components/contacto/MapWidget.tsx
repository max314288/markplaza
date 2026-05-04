import Image from "next/image";
import { MapPin, Minus, Plus } from "lucide-react";

export function MapWidget() {
  return (
    <div className="relative glass-panel rounded-3xl overflow-hidden h-[340px] group">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/mapa-distrito.jpg"
          alt="Mapa estilizado del distrito MarkPlaza con el centro destacado"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover opacity-40 grayscale sepia scale-110 group-hover:scale-100 group-hover:opacity-60 group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-1000"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-90 pointer-events-none" />

      {/* Pin */}
      <div className="absolute bottom-6 left-6 z-10">
        <div className="bg-primary text-on-primary px-5 py-2.5 rounded-full flex items-center gap-2.5 shadow-2xl gold-glow cursor-default">
          <MapPin className="size-4 fill-current" strokeWidth={1.5} />
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.25em]">
            MarkPlaza Center
          </span>
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
        <button
          type="button"
          aria-label="Acercar"
          className="bg-surface-container-high/90 backdrop-blur-md p-2.5 rounded-xl text-primary-fixed-dim border border-primary-fixed-dim/30 hover:border-primary hover:text-primary transition-all shadow-lg"
        >
          <Plus className="size-4" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label="Alejar"
          className="bg-surface-container-high/90 backdrop-blur-md p-2.5 rounded-xl text-primary-fixed-dim border border-primary-fixed-dim/30 hover:border-primary hover:text-primary transition-all shadow-lg"
        >
          <Minus className="size-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
