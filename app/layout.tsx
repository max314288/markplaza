import type { Metadata } from "next";
import { Manrope, Noto_Serif } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const description =
  "MarkPlaza: tu distrito de compras. Un directorio ilustrado de tiendas (ferretería, boutique, estampados, juguetería y librería) y marketplaces asociados.";

export const metadata: Metadata = {
  title: {
    default: "MarkPlaza · Distrito Comercial Virtual",
    template: "%s · MarkPlaza",
  },
  description,
  metadataBase: new URL("https://savemarks.com"),
  openGraph: {
    title: "MarkPlaza · Tu distrito de compras",
    description,
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MarkPlaza · Tu distrito de compras",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`dark ${notoSerif.variable} ${manrope.variable}`}
    >
      <body className="min-h-screen bg-surface-container-lowest text-on-background">
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
