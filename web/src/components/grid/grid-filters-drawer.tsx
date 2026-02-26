"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export interface SelectOption {
  value: string;
  label: string;
}

export type FilterField =
  | { key: string; label: string; type: "text" }
  | {
      key: string;
      label: string;
      type: "select";
      remoteFn?: () => Promise<SelectOption[]>;
      options?: SelectOption[];
    };

function FilterFieldInput({
  field,
  value,
  onChange,
}: {
  field: FilterField;
  value: string;
  onChange: (value: string) => void;
}) {
  const { key, label } = field;

  if (field.type === "text") {
    return (
      <div>
        <label
          htmlFor={`filter-${key}`}
          className="mb-2 block text-sm font-medium text-foreground"
        >
          {label}
        </label>
        <Input
          id={`filter-${key}`}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Filtrar por ${label.toLowerCase()}`}
          className="w-full"
        />
      </div>
    );
  }

  return (
    <FilterFieldSelect
      field={field}
      value={value}
      onChange={onChange}
    />
  );
}

function FilterFieldSelect({
  field,
  value,
  onChange,
}: {
  field: Extract<FilterField, { type: "select" }>;
  value: string;
  onChange: (value: string) => void;
}) {
  const { key, label } = field;
  const [options, setOptions] = useState<SelectOption[]>(field.options ?? []);
  const [loading, setLoading] = useState(!!field.remoteFn);

  useEffect(() => {
    if (field.remoteFn) {
      field.remoteFn().then((data) => {
        setOptions(data);
        setLoading(false);
      });
    }
  }, [field.remoteFn]);

  const baseClass =
    "flex h-11 w-full rounded-lg border bg-neutral-50 px-4 py-2 text-foreground transition-colors dark:bg-neutral-900/50";
  const borderClass =
    "border-neutral-300 focus-visible:border-primary-500 focus-visible:ring-primary-500/30 dark:border-neutral-700";
  const focusClass =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div>
      <label
        htmlFor={`filter-${key}`}
        className="mb-2 block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <select
        id={`filter-${key}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
        className={`${baseClass} ${borderClass} ${focusClass}`}
      >
        <option value="">Selecione...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface GridFiltersDrawerProps {
  open: boolean;
  onClose: () => void;
  fields: FilterField[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onApply: () => void;
  onClear: () => void;
}

export function GridFiltersDrawer({
  open,
  onClose,
  fields,
  values,
  onChange,
  onApply,
  onClear,
}: GridFiltersDrawerProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden
      />
      <aside
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col border-l border-neutral-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="filters-title"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
          <h2 id="filters-title" className="text-lg font-semibold text-foreground">
            Filtrar
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-foreground dark:hover:bg-neutral-800"
            aria-label="Fechar"
          >
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {fields.map((field) => (
              <FilterFieldInput
                key={field.key}
                field={field}
                value={values[field.key] ?? ""}
                onChange={(value) => onChange(field.key, value)}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-3 border-t border-neutral-200 p-6 dark:border-neutral-800">
          <Button variant="secondary" onClick={onClear} className="flex-1">
            Limpar
          </Button>
          <Button onClick={onApply} className="flex-1">
            Aplicar
          </Button>
        </div>
      </aside>
    </>
  );
}
