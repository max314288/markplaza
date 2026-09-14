/* ------------------------------------------------------------------
   Manifiesto de la escena del distrito (`/`).

   Lienzo de diseño = 1376 x 768, el espacio de coordenadas de
   `docs/disegnefront/ORIGINAL.png`. El fondo `fondo-plaza.webp` (2546x1421) tiene
   exactamente la misma relación, así que escala sin recortes.

   Cada PNG trae padding transparente alrededor del dibujo. `box` describe
   dónde va el DIBUJO (bbox opaco) dentro del lienzo, y `trim` dónde está
   ese dibujo dentro del PNG. `frame()` combina ambos para obtener el rect
   de la imagen completa. Colocar el PNG crudo en `box` lo dibujaría
   pequeño y desplazado.
   ------------------------------------------------------------------ */

export const STAGE = { w: 1376, h: 768 } as const;

/** Bandas horizontales del lienzo, en px de diseño. */
export const BANDS = {
  /** Base de las fachadas: por debajo de aquí los postes ya no se ven. */
  shopBase: 502,
  roadTop: 575,
  roadBottom: 690,
} as const;

export type Rect = readonly [x: number, y: number, w: number, h: number];

export type Sprite = {
  src: string;
  /** Tamaño intrínseco del PNG. */
  nat: readonly [w: number, h: number];
  /** Bbox opaco dentro del PNG, en px fuente. */
  trim: Rect;
  /** Dónde debe quedar ese bbox opaco, en px del lienzo 1376x768. */
  box: Rect;
};

export type Frame = {
  left: number;
  top: number;
  width: number;
  height: number;
};

/**
 * Rect de la imagen COMPLETA, en % del escenario, tal que el `trim` del
 * sprite queda exactamente sobre su `box`.
 */
export function frame(s: Sprite): Frame {
  const k = s.box[2] / s.trim[2]; // px de lienzo por px fuente
  return {
    left: ((s.box[0] - s.trim[0] * k) / STAGE.w) * 100,
    top: ((s.box[1] - s.trim[1] * k) / STAGE.h) * 100,
    width: ((s.nat[0] * k) / STAGE.w) * 100,
    height: ((s.nat[1] * k) / STAGE.h) * 100,
  };
}

/** Estilo inline listo para un envoltorio absoluto. */
export function frameStyle(s: Sprite): React.CSSProperties {
  const f = frame(s);
  return {
    left: `${f.left}%`,
    top: `${f.top}%`,
    width: `${f.width}%`,
    height: `${f.height}%`,
  };
}

/** `sizes` para next/image: el escenario nunca supera el ancho del viewport. */
export function frameSizes(s: Sprite): string {
  return `${Math.ceil(frame(s).width)}vw`;
}

/** Rect del lienzo → estilo absoluto en %. */
export function boxStyle(box: Rect): React.CSSProperties {
  return {
    left: `${(box[0] / STAGE.w) * 100}%`,
    top: `${(box[1] / STAGE.h) * 100}%`,
    width: `${(box[2] / STAGE.w) * 100}%`,
    height: `${(box[3] / STAGE.h) * 100}%`,
  };
}

const base = "/escena";

export const BACKGROUND = {
  src: `${base}/fondo-plaza.webp`,
  nat: [2546, 1421] as const,
};

export const SPRITES = {
  ferreteria: {
    src: `${base}/tienda-ferreteria.png`,
    nat: [463, 633],
    trim: [16, 103, 407, 473],
    box: [67, 244, 220, 256],
  },
  boutique: {
    src: `${base}/tienda-boutique.png`,
    nat: [507, 633],
    trim: [37, 164, 454, 414],
    box: [326, 277, 245, 224],
  },
  estampados: {
    src: `${base}/tienda-estampados.png`,
    nat: [448, 622],
    trim: [20, 148, 380, 436],
    box: [613, 264, 205, 236],
  },
  jugueteria: {
    src: `${base}/tienda-jugueteria.png`,
    nat: [448, 622],
    trim: [38, 61, 396, 523],
    box: [865, 217, 214, 283],
  },
  libreria: {
    src: `${base}/tienda-libreria.png`,
    nat: [437, 581],
    trim: [21, 162, 372, 370],
    box: [1138, 302, 201, 200],
  },

  plateFerreteria: {
    src: `${base}/placa-ferreteria.png`,
    nat: [303, 100],
    trim: [12, 18, 275, 64],
    box: [102, 321, 149, 35],
  },
  plateBoutique: {
    src: `${base}/placa-boutique.png`,
    nat: [359, 124],
    trim: [22, 24, 313, 71],
    box: [370, 311, 155, 35],
  },
  plateEstampados: {
    src: `${base}/placa-estampados.png`,
    nat: [335, 117],
    trim: [20, 24, 295, 64],
    box: [637, 335, 153, 33],
  },
  plateJugueteria: {
    src: `${base}/placa-jugueteria.png`,
    nat: [335, 117],
    trim: [14, 18, 292, 70],
    box: [903, 322, 137, 33],
  },
  plateLibreria: {
    src: `${base}/placa-libreria.png`,
    nat: [318, 91],
    trim: [22, 16, 274, 49],
    box: [1159, 334, 154, 28],
  },

  amazon: {
    src: `${base}/letrero-amazon.png`,
    nat: [346, 1000],
    trim: [48, 48, 245, 952],
    box: [247, 214, 132, 515],
  },
  ebay: {
    src: `${base}/letrero-ebay.png`,
    nat: [307, 1000],
    trim: [29, 27, 247, 973],
    box: [780, 221, 133, 526],
  },
  mercadoLibre: {
    src: `${base}/letrero-mercado-libre.png`,
    nat: [437, 1000],
    trim: [52, 49, 300, 951],
    box: [1154, 241, 162, 514],
  },

  macetaIzquierda: {
    src: `${base}/maceta-izquierda.png`,
    nat: [292, 233],
    trim: [22, 14, 237, 162],
    box: [12, 471, 128, 88],
  },
  macetaCentro: {
    src: `${base}/maceta-centro.png`,
    nat: [303, 215],
    trim: [40, 37, 210, 127],
    box: [482, 490, 113, 69],
  },
  macetaDerecha: {
    src: `${base}/maceta-derecha.png`,
    nat: [292, 233],
    trim: [33, 14, 237, 162],
    box: [1248, 471, 128, 88],
  },
  banca: {
    src: `${base}/banca.png`,
    nat: [151, 86],
    trim: [15, 16, 123, 61],
    box: [872, 516, 66, 33],
  },
  mujer: {
    src: `${base}/peaton-mujer.png`,
    nat: [189, 270],
    trim: [44, 43, 97, 187],
    box: [170, 446, 52, 101],
  },
  hombre: {
    src: `${base}/peaton-hombre.png`,
    nat: [159, 237],
    trim: [27, 22, 92, 186],
    box: [1113, 446, 50, 101],
  },

  carRed: {
    src: `${base}/auto-rojo.png`,
    nat: [218, 135],
    trim: [23, 26, 183, 92],
    box: [193, 600, 167, 83],
  },
  carBlue: {
    src: `${base}/auto-azul.png`,
    nat: [197, 109],
    trim: [10, 14, 173, 87],
    box: [953, 537, 160, 80],
  },
} as const satisfies Record<string, Sprite>;
