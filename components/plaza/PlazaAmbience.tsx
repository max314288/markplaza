"use client";

import Image from "next/image";
import * as motion from "motion/react-client";
import { useReducedMotion } from "motion/react";
import {
  SPRITES,
  STAGE,
  frame,
  frameSizes,
  type Sprite as SpriteData,
} from "@/lib/plaza/manifest";

/* ------------------------------------------------------------------
   Piezas que se mueven: dos autos cruzando la calle y dos peatones.
   Todo lo demás de la escena es RSC estático.
   ------------------------------------------------------------------ */

/**
 * Auto sobre una pista de ancho completo: animar la `x` de la pista en % la
 * convierte en una travesía exacta del escenario, compuesta en GPU y sin
 * provocar layout.
 */
function Car({
  sprite,
  direction,
  /**
   * El PNG nace mirando a la izquierda (CAR_BLUE es el espejo de CAR_RED,
   * que nace mirando a la derecha). Sin esto el volteo asume que todo
   * sprite nace mirando a la derecha y el auto termina viajando de reversa.
   */
  mirrored = false,
  duration,
  delay,
  still,
}: {
  sprite: SpriteData;
  direction: "ltr" | "rtl";
  mirrored?: boolean;
  duration: number;
  delay: number;
  still: boolean;
}) {
  const f = frame(sprite);
  // Fracción del escenario que ocupa el auto, para que salga por completo.
  const out = f.width + 2;
  const travel = direction === "ltr" ? [`-${out}%`, "100%"] : ["100%", `-${out}%`];
  // Voltear solo cuando la orientación nativa del sprite no coincide con el
  // sentido de viaje deseado (XOR entre "nace mirando a la izquierda" y
  // "viaja hacia la izquierda"). En reposo (`still`) se muestra tal cual
  // ORIGINAL.png: ninguno de los dos autos está volteado ahí.
  const flip = !still && mirrored !== (direction === "rtl");

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0"
      style={{ top: `${f.top}%`, height: `${f.height}%` }}
      animate={still ? undefined : { x: travel }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        repeatDelay: delay,
      }}
    >
      <div
        className="absolute top-0 h-full"
        style={{
          width: `${f.width}%`,
          left: still ? `${f.left}%` : 0,
          transform: flip ? "scaleX(-1)" : undefined,
        }}
      >
        <Image
          src={sprite.src}
          alt=""
          fill
          sizes={frameSizes(sprite)}
          draggable={false}
          className="h-full w-full"
        />
      </div>
    </motion.div>
  );
}

function Walker({
  sprite,
  drift,
  bob,
  still,
}: {
  sprite: SpriteData;
  /** Deriva horizontal en px de lienzo. */
  drift: number;
  /** Desfase del paso, en segundos. */
  bob: number;
  still: boolean;
}) {
  const f = frame(sprite);
  const driftPct = (drift / STAGE.w) * 100;

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        left: `${f.left}%`,
        top: `${f.top}%`,
        width: `${f.width}%`,
        height: `${f.height}%`,
      }}
      animate={
        still
          ? undefined
          : { x: [`${-driftPct}%`, `${driftPct}%`], y: ["0%", "-1.2%", "0%"] }
      }
      transition={{
        x: { duration: 11, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
        y: {
          duration: 1.15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: bob,
        },
      }}
    >
      <Image
        src={sprite.src}
        alt=""
        fill
        sizes={frameSizes(sprite)}
        draggable={false}
        className="h-full w-full"
      />
    </motion.div>
  );
}

export function PlazaAmbience() {
  const still = useReducedMotion() ?? false;

  return (
    <>
      <Walker sprite={SPRITES.mujer} drift={14} bob={0} still={still} />
      <Walker sprite={SPRITES.hombre} drift={-12} bob={0.4} still={still} />
      <Car
        sprite={SPRITES.carBlue}
        direction="rtl"
        mirrored
        duration={29}
        delay={4}
        still={still}
      />
      <Car
        sprite={SPRITES.carRed}
        direction="ltr"
        duration={24}
        delay={7}
        still={still}
      />
    </>
  );
}
