"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Resolver } from "react-hook-form";
import {
  InsuranceCompanyForm,
  insuranceCompanyFormSchema,
  defaultValues,
} from "@/features/insurance-company-form";
import type { InsuranceCompanyFormSchema } from "@/features/insurance-company-form";
import { insuranceCompaniesService } from "@/services/insuranceCompaniesService";

export function InsuranceCompanyCreateClient() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<InsuranceCompanyFormSchema>({
    resolver: zodResolver(insuranceCompanyFormSchema) as Resolver<InsuranceCompanyFormSchema>,
    defaultValues,
  });

  const handleSubmit = async (values: InsuranceCompanyFormSchema) => {
    setSubmitError(null);
    try {
      await insuranceCompaniesService.create(values);
      router.push("/insurance-companies");
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Erro ao cadastrar seguradora. Tente novamente."
      );
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Nova Seguradora
          </h1>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            Preencha os dados para cadastrar uma nova seguradora
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
          submitLabel="Cadastrar"
        />
      </FormProvider>
    </div>
  );
}
