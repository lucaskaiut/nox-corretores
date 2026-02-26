import { CustomerEditClient } from "./customer-edit-client";

export const metadata = {
  title: "Editar Cliente",
  description: "Edite os dados do cliente",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CustomerEditPage({ params }: PageProps) {
  const { id } = await params;
  return <CustomerEditClient id={id} />;
}
