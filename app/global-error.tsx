"use client"; // Los límites de error deben ser Client Components.

import "./globals.css";

/**
 * Reemplaza TODO el layout raíz (incluido `<html>`/`<body>`) cuando algo
 * revienta fuera de un `error.tsx` de ruta — por eso importa `globals.css`
 * directo, para no perder los tokens de color ni las utilidades.
 */
export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-surface-container-lowest text-on-background flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <span className="font-sans text-[11px] font-bold text-primary-fixed-dim uppercase tracking-[0.4em] mb-6 block">
            Error inesperado
          </span>
          <h1 className="font-serif italic text-on-surface text-3xl md:text-4xl font-semibold">
            Algo salió mal.
          </h1>
          <p className="font-serif text-on-surface-variant text-[15px] leading-relaxed mt-4">
            Ocurrió un error inesperado cargando esta página. Puedes intentar de nuevo.
          </p>
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="mt-8 gold-glow bg-gradient-to-br from-primary-container to-primary-fixed-dim text-on-primary-container rounded-xl px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.3em] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed-dim/70"
          >
            Intentar de nuevo
          </button>
        </div>
      </body>
    </html>
  );
}
