/* ------------------------------------------------------------------
   Corrige el export estático de Next 16 cuando se construye en Windows.

   Next nombra los datos de prefetch de cada segmento como
   `__next.<ruta con puntos>.txt`, pero arma el nombre desde
   `path.relative()`, que en Windows devuelve `\`. Resultado:
   `out/login/__next.login/__PAGE__.txt` en vez de
   `out/login/__next.login.__PAGE__.txt`, y el router pide el segundo → 404.

   Este script aplana esas carpetas. En Linux/macOS no encuentra nada.
   ------------------------------------------------------------------ */

import { readdir, rename, rm } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const OUT = "out";

async function filesIn(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((e) => (e.isDirectory() ? filesIn(join(dir, e.name)) : [join(dir, e.name)])),
  );
  return nested.flat();
}

async function walk(dir) {
  let moved = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const path = join(dir, entry.name);

    if (entry.name.startsWith("__next.")) {
      for (const file of await filesIn(path)) {
        const flat = `${entry.name}.${relative(path, file).split(sep).join(".")}`;
        await rename(file, join(dir, flat));
        moved++;
      }
      await rm(path, { recursive: true });
    } else if (entry.name !== "_next") {
      moved += await walk(path);
    }
  }
  return moved;
}

const moved = await walk(OUT);
if (moved) console.log(`fix-export-windows: ${moved} segmentos aplanados`);
