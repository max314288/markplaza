import { MarketplaceScene } from "@/components/portal/MarketplaceScene";
import { PortalDock } from "@/components/portal/PortalDock";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-surface-container-lowest">
      <MarketplaceScene />
      <PortalDock />
    </main>
  );
}
