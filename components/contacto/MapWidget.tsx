import { cn } from "@/lib/utils";
import Image from "next/image";
import { MapPin } from "lucide-react";

export function MapWidget({ className }: { className?: string }) {
  return (
    <div className={cn("relative glass-panel rounded-3xl overflow-hidden h-full group", className)}>
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/mapa-distrito.jpg"
          alt="Mapa estilizado de Lima con San Borja destacado"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover opacity-40 grayscale sepia scale-110 transition-[transform,opacity,filter] duration-1000 group-hover:opacity-60 group-hover:grayscale-0 group-hover:sepia-0 motion-safe:group-hover:scale-100"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-90 pointer-events-none" />

      {/* Pin */}
      <div className="absolute bottom-5 left-5 z-10">
        <div className="bg-primary text-on-primary px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl gold-glow cursor-default">
          <MapPin className="size-3.5 fill-current" strokeWidth={1.5} aria-hidden="true" />
          <span className="font-sans text-[9px] font-bold uppercase tracking-[0.25em]">
            San Borja, Lima
          </span>
        </div>
      </div>
    </div>
  );
}
