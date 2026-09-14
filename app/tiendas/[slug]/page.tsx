import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { SHOPS, findShop } from "@/lib/plaza/shops";

export function generateStaticParams() {
  return SHOPS.map((shop) => ({ slug: shop.slug }));
}

export async function generateMetadata(
  props: PageProps<"/tiendas/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const shop = findShop(slug);
  if (!shop) return { title: "Local no encontrado" };

  return {
    title: `${shop.label} · El Distrito`,
    description: shop.tagline,
  };
}

export default async function TiendaPage(props: PageProps<"/tiendas/[slug]">) {
  const { slug } = await props.params;
  const shop = findShop(slug);
  if (!shop) notFound();

  return (
    <div className="min-h-screen bg-surface-container-lowest relative overflow-hidden">
      <SiteHeader />

      <div className="relative z-10 pt-36 pb-24 max-w-[1440px] mx-auto px-6 md:px-10">
        <FadeIn>
          <Link
            href="/tiendas"
            className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70 transition-colors hover:text-primary-fixed-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed-dim/70 focus-visible:rounded"
          >
            <ArrowLeft className="size-3" strokeWidth={2} aria-hidden="true" />
            Directorio
          </Link>

          <h1 className="mt-10 font-serif italic text-on-surface text-4xl md:text-6xl leading-tight font-semibold">
            {shop.label}
          </h1>
          <p className="font-serif text-on-surface-variant text-[17px] leading-relaxed mt-6 max-w-2xl">
            {shop.tagline}
          </p>

          <Divider label="Próximamente" className="mt-16 max-w-xl" />

          <p className="font-serif text-on-surface-variant/70 text-[15px] leading-relaxed mt-10 max-w-xl">
            El catálogo de este local todavía está en obra. Mientras tanto,
            puedes recorrer el resto del distrito o escribirnos al concierge.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button as={Link} href="/" variant="primary">
              Volver al distrito
            </Button>
            <Button as={Link} href="/contacto" variant="outline">
              Hablar con el concierge
            </Button>
          </div>
        </FadeIn>
      </div>

      <SiteFooter />
    </div>
  );
}
