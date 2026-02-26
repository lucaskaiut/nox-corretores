import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/auth";
import { SidebarLayout } from "@/components/layout/sidebar-layout";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser();

  if (!user) {
    redirect("/login");
  }

  return <SidebarLayout>{children}</SidebarLayout>;
}
