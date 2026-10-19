"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as motion from "motion/react-client";
import {
  Bell,
  BookOpen,
  ChevronDown,
  ExternalLink,
  LogIn,
  Mail,
  Search,
  Store,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MARKETS, SHOPS, findShop } from "@/lib/plaza/shops";
import { PREF_LAST_SHOP, usePref } from "@/lib/plaza/prefs";

/* ------------------------------------------------------------------
   Barra flotante del distrito (Stitch "PlazaMarks v3", pantallas
   "Portal con Barra Flotante Maximizada/Minimizada", del boceto
   IMG_20260927_131346.jpg).

   Minimizada por defecto: solo iconos pequeños, sin nombre de usuario.
   Se maximiza sola mientras el puntero está encima, mientras el foco de
   teclado está dentro, mientras se escribe una búsqueda o mientras hay
   un panel abierto (así funciona también en táctil, sin hover).
   ------------------------------------------------------------------ */

type Panel = "search" | "bell" | "user" | null;

type Result = {
  key: string;
  label: string;
  detail: string;
  href: string;
  external: boolean;
};

const ALL_RESULTS: readonly Result[] = [
  ...SHOPS.map((shop) => ({
    key: `tienda-${shop.slug}`,
    label: shop.label,
    detail: shop.tagline,
    href: `/tiendas/${shop.slug}`,
    external: false,
  })),
  ...MARKETS.map((market) => ({
    key: `market-${market.id}`,
    label: market.name,
    detail: "Marketplace asociado",
    href: market.href,
    external: true,
  })),
];

/** Margen antes de minimizar al salir: evita parpadeos al rozar el borde. */
const LEAVE_DELAY_MS = 280;

/** Compara sin tildes ni mayúsculas: "jugueteria" encuentra "Juguetería". */
function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plaza-ink-strong focus-visible:ring-offset-1 focus-visible:ring-offset-plaza-cream";

const iconButton = cn(
  "relative inline-flex shrink-0 items-center justify-center rounded-full text-plaza-ink-strong transition-colors hover:bg-plaza-walk/60",
  focusRing,
);

const glass =
  "border border-white/70 bg-plaza-cream/85 shadow-[0_8px_30px_-4px_rgb(59_55_48/0.16),0_4px_10px_-2px_rgb(59_55_48/0.08)] backdrop-blur-md";

function Divider({ compact }: { compact: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "w-px shrink-0 bg-plaza-ink/25",
        // En móvil la barra maximizada los omite: el ancho es para la búsqueda.
        compact ? "h-4" : "hidden h-5 sm:block",
      )}
    />
  );
}

export function PlazaNavBar() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const lastShop = findShop(usePref(PREF_LAST_SHOP) ?? "");

  const [panel, setPanel] = useState<Panel>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bellRef = useRef<HTMLButtonElement>(null);
  const userRef = useRef<HTMLButtonElement>(null);
  const focusSearchRef = useRef(false);
  const leaveTimer = useRef<number | undefined>(undefined);

  const expanded = hovered || focused || panel !== null || query !== "";

  const ids = {
    listbox: useId(),
    bell: useId(),
    user: useId(),
  };

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return ALL_RESULTS;
    return ALL_RESULTS.filter((r) =>
      normalize(`${r.label} ${r.detail}`).includes(q),
    );
  }, [query]);

  // Toque o clic fuera de la barra: cierra cualquier panel abierto.
  useEffect(() => {
    if (!panel) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setPanel(null);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [panel]);

  // La lupa de la barra minimizada (táctil) lleva el foco a la búsqueda,
  // que solo existe una vez maximizada.
  useEffect(() => {
    if (focusSearchRef.current && expanded) {
      focusSearchRef.current = false;
      inputRef.current?.focus();
    }
  }, [expanded]);

  useEffect(() => () => window.clearTimeout(leaveTimer.current), []);

  function onPointerEnter(event: ReactPointerEvent) {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(leaveTimer.current);
    setHovered(true);
  }

  function onPointerLeave(event: ReactPointerEvent) {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(leaveTimer.current);
    leaveTimer.current = window.setTimeout(() => {
      setHovered(false);
      // Una búsqueda a medio escribir se conserva; lo demás se recoge.
      if (query) return;
      setPanel(null);
      if (document.activeElement === inputRef.current) inputRef.current?.blur();
    }, LEAVE_DELAY_MS);
  }

  // El foco de teclado maximiza; el que deja un clic de ratón no (de eso se
  // encarga el hover), o la barra se quedaría abierta tras salir.
  function onFocus(event: FocusEvent) {
    const target = event.target as HTMLElement;
    setFocused(target === inputRef.current || target.matches(":focus-visible"));
  }

  function onBlur(event: FocusEvent) {
    if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
      setFocused(false);
    }
  }

  function toggle(next: Exclude<Panel, "search" | null>) {
    setPanel((current) => (current === next ? null : next));
  }

  function closeTo(trigger: HTMLElement | null) {
    setPanel(null);
    trigger?.focus();
  }

  function open(result: Result) {
    setPanel(null);
    setQuery("");
    setActive(-1);
    if (result.external) {
      window.open(result.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(result.href);
    }
  }

  function onSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const count = results.length;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setPanel("search");
        if (count) setActive((i) => (i + 1) % count);
        break;
      case "ArrowUp":
        event.preventDefault();
        setPanel("search");
        if (count) setActive((i) => (i <= 0 ? count - 1 : i - 1));
        break;
      case "Enter": {
        const pick =
          results[active] ?? (results.length === 1 ? results[0] : undefined);
        if (panel === "search" && pick) {
          event.preventDefault();
          open(pick);
        }
        break;
      }
      case "Escape":
        if (panel === "search") {
          event.preventDefault();
          setPanel(null);
          setActive(-1);
        } else if (query) {
          event.preventDefault();
          setQuery("");
        }
        break;
    }
  }

  // Escape desde el botón o desde dentro del panel: cierra y devuelve el foco.
  function onRootKeyDown(event: KeyboardEvent) {
    if (event.key !== "Escape") return;
    if (panel === "bell" || panel === "user") {
      event.preventDefault();
      closeTo(panel === "bell" ? bellRef.current : userRef.current);
    }
  }

  const shopHref = lastShop ? `/tiendas/${lastShop.slug}` : "/tiendas";
  const shopName = lastShop
    ? `Última tienda visitada: ${lastShop.label}`
    : "Directorio de tiendas";

  const ease = [0.16, 1, 0.3, 1] as const;

  const pop = {
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 },
    animate: { opacity: 1, y: 0 },
    exit: reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 },
    transition: { duration: reduceMotion ? 0 : 0.18, ease },
  } as const;

  const activeId =
    panel === "search" && results[active]
      ? `${ids.listbox}-${results[active].key}`
      : undefined;

  return (
    <div
      ref={rootRef}
      onKeyDown={onRootKeyDown}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      // El contenedor ocupa siempre el ancho máximo para que el de la píldora
      // pueda transicionar; solo la píldora y los paneles reciben puntero, o
      // el hueco a sus lados también la maximizaría.
      className="pointer-events-none relative flex w-full max-w-3xl justify-center font-sans"
    >
      <nav
        aria-label="Barra del distrito"
        className={cn(
          "pointer-events-auto flex items-center justify-center overflow-hidden rounded-full",
          "transition-[width,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
          glass,
          expanded
            ? "w-full gap-1 bg-plaza-cream/95 px-1.5 py-1.5 sm:gap-3 sm:px-3"
            : // Ancho fijo (4 iconos y separadores), no `auto`: `width` solo
              // transiciona entre longitudes.
              "w-[11.75rem] gap-1.5 px-2.5 py-1",
        )}
      >
        {/* ---------- Búsqueda ---------- */}
        {/*
          El botón de la lupa existe en los dos estados (es el mismo nodo):
          si se desmontara al maximizar, el foco de teclado se perdería justo
          cuando la barra se abre por ese foco.
        */}
        <div
          className={cn("relative flex items-center", expanded && "min-w-0 flex-1")}
        >
          {expanded && (
            <input
              ref={inputRef}
              type="search"
              role="combobox"
              aria-label="Buscar tiendas y marketplaces"
              aria-autocomplete="list"
              aria-expanded={panel === "search"}
              aria-controls={ids.listbox}
              aria-activedescendant={activeId}
              autoComplete="off"
              enterKeyHint="go"
              placeholder="Buscar tiendas o marketplaces…"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(-1);
                setPanel("search");
              }}
              onFocus={() => setPanel("search")}
              onKeyDown={onSearchKeyDown}
              className="h-10 w-full rounded-full border border-plaza-ink/20 bg-plaza-walk/35 pl-10 pr-4 text-sm text-plaza-plate shadow-inner placeholder:text-plaza-ink-soft transition-[background-color,border-color] hover:bg-plaza-walk/50 focus:border-plaza-ink-strong/60 focus:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-plaza-ink-strong/30 [&::-webkit-search-cancel-button]:hidden"
            />
          )}
          <button
            type="button"
            aria-label="Buscar tiendas"
            // Maximizada, el input ya es el destino de Tab: la lupa sobra.
            tabIndex={expanded ? -1 : 0}
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.focus();
              } else {
                focusSearchRef.current = true;
                setPanel("search");
              }
            }}
            className={cn(
              iconButton,
              "size-8",
              expanded && "absolute left-1 hover:bg-transparent",
            )}
          >
            <Search
              className="size-4"
              strokeWidth={expanded ? 2.2 : 2}
              aria-hidden="true"
            />
          </button>
        </div>

        <Divider compact={!expanded} />

        {/* ---------- Notificaciones ---------- */}
        <button
          ref={bellRef}
          type="button"
          aria-label="Notificaciones"
          aria-expanded={panel === "bell"}
          aria-controls={ids.bell}
          className={cn(iconButton, expanded ? "size-10" : "size-8")}
          onClick={() => toggle("bell")}
        >
          <Bell
            className={expanded ? "size-5" : "size-4"}
            strokeWidth={2}
            aria-hidden="true"
          />
        </button>

        <Divider compact={!expanded} />

        {/* ---------- Última tienda visitada ---------- */}
        <Link
          href={shopHref}
          aria-label={shopName}
          className={cn(
            iconButton,
            expanded
              ? "size-10 sm:h-10 sm:w-auto sm:gap-2 sm:pl-1.5 sm:pr-3"
              : "size-8",
          )}
        >
          <span
            className={cn(
              "inline-flex items-center justify-center rounded-full",
              expanded && "size-7 bg-plaza-walk text-plaza-plate",
            )}
          >
            <Store className="size-4" strokeWidth={2} aria-hidden="true" />
          </span>
          {expanded && (
            <span
              aria-hidden="true"
              className="hidden whitespace-nowrap text-xs font-medium sm:inline"
            >
              {lastShop?.label ?? "Tiendas"}
            </span>
          )}
        </Link>

        <Divider compact={!expanded} />

        {/* ---------- Usuario ---------- */}
        <button
          ref={userRef}
          type="button"
          aria-label="Menú de usuario: visitante"
          aria-expanded={panel === "user"}
          aria-controls={ids.user}
          onClick={() => toggle("user")}
          className={cn(
            iconButton,
            expanded
              ? "h-10 gap-2 bg-white/50 px-1 ring-1 ring-plaza-ink/20 sm:pr-2.5"
              : "size-8",
          )}
        >
          <span
            className={cn(
              "inline-flex items-center justify-center rounded-full bg-plaza-green text-plaza-cream ring-2 ring-white/80",
              expanded ? "size-8" : "size-6",
            )}
          >
            <UserRound
              className={expanded ? "size-4" : "size-3.5"}
              strokeWidth={2.2}
              aria-hidden="true"
            />
          </span>
          {expanded && (
            <>
              <span
                aria-hidden="true"
                className="hidden text-sm font-semibold tracking-tight text-plaza-plate sm:inline"
              >
                Visitante
              </span>
              <ChevronDown
                className={cn(
                  "hidden size-3.5 text-plaza-ink transition-transform duration-200 sm:block",
                  panel === "user" && "rotate-180",
                )}
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </>
          )}
        </button>
      </nav>

      {/* ---------- Paneles ---------- */}
      <AnimatePresence>
        {panel === "search" && expanded && (
          <motion.div
            key="search"
            {...pop}
            className={cn(
              "pointer-events-auto absolute left-0 top-full mt-3 w-full max-w-md overflow-hidden rounded-2xl p-1.5",
              glass,
              "bg-plaza-cream/95",
            )}
          >
            <ul
              id={ids.listbox}
              role="listbox"
              aria-label="Resultados de búsqueda"
              className="max-h-[min(60svh,22rem)] overflow-y-auto"
            >
              {results.map((result, i) => (
                <li
                  key={result.key}
                  id={`${ids.listbox}-${result.key}`}
                  role="option"
                  aria-selected={i === active}
                  // Sin robar el foco al input: el clic selecciona igual.
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => open(result)}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-xl px-3 py-2.5 text-sm text-plaza-plate",
                    i === active && "bg-plaza-walk/70",
                  )}
                >
                  {result.external ? (
                    <ExternalLink
                      className="mt-0.5 size-4 shrink-0 text-plaza-ink"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  ) : (
                    <Store
                      className="mt-0.5 size-4 shrink-0 text-plaza-ink"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  )}
                  <span className="min-w-0">
                    <span className="block font-semibold">{result.label}</span>
                    <span className="block truncate text-xs text-plaza-ink-soft">
                      {result.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            {results.length === 0 && (
              <p className="px-3 py-3 text-sm text-plaza-ink-soft">
                Ninguna tienda coincide con “{query.trim()}”.
              </p>
            )}
          </motion.div>
        )}

        {panel === "bell" && (
          <motion.div
            key="bell"
            id={ids.bell}
            {...pop}
            className={cn(
              "pointer-events-auto absolute right-0 top-full mt-3 w-[min(18rem,calc(100vw-2rem))] rounded-2xl p-4",
              glass,
              "bg-plaza-cream/95",
            )}
          >
            <p className="text-sm font-semibold text-plaza-plate">
              Sin notificaciones
            </p>
            <p className="mt-1 text-xs leading-relaxed text-plaza-ink-soft">
              Cuando abras tu cuenta, aquí verás novedades de tus tiendas y el
              estado de tus pedidos.
            </p>
          </motion.div>
        )}

        {panel === "user" && (
          <motion.div
            key="user"
            id={ids.user}
            {...pop}
            className={cn(
              "pointer-events-auto absolute right-0 top-full mt-3 w-[min(16rem,calc(100vw-2rem))] rounded-2xl p-2.5",
              glass,
              "bg-plaza-cream/95",
            )}
          >
            <div className="mb-1.5 border-b border-plaza-ink/15 px-3 py-2">
              <p className="text-xs font-medium text-plaza-ink-soft">
                Navegando como
              </p>
              <p className="text-sm font-semibold leading-tight text-plaza-plate">
                Visitante
              </p>
            </div>
            <ul className="space-y-0.5 text-sm font-medium text-plaza-ink-strong">
              <MenuLink href="/login" icon={LogIn} strong>
                Acceder
              </MenuLink>
              <MenuLink href="/tiendas" icon={Store}>
                Directorio de tiendas
              </MenuLink>
              <MenuLink href="/contacto" icon={Mail}>
                Contacto
              </MenuLink>
              <MenuLink href="/libro-de-reclamaciones" icon={BookOpen}>
                Libro de Reclamaciones
              </MenuLink>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuLink({
  href,
  icon: Icon,
  strong,
  children,
}: {
  href: string;
  icon: typeof Store;
  strong?: boolean;
  children: ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "group flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-plaza-walk/60 hover:text-plaza-plate",
          strong && "text-plaza-green-dim",
          focusRing,
        )}
      >
        <Icon
          className="size-4 text-plaza-ink group-hover:text-plaza-plate"
          strokeWidth={2}
          aria-hidden="true"
        />
        {children}
      </Link>
    </li>
  );
}
