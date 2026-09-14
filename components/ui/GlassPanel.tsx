import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type GlassPanelProps<T extends ElementType = "div"> = {
  as?: T;
  variant?: "default" | "soft";
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "children">;

export function GlassPanel<T extends ElementType = "div">({
  as,
  variant = "default",
  className,
  children,
  ...rest
}: GlassPanelProps<T>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component
      className={cn(
        variant === "default" ? "glass-panel" : "glass-panel-soft",
        "rounded-2xl",
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
