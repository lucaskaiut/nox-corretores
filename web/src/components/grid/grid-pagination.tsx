"use client";

import type { PaginationMeta } from "@/types/grid";

interface GridPaginationProps {
  meta: PaginationMeta;
  loading?: boolean;
  onPageChange: (page: number) => void;
}

export function GridPagination({
  meta,
  loading = false,
  onPageChange,
}: GridPaginationProps) {
  const { current_page, last_page, from, to, total } = meta;

  if (total === 0) return null;

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-200 px-4 py-4 sm:flex-row dark:border-neutral-800">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Mostrando <span className="font-medium">{from ?? 0}</span> a{" "}
        <span className="font-medium">{to ?? 0}</span> de{" "}
        <span className="font-medium">{total}</span> resultados
      </p>
      <nav
        className="flex items-center gap-2"
        aria-label="Paginação"
      >
        <button
          type="button"
          onClick={() => onPageChange(current_page - 1)}
          disabled={current_page <= 1 || loading}
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          Anterior
        </button>
        <div className="flex items-center gap-1">
          {meta.links
            .filter((link) => link.label !== "&laquo; Anterior" && link.label !== "Próximo &raquo;")
            .map((link) => (
              <button
                key={link.page ?? link.label}
                type="button"
                onClick={() => link.page != null && onPageChange(link.page)}
                disabled={link.url === null || loading}
                className={`min-w-[2.5rem] rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  link.active
                    ? "bg-primary-600 text-white"
                    : "border border-neutral-300 text-foreground hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
                }`}
                aria-current={link.active ? "page" : undefined}
              >
                {link.label}
              </button>
            ))}
        </div>
        <button
          type="button"
          onClick={() => onPageChange(current_page + 1)}
          disabled={current_page >= last_page || loading}
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          Próxima
        </button>
      </nav>
    </div>
  );
}
