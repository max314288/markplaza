import { Building2, Snowflake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";

const pillars = [
  {
    icon: Building2,
    title: "Integridad estructural",
    description:
      "Navegación intuitiva y con peso, como caminar por un espacio físico.",
  },
  {
    icon: Snowflake,
    title: "Estética refinada",
    description:
      "Píxeles curados y transiciones de lujo silencioso, sin estridencias.",
  },
];

export function VisionHero() {
  return (
    <div className="flex flex-col justify-center">
      <span className="font-sans text-[11px] font-bold text-primary-fixed-dim uppercase tracking-[0.4em] mb-4">
        La Visión
      </span>
      <h1 className="font-serif italic text-on-surface text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.1] mb-6 font-semibold">
        Redefiniendo la era del{" "}
        <span className="text-tertiary not-italic">Comercio Espacial</span>.
      </h1>

      <Divider className="w-20 mb-8 opacity-60" />

      <p className="font-serif text-on-surface-variant text-[18px] leading-relaxed mb-10 max-w-md">
        MarkPlaza trasciende el comercio transaccional. Tallamos espacios
        digitales que habitan la belleza arquitectónica, la resonancia emocional
        y la utilidad atemporal.
      </p>

      <ul className="grid grid-cols-1 gap-6 mb-12">
        {pillars.map(({ icon: Icon, title, description }) => (
          <li key={title} className="flex gap-4 items-start">
            <Icon
              aria-hidden="true"
              className="size-6 text-tertiary mt-1 shrink-0"
              strokeWidth={1.5}
            />
            <div>
              <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-on-surface mb-1">
                {title}
              </h3>
              <p className="font-serif text-on-surface-variant text-[14px] leading-relaxed opacity-80">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-8 flex-wrap">
        <Button as="button" variant="primary">
          Explorar Atelier
        </Button>
        <a
          href="#vision"
          className="group inline-flex items-center gap-2 cursor-pointer border-b border-transparent hover:border-primary-fixed-dim transition-all pb-1"
        >
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-on-surface">
            La historia
          </span>
          <ArrowRight
            className="size-4 text-primary-fixed-dim group-hover:translate-x-1 transition-transform"
            strokeWidth={1.5}
          />
        </a>
      </div>
    </div>
  );
}
