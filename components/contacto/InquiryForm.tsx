"use client";

import { useState } from "react";
import { Edit3, Loader2, Send } from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function InquiryForm() {
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
  }

  return (
    <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden">
      {/* Borde gradient izquierdo */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary-fixed-dim via-primary to-tertiary" />

      <h2 className="font-serif text-on-surface text-2xl md:text-[28px] mb-10 flex items-center gap-4 font-medium">
        <Edit3 className="size-7 text-primary-fixed-dim" strokeWidth={1.5} aria-hidden="true" />
        Solicitud de consulta
      </h2>

      <form className="space-y-7" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Nombre completo">
            <Input
              type="text"
              name="nombre"
              placeholder="Juan Pérez…"
              autoComplete="name"
            />
          </Field>
          <Field label="Correo electrónico">
            <Input
              type="email"
              name="email"
              placeholder="correo@ejemplo.com…"
              autoComplete="email"
              spellCheck={false}
            />
          </Field>
        </div>

        <Field label="Asunto">
          <Input 
            type="text" 
            name="asunto" 
            placeholder="Ej. Consulta sobre un pedido…" 
          />
        </Field>

        <Field label="Mensaje">
          <Textarea
            name="mensaje"
            rows={6}
            placeholder="¿En qué te podemos ayudar?…"
          />
        </Field>

        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            className="rounded-full px-10 py-5"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                <span>Enviando…</span>
              </>
            ) : (
              <>
                Enviar mensaje
                <Send className="size-4" strokeWidth={2} aria-hidden="true" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
