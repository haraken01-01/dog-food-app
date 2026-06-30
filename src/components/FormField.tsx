"use client";

import { useEffect, useState, type ReactNode } from "react";

type FormFieldProps = {
  label: string;
  hint?: string;
  children: ReactNode;
};

export function FormField({ label, hint, children }: FormFieldProps) {
  return (
    <label className="block">
      <span className="flex min-h-10 flex-col justify-end">
        <span className="text-sm font-semibold text-ink">{label}</span>
        {hint ? <span className="text-xs leading-5 text-slate-500">{hint}</span> : null}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

export const inputClass =
  "focus-ring w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-ink shadow-sm";

type NumericInputProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export function NumericInput({ value, onChange, min, max, step }: NumericInputProps) {
  const [draft, setDraft] = useState(() => toInputValue(value));
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setDraft(toInputValue(value));
    }
  }, [isFocused, value]);

  return (
    <input
      className={inputClass}
      inputMode="decimal"
      max={max}
      min={min}
      step={step}
      type="number"
      value={draft}
      onBlur={() => {
        setIsFocused(false);
        setDraft(toInputValue(value));
      }}
      onChange={(event) => {
        const normalized = normalizeNumericDraft(event.target.value);
        setDraft(normalized);
        onChange(normalized === "" ? Number.NaN : Number(normalized));
      }}
      onFocus={() => setIsFocused(true)}
    />
  );
}

function toInputValue(value: number): string {
  return Number.isFinite(value) ? String(value) : "";
}

function normalizeNumericDraft(value: string): string {
  if (value === "") {
    return "";
  }

  if (/^0+\d/.test(value)) {
    return String(Number(value));
  }

  return value;
}
