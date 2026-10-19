import Link from "next/link";
import { MARKETS, SHOPS } from "@/lib/plaza/shops";

const footerLinks = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Tiendas", href: "/tiendas" },
  { label: "Contacto", href: "/contacto" },
  { label: "Acceder", href: "/login" },
  { label: "Reclamaciones", href: "/libro-de-reclamaciones" },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-[calc(3*var(--px))] focus-visible:ring-plaza-ink-strong focus-visible:ring-offset-[calc(3*var(--px))] focus-visible:ring-offset-plaza-cream focus-visible:rounded-[calc(6*var(--px))]";

/** Titular y subtítulo, sobre la línea del cielo. */
export function PlazaHeadline() {
  return (
    <div className="plaza-headline">
      {/*
        A 92 px de Noto Serif este texto mide 948 px del lienzo: el mismo
        ancho que el titular de `ORIGINAL.png` (946 px). Al cambiarlo hay que
        recomprobar el ancho o ajustar `font-size` en `plaza.css`.
      */}
      <h1 className="plaza-title">Tu distrito de compras</h1>
      <p className="plaza-subtitle">
        Una experiencia de compra curada: tiendas dibujadas a mano y parques
        digitales.
      </p>
    </div>
  );
}

/** CTA sobre la calle, navegación de pie y la lista táctil de marketplaces. */
export function PlazaActions() {
  return (
    <div className="plaza-actions">
      <Link href="/tiendas" className={`plaza-cta ${focusRing}`}>
        Empezar a explorar
      </Link>

      <nav aria-label="Secciones del distrito" className="plaza-nav">
        {footerLinks.map((link) => (
          <Link key={link.href} href={link.href} className={focusRing}>
            {link.label}
          </Link>
        ))}
      </nav>

      {/*
        En móvil la escena se reduce y los tableros de los letreros bajan de
        24 px: aquí van los mismos destinos como objetivos táctiles reales.
      */}
      <div className="plaza-touch-list md:hidden">
        <p className="plaza-touch-title">Marketplaces</p>
        <ul>
          {MARKETS.map((market) => (
            <li key={market.id}>
              <a
                href={market.href}
                target="_blank"
                rel="noopener noreferrer"
                className={focusRing}
              >
                {market.name}
              </a>
            </li>
          ))}
        </ul>
        <p className="plaza-touch-title">Tiendas</p>
        <ul>
          {SHOPS.map((shop) => (
            <li key={shop.slug}>
              <Link href={`/tiendas/${shop.slug}`} className={focusRing}>
                {shop.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
