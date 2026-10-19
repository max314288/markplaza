/* ------------------------------------------------------------------
   Datos del proveedor para el Libro de Reclamaciones.

   El formato oficial (Código de Protección y Defensa del Consumidor,
   Ley 29571) exige que la hoja muestre la identificación del proveedor:
   razón social, RUC y domicilio. Se guardan aquí para que la hoja y el
   futuro registro en base de datos usen exactamente los mismos valores.
   ------------------------------------------------------------------ */

export const PROVEEDOR = {
  razonSocial: "SAVEMARKS IMPORT E.I.R.L.",
  nombreComercial: "MarkPlaza",
  ruc: "20612740624",
  domicilioFiscal:
    "Calle Fray Angélico N.° 238, Urb. San Borja Sur, San Borja, Lima 15037",
} as const;

/** Plazo legal de respuesta, en días hábiles. */
export const PLAZO_RESPUESTA_DIAS_HABILES = 15;
