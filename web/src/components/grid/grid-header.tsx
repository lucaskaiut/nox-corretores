"use client";

import { useMemo } from "react";
import { useIsMobile } from "@/hooks/use-media-query";
import type { GridColumn } from "@/types/grid";
import type { SortOrder } from "@/types/grid";

interface GridHeaderProps<T> {
  columns: readonly GridColumn<T>[];
  sortKey: string | null;
  sortOrder: SortOrder;
  onSort: (accessor: string) => void;
  showMobileExpand?: boolean;
}

export function GridHeader<T extends object>({
  columns,
  sortKey,
  sortOrder,
  onSort,
  showMobileExpand = false,
}: GridHeaderProps<T>) {
  const isMobile = useIsMobile();
  const visibleColumns = useMemo(
    () =>
      isMobile
        ? columns.filter((c) => !c.hiddenOnMobile)
        : [...columns],
    [columns, isMobile]
  );

  return (
    <thead className="sticky top-0 z-10 border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/95">
      <tr>
        <th
          scope="col"
          className="border-b border-neutral-200 px-2 py-3 text-right dark:border-neutral-800"
          style={{ width: 48, minWidth: 48 }}
        />
        {showMobileExpand && (
          <th
            scope="col"
            className="w-10 shrink-0 border-b border-neutral-200 px-4 py-3 text-left md:w-12 dark:border-neutral-800"
            aria-hidden
          />
        )}
        {visibleColumns.map((col) => {
          const isSorted = sortKey === col.accessor && sortOrder !== "none";
          return (
            <th
              key={col.accessor}
              scope="col"
              className={`min-w-0 border-b border-neutral-200 px-3 py-3 text-left text-sm font-semibold text-foreground dark:border-neutral-800 md:px-4 ${
                col.sortable ? "cursor-pointer select-none" : ""
              }`}
              onClick={() => col.sortable && onSort(col.accessor)}
            >
              <span className="inline-flex min-w-0 items-center gap-1.5 truncate whitespace-nowrap">
                {col.label}
                {col.sortable && (
                  <span
                    className={`inline-flex transition-opacity ${
                      isSorted ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    {sortOrder === "asc" && sortKey === col.accessor ? (
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
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : sortOrder === "desc" && sortKey === col.accessor ? (
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
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    ) : (
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
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    )}
                  </span>
                )}
              </span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
