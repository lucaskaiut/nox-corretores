"use client";

import { Controller } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Selecione...",
  disabled,
  loading,
}: FormSelectProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <label
            htmlFor={field.name}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
          <select
            id={field.name}
            value={field.value ?? ""}
            onChange={(e) => field.onChange(e.target.value)}
            onBlur={field.onBlur}
            ref={field.ref}
            disabled={disabled || loading}
            className={`flex h-11 w-full rounded-lg border bg-neutral-50 px-4 py-2 text-foreground placeholder:text-neutral-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-900/50 ${
              fieldState.error
                ? "border-red-500/70 focus-visible:border-red-500 focus-visible:ring-red-500/30"
                : "border-neutral-300 focus-visible:border-primary-500 focus-visible:ring-primary-500/30 dark:border-neutral-700"
            }`}
            aria-invalid={!!fieldState.error}
            aria-describedby={
              fieldState.error ? `${field.name}-error` : undefined
            }
          >
            <option value="">{placeholder}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {fieldState.error && (
            <p id={`${field.name}-error`} className="text-sm text-red-500">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
