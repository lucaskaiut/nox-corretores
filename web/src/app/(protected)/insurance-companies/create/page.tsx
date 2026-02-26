import { InsuranceCompanyCreateClient } from "./insurance-company-create-client";

export const metadata = {
  title: "Nova Seguradora",
  description: "Cadastre uma nova seguradora",
};

export default function InsuranceCompanyCreatePage() {
  return <InsuranceCompanyCreateClient />;
}
