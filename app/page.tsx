import { PortalScene } from "@/components/portal/PortalScene";
import { PortalDock } from "@/components/portal/PortalDock";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-surface">
      <PortalScene />
      <PortalDock />
    </main>
  );
}
