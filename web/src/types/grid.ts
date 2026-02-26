export interface GridColumn<T = Record<string, unknown>> {
  label: string;
  accessor: string;
  sortable?: boolean;
  hiddenOnMobile?: boolean;
}

export type SortOrder = "asc" | "desc" | "none";

export interface PaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  links: Array<{
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }>;
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface LaravelPaginatedResponse<T> {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface ActiveFilter {
  key: string;
  label: string;
  value: string;
}
