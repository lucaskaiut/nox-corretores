"use client";

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
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
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
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Nome</p>
            <p className="text-lg font-medium text-foreground">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">E-mail</p>
            <p className="text-lg font-medium text-foreground">{user.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
