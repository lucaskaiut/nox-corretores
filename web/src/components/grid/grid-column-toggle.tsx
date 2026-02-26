"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { GridColumn } from "@/types/grid";

interface GridColumnToggleProps<T> {
  columns: readonly GridColumn<T>[];
  visible: Set<string>;
  onToggle: (accessor: string) => void;
}

export function GridColumnToggle<T extends object>({
  columns,
  visible,
  onToggle,
}: GridColumnToggleProps<T>) {
  const [open, setOpen] = useState(false);

  const toggleableColumns = columns.filter((c) => c.hiddenOnMobile);

  if (toggleableColumns.length === 0) return null;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Colunas
        <svg
          className={`ml-2 size-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            className="absolute right-0 top-full z-40 mt-2 min-w-48 rounded-lg border border-neutral-200 bg-white py-2 shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
            role="menu"
          >
            {toggleableColumns.map((col) => (
              <button
                key={col.accessor}
                type="button"
                onClick={() => onToggle(col.accessor)}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-foreground transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700"
                role="menuitemcheckbox"
                aria-checked={visible.has(col.accessor)}
              >
                <span
                  className={`inline-flex size-4 items-center justify-center rounded border ${
                    visible.has(col.accessor)
                      ? "border-primary-500 bg-primary-500"
                      : "border-neutral-300 dark:border-neutral-600"
                  }`}
                >
                  {visible.has(col.accessor) && (
                    <svg
                      className="size-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                {col.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
