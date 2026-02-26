"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { getValueByPath } from "@/lib/get-value-by-path";
import { useIsMobile } from "@/hooks/use-media-query";
import type { GridColumn } from "@/types/grid";

interface GridRowProps<T> {
  row: T;
  columns: readonly GridColumn<T>[];
  expanded: boolean;
  onToggleExpand: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  hasHiddenOnMobile: boolean;
}

export function GridRow<T extends object>({
  row,
  columns,
  expanded,
  onToggleExpand,
  onEdit,
  onDelete,
  hasHiddenOnMobile,
}: GridRowProps<T>) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const visibleColumns = useMemo(
    () =>
      isMobile
        ? columns.filter((c) => !c.hiddenOnMobile)
        : [...columns],
    [columns, isMobile]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuOpen &&
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const updateMenuPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({ top: rect.bottom + 4, left: rect.left });
    }
  };

  const handleToggleMenu = () => {
    if (!menuOpen) updateMenuPosition();
    setMenuOpen((o) => !o);
  };

  const obj = row as object & Record<string, unknown>;

  return (
    <>
      <tr className="group border-b border-neutral-200 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50">
        <td
          className="px-2 py-3 text-right align-middle"
          style={{ width: 48, minWidth: 48 }}
        >
          {(onEdit || onDelete) && (
            <div className="relative inline-flex justify-end">
              <button
                ref={buttonRef}
                type="button"
                onClick={handleToggleMenu}
                className="flex size-8 shrink-0 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:bg-neutral-200 hover:text-foreground dark:hover:bg-neutral-700"
                aria-haspopup="true"
                aria-expanded={menuOpen}
                aria-label="Ações"
              >
                <svg
                  className="size-5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="6" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="18" r="1.5" />
                </svg>
              </button>
              {menuOpen &&
                createPortal(
                  <div
                    ref={menuRef}
                    className="fixed z-[100] min-w-40 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
                    style={{ top: menuPosition.top, left: menuPosition.left }}
                    role="menu"
                  >
                  {onEdit && (
                    <button
                      type="button"
                      onClick={() => {
                        onEdit(row);
                        setMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-foreground transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      role="menuitem"
                    >
                      Editar
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => {
                        onDelete(row);
                        setMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      role="menuitem"
                    >
                      Excluir
                    </button>
                  )}
                  </div>,
                  document.body
                )}
            </div>
          )}
        </td>
        {hasHiddenOnMobile && (
          <td className="w-10 shrink-0 px-4 py-3 md:w-12">
            <button
              type="button"
              onClick={onToggleExpand}
              className="flex size-8 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-foreground md:hidden dark:hover:bg-neutral-700"
              aria-expanded={expanded}
              aria-label={expanded ? "Recolher" : "Expandir"}
            >
              <svg
                className={`size-5 transition-transform ${expanded ? "rotate-180" : ""}`}
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
            </button>
          </td>
        )}
        {visibleColumns.map((col) => {
          const value = getValueByPath<string | number>(obj, col.accessor);
          const display = value ?? "—";
          return (
            <td
              key={col.accessor}
              className="min-w-0 px-3 py-3 text-sm text-foreground md:px-4"
            >
              <span className="block min-w-0 truncate md:whitespace-normal">
                {display}
              </span>
            </td>
          );
        })}
      </tr>
      {hasHiddenOnMobile && expanded && (
        <tr className="md:hidden">
          <td
            colSpan={
              1 +
              (hasHiddenOnMobile ? 1 : 0) +
              columns.filter((c) => !c.hiddenOnMobile).length
            }
            className="border-b border-neutral-200 bg-neutral-50 px-4 py-4 dark:border-neutral-800 dark:bg-neutral-900/50"
          >
            <div className="grid gap-2 sm:grid-cols-2">
              {columns
                .filter((c) => c.hiddenOnMobile)
                .map((col) => {
                  const value = getValueByPath<string | number>(obj, col.accessor);
                  return (
                    <div
                      key={col.accessor}
                      className="flex flex-col text-sm"
                    >
                      <span className="font-medium text-neutral-500 dark:text-neutral-400">
                        {col.label}
                      </span>
                      <span className="text-foreground">{value ?? "—"}</span>
                    </div>
                  );
                })}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
