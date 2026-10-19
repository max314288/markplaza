import type { Viewport } from "next";
import { PlazaScene } from "@/components/plaza/PlazaScene";
import { PlazaActions, PlazaHeadline } from "@/components/plaza/PlazaHud";
import { PlazaNavBar } from "@/components/plaza/PlazaNavBar";

export const viewport: Viewport = {
  themeColor: "#fbf9ed",
  colorScheme: "light",
};

export default function HomePage() {
  return (
    <div id="plaza-dia" className="plaza-page">
      <header className="plaza-bar-slot">
        <PlazaNavBar />
      </header>
      <div className="plaza-frame">
        <PlazaHeadline />
        <PlazaScene />
        <PlazaActions />
      </div>
    </div>
  );
}
