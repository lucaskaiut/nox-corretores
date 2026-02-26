import { apiService } from "./apiService";
import type { InsuranceCompany } from "@/types/insurance-company";

export const insuranceCompaniesService = {
  async list(): Promise<InsuranceCompany[]> {
    return apiService.get<InsuranceCompany[]>("/insurance-companies");
  },
};
