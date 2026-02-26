import { InsuranceCompanyEditClient } from "./insurance-company-edit-client";

export const metadata = {
  title: "Editar Seguradora",
  description: "Edite os dados da seguradora",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InsuranceCompanyEditPage({ params }: PageProps) {
  const { id } = await params;
  return <InsuranceCompanyEditClient id={id} />;
}
