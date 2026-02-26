"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Resolver } from "react-hook-form";
import {
  InsuranceCompanyForm,
  insuranceCompanyFormSchema,
} from "@/features/insurance-company-form";
import type { InsuranceCompanyFormSchema } from "@/features/insurance-company-form";
import { insuranceCompaniesService } from "@/services/insuranceCompaniesService";
import type { InsuranceCompany } from "@/types/insurance-company";

interface InsuranceCompanyEditClientProps {
  id: string;
}

export function InsuranceCompanyEditClient({ id }: InsuranceCompanyEditClientProps) {
  const router = useRouter();
  const companyId = parseInt(id, 10);
  const [company, setCompany] = useState<InsuranceCompany | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<InsuranceCompanyFormSchema>({
    resolver: zodResolver(insuranceCompanyFormSchema) as Resolver<InsuranceCompanyFormSchema>,
    defaultValues: { name: "" },
    values: company ? { name: company.name } : undefined,
  });

  useEffect(() => {
    if (Number.isNaN(companyId)) {
      setLoading(false);
      return;
    }
    insuranceCompaniesService
      .getById(companyId)
      .then(setCompany)
      .catch(() => setCompany(null))
      .finally(() => setLoading(false));
  }, [companyId]);

  const handleSubmit = async (values: InsuranceCompanyFormSchema) => {
    setSubmitError(null);
    if (Number.isNaN(companyId)) return;
    try {
      await insuranceCompaniesService.update(companyId, values);
      router.push("/insurance-companies");
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Erro ao atualizar seguradora. Tente novamente."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="text-neutral-500">Carregando...</span>
      </div>
    );
  }

  if (!company || Number.isNaN(companyId)) {
    return (
      <div className="space-y-4">
        <p className="text-red-500">Seguradora não encontrada.</p>
        <Link
          href="/insurance-companies"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-neutral-300 bg-transparent px-6 font-medium text-foreground transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800/50"
        >
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Editar Seguradora
          </h1>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            Atualize os dados da seguradora
          </p>
        </div>
        <Link
          href="/insurance-companies"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-neutral-300 bg-transparent px-6 font-medium text-foreground transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800/50"
        >
          Voltar
        </Link>
      </header>

      {submitError && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-500"
        >
          {submitError}
        </div>
      )}

      <FormProvider {...form}>
        <InsuranceCompanyForm
          onSubmit={handleSubmit}
          submitLabel="Salvar alterações"
        />
      </FormProvider>
    </div>
  );
}
