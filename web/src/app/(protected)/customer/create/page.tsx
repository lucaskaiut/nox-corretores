import { CustomerCreateClient } from "./customer-create-client";

export const metadata = {
  title: "Novo Cliente",
  description: "Cadastre um novo cliente",
};

export default function CustomerCreatePage() {
  return <CustomerCreateClient />;
}
