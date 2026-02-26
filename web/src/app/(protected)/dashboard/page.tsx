import { getServerUser } from "@/lib/auth";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const user = await getServerUser();

  return <DashboardClient user={user!} />;
}
