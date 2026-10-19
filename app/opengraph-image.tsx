import { ImageResponse } from "next/og";

// Export estático: igual que `sitemap.ts`/`robots.ts`, requiere marcarse
// explícitamente como estático.
export const dynamic = "force-static";

export const alt = "MarkPlaza — Tu distrito de compras";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// `ImageResponse` renderiza con Satori, no con Tailwind: no puede leer las
// variables `--color-*` de `app/globals.css`, así que los valores van
// literales aquí (son los mismos tokens de Emerald Velvet / "Plaza de día").
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          backgroundColor: "#fbf9ed",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(131,157,128,0.16), transparent 45%), radial-gradient(circle at 85% 75%, rgba(212,193,157,0.25), transparent 45%)",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontStyle: "italic",
            color: "#4b463d",
          }}
        >
          MarkPlaza
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#6f695c",
            letterSpacing: 2,
          }}
        >
          Tu distrito de compras
        </div>
      </div>
    ),
    { ...size },
  );
}
