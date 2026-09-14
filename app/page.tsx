import type { Viewport } from "next";
import { PlazaScene } from "@/components/plaza/PlazaScene";
import { PlazaActions, PlazaHeadline } from "@/components/plaza/PlazaHud";

export const viewport: Viewport = {
  themeColor: "#fbf9ed",
  colorScheme: "light",
};

export default function HomePage() {
  return (
    <div id="plaza-dia" className="plaza-page">
      <div className="plaza-frame">
        <PlazaHeadline />
        <PlazaScene />
        <PlazaActions />
      </div>
    </div>
  );
}
