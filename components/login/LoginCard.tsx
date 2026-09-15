"use client";

import { useState } from "react";
import { ArrowRight, Info } from "lucide-react";
import { Field, Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { Float } from "@/components/motion/Float";
import { CONTACTO, telHref } from "@/lib/contacto";

export function LoginCard() {
  const [enviado, setEnviado] = useState(false);

  // Sin backend todavía: no hay cuentas ni verificación. Antes esto quedaba
  // en "Entrando…" para siempre — ver PARTE A del plan de reparación.
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviado(true);
  }

  return (
    <Float className="w-full max-w-[520px]">
      <div className="glass-panel rounded-3xl p-10 md:p-14 flex flex-col items-center">
        {/* Branding */}
        <div className="mb-12 text-center">
          <span className="font-serif italic text-3xl text-primary-fixed-dim tracking-widest mb-2 block opacity-90">
            MarkPlaza
          </span>
          <h1 className="font-serif text-on-surface uppercase tracking-[0.3em] text-[14px] font-medium">
            Acceso al Portal
          </h1>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary-container/50 to-transparent mx-auto mt-6" />
        </div>

        {enviado ? (
          <div role="status" className="w-full flex gap-4 rounded-2xl border border-primary-fixed-dim/20 bg-surface-container-high/60 p-6">
            <Info className="size-5 text-primary-fixed-dim shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden="true" />
            <div className="space-y-3">
              <p className="font-serif text-on-surface text-[15px] leading-relaxed">
                El acceso con cuenta estará disponible pronto. Mientras tanto, escríbenos directo:
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
                Volver
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Form */}
            <form className="w-full space-y-7" onSubmit={handleSubmit}>
              <Field label="Correo electrónico">
                <Input
                  type="email"
                  name="email"
                  placeholder="tu@correo.com"
                  autoComplete="email"
                  spellCheck={false}
                  required
                />
              </Field>

              <Field label="Contraseña">
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                />
              </Field>

              <Button type="submit" variant="primary" className="w-full mt-8 py-5">
                <span>Entrar al distrito</span>
                <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
              </Button>
            </form>

            {/* Divider + estado */}
            <Divider label="Próximamente" className="my-10 w-full" />

            <p className="font-sans text-[12px] text-on-surface-variant/60 tracking-wide text-center leading-relaxed">
              El registro de cuentas y el acceso con Google estarán disponibles cuando el portal
              conecte con un sistema de cuentas real.
            </p>
          </>
        )}
      </div>
    </Float>
  );
}
