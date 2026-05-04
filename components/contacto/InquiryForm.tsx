"use client";

import { Edit3, Send } from "lucide-react";
import { Field, Input, Select, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function InquiryForm() {
  return (
    <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden">
      {/* Borde gradient izquierdo */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary-fixed-dim via-primary to-tertiary" />

      <h2 className="font-serif text-on-surface text-2xl md:text-[28px] mb-10 flex items-center gap-4 font-medium">
        <Edit3 className="size-7 text-primary-fixed-dim" strokeWidth={1.5} />
        Solicitud de consulta
      </h2>

      <form
        className="space-y-7"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Nombre legal">
            <Input
              type="text"
              placeholder="Sofía Aguirre"
              autoComplete="name"
            />
          </Field>
          <Field label="Firma digital">
            <Input
              type="email"
              placeholder="residente@dominio.com"
              autoComplete="email"
            />
          </Field>
        </div>

        <Field label="Naturaleza de la consulta">
          <Select defaultValue="adquisicion">
            <option value="adquisicion" className="bg-surface-container">
              Adquisición de propiedad
            </option>
            <option value="atelier" className="bg-surface-container">
              Personalización Atelier
            </option>
            <option value="soporte" className="bg-surface-container">
              Soporte técnico
            </option>
            <option value="general" className="bg-surface-container">
              Correspondencia general
            </option>
          </Select>
        </Field>

        <Field label="Correspondencia detallada">
          <Textarea
            rows={6}
            placeholder="Describe tu visión o consulta..."
          />
        </Field>

        <div className="pt-4">
          <Button type="submit" variant="primary" className="rounded-full px-10 py-5">
            Transmitir mensaje
            <Send className="size-4" strokeWidth={2} />
          </Button>
        </div>
      </form>
    </div>
  );
}
