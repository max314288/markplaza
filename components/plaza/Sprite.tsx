import Image from "next/image";
import { cn } from "@/lib/utils";
import { frameSizes, frameStyle, type Sprite as SpriteData } from "@/lib/plaza/manifest";

type SpriteProps = {
  sprite: SpriteData;
  /** Los sprites de fachada y letrero se cargan de inmediato. */
  eager?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Un PNG de la escena, posicionado por `frame()` de forma que su dibujo caiga
 * exactamente sobre la caja medida en `ORIGINAL.png`.
 *
 * Sin `object-fit`: la relación del envoltorio ya es la del PNG, y `contain`
 * metería bandas por redondeo subpíxel.
 */
export function Sprite({ sprite, eager, className, style }: SpriteProps) {
  return (
    <div
      className={cn("pointer-events-none absolute select-none", className)}
      style={{ ...frameStyle(sprite), ...style }}
    >
      <Image
        src={sprite.src}
        alt=""
        fill
        sizes={frameSizes(sprite)}
        loading={eager ? "eager" : undefined}
        draggable={false}
        className="h-full w-full"
      />
    </div>
  );
}
