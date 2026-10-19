import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Divider } from "@/components/ui/Divider";
import { CONTACTO } from "@/lib/contacto";
import { PROVEEDOR } from "@/lib/legal/proveedor";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo MarkPlaza (SAVEMARKS IMPORT E.I.R.L.) trata los datos personales que recibe a través de este sitio.",
};

const secciones = [
  {
    titulo: "Responsable del tratamiento",
    cuerpo: `${PROVEEDOR.razonSocial} (RUC ${PROVEEDOR.ruc}), con domicilio en ${PROVEEDOR.domicilioFiscal}, es responsable de los datos personales que se recogen a través de markplaza.com.`,
  },
  {
    titulo: "Qué datos recogemos",
    cuerpo: `Solo los que la persona entrega voluntariamente en los formularios del sitio: nombre, correo, teléfono y el contenido del mensaje (formulario de Contacto), o los datos exigidos por el Libro de Reclamaciones (documento de identidad, domicilio y detalle del reclamo). No usamos cookies de rastreo ni vendemos datos a terceros.`,
  },
  {
    titulo: "Para qué los usamos",
    cuerpo: "Únicamente para responder la consulta o el reclamo. No se usan para marketing salvo que la persona lo autorice explícitamente.",
  },
  {
    titulo: "Con quién los compartimos",
    cuerpo: "No compartimos datos personales con terceros, salvo obligación legal (por ejemplo, un requerimiento de Indecopi sobre un reclamo).",
  },
  {
    titulo: "Tus derechos",
    cuerpo: `Conforme a la Ley N.° 29733 (Ley de Protección de Datos Personales), puedes solicitar acceso, rectificación, cancelación u oposición sobre tus datos escribiendo a ${CONTACTO.email}.`,
  },
];

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-surface-container-lowest relative overflow-hidden">
      <SiteHeader />

      <div className="relative z-10 pt-36 pb-24 max-w-[1440px] mx-auto px-6 md:px-10">
        <span className="font-sans text-[11px] font-bold text-primary-fixed-dim uppercase tracking-[0.4em] mb-6 block">
          Legal
        </span>
        <h1 className="font-serif italic text-on-surface text-4xl md:text-5xl leading-tight font-semibold max-w-3xl">
          Política de Privacidad
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
