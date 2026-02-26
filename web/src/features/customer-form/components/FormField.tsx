"use client";

import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

export interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  type?: "text" | "email" | "tel" | "number";
  placeholder?: string;
  disabled?: boolean;
}

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  disabled,
}: FormFieldProps<T>) {
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
          <Input
            id={field.name}
            type={type}
            placeholder={placeholder}
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            ref={field.ref}
            error={!!fieldState.error}
            disabled={disabled}
            aria-invalid={!!fieldState.error}
            aria-describedby={
              fieldState.error ? `${field.name}-error` : undefined
            }
          />
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
