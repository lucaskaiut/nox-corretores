"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { CustomerForm, useCustomerForm } from "@/features/customer-form";
import type { CustomerFormSchema } from "@/features/customer-form";
import { customerService } from "@/services/customerService";
import { insuranceCompaniesService } from "@/services/insuranceCompaniesService";

export function CustomerCreateClient() {
  const router = useRouter();
  const [insuranceOptions, setInsuranceOptions] = useState<{ value: string; label: string }[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    form,
    mode,
    buildSubmitPayload,
    onSubmitSuccess,
  } = useCustomerForm({
    mode: "create",
    onSubmitSuccess: () => router.push("/customers"),
  });

  useEffect(() => {
    insuranceCompaniesService
      .list()
      .then((companies) =>
        setInsuranceOptions(
          companies.map((c) => ({ value: String(c.id), label: c.name }))
        )
      )
      .finally(() => setLoadingOptions(false));
  }, []);

  const handleSubmit = async (values: CustomerFormSchema) => {
    setSubmitError(null);
    try {
      const payload = buildSubmitPayload(values);
      await customerService.create(payload);
      onSubmitSuccess?.();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Erro ao cadastrar cliente. Tente novamente."
      );
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Novo Cliente</h1>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            Preencha os dados para cadastrar um novo cliente
          </p>
        </div>
        <Link
          href="/customers"
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
        <CustomerForm
          insuranceOptions={insuranceOptions}
          onSubmit={handleSubmit}
          loading={loadingOptions}
          submitLabel="Cadastrar"
        />
      </FormProvider>
    </div>
  );
}
