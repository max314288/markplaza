"use client";

import { useState } from "react";
import { Check, Copy, Mail, Printer, Send } from "lucide-react";
import { Field, Input, Select, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { CONTACTO } from "@/lib/contacto";
import { PLAZO_RESPUESTA_DIAS_HABILES, PROVEEDOR } from "@/lib/legal/proveedor";

/**
 * Hoja de Reclamación virtual (Libro de Reclamaciones), formato Indecopi
 * (D.S. 101-2022-PCM). Sin backend: no hay registro consultable en el sitio
 * ni un correlativo automático. Al "enviar" se muestra la hoja completa
 * lista para imprimir/guardar y copiar, y el correo queda como una opción
 * más (no como único camino, porque un `mailto:` sin cliente de correo
 * configurado falla en silencio). Antes de operar en producción, un
 * abogado debe confirmar que esto cumple el reglamento (correlativo real,
 * plazo de 15 días hábiles, envío a Indecopi).
 */

const DOCUMENTOS = ["DNI", "Carné de extranjería", "Pasaporte"] as const;

type FormState = {
  tipo: "Reclamo" | "Queja";
  nombre: string;
  documentoTipo: (typeof DOCUMENTOS)[number];
  documentoNumero: string;
  domicilio: string;
  telefono: string;
  email: string;
  esMenor: boolean;
  apoderadoNombre: string;
  apoderadoDocumento: string;
  bienTipo: "Producto" | "Servicio";
  bien: string;
  monto: string;
  detalle: string;
  pedido: string;
};

const initial: FormState = {
  tipo: "Reclamo",
  nombre: "",
  documentoTipo: "DNI",
  documentoNumero: "",
  domicilio: "",
  telefono: "",
  email: "",
  esMenor: false,
  apoderadoNombre: "",
  apoderadoDocumento: "",
  bienTipo: "Producto",
  bien: "",
  monto: "",
  detalle: "",
  pedido: "",
};

function hojaTexto(f: FormState, fecha: string) {
  return [
    "LIBRO DE RECLAMACIONES — Hoja de Reclamación",
    `Fecha: ${fecha}`,
    `Tipo: ${f.tipo}`,
    "",
    "Proveedor",
    `Razón social: ${PROVEEDOR.razonSocial}`,
    `RUC: ${PROVEEDOR.ruc}`,
    `Domicilio: ${PROVEEDOR.domicilioFiscal}`,
    "",
    "Datos del consumidor reclamante",
    `Nombre: ${f.nombre}`,
    `Documento: ${f.documentoTipo} ${f.documentoNumero}`,
    `Domicilio: ${f.domicilio}`,
    `Teléfono: ${f.telefono}`,
    `Correo: ${f.email}`,
    ...(f.esMenor
      ? [`Apoderado: ${f.apoderadoNombre} (${f.apoderadoDocumento})`]
      : []),
    "",
    "Bien contratado",
    `Tipo: ${f.bienTipo}`,
    `Descripción: ${f.bien}`,
    `Monto reclamado: ${f.monto ? `S/ ${f.monto}` : "—"}`,
    "",
    `Detalle del ${f.tipo.toLowerCase()}`,
    f.detalle,
    "",
    "Pedido del consumidor",
    f.pedido,
    "",
    `El proveedor debe responder en un plazo máximo de ${PLAZO_RESPUESTA_DIAS_HABILES} días hábiles.`,
  ].join("\n");
}

function buildMailto(texto: string, tipo: string, nombre: string) {
  const subject = encodeURIComponent(`Libro de Reclamaciones — ${tipo} de ${nombre || "consumidor"}`);
  return `mailto:${CONTACTO.email}?subject=${subject}&body=${encodeURIComponent(texto)}`;
}

export function ComplaintBook() {
  const [form, setForm] = useState<FormState>(initial);
  const [enviado, setEnviado] = useState<{ fecha: string } | null>(null);
  const [copiado, setCopiado] = useState(false);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviado({ fecha: new Date().toLocaleDateString("es-PE") });
  }

  async function copiarTexto(texto: string) {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      // Sin permiso de portapapeles: el botón "Imprimir/Guardar" sigue funcionando.
    }
  }

  if (enviado) {
    const texto = hojaTexto(form, enviado.fecha);
    return (
      <div className="glass-panel rounded-3xl p-8 md:p-12 space-y-8">
        <div>
          <h3 className="font-sans text-[10px] font-bold text-primary-fixed-dim uppercase tracking-[0.3em] mb-2">
            Hoja de reclamación registrada en este dispositivo
          </h3>
          <p className="font-serif text-on-surface-variant/80 text-[13px] leading-relaxed">
            Todavía no tenemos un sistema que guarde esto automáticamente. Guarda o imprime esta hoja
            como tu comprobante, y envíanosla por correo para que empecemos a atenderla.
          </p>
        </div>

        <pre className="whitespace-pre-wrap font-sans text-[13px] leading-relaxed text-on-surface bg-surface-container-high/60 border border-primary-fixed-dim/15 rounded-2xl p-6">
          {texto}
        </pre>

        <div className="flex flex-wrap gap-4">
          <Button type="button" variant="primary" onClick={() => window.print()} className="rounded-full px-8 py-4">
            <Printer className="size-4" strokeWidth={2} aria-hidden="true" />
            Imprimir / Guardar PDF
          </Button>
          <Button type="button" variant="outline" onClick={() => copiarTexto(texto)} className="rounded-full px-8 py-4">
            {copiado ? <Check className="size-4" strokeWidth={2} aria-hidden="true" /> : <Copy className="size-4" strokeWidth={2} aria-hidden="true" />}
            {copiado ? "Copiado" : "Copiar texto"}
          </Button>
          <Button as="a" href={buildMailto(texto, form.tipo, form.nombre)} variant="outline" className="rounded-full px-8 py-4">
            <Mail className="size-4" strokeWidth={2} aria-hidden="true" />
            Abrir en mi correo
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setEnviado(null)}
          className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-fixed-dim hover:text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed-dim/70 focus-visible:rounded"
        >
          Registrar otra hoja
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-8 md:p-12 space-y-10">
      <div>
        <h3 className="font-sans text-[10px] font-bold text-primary-fixed-dim uppercase tracking-[0.3em] mb-4">
          Proveedor
        </h3>
        <div className="rounded-2xl border border-primary-fixed-dim/15 bg-surface-container-high/40 p-5 grid grid-cols-1 sm:grid-cols-2 gap-2 font-serif text-on-surface-variant text-[14px]">
          <p><span className="text-on-surface-variant/60">Razón social:</span> {PROVEEDOR.razonSocial}</p>
          <p><span className="text-on-surface-variant/60">RUC:</span> {PROVEEDOR.ruc}</p>
          <p className="sm:col-span-2"><span className="text-on-surface-variant/60">Domicilio:</span> {PROVEEDOR.domicilioFiscal}</p>
        </div>
      </div>

      <Field label="Tipo">
        <Select name="tipo" value={form.tipo} onChange={(e) => set("tipo", e.target.value as FormState["tipo"])}>
          <option value="Reclamo">Reclamo — disconformidad con el producto o servicio</option>
          <option value="Queja">Queja — disconformidad con la atención al cliente</option>
        </Select>
      </Field>

      <div>
        <h3 className="font-sans text-[10px] font-bold text-primary-fixed-dim uppercase tracking-[0.3em] mb-6">
          Datos del consumidor
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Nombre completo">
            <Input required name="nombre" autoComplete="name" value={form.nombre} onChange={(e) => set("nombre", e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Documento">
              <Select name="documentoTipo" value={form.documentoTipo} onChange={(e) => set("documentoTipo", e.target.value as FormState["documentoTipo"])}>
                {DOCUMENTOS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </Select>
            </Field>
            <Field label="Número">
              <Input required name="documentoNumero" value={form.documentoNumero} onChange={(e) => set("documentoNumero", e.target.value)} />
            </Field>
          </div>
          <Field label="Domicilio">
            <Input required name="domicilio" autoComplete="street-address" value={form.domicilio} onChange={(e) => set("domicilio", e.target.value)} />
          </Field>
          <Field label="Teléfono">
            <Input required type="tel" name="telefono" autoComplete="tel" value={form.telefono} onChange={(e) => set("telefono", e.target.value)} />
          </Field>
          <Field label="Correo electrónico" containerClassName="md:col-span-2">
            <Input required type="email" name="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
          </Field>
        </div>

        <label className="mt-6 flex items-center gap-3 font-sans text-[13px] text-on-surface-variant">
          <input
            type="checkbox"
            name="esMenor"
            checked={form.esMenor}
            onChange={(e) => set("esMenor", e.target.checked)}
            className="size-4 rounded border-primary-fixed-dim/40 accent-primary-fixed-dim"
          />
          El reclamante es menor de edad
        </label>

        {form.esMenor && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Nombre del padre, madre o apoderado">
              <Input required name="apoderadoNombre" value={form.apoderadoNombre} onChange={(e) => set("apoderadoNombre", e.target.value)} />
            </Field>
            <Field label="Documento del apoderado">
              <Input required name="apoderadoDocumento" value={form.apoderadoDocumento} onChange={(e) => set("apoderadoDocumento", e.target.value)} />
            </Field>
          </div>
        )}
      </div>

      <Divider />

      <div>
        <h3 className="font-sans text-[10px] font-bold text-primary-fixed-dim uppercase tracking-[0.3em] mb-6">
          Bien contratado
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Tipo">
            <Select name="bienTipo" value={form.bienTipo} onChange={(e) => set("bienTipo", e.target.value as FormState["bienTipo"])}>
              <option value="Producto">Producto</option>
              <option value="Servicio">Servicio</option>
            </Select>
          </Field>
          <Field label="Monto reclamado (S/, opcional)">
            <Input name="monto" inputMode="decimal" value={form.monto} onChange={(e) => set("monto", e.target.value)} />
          </Field>
          <Field label="Descripción" containerClassName="md:col-span-2">
            <Input required name="bien" value={form.bien} onChange={(e) => set("bien", e.target.value)} />
          </Field>
        </div>
      </div>

      <Field label={`Detalle del ${form.tipo.toLowerCase()}`}>
        <Textarea required name="detalle" rows={5} minLength={10} value={form.detalle} onChange={(e) => set("detalle", e.target.value)} />
      </Field>

      <Field label="Pedido del consumidor">
        <Textarea required name="pedido" rows={3} minLength={5} value={form.pedido} onChange={(e) => set("pedido", e.target.value)} />
      </Field>

      <p className="font-serif text-on-surface-variant/70 text-[13px] leading-relaxed">
        Conforme al D.S. 101-2022-PCM, el proveedor debe dar respuesta en un plazo no mayor a{" "}
        {PLAZO_RESPUESTA_DIAS_HABILES} días hábiles. La formulación del reclamo no impide acudir a otras
        vías de solución de controversias ni es requisito previo para interponer una denuncia ante
        Indecopi.
      </p>

      <Button type="submit" variant="primary" className="rounded-full px-10 py-5">
        Registrar {form.tipo.toLowerCase()}
        <Send className="size-4" strokeWidth={2} aria-hidden="true" />
      </Button>
    </form>
  );
}
