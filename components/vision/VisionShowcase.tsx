import Image from "next/image";

export function VisionShowcase() {
  return (
    <div className="relative group">
      {/* Imagen principal en card glass */}
      <div className="aspect-[4/3] glass-panel-soft rounded-2xl overflow-hidden shadow-2xl relative z-10">
        <Image
          src="/images/vision-boutique.jpg"
          alt="Boutique virtual del distrito MarkPlaza: arquitectura isométrica con paneles de cristal flotantes y vigas doradas, iluminada por luz ambiental bioluminiscente"
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover opacity-95 transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />
      </div>

      {/* Cards flotantes de datos */}
      <div className="hidden md:block absolute -top-6 -right-6 glass-panel rounded-xl p-6 z-20">
        <p className="font-sans text-[10px] font-semibold text-primary-fixed-dim mb-2 uppercase tracking-[0.25em]">
          Ubicación
        </p>
        <p className="font-serif text-on-surface text-lg">Éter Virtual</p>
      </div>
      <div className="hidden md:block absolute -bottom-4 -left-6 glass-panel rounded-xl p-6 z-20">
        <p className="font-sans text-[10px] font-semibold text-primary-fixed-dim mb-2 uppercase tracking-[0.25em]">
          Establecido
        </p>
        <p className="font-serif text-on-surface text-lg">MMXXVI</p>
      </div>

      {/* Marcos decorativos esquinas */}
      <div className="hidden md:block absolute -top-4 -left-4 size-48 border-l border-t border-primary-fixed-dim/30 rounded-tl-3xl pointer-events-none" />
      <div className="hidden md:block absolute -bottom-4 -right-4 size-48 border-r border-b border-primary-fixed-dim/30 rounded-br-3xl pointer-events-none" />
    </div>
  );
}
