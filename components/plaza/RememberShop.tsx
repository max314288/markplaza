"use client";

import { useEffect } from "react";
import { PREF_LAST_SHOP, writePref } from "@/lib/plaza/prefs";

/** Anota la ficha abierta como "última tienda visitada" de la barra del distrito. */
export function RememberShop({ slug }: { slug: string }) {
  useEffect(() => {
    writePref(PREF_LAST_SHOP, slug);
  }, [slug]);

  return null;
}
