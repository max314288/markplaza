import { cn } from "@/lib/utils";

type DividerProps = {
  label?: string;
  className?: string;
};

export function Divider({ label, className }: DividerProps) {
  if (!label) {
    return <div className={cn("gold-divider w-full", className)} />;
  }

  return (
    <div className={cn("flex items-center gap-6", className)}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary-fixed-dim/15" />
      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-primary-fixed-dim/40 whitespace-nowrap">
        {label}
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary-fixed-dim/15" />
    </div>
  );
}
