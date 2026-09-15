import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Divider } from "@/components/ui/Divider";
import { PROVEEDOR } from "@/lib/legal/proveedor";

export const metadata: Metadata = {
  title: "Términos de Uso",
  description: "Condiciones de uso del sitio MarkPlaza, operado por SAVEMARKS IMPORT E.I.R.L.",
};

const secciones = [
  {
    titulo: "Sobre este sitio",
    cuerpo: `MarkPlaza (markplaza.com) es un sitio operado por ${PROVEEDOR.razonSocial} (RUC ${PROVEEDOR.ruc}) que presenta un directorio ilustrado de locales. Por ahora es un sitio de exhibición: no procesa pagos, no vende productos directamente ni administra cuentas de usuario.`,
  },
  {
    titulo: "Uso permitido",
    cuerpo: "Puedes navegar el sitio y usar los formularios de Contacto y del Libro de Reclamaciones para comunicarte con nosotros. No está permitido usar el sitio para fines ilícitos, ni intentar vulnerar su seguridad.",
  },
  {
    titulo: "Contenido",
    cuerpo: "Las ilustraciones, textos y diseño del sitio pertenecen a MarkPlaza. Los nombres de los locales mostrados son parte del directorio propio del sitio.",
  },
  {
    titulo: "Enlaces externos",
    cuerpo: "Los letreros de Amazon, eBay y Mercado Libre abren esos sitios externos en una pestaña nueva. MarkPlaza no es responsable del contenido ni de las políticas de esos terceros.",
  },
  {
    titulo: "Cambios",
    cuerpo: "Estos términos pueden actualizarse conforme el sitio incorpore nuevas funciones (cuentas, catálogo, pagos). Los cambios importantes se avisarán en esta misma página.",
  },
];

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-surface-container-lowest relative overflow-hidden">
      <SiteHeader />

      <div className="relative z-10 pt-36 pb-24 max-w-[1440px] mx-auto px-6 md:px-10">
        <span className="font-sans text-[11px] font-bold text-primary-fixed-dim uppercase tracking-[0.4em] mb-6 block">
          Legal
        </span>
        <h1 className="font-serif italic text-on-surface text-4xl md:text-5xl leading-tight font-semibold max-w-3xl">
          Términos de Uso
        </h1>
        <p className="font-serif text-on-surface-variant/70 text-[14px] leading-relaxed mt-4 max-w-2xl">
          Última actualización: septiembre de 2026. Este es un borrador inicial, pendiente de revisión legal
          antes de operar en producción.
        </p>

        <Divider className="mt-12 mb-14 opacity-60 max-w-2xl" />

        <div className="space-y-12 max-w-2xl">
          {secciones.map((s) => (
            <section key={s.titulo}>
              <h2 className="font-serif text-on-surface text-xl font-semibold mb-3">{s.titulo}</h2>
              <p className="font-serif text-on-surface-variant text-[15px] leading-relaxed">{s.cuerpo}</p>
            </section>
          ))}
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
