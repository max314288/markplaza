import { Mail, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Channel = {
  icon: LucideIcon;
  label: string;
  value: string;
};

const channels: Channel[] = [
  {
    icon: Phone,
    label: "Línea prioritaria",
    value: "+1 (888) MARKPLAZA-0",
  },
  {
    icon: Mail,
    label: "Correo seguro",
    value: "concierge@markplaza.com",
  },
  {
    icon: MapPin,
    label: "Nexo virtual",
    value: "Distrito 0, La Aguja Obsidiana",
  },
];

export function DirectChannels() {
  return (
    <div className="glass-panel rounded-3xl p-8 md:p-10">
      <h3 className="font-sans text-[10px] font-bold text-primary-fixed-dim uppercase tracking-[0.3em] mb-10 border-b border-primary-fixed-dim/20 pb-4">
        Canales directos
      </h3>
      <ul className="space-y-9">
        {channels.map(({ icon: Icon, label, value }) => (
          <li key={label} className="flex items-center gap-5 group">
            <div className="bg-surface-container-high p-4 rounded-2xl border border-primary-fixed-dim/20 gold-glow group-hover:scale-110 transition-transform shrink-0">
              <Icon
                className="size-6 text-primary-fixed-dim"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p className="font-sans text-[10px] font-semibold text-on-surface-variant/60 uppercase tracking-[0.2em] mb-1">
                {label}
              </p>
              <p className="font-serif text-on-surface text-lg group-hover:text-primary-fixed-dim transition-colors">
                {value}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
