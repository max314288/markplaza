import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline";

type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
  variant?: Variant;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "children">;

const variantClasses: Record<Variant, string> = {
  primary:
    "gold-glow bg-gradient-to-br from-primary-container to-primary-fixed-dim text-on-primary-container shadow-xl",
  ghost:
    "bg-transparent text-on-surface-variant hover:text-primary-fixed-dim border border-transparent hover:border-primary-fixed-dim/30",
  outline:
    "bg-white/[0.02] hover:bg-white/[0.05] text-on-surface-variant/70 hover:text-on-surface-variant border border-primary-fixed-dim/10 hover:border-primary-fixed-dim/30",
};

export function Button<T extends ElementType = "button">({
  as,
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps<T>) {
  const Component = (as ?? "button") as ElementType;
  return (
    <Component
      className={cn(
        "relative inline-flex items-center justify-center gap-3 rounded-xl px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.3em] transition-[color,background-color,border-color,box-shadow,transform,opacity] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed-dim/70 focus-visible:ring-offset-1 focus-visible:ring-offset-surface",
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
