"use client";

import type { ActiveFilter } from "@/types/grid";

interface GridBadgesProps {
  filters: ActiveFilter[];
  onRemove: (key: string) => void;
}

export function GridBadges({ filters, onRemove }: GridBadgesProps) {
  if (filters.length === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {filters.map(({ key, label, value }) => (
        <span
          key={key}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary-500/15 px-3 py-1 text-sm text-primary-600 dark:text-primary-400"
        >
          <span className="font-medium">{label}:</span>
          <span>{value}</span>
          <button
            type="button"
            onClick={() => onRemove(key)}
            className="ml-1 rounded-full p-0.5 transition-colors hover:bg-primary-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label={`Remover filtro ${label}`}
          >
            <svg
              className="size-4"
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
        </span>
      ))}
    </div>
  );
}
