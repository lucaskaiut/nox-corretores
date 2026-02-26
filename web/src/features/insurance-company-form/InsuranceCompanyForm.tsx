"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField } from "@/features/customer-form/components/FormField";
import type { InsuranceCompanyFormSchema } from "./schema";

export interface InsuranceCompanyFormProps {
  onSubmit: (values: InsuranceCompanyFormSchema) => void | Promise<void>;
  loading?: boolean;
  submitLabel?: string;
}

export function InsuranceCompanyForm({
  onSubmit,
  loading = false,
  submitLabel = "Salvar",
}: InsuranceCompanyFormProps) {
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useFormContext<InsuranceCompanyFormSchema>();

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(values);
      })}
      className="space-y-6"
    >
      <div className="max-w-md">
        <FormField
          control={control}
          name="name"
          label="Nome"
          placeholder="Nome da seguradora"
          disabled={loading}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="submit" loading={isSubmitting || loading} size="lg">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
