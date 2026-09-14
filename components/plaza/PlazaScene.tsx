import Image from "next/image";
import { Sprite } from "@/components/plaza/Sprite";
import { ShopFront } from "@/components/plaza/ShopFront";
import { MarketSignBoard, MarketSignHotspot } from "@/components/plaza/MarketSign";
import { PlazaAmbience } from "@/components/plaza/PlazaAmbience";
import { BACKGROUND, BANDS, SPRITES, STAGE } from "@/lib/plaza/manifest";
import { MARKETS, SHOPS } from "@/lib/plaza/shops";

const props = [
  SPRITES.macetaIzquierda,
  SPRITES.macetaCentro,
  SPRITES.macetaDerecha,
  SPRITES.banca,
] as const;

export function PlazaScene() {
  return (
    <div className="plaza-stage" id="distrito">
      {/* Fondo: cielo, silueta de ciudad, árboles, farola, acera y calle. */}
      <Image
        src={BACKGROUND.src}
        alt=""
        fill
        sizes="100vw"
        preload
        draggable={false}
        className="pointer-events-none object-cover"
      />

      {/*
        Letreros de poste, recortados a la altura de la base de las fachadas:
        los postes miden 1000 px y sin el recorte cruzarían acera y calle.
      */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          // Recorte por `clip-path`, no por altura: la capa debe conservar el
          // alto del escenario o los `top:%` de los sprites se medirían contra
          // ella.
          clipPath: `inset(0 0 ${100 - (BANDS.shopBase / STAGE.h) * 100}% 0)`,
        }}
      >
        {MARKETS.map((market) => (
          <MarketSignBoard key={market.id} market={market} />
        ))}
      </div>

      {SHOPS.map((shop) => (
        <ShopFront key={shop.slug} shop={shop} />
      ))}

      {props.map((sprite) => (
        <Sprite key={sprite.src} sprite={sprite} />
      ))}

      <PlazaAmbience />

      <h2 className="sr-only">Tiendas y marketplaces del distrito</h2>
      {MARKETS.map((market, i) => (
        <MarketSignHotspot key={market.id} market={market} index={i} />
      ))}
    </div>
  );
}
