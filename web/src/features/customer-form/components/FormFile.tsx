"use client";

import { useCallback, useRef } from "react";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

export interface FormFileProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  accept?: string;
  disabled?: boolean;
}

function getFileName(val: File | string | null | undefined): string {
  if (!val) return "";
  if (val instanceof File) return val.name;
  if (typeof val === "string") return "Arquivo anexado";
  return "";
}

export function FormFile<T extends FieldValues>({
  control,
  name,
  label,
  accept = "application/pdf,image/jpeg,image/png,image/webp",
  disabled,
}: FormFileProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const fileName = getFileName(field.value);
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              {label}
            </label>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                ref={(el) => {
                  (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
                }}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file ?? null);
                }}
                disabled={disabled}
                aria-hidden
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleClick}
                disabled={disabled}
              >
                {fileName ? "Substituir arquivo" : "Selecionar arquivo"}
              </Button>
              {fileName && (
                <span className="truncate text-sm text-neutral-500">
                  {fileName}
                </span>
              )}
            </div>
            {fieldState.error && (
              <p id={`${field.name}-error`} className="text-sm text-red-500">
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
