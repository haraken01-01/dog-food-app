import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  hint?: string;
  children: ReactNode;
};

export function FormField({ label, hint, children }: FormFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      {hint ? <span className="ml-2 text-xs text-slate-500">{hint}</span> : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}

export const inputClass =
  "focus-ring w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-ink shadow-sm";
