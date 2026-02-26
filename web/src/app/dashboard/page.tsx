import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/auth";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const user = await getServerUser();

  if (!user) {
    redirect("/login?from=/dashboard");
  }

  return <DashboardClient user={user} />;
}
