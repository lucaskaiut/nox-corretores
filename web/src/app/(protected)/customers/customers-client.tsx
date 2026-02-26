"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DataGrid } from "@/components/grid";
import type { FilterField } from "@/components/grid";
import { customerService } from "@/services/customerService";
import { insuranceCompaniesService } from "@/services/insuranceCompaniesService";
import type { Customer } from "@/types/customer";
import type { ActiveFilter, LaravelPaginatedResponse, SortOrder } from "@/types/grid";

const COLUMNS = [
  { label: "Nome", accessor: "name", sortable: true },
  { label: "Telefone", accessor: "phone", sortable: false, hiddenOnMobile: true },
  {
    label: "Documento",
    accessor: "document",
    sortable: false,
    hiddenOnMobile: true,
  },
  {
    label: "Seguradora",
    accessor: "insuranceCompany.name",
    sortable: true,
    hiddenOnMobile: true,
  },
  {
    label: "Modelo",
    accessor: "vehicle.model",
    sortable: true,
    hiddenOnMobile: true,
  },
  { label: "Placa", accessor: "vehicle.plate", sortable: true },
] as const;

const FILTER_FIELDS: FilterField[] = [
  {
    key: "insuranceCompany.name",
    label: "Seguradora",
    type: "select",
    remoteFn: async () => {
      const companies = await insuranceCompaniesService.list();
      return companies.map((c) => ({ value: c.name, label: c.name }));
    },
  },
  { key: "vehicle.year", label: "Ano", type: "text" },
  { key: "vehicle.model", label: "Modelo", type: "text" },
  { key: "name", label: "Nome", type: "text" },
];

interface CustomersClientProps {
  initialData: LaravelPaginatedResponse<Customer>;
}

export function CustomersClient({ initialData }: CustomersClientProps) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const fetchData = useCallback(
    async (opts: {
      page?: number;
      sort?: string | null;
      order?: SortOrder;
      newFilters?: Record<string, string>;
    }) => {
      setLoading(true);
      try {
        const nextFilters = opts.newFilters ?? filters;
        const nextPage = opts.page ?? page;
        const nextSort = opts.sort ?? sortKey;
        const nextOrder = opts.order ?? sortOrder;

        const res = await customerService.list({
          page: nextPage,
          per_page: 15,
          sort: nextSort ?? undefined,
          order: nextOrder !== "none" ? nextOrder : undefined,
          filters: nextFilters,
        });
        setData(res);
        if (opts.page !== undefined) setPage(opts.page);
        if (opts.sort !== undefined) setSortKey(opts.sort);
        if (opts.order !== undefined) setSortOrder(opts.order);
        if (opts.newFilters !== undefined) setFilters(opts.newFilters);
      } finally {
        setLoading(false);
      }
    },
    [filters, page, sortKey, sortOrder]
  );

  const activeFilters: ActiveFilter[] = Object.entries(filters)
    .filter(([, v]) => v?.trim())
    .map(([key, value]) => {
      const field = FILTER_FIELDS.find((f) => f.key === key);
      return { key, label: field?.label ?? key, value };
    });

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage < 1 || newPage > data.meta.last_page) return;
      fetchData({ page: newPage });
    },
    [data.meta.last_page, fetchData]
  );

  const handleSortChange = useCallback(
    (key: string, order: SortOrder) => {
      const nextSort = order === "none" ? null : key;
      const nextOrder = order === "none" ? "asc" : order;
      fetchData({ sort: nextSort, order: nextOrder });
    },
    [fetchData]
  );

  const handleFilterApply = useCallback(
    (newFilters: Record<string, string>) => {
      setFilters(newFilters);
      fetchData({ page: 1, newFilters });
    },
    [fetchData]
  );

  const handleFilterRemove = useCallback(
    (key: string) => {
      const next = { ...filters };
      delete next[key];
      setFilters(next);
      fetchData({ page: 1, newFilters: next });
    },
    [filters, fetchData]
  );

  const handleEdit = useCallback(
    (row: Customer) => {
      router.push(`/customer/${row.id}/edit`);
    },
    [router]
  );

  const handleDelete = useCallback((row: Customer) => {
    console.log("Excluir", row);
  }, []);

  return (
    <div>
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            Gerencie seus clientes e informações
          </p>
        </div>
        <Link
          href="/customer/create"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary-600 px-6 font-medium text-white shadow-sm transition-colors hover:bg-primary-700"
        >
          Novo cliente
        </Link>
      </header>
      <DataGrid<Customer>
        columns={COLUMNS}
        data={data.data}
        pagination={data.meta}
        loading={loading}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
        sortKey={sortKey}
        sortOrder={sortOrder}
        activeFilters={activeFilters}
        onFilterRemove={handleFilterRemove}
        filterFields={FILTER_FIELDS}
        onFilterApply={handleFilterApply}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
