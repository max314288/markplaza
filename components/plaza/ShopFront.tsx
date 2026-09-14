import Link from "next/link";
import Image from "next/image";
import { Sprite } from "@/components/plaza/Sprite";
import { boxStyle, frameStyle, frameSizes } from "@/lib/plaza/manifest";
import type { Shop } from "@/lib/plaza/shops";

/**
 * Fachada + placa + texto + zona clicable de una tienda.
 *
 * Envuelve todo en una capa a pantalla completa para que fachada, placa y
 * ancla compartan un mismo `group` pese a estar en cajas distintas del lienzo.
 * La capa no recibe puntero; solo el ancla.
 */
export function ShopFront({ shop }: { shop: Shop }) {
  return (
    <div className="group pointer-events-none absolute inset-0">
      <Sprite
        sprite={shop.facade}
        eager
        className="origin-bottom transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-[0.55%] motion-safe:group-focus-within:-translate-y-[0.55%]"
      />

      <div
        className="absolute transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-[0.55%] motion-safe:group-focus-within:-translate-y-[0.55%]"
        style={frameStyle(shop.plate)}
      >
        <Image
          src={shop.plate.src}
          alt=""
          fill
          sizes={frameSizes(shop.plate)}
          loading="eager"
          draggable={false}
          className="h-full w-full"
        />
      </div>

      <span
        aria-hidden="true"
        className="absolute flex items-center justify-center"
        style={boxStyle(shop.plate.box)}
      >
        <span
          className="font-sans font-semibold uppercase leading-none text-plaza-plate transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-[6%] motion-safe:group-focus-within:-translate-y-[6%]"
          style={{
            fontSize: `calc(${shop.plateFont} * var(--px))`,
            letterSpacing: `calc(0.6 * var(--px))`,
          }}
        >
          {shop.label}
        </span>
      </span>

      {/* Anillo de foco: fuera del recorte, que también recortaría el outline. */}
      <span
        aria-hidden="true"
        className="absolute rounded-[calc(10*var(--px))] ring-0 ring-plaza-ink-strong transition-[box-shadow] duration-200 group-has-[a:focus-visible]:ring-[calc(3*var(--px))]"
        style={boxStyle(shop.facade.box)}
      />

      <Link
        href={`/tiendas/${shop.slug}`}
        aria-label={`${shop.label} — entrar a la tienda`}
        className="pointer-events-auto absolute cursor-pointer focus-visible:outline-none"
        style={{ ...frameStyle(shop.facade), clipPath: shop.clip }}
      />
    </div>
  );
}
