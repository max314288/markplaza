"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Field, Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { Float } from "@/components/motion/Float";

export function LoginCard() {
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
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

        {/* Form */}
        <form className="w-full space-y-7" onSubmit={handleSubmit}>
          <Field label="ID Universal">
            <Input
              type="email"
              name="email"
              placeholder="residente@markplaza.com"
              autoComplete="email"
              spellCheck={false}
            />
          </Field>

          <Field
            label="Frase clave"
            trailing={
              <a
                href="#"
                className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-fixed-dim/60 hover:text-primary-fixed-dim transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-fixed-dim/70 focus-visible:rounded"
              >
                ¿Acceso perdido?
              </a>
            }
          >
            <Input
              type="password"
              name="password"
              placeholder="••••••••••••"
              autoComplete="current-password"
            />
          </Field>

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-8 py-5"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                <span>Entrando…</span>
              </>
            ) : (
              <>
                <span>Entrar al distrito</span>
                <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
              </>
            )}
          </Button>
        </form>

        {/* Divider + social */}
        <Divider label="Verificación de identidad" className="my-10 w-full" />

        <div className="flex gap-4 w-full">
          <Button as="button" variant="outline" className="flex-1 py-4">
            Google
          </Button>
          <Button as="button" variant="outline" className="flex-1 py-4">
            Apple
          </Button>
        </div>

        {/* Registro */}
        <p className="mt-12 font-sans text-[13px] text-on-surface-variant/60 tracking-wide text-center">
          ¿Buscas residencia?{" "}
          <a
            href="#"
            className="text-primary-fixed-dim font-semibold ml-1 hover:text-primary transition-colors border-b border-primary-fixed-dim/30 hover:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-fixed-dim/70 focus-visible:rounded"
          >
            Solicita tu Atelier
          </a>
        </p>
      </div>
    </Float>
  );
}
