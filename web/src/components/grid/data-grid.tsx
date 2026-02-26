"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { GridBadges } from "./grid-badges";
import { GridColumnToggle } from "./grid-column-toggle";
import { GridFiltersDrawer, type FilterField } from "./grid-filters-drawer";
import { GridHeader } from "./grid-header";
import { GridPagination } from "./grid-pagination";
import { GridRow } from "./grid-row";
import type { GridColumn } from "@/types/grid";
import type { ActiveFilter, PaginationMeta, SortOrder } from "@/types/grid";

export interface DataGridProps<T extends object> {
  columns: readonly GridColumn<T>[];
  data: T[];
  pagination: PaginationMeta;
  loading?: boolean;
  onPageChange: (page: number) => void;
  onSortChange: (key: string, order: SortOrder) => void;
  sortKey: string | null;
  sortOrder: SortOrder;
  activeFilters?: ActiveFilter[];
  onFilterRemove?: (key: string) => void;
  filterFields?: FilterField[];
  onFilterApply?: (filters: Record<string, string>) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export function DataGrid<T extends object>({
  columns,
  data,
  pagination,
  loading = false,
  onPageChange,
  onSortChange,
  sortKey,
  sortOrder,
  activeFilters = [],
  onFilterRemove,
  filterFields = [],
  onFilterApply,
  onEdit,
  onDelete,
}: DataGridProps<T>) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterFormValues, setFilterFormValues] = useState<Record<string, string>>({});

  const hasFilterSupport = filterFields.length > 0 && onFilterApply;
  const hasHiddenOnMobile = columns.some((c) => c.hiddenOnMobile);

  const handleOpenDrawer = useCallback(() => {
    const values: Record<string, string> = {};
    activeFilters.forEach((f) => {
      values[f.key] = f.value;
    });
    setFilterFormValues(values);
    setDrawerOpen(true);
  }, [activeFilters]);

  const handleFilterFormChange = useCallback((key: string, value: string) => {
    setFilterFormValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleFilterApply = useCallback(() => {
    const cleaned: Record<string, string> = {};
    Object.entries(filterFormValues).forEach(([k, v]) => {
      if (v?.trim()) cleaned[k] = v.trim();
    });
    onFilterApply?.(cleaned);
    setDrawerOpen(false);
  }, [filterFormValues, onFilterApply]);

  const handleFilterClear = useCallback(() => {
    setFilterFormValues({});
    onFilterApply?.({});
    setDrawerOpen(false);
  }, [onFilterApply]);

  return (
    <div className="flex max-h-[calc(100svh-8rem)] min-h-0 flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900/50">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          {hasFilterSupport && (
            <Button variant="secondary" size="sm" onClick={handleOpenDrawer}>
              <svg
                className="mr-2 size-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filtrar
            </Button>
          )}
        </div>
      </div>

      <div className="shrink-0">
        <GridBadges
          filters={activeFilters}
          onRemove={onFilterRemove ?? (() => {})}
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        <table className="w-full table-fixed">
          <GridHeader
            columns={columns}
            sortKey={sortKey}
            sortOrder={sortOrder}
            onSort={(accessor) => {
              const col = columns.find((c) => c.accessor === accessor);
              if (!col?.sortable) return;
              const next: SortOrder =
                sortKey === accessor
                  ? sortOrder === "asc"
                    ? "desc"
                    : sortOrder === "desc"
                      ? "none"
                      : "asc"
                  : "asc";
              onSortChange(accessor, next);
            }}
            showMobileExpand={hasHiddenOnMobile}
          />
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="px-4 py-16 text-center text-neutral-500"
                >
                  <div className="flex flex-col items-center gap-3">
                    <svg
                      className="size-10 animate-spin text-primary-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Carregando...</span>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, idx) => {
                const id = (row as { id?: unknown }).id ?? idx;
                return (
                  <RowWithExpandState
                    key={String(id)}
                    row={row}
                    columns={columns}
                    hasHiddenOnMobile={hasHiddenOnMobile}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination.total > 0 && (
        <div className="shrink-0 border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900/50">
          <GridPagination
            meta={pagination}
            loading={loading}
            onPageChange={onPageChange}
          />
        </div>
      )}

      {hasFilterSupport && (
        <GridFiltersDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          fields={filterFields}
          values={filterFormValues}
          onChange={handleFilterFormChange}
          onApply={handleFilterApply}
          onClear={handleFilterClear}
        />
      )}
    </div>
  );
}

function RowWithExpandState<T extends object>({
  row,
  columns,
  hasHiddenOnMobile,
  onEdit,
  onDelete,
}: {
  row: T;
  columns: readonly GridColumn<T>[];
  hasHiddenOnMobile: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <GridRow
      row={row}
      columns={columns}
      expanded={expanded}
      onToggleExpand={() => setExpanded((e) => !e)}
      onEdit={onEdit}
      onDelete={onDelete}
      hasHiddenOnMobile={hasHiddenOnMobile}
    />
  );
}
