import { cn } from "@/lib/utils";
import { Mail, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CONTACTO, telHref } from "@/lib/contacto";

type Channel = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
};

const channels: Channel[] = [
  {
    icon: Phone,
    label: "Línea prioritaria",
    value: CONTACTO.telefonos[0],
    href: telHref(CONTACTO.telefonos[0]),
  },
  {
    icon: Mail,
    label: "Correo",
    value: CONTACTO.email,
    href: `mailto:${CONTACTO.email}`,
  },
  {
    icon: MapPin,
    label: "Domicilio",
    value: `${CONTACTO.direccion.linea1}, ${CONTACTO.direccion.linea2}`,
  },
];

export function DirectChannels({ className }: { className?: string }) {
  return (
    <div className={cn("glass-panel rounded-3xl p-6 md:p-8", className)}>
      <h3 className="font-sans text-[10px] font-bold text-primary-fixed-dim uppercase tracking-[0.3em] mb-6 border-b border-primary-fixed-dim/20 pb-4">
        Canales directos
      </h3>
      <ul className="space-y-5">
        {channels.map(({ icon: Icon, label, value, href }) => (
          <li key={label} className="flex items-center gap-4 group">
            <div className="bg-surface-container-high p-3 rounded-xl border border-primary-fixed-dim/20 gold-glow motion-safe:group-hover:scale-110 transition-transform shrink-0">
              <Icon
                aria-hidden="true"
                className="size-5 text-primary-fixed-dim"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p className="font-sans text-[10px] font-semibold text-on-surface-variant/60 uppercase tracking-[0.2em] mb-0.5">
                {label}
              </p>
              {href ? (
                <a
                  href={href}
                  className="font-serif text-on-surface text-base group-hover:text-primary-fixed-dim transition-colors hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-fixed-dim/70 focus-visible:rounded"
                >
                  {value}
                </a>
              ) : (
                <p className="font-serif text-on-surface text-base group-hover:text-primary-fixed-dim transition-colors">
                  {value}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
