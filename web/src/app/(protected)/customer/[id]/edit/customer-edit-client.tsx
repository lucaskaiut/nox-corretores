"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { CustomerForm, useCustomerForm } from "@/features/customer-form";
import type { CustomerFormSchema } from "@/features/customer-form";
import { customerService } from "@/services/customerService";
import { insuranceCompaniesService } from "@/services/insuranceCompaniesService";
import { Button } from "@/components/ui/button";
import type { Customer } from "@/types/customer";

interface CustomerEditClientProps {
  id: string;
}

export function CustomerEditClient({ id }: CustomerEditClientProps) {
  const router = useRouter();
  const customerId = parseInt(id, 10);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [insuranceOptions, setInsuranceOptions] = useState<{ value: string; label: string }[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    form,
    buildSubmitPayload,
    onSubmitSuccess,
  } = useCustomerForm({
    mode: "edit",
    customerId: Number.isNaN(customerId) ? undefined : customerId,
    initialData: customer ?? undefined,
    onSubmitSuccess: () => router.push("/customers"),
  });

  useEffect(() => {
    if (Number.isNaN(customerId)) {
      setLoading(false);
      return;
    }
    Promise.all([
      customerService.getById(customerId),
      insuranceCompaniesService.list(),
    ])
      .then(([c, companies]) => {
        setCustomer(c);
        setInsuranceOptions(
          companies.map((co) => ({ value: String(co.id), label: co.name }))
        );
      })
      .catch(() => setCustomer(null))
      .finally(() => setLoading(false));
  }, [customerId]);

  const handleSubmit = async (values: CustomerFormSchema) => {
    setSubmitError(null);
    if (Number.isNaN(customerId)) return;
    try {
      const payload = buildSubmitPayload(values);
      await customerService.update(customerId, payload);
      onSubmitSuccess?.();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Erro ao atualizar cliente. Tente novamente."
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

  if (!customer || Number.isNaN(customerId)) {
    return (
      <div className="space-y-4">
        <p className="text-red-500">Cliente não encontrado.</p>
        <Link
          href="/customers"
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
          <h1 className="text-2xl font-bold text-foreground">Editar Cliente</h1>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            Atualize os dados do cliente
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
          submitLabel="Salvar alterações"
        />
      </FormProvider>
    </div>
  );
}
