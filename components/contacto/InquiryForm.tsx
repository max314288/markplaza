"use client";

import { useState } from "react";
import { Edit3, Info, Send } from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CONTACTO, telHref } from "@/lib/contacto";

export function InquiryForm() {
  const [enviado, setEnviado] = useState(false);

  // Sin backend todavía: no hay a dónde mandar el formulario. En vez de
  // dejarlo "Enviando…" para siempre, se avisa y se ofrecen los canales
  // reales — ver PARTE A del plan de reparación.
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviado(true);
  }

  return (
    <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden">
      {/* Borde gradient izquierdo */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary-fixed-dim via-primary to-tertiary" />

      <h2 className="font-serif text-on-surface text-2xl md:text-[28px] mb-10 flex items-center gap-4 font-medium">
        <Edit3 className="size-7 text-primary-fixed-dim" strokeWidth={1.5} aria-hidden="true" />
        Solicitud de consulta
      </h2>

      {enviado ? (
        <div role="status" className="flex gap-4 rounded-2xl border border-primary-fixed-dim/20 bg-surface-container-high/60 p-6">
          <Info className="size-5 text-primary-fixed-dim shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden="true" />
          <div className="space-y-3">
            <p className="font-serif text-on-surface text-[15px] leading-relaxed">
              El envío de mensajes desde este formulario estará disponible pronto. Mientras tanto,
              escríbenos directo:
            </p>
            <p className="font-sans text-[13px] text-on-surface-variant space-x-1">
              <a href={`mailto:${CONTACTO.email}`} className="text-primary-fixed-dim underline underline-offset-2 hover:text-primary">
                {CONTACTO.email}
              </a>
              <span aria-hidden="true">·</span>
              <a href={telHref(CONTACTO.telefonos[0])} className="text-primary-fixed-dim underline underline-offset-2 hover:text-primary">
                {CONTACTO.telefonos[0]}
              </a>
            </p>
            <button
              type="button"
              onClick={() => setEnviado(false)}
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-fixed-dim hover:text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed-dim/70 focus-visible:rounded"
            >
              Volver al formulario
            </button>
          </div>
        </div>
      ) : (
        <form className="space-y-7" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Nombre completo">
              <Input
                type="text"
                name="nombre"
                placeholder="Juan Pérez…"
                autoComplete="name"
                required
              />
            </Field>
            <Field label="Correo electrónico">
              <Input
                type="email"
                name="email"
                placeholder="correo@ejemplo.com…"
                autoComplete="email"
                spellCheck={false}
                required
              />
            </Field>
          </div>

          <Field label="Asunto">
            <Input
              type="text"
              name="asunto"
              placeholder="Ej. Consulta sobre un pedido…"
              required
            />
          </Field>

          <Field label="Mensaje">
            <Textarea
              name="mensaje"
              rows={6}
              placeholder="¿En qué te podemos ayudar?…"
              minLength={10}
              required
            />
          </Field>

          <div className="pt-4">
            <Button type="submit" variant="primary" className="rounded-full px-10 py-5">
              Enviar mensaje
              <Send className="size-4" strokeWidth={2} aria-hidden="true" />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
