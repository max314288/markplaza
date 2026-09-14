"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Field, Input, Select, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";

/**
 * Hoja de Reclamación virtual (Libro de Reclamaciones), formato Indecopi
 * (D.S. 101-2022-PCM). Sin backend: el "envío" arma un `mailto:` con todos
 * los campos y abre el cliente de correo del usuario — no queda un registro
 * consultable en el sitio ni un correlativo automático. Antes de operar en
 * producción, un abogado debe confirmar que esto cumple el reglamento
 * (correlativo, plazo de respuesta de 15 días hábiles, envío a Indecopi).
 */

const RECLAMO_EMAIL = "concierge@markplaza.com";

type FormState = {
  tipo: "Reclamo" | "Queja";
  nombre: string;
  documento: string;
  domicilio: string;
  telefono: string;
  email: string;
  bien: string;
  monto: string;
  detalle: string;
  pedido: string;
};

const initial: FormState = {
  tipo: "Reclamo",
  nombre: "",
  documento: "",
  domicilio: "",
  telefono: "",
  email: "",
  bien: "",
  monto: "",
  detalle: "",
  pedido: "",
};

function buildMailto(f: FormState) {
  const lines = [
    `Fecha: ${new Date().toLocaleDateString("es-PE")}`,
    `Tipo: ${f.tipo}`,
    "",
    "Datos del consumidor",
    `Nombre: ${f.nombre}`,
    `Documento de identidad: ${f.documento}`,
    `Domicilio: ${f.domicilio}`,
    `Teléfono: ${f.telefono}`,
    `Correo: ${f.email}`,
    "",
    "Bien contratado",
    `Descripción: ${f.bien}`,
    `Monto reclamado: ${f.monto || "—"}`,
    "",
    `Detalle del ${f.tipo.toLowerCase()}`,
    f.detalle,
    "",
    "Pedido del consumidor",
    f.pedido,
  ].join("\n");

  const subject = encodeURIComponent(`Libro de Reclamaciones — ${f.tipo} de ${f.nombre || "consumidor"}`);
  return `mailto:${RECLAMO_EMAIL}?subject=${subject}&body=${encodeURIComponent(lines)}`;
}

export function ComplaintBook() {
  const [form, setForm] = useState<FormState>(initial);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = buildMailto(form);
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-8 md:p-12 space-y-10">
      <Field label="Tipo">
        <Select value={form.tipo} onChange={(e) => set("tipo", e.target.value as FormState["tipo"])}>
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
            <Input required autoComplete="name" value={form.nombre} onChange={(e) => set("nombre", e.target.value)} />
          </Field>
          <Field label="Documento de identidad">
            <Input required value={form.documento} onChange={(e) => set("documento", e.target.value)} />
          </Field>
          <Field label="Domicilio">
            <Input required autoComplete="street-address" value={form.domicilio} onChange={(e) => set("domicilio", e.target.value)} />
          </Field>
          <Field label="Teléfono">
            <Input required type="tel" autoComplete="tel" value={form.telefono} onChange={(e) => set("telefono", e.target.value)} />
          </Field>
          <Field label="Correo electrónico" containerClassName="md:col-span-2">
            <Input required type="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
          </Field>
        </div>
      </div>

      <Divider />

      <div>
        <h3 className="font-sans text-[10px] font-bold text-primary-fixed-dim uppercase tracking-[0.3em] mb-6">
          Bien contratado
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Producto o servicio">
            <Input required value={form.bien} onChange={(e) => set("bien", e.target.value)} />
          </Field>
          <Field label="Monto reclamado (S/, opcional)">
            <Input value={form.monto} onChange={(e) => set("monto", e.target.value)} />
          </Field>
        </div>
      </div>

      <Field label={`Detalle del ${form.tipo.toLowerCase()}`}>
        <Textarea required rows={5} value={form.detalle} onChange={(e) => set("detalle", e.target.value)} />
      </Field>

      <Field label="Pedido del consumidor">
        <Textarea required rows={3} value={form.pedido} onChange={(e) => set("pedido", e.target.value)} />
      </Field>

      <p className="font-serif text-on-surface-variant/70 text-[13px] leading-relaxed">
        Conforme al D.S. 101-2022-PCM, el proveedor debe dar respuesta en un plazo no mayor a 15 días
        hábiles. Al enviar, tu cliente de correo abrirá un mensaje prellenado dirigido a{" "}
        <span className="text-on-surface">{RECLAMO_EMAIL}</span>.
      </p>

      <Button type="submit" variant="primary" className="rounded-full px-10 py-5">
        Enviar {form.tipo.toLowerCase()}
        <Send className="size-4" strokeWidth={2} aria-hidden="true" />
      </Button>
    </form>
  );
}
