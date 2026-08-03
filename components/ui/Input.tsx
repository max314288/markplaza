import { cn } from "@/lib/utils";
import { useId, cloneElement, isValidElement } from "react";
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
  ReactElement,
} from "react";

type FieldProps = {
  label?: string;
  trailing?: ReactNode;
  containerClassName?: string;
};

export function Field({
  label,
  trailing,
  containerClassName,
  children,
}: {
  label?: string;
  trailing?: ReactNode;
  containerClassName?: string;
  children: ReactNode;
}) {
  const id = useId();
  const child = isValidElement(children)
    ? cloneElement(children as ReactElement<{ id?: string }>, { id })
    : children;

  return (
    <div className={cn("space-y-3", containerClassName)}>
      {(label || trailing) && (
        <div className="flex items-center justify-between ml-1">
          {label && (
            <label
              htmlFor={id}
              className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-on-surface-variant/70"
            >
              {label}
            </label>
          )}
          {trailing}
        </div>
      )}
      <div className="relative group">
        {child}
        <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary-container/0 to-transparent group-focus-within:via-primary-container/40 transition-all duration-700" />
      </div>
    </div>
  );
}

export function Input({
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & FieldProps) {
  return (
    <input
      className={cn(
        "w-full input-glass rounded-xl px-6 py-4 font-sans text-[15px] text-on-surface placeholder:text-white/15 border-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-fixed-dim/50",
        className,
      )}
      {...rest}
    />
  );
}

export function Textarea({
  className,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full input-glass rounded-xl px-6 py-4 font-sans text-[15px] text-on-surface placeholder:text-white/15 border-0 resize-none focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-fixed-dim/50",
        className,
      )}
      {...rest}
    />
  );
}

export function Select({
  className,
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full input-glass rounded-xl px-6 py-4 font-sans text-[15px] text-on-surface border-0 appearance-none cursor-pointer bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 viewBox=%220 0 12 8%22 fill=%22none%22><path d=%22M1 1L6 6L11 1%22 stroke=%22%23d4c19d%22 stroke-width=%221.5%22 stroke-linecap=%22round%22/></svg>')] bg-no-repeat bg-[right_1.5rem_center] focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-fixed-dim/50 bg-surface-container color-[inherit]",
        className,
      )}
      {...rest}
    >
      {children}
    </select>
  );
}
