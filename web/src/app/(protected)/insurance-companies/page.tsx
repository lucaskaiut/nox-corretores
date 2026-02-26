import { insuranceCompaniesService } from "@/services/insuranceCompaniesService";
import { InsuranceCompaniesClient } from "./insurance-companies-client";

export default async function InsuranceCompaniesPage() {
  const initialData = await insuranceCompaniesService.listPaginated({
    page: 1,
    per_page: 15,
    sort: "name",
    order: "asc",
  });

  return <InsuranceCompaniesClient initialData={initialData} />;
}
