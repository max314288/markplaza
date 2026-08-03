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

export const metadata: Metadata = {
  title: {
    default: "MarkPlaza · Distrito Comercial Virtual",
    template: "%s · MarkPlaza",
  },
  description:
    "MarkPlaza es un portal de tiendas premium: arquitectura digital, comercio espacial y experiencias curadas para residentes y visitantes del distrito.",
  metadataBase: new URL("https://markplaza.local"),
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
