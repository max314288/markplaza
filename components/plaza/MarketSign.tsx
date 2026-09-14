import { Sprite } from "@/components/plaza/Sprite";
import { boxStyle } from "@/lib/plaza/manifest";
import type { Market } from "@/lib/plaza/shops";

/**
 * Letrero de poste de un marketplace. El sprite vive en la capa recortada
 * (los postes miden 1000 px y se esconden tras las fachadas); el tablero
 * clicable se dibuja aparte para que el anillo de foco no quede cortado.
 */
export function MarketSignBoard({ market }: { market: Market }) {
  return <Sprite sprite={market.sign} eager />;
}

export function MarketSignHotspot({
  market,
  index,
}: {
  market: Market;
  index: number;
}) {
  return (
    <div className="group pointer-events-none absolute inset-0">
      {/* Halo ambiental. `fondo-plaza.webp` ya trae pintado un resplandor, este solo lo respira. */}
      <span
        aria-hidden="true"
        className="plaza-glow absolute -z-10 transition-transform duration-500 ease-out motion-safe:group-hover:scale-110 motion-safe:group-focus-within:scale-110"
        style={{
          ...boxStyle([
            market.panel[0] - market.panel[2] * 0.28,
            market.panel[1] - market.panel[3] * 0.45,
            market.panel[2] * 1.56,
            market.panel[3] * 1.9,
          ]),
          animationDelay: `${index * 1.3}s`,
        }}
      />

      <a
        href={market.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${market.name} (se abre en una pestaña nueva)`}
        className="pointer-events-auto absolute cursor-pointer rounded-[calc(6*var(--px))] ring-plaza-ink-strong focus-visible:outline-none focus-visible:ring-[calc(3*var(--px))] focus-visible:ring-offset-[calc(2*var(--px))] focus-visible:ring-offset-plaza-cream"
        style={boxStyle(market.panel)}
      />
    </div>
  );
}
