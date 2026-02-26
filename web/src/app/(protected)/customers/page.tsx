import { customerService } from "@/services/customerService";
import { CustomersClient } from "./customers-client";

export default async function CustomersPage() {
  const initialData = await customerService.list({
    page: 1,
    per_page: 15,
    sort: "name",
    order: "asc",
  });

  return <CustomersClient initialData={initialData} />;
}
