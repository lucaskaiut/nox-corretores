import { apiService } from "./apiService";
import type { InsuranceCompany } from "@/types/insurance-company";
import type { LaravelPaginatedResponse } from "@/types/grid";

export interface ListInsuranceCompaniesParams {
  page?: number;
  per_page?: number;
  sort?: string;
  order?: "asc" | "desc";
  filters?: Record<string, string>;
}

function buildQueryString(params: ListInsuranceCompaniesParams): string {
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

export const insuranceCompaniesService = {
  async list(): Promise<InsuranceCompany[]> {
    return apiService.get<InsuranceCompany[]>("/insurance-companies");
  },

  async listPaginated(
    params: ListInsuranceCompaniesParams = {}
  ): Promise<LaravelPaginatedResponse<InsuranceCompany>> {
    const query = buildQueryString({ ...params, page: params.page ?? 1 });
    return apiService.get<LaravelPaginatedResponse<InsuranceCompany>>(
      `/insurance-companies${query}`
    );
  },

  async getById(id: number): Promise<InsuranceCompany> {
    return apiService.get<InsuranceCompany>(`/insurance-companies/${id}`);
  },

  async create(payload: { name: string }): Promise<InsuranceCompany> {
    return apiService.post<InsuranceCompany>("/insurance-companies", payload);
  },

  async update(
    id: number,
    payload: { name?: string }
  ): Promise<InsuranceCompany> {
    return apiService.put<InsuranceCompany>(`/insurance-companies/${id}`, payload);
  },
};
