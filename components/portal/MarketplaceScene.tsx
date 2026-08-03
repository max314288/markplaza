import Link from "next/link";
import { ArrowUpRight, Search, User } from "lucide-react";

/* ------------------------------------------------------------------
   MarketplaceScene — home `/` hero
   Patrón "Plaza Híbrido" (docs/DESIGN.md §8): escena nocturna en SVG
   inline + tres fachadas interactivas con CTA HTML encima.
   ------------------------------------------------------------------ */

type Marketplace = {
  id: "amazon" | "ebay" | "mercado-libre";
  name: string;
  href: string;
  /** Posición horizontal del centro de la tienda (% del viewport) */
  left: string;
  /** Tono del awning (toldo) */
  awning: string;
};

const marketplaces: Marketplace[] = [
  {
    id: "amazon",
    name: "Amazon Store",
    href: "https://www.amazon.com",
    left: "18%",
    awning: "#a87b3c",
  },
  {
    id: "ebay",
    name: "eBay",
    href: "https://www.ebay.com",
    left: "50%",
    awning: "#7a6240",
  },
  {
    id: "mercado-libre",
    name: "Mercado Libre",
    href: "https://www.mercadolibre.com",
    left: "82%",
    awning: "#bfa46d",
  },
];

export function MarketplaceScene() {
  return (
    <>
      <div className="fixed inset-0 z-0 overflow-hidden">
        <CityBackdrop />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/20 via-transparent to-surface/85" />
      </div>

      <div className="absolute inset-x-0 top-[42%] z-10 h-[44%]">
        {marketplaces.map((m) => (
          <Storefront key={m.id} marketplace={m} />
        ))}
      </div>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 w-[min(calc(100%-2rem),720px)]">
        <div className="glass-panel rounded-full flex items-center gap-3 px-6 py-3.5 gold-glow">
          <Search
            className="size-4 text-primary-fixed-dim/70 shrink-0"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <input
            type="search"
            name="q"
            aria-label="Buscar en la plaza"
            placeholder="Buscar tiendas y productos..."
            className="flex-1 bg-transparent font-sans text-[14px] text-on-surface placeholder:text-on-surface-variant/40 tracking-wide focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-fixed-dim/50 rounded"
          />
          <Link
            href="/login"
            aria-label="Acceder al portal"
            className="text-primary-fixed-dim motion-safe:hover:scale-110 motion-safe:transition-transform shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed-dim/70 focus-visible:rounded"
          >
            <User className="size-5" strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------
   CityBackdrop — silueta de ciudad nocturna en Emerald Velvet
   viewBox 1600x900 (16:9), preserveAspectRatio slice = object-cover.
   ------------------------------------------------------------------ */

const STAR_COORDS: ReadonlyArray<readonly [number, number]> = [
  [120, 90], [260, 60], [430, 130], [610, 70], [780, 110],
  [960, 80], [1110, 60], [1450, 130], [200, 200], [880, 220], [1240, 250],
];

const LIT_WINDOW_COORDS: ReadonlyArray<readonly [number, number]> = [
  [40, 470], [80, 500], [150, 460], [170, 500], [300, 470], [340, 500],
  [400, 430], [410, 470], [530, 450], [580, 490], [640, 470], [710, 440],
  [870, 460], [910, 490], [980, 440], [1040, 470], [1090, 500], [1150, 430],
  [1300, 450], [1340, 480], [1410, 440], [1490, 460], [1540, 490],
];

const PAVEMENT_LINE_XS: ReadonlyArray<number> = Array.from(
  { length: 17 },
  (_, i) => i * 100,
);

function CityBackdrop() {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className="size-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00110c" />
          <stop offset="55%" stopColor="#06120b" />
          <stop offset="90%" stopColor="#0d2117" />
          <stop offset="100%" stopColor="#1a3a2a" />
        </linearGradient>
        <linearGradient id="horizon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(229,211,178,0)" />
          <stop offset="70%" stopColor="rgba(229,211,178,0.08)" />
          <stop offset="100%" stopColor="rgba(229,211,178,0.18)" />
        </linearGradient>
        <linearGradient id="asphalt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#04100a" />
          <stop offset="100%" stopColor="#00110c" />
        </linearGradient>
      </defs>

      {/* Cielo */}
      <rect width="1600" height="900" fill="url(#sky)" />

      {/* Luna tenue */}
      <circle cx="1320" cy="170" r="42" fill="#d4c19d" opacity="0.18" />
      <circle cx="1320" cy="170" r="22" fill="#e5d3b2" opacity="0.35" />

      {STAR_COORDS.map(([cx, cy], i) => (
        <circle
          key={`star-${i}`}
          cx={cx}
          cy={cy}
          r={i % 3 === 0 ? 1.6 : 1}
          fill="#c2ebdc"
          opacity={i % 2 === 0 ? 0.55 : 0.35}
        />
      ))}

      {/* Glow del horizonte (atardecer champagne sutil) */}
      <rect x="0" y="380" width="1600" height="200" fill="url(#horizon)" />

      {/* Silueta de ciudad lejana */}
      <g fill="#062818" opacity="0.85">
        <rect x="0" y="430" width="120" height="120" />
        <rect x="120" y="400" width="80" height="150" />
        <polygon points="200,400 240,360 280,400 280,550 200,550" />
        <rect x="280" y="420" width="100" height="130" />
        <rect x="380" y="380" width="60" height="170" />
        <polygon points="440,380 470,340 500,380 500,550 440,550" />
        <rect x="500" y="410" width="120" height="140" />
        <rect x="620" y="430" width="70" height="120" />
        <rect x="690" y="395" width="90" height="155" />
        <polygon points="780,395 820,355 860,395 860,550 780,550" />
        <rect x="860" y="425" width="100" height="125" />
        <rect x="960" y="400" width="60" height="150" />
        <rect x="1020" y="430" width="110" height="120" />
        <rect x="1130" y="380" width="70" height="170" />
        <polygon points="1200,380 1230,340 1260,380 1260,550 1200,550" />
        <rect x="1260" y="415" width="120" height="135" />
        <rect x="1380" y="395" width="80" height="155" />
        <rect x="1460" y="420" width="140" height="130" />
      </g>

      <g fill="#d4c19d" opacity="0.55">
        {LIT_WINDOW_COORDS.map(([cx, cy], i) => (
          <rect key={`win-${i}`} x={cx} y={cy} width="4" height="6" rx="0.5" />
        ))}
      </g>

      {/* Silueta media (segunda fila de edificios más cercanos) */}
      <g fill="#04150d">
        <rect x="0" y="500" width="200" height="100" />
        <rect x="200" y="480" width="160" height="120" />
        <rect x="360" y="510" width="180" height="90" />
        <rect x="540" y="495" width="200" height="105" />
        <rect x="740" y="475" width="140" height="125" />
        <rect x="880" y="505" width="220" height="95" />
        <rect x="1100" y="490" width="170" height="110" />
        <rect x="1270" y="510" width="160" height="90" />
        <rect x="1430" y="485" width="170" height="115" />
      </g>

      {/* Acera (sidewalk) */}
      <rect x="0" y="600" width="1600" height="80" fill="#08200f" />
      <line
        x1="0"
        y1="600"
        x2="1600"
        y2="600"
        stroke="#d4c19d"
        strokeOpacity="0.12"
        strokeWidth="1"
      />
      <g stroke="#0c2a16" strokeWidth="1">
        {PAVEMENT_LINE_XS.map((x) => (
          <line key={`pave-${x}`} x1={x} y1="600" x2={x} y2="680" />
        ))}
      </g>

      {/* Calle (asfalto) */}
      <rect x="0" y="680" width="1600" height="220" fill="url(#asphalt)" />

      {/* Líneas centrales de la calle */}
      <g stroke="#d4c19d" strokeOpacity="0.22" strokeWidth="4" strokeDasharray="40 28">
        <line x1="0" y1="790" x2="1600" y2="790" />
      </g>

      {/* Bordillo (curb) — línea fina */}
      <line
        x1="0"
        y1="680"
        x2="1600"
        y2="680"
        stroke="#d4c19d"
        strokeOpacity="0.18"
        strokeWidth="1.5"
      />

      <Car x={280} hue="#0d2117" />
      <Car x={1080} hue="#122a1e" flipped />

      <Pedestrian x={170} />
      <Pedestrian x={1380} />

      <Lamp x={90} />
      <Lamp x={780} />
      <Lamp x={1500} />
    </svg>
  );
}

function Car({ x, hue, flipped }: { x: number; hue: string; flipped?: boolean }) {
  const transform = flipped ? `translate(${x + 110}, 720) scale(-1,1)` : `translate(${x}, 720)`;
  return (
    <g transform={transform}>
      {/* Sombra */}
      <ellipse cx="55" cy="58" rx="55" ry="4" fill="#000" opacity="0.35" />
      {/* Carrocería inferior */}
      <rect x="0" y="32" width="110" height="22" rx="6" fill={hue} stroke="#1a3a2a" strokeWidth="0.8" />
      {/* Techo */}
      <path d="M22 32 L36 16 L78 16 L94 32 Z" fill={hue} stroke="#1a3a2a" strokeWidth="0.8" />
      {/* Ventanas */}
      <path d="M28 30 L40 18 L74 18 L86 30 Z" fill="#0a1e14" opacity="0.85" />
      <line x1="56" y1="18" x2="56" y2="30" stroke="#1a3a2a" strokeWidth="0.6" />
      {/* Faros */}
      <circle cx="105" cy="40" r="3" fill="#e5d3b2" opacity="0.75" />
      <rect x="100" y="38" width="14" height="2" fill="#e5d3b2" opacity="0.25" />
      {/* Llantas */}
      <circle cx="25" cy="55" r="7" fill="#020a06" />
      <circle cx="25" cy="55" r="3" fill="#1a3a2a" />
      <circle cx="85" cy="55" r="7" fill="#020a06" />
      <circle cx="85" cy="55" r="3" fill="#1a3a2a" />
    </g>
  );
}

function Pedestrian({ x }: { x: number }) {
  return (
    <g transform={`translate(${x}, 612)`}>
      {/* Sombra */}
      <ellipse cx="9" cy="62" rx="11" ry="2" fill="#000" opacity="0.4" />
      {/* Cabeza */}
      <circle cx="9" cy="8" r="5" fill="#0d2117" />
      {/* Torso */}
      <path d="M3 14 Q9 12 15 14 L17 38 L1 38 Z" fill="#06120b" stroke="#0d2117" strokeWidth="0.6" />
      {/* Piernas */}
      <rect x="3" y="38" width="5" height="22" fill="#04100a" />
      <rect x="10" y="38" width="5" height="22" fill="#04100a" />
      {/* Brazos suaves */}
      <line x1="3" y1="20" x2="0" y2="34" stroke="#06120b" strokeWidth="3" strokeLinecap="round" />
      <line x1="15" y1="20" x2="18" y2="34" stroke="#06120b" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function Lamp({ x }: { x: number }) {
  return (
    <g transform={`translate(${x}, 540)`}>
      <line x1="0" y1="0" x2="0" y2="80" stroke="#1a3a2a" strokeWidth="2" />
      <circle cx="0" cy="0" r="6" fill="#d4c19d" opacity="0.85" />
      <circle cx="0" cy="0" r="14" fill="#d4c19d" opacity="0.15" />
      <circle cx="0" cy="0" r="26" fill="#d4c19d" opacity="0.05" />
    </g>
  );
}

/* ------------------------------------------------------------------
   Storefront — fachada + letrero + CTA pill por tienda
   El `<a>` envuelve todo; SVG es decorativo (aria-hidden).
   ------------------------------------------------------------------ */

function Storefront({ marketplace }: { marketplace: Marketplace }) {
  const { name, href, left, awning } = marketplace;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visitar ${name} (se abre en una pestaña nueva)`}
      className="
        group absolute top-0 -translate-x-1/2
        flex flex-col items-center gap-3
        w-[clamp(180px,22vw,300px)]
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-primary-fixed-dim/70 focus-visible:ring-offset-4
        focus-visible:ring-offset-surface
        rounded-3xl
        motion-safe:transition-transform motion-safe:duration-500
        motion-safe:group-hover:-translate-y-1
      "
      style={{ left }}
    >
      {/* Letrero luminoso */}
      <span
        className="
          font-serif text-[clamp(13px,1.3vw,18px)] uppercase tracking-[0.18em]
          text-primary-fixed-dim/65
          transition-[color,text-shadow] duration-300
          group-hover:text-primary-fixed-dim group-hover:gold-text-glow
          group-focus-visible:text-primary-fixed-dim group-focus-visible:gold-text-glow
          select-none
        "
      >
        {name}
      </span>

      {/* Fachada SVG */}
      <svg
        viewBox="0 0 200 220"
        className="w-full h-auto drop-shadow-[0_18px_30px_rgba(0,0,0,0.6)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`awning-${marketplace.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={awning} stopOpacity="0.95" />
            <stop offset="100%" stopColor={awning} stopOpacity="0.65" />
          </linearGradient>
          <linearGradient id={`window-${marketplace.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e5d3b2" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#d4c19d" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Pared / fachada */}
        <rect x="10" y="40" width="180" height="170" rx="4" fill="#0d2117" stroke="#1a3a2a" strokeWidth="1" />

        {/* Awning (toldo) */}
        <path
          d="M0 40 L200 40 L188 70 L12 70 Z"
          fill={`url(#awning-${marketplace.id})`}
          stroke="#000"
          strokeOpacity="0.25"
          strokeWidth="0.6"
        />
        {/* Festón del awning */}
        <path
          d="M12 70 Q24 78 36 70 Q48 78 60 70 Q72 78 84 70 Q96 78 108 70 Q120 78 132 70 Q144 78 156 70 Q168 78 180 70 L188 70 Z"
          fill={awning}
          opacity="0.85"
        />

        {/* Ventanas (vidrieras) */}
        <rect x="22" y="90" width="64" height="80" rx="3" fill={`url(#window-${marketplace.id})`} stroke="#1a3a2a" strokeWidth="0.8" />
        <rect x="114" y="90" width="64" height="80" rx="3" fill={`url(#window-${marketplace.id})`} stroke="#1a3a2a" strokeWidth="0.8" />
        {/* Crucetas */}
        <line x1="54" y1="90" x2="54" y2="170" stroke="#1a3a2a" strokeWidth="0.6" />
        <line x1="22" y1="130" x2="86" y2="130" stroke="#1a3a2a" strokeWidth="0.6" />
        <line x1="146" y1="90" x2="146" y2="170" stroke="#1a3a2a" strokeWidth="0.6" />
        <line x1="114" y1="130" x2="178" y2="130" stroke="#1a3a2a" strokeWidth="0.6" />

        {/* Puerta central */}
        <rect x="86" y="100" width="28" height="110" rx="2" fill="#04100a" stroke="#1a3a2a" strokeWidth="0.8" />
        <rect x="89" y="106" width="22" height="60" rx="1" fill={`url(#window-${marketplace.id})`} />
        <circle cx="108" cy="158" r="1.5" fill="#d4c19d" opacity="0.7" />

        {/* Sub-letrero sobre el awning */}
        <rect x="60" y="48" width="80" height="14" rx="2" fill="#000" opacity="0.35" />
        <text
          x="100"
          y="58"
          textAnchor="middle"
          fontSize="7"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          letterSpacing="2"
          fill="#e5d3b2"
          opacity="0.85"
          className="
            transition-opacity duration-300
            group-hover:opacity-100
          "
        >
          MARKPLAZA
        </text>

        {/* Piso bajo el edificio */}
        <rect x="6" y="208" width="188" height="6" fill="#020a06" />
      </svg>

      {/* CTA pill */}
      <span
        className="
          glass-panel gold-glow rounded-full
          px-4 py-2
          flex items-center gap-2
          -mt-12
          font-sans text-[10px] uppercase tracking-[0.25em]
          text-primary-fixed-dim
          whitespace-nowrap
        "
      >
        Visitar
        <ArrowUpRight className="size-3" strokeWidth={2} aria-hidden="true" />
      </span>
    </a>
  );
}
