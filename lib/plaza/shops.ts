import { SPRITES, type Rect, type Sprite } from "@/lib/plaza/manifest";

/* ------------------------------------------------------------------
   Tiendas del distrito y marketplaces asociados.
   Fuente única para la escena de `/` y para las rutas `/tiendas/*`.
   ------------------------------------------------------------------ */

export type Shop = {
  slug: string;
  /** Texto que se imprime sobre la placa (y nombre accesible del enlace). */
  label: string;
  /** Descripción corta usada en `/tiendas`. */
  tagline: string;
  facade: Sprite;
  plate: Sprite;
  /** Tamaño del texto de la placa, en px del lienzo 1376. */
  plateFont: number;
  /**
   * Silueta de la fachada en % del rect de la imagen completa. `clip-path`
   * recorta también el hit-testing: sin ella, las esquinas transparentes se
   * comerían los clics y los techos a dos aguas taparían los letreros.
   */
  clip: string;
};

export const SHOPS: readonly Shop[] = [
  {
    slug: "ferreteria",
    label: "Ferretería",
    tagline: "Herramienta, obra y oficio para el residente que construye.",
    facade: SPRITES.ferreteria,
    plate: SPRITES.plateFerreteria,
    plateFont: 17,
    clip: "polygon(45.8% 16.3%, 27.6% 24.5%, 8.6% 32.9%, 9.1% 41.1%, 9.1% 49.4%, 4.3% 57.7%, 8.6% 66.0%, 8.6% 74.2%, 8.6% 82.6%, 7.6% 90.8%, 86.2% 90.8%, 85.3% 82.6%, 85.3% 74.2%, 85.3% 66.0%, 90.1% 57.7%, 85.3% 49.4%, 85.3% 41.1%, 85.7% 32.9%, 73.2% 24.5%, 49.0% 16.3%)",
  },
  {
    slug: "boutique",
    label: "Boutique",
    tagline: "Prêt-à-porter curado, sastrería y piezas de temporada.",
    facade: SPRITES.boutique,
    plate: SPRITES.plateBoutique,
    plateFont: 17,
    clip: "polygon(7.3% 25.9%, 10.5% 33.2%, 11.2% 40.4%, 11.2% 55.0%, 11.2% 69.4%, 11.2% 83.9%, 10.1% 91.2%, 93.5% 91.2%, 92.9% 83.9%, 92.9% 69.4%, 92.9% 55.0%, 92.9% 40.4%, 93.5% 33.2%, 96.8% 25.9%)",
  },
  {
    slug: "estampados",
    label: "Estampados",
    tagline: "Serigrafía, edición limitada y gráfica sobre tela.",
    facade: SPRITES.estampados,
    plate: SPRITES.plateEstampados,
    plateFont: 16,
    clip: "polygon(45.1% 23.8%, 28.6% 31.5%, 11.6% 39.4%, 10.3% 47.1%, 10.3% 62.7%, 10.3% 78.1%, 10.3% 86.0%, 8.5% 93.7%, 85.3% 93.7%, 83.7% 86.0%, 83.7% 78.1%, 83.7% 62.7%, 83.7% 47.1%, 81.9% 39.4%, 65.2% 31.5%, 48.2% 23.8%)",
  },
  {
    slug: "jugueteria",
    label: "Juguetería",
    tagline: "Juego, colección y objetos que no envejecen.",
    facade: SPRITES.jugueteria,
    plate: SPRITES.plateJugueteria,
    plateFont: 15,
    clip: "polygon(52.0% 9.8%, 52.0% 19.1%, 30.6% 28.5%, 9.6% 37.8%, 13.8% 47.1%, 13.8% 65.8%, 13.8% 84.4%, 12.7% 93.7%, 92.2% 93.7%, 91.5% 84.4%, 91.5% 65.8%, 91.5% 47.1%, 96.2% 37.8%, 73.9% 28.5%, 53.1% 19.1%, 56.7% 9.8%)",
  },
  {
    slug: "libreria",
    label: "Librería",
    tagline: "Fondo editorial, papelería fina y café de sobremesa.",
    facade: SPRITES.libreria,
    plate: SPRITES.plateLibreria,
    plateFont: 14,
    clip: "polygon(4.8% 27.9%, 7.3% 34.9%, 9.6% 42.0%, 9.6% 56.1%, 9.6% 70.2%, 9.4% 84.3%, 10.8% 91.4%, 85.8% 91.4%, 84.4% 84.3%, 84.4% 70.2%, 84.4% 56.1%, 84.4% 42.0%, 87.0% 34.9%, 89.5% 27.9%)",
  },
];

export type Market = {
  id: "amazon" | "ebay" | "mercado-libre";
  name: string;
  href: string;
  sign: Sprite;
  /** Tablero clicable, en px del lienzo. Nunca incluye el poste. */
  panel: Rect;
};

export const MARKETS: readonly Market[] = [
  {
    id: "amazon",
    name: "Amazon Store",
    href: "https://www.amazon.com",
    sign: SPRITES.amazon,
    panel: [247, 214, 132, 56],
  },
  {
    id: "ebay",
    name: "eBay",
    href: "https://www.ebay.com",
    sign: SPRITES.ebay,
    panel: [780, 221, 133, 66],
  },
  {
    id: "mercado-libre",
    name: "Mercado Libre",
    href: "https://www.mercadolibre.com",
    sign: SPRITES.mercadoLibre,
    panel: [1154, 241, 162, 55],
  },
];

export function findShop(slug: string): Shop | undefined {
  return SHOPS.find((s) => s.slug === slug);
}
