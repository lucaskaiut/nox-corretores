"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { User } from "@/types/auth";

interface DashboardClientProps {
  user: User;
}

export function DashboardClient({ user }: DashboardClientProps) {
  const { logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-neutral-950 p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <Button
            variant="secondary"
            onClick={handleLogout}
            loading={loading}
            size="sm"
          >
            Sair
          </Button>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo</CardTitle>
            <CardDescription>
              Você está autenticado e acessando uma rota protegida.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-neutral-400">Nome</p>
              <p className="text-lg font-medium text-foreground">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-400">E-mail</p>
              <p className="text-lg font-medium text-foreground">{user.email}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
