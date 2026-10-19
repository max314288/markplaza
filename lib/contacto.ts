/* ------------------------------------------------------------------
   Canales de atención reales de MarkPlaza (SAVEMARKS IMPORT E.I.R.L.).

   Fuente única: cualquier componente que muestre un teléfono, correo o
   red social lee de aquí. Antes cada componente traía su propio valor
   inventado (concierge@markplaza.com, +1 888…, wa.me/1888…).
   ------------------------------------------------------------------ */

export const CONTACTO = {
  email: "savemarks20@gmail.com",
  /** El primero es el número principal (WhatsApp). */
  telefonos: ["+51 948002044", "+51 908685245"],
  whatsapp: "https://wa.me/51948002044",
  direccion: {
    linea1: "Calle Fray Angélico N.° 238, Urb. San Borja Sur",
    linea2: "San Borja, Lima 15037",
    pais: "Perú",
  },
} as const;

/** `tel:` necesita el número sin espacios. */
export function telHref(telefono: string): string {
  return `tel:${telefono.replace(/\s+/g, "")}`;
}

export const REDES = {
  instagram: "https://www.instagram.com/savemarks",
  tiktok: "https://www.tiktok.com/@savemarks",
  facebook: "https://www.facebook.com/savemarks/",
} as const;
