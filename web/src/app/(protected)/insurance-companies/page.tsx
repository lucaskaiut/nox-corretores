import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function InsuranceCompaniesPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Seguradoras</h1>
        <p className="mt-1 text-neutral-400">
          Gerencie seguradoras parceiras
        </p>
      </header>
      <Card className="border-neutral-800 bg-neutral-900/50">
        <CardHeader>
          <CardTitle>Gestão de Seguradoras</CardTitle>
          <CardDescription>
            Em breve: listagem e cadastro de seguradoras
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-500">
            Esta seção está em desenvolvimento.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
