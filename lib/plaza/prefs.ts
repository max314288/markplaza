import { useSyncExternalStore } from "react";

/* ------------------------------------------------------------------
   Preferencias del visitante guardadas en `localStorage`.
   Sin backend (export estático), solo viven en este navegador: por ahora,
   la última tienda visitada que muestra la barra flotante.
   ------------------------------------------------------------------ */

export const PREF_LAST_SHOP = "markplaza:ultima-tienda";

/** `storage` solo avisa a las otras pestañas; este evento avisa a la propia. */
const CHANGE_EVENT = "markplaza:prefs";

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    // Modo privado o almacenamiento bloqueado: se comporta como vacío.
    return null;
  }
}

export function writePref(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    return;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Lee una preferencia; en el servidor y en la hidratación vale `null`. */
export function usePref(key: string): string | null {
  return useSyncExternalStore(
    subscribe,
    () => read(key),
    () => null,
  );
}
