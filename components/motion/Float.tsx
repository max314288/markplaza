import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Float({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("motion-safe:animate-float", className)}>{children}</div>;
}
