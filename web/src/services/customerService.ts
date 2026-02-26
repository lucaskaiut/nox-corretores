import { apiService } from "./apiService";
import type { Customer } from "@/types/customer";
import type { LaravelPaginatedResponse } from "@/types/grid";

export interface ListCustomersParams {
  page?: number;
  per_page?: number;
  sort?: string;
  order?: "asc" | "desc";
  filters?: Record<string, string>;
}

function buildQueryString(params: ListCustomersParams): string {
  const search = new URLSearchParams();
  if (params.page != null) search.set("page", String(params.page));
  if (params.per_page != null) search.set("per_page", String(params.per_page));
  if (params.sort) search.set("sort", params.sort);
  if (params.order) search.set("order", params.order);
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      search.set(`filter[${key}]`, value);
    });
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export const customerService = {
  async list(params: ListCustomersParams = {}): Promise<
    LaravelPaginatedResponse<Customer>
  > {
    const query = buildQueryString(params);
    return apiService.get<LaravelPaginatedResponse<Customer>>(
      `/customers${query}`
    );
  },
};
