"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CollapsibleSection } from "./components/CollapsibleSection";
import { FormField } from "./components/FormField";
import { FormSelect } from "./components/FormSelect";
import { FormFile } from "./components/FormFile";
import type { CustomerFormSchema } from "./schema";
import type { SelectOption } from "./components/FormSelect";

export interface CustomerFormProps {
  insuranceOptions: SelectOption[];
  onSubmit: (values: CustomerFormSchema) => void | Promise<void>;
  loading?: boolean;
  submitLabel?: string;
}

export function CustomerForm({
  insuranceOptions,
  onSubmit,
  loading = false,
  submitLabel = "Salvar",
}: CustomerFormProps) {
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useFormContext<CustomerFormSchema>();

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(values);
      })}
      className="space-y-6"
    >
      <CollapsibleSection title="Dados do Cliente" defaultOpen>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField control={control} name="name" label="Nome" placeholder="Nome completo" disabled={loading} />
          <FormField
            control={control}
            name="email"
            label="Email"
            type="email"
            placeholder="email@exemplo.com"
            disabled={loading}
          />
          <FormField
            control={control}
            name="document"
            label="Documento"
            placeholder="CPF ou CNPJ"
            disabled={loading}
          />
          <FormField
            control={control}
            name="phone"
            label="Telefone"
            type="tel"
            placeholder="(00) 00000-0000"
            disabled={loading}
          />
          <div className="sm:col-span-2">
            <FormSelect
              control={control}
              name="insuranceCompanyId"
              label="Seguradora"
              options={insuranceOptions}
              placeholder="Selecione a seguradora"
              disabled={loading}
            />
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Veículo" defaultOpen={false}>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={control}
            name="vehicle.model"
            label="Modelo"
            placeholder="Ex: Civic"
            disabled={loading}
          />
          <FormField
            control={control}
            name="vehicle.brand"
            label="Marca"
            placeholder="Ex: Honda"
            disabled={loading}
          />
          <FormField
            control={control}
            name="vehicle.year"
            label="Ano"
            type="text"
            placeholder="Ex: 2024"
            disabled={loading}
          />
          <FormField
            control={control}
            name="vehicle.plate"
            label="Placa"
            placeholder="ABC1D23"
            disabled={loading}
          />
          <FormField
            control={control}
            name="vehicle.initialKm"
            label="KM Inicial"
            type="text"
            placeholder="0"
            disabled={loading}
          />
          <FormField
            control={control}
            name="vehicle.renavam"
            label="RENAVAM"
            placeholder=""
            disabled={loading}
          />
          <div className="sm:col-span-2">
            <FormFile
              control={control}
              name="vehicle.invoiceFile"
              label="Nota Fiscal"
              disabled={loading}
            />
          </div>
          <div className="sm:col-span-2">
            <FormFile
              control={control}
              name="vehicle.crlvFile"
              label="CRLV"
              disabled={loading}
            />
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Apólice de Seguro" defaultOpen={false}>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={control}
            name="policy.number"
            label="Número da Apólice"
            placeholder=""
            disabled={loading}
          />
          <FormField
            control={control}
            name="policy.value"
            label="Valor"
            type="text"
            placeholder="R$ 0,00"
            disabled={loading}
          />
          <div className="sm:col-span-2">
            <FormFile
              control={control}
              name="policy.file"
              label="Arquivo da Apólice"
              disabled={loading}
            />
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="CNH - Carteira Nacional de Habilitação" defaultOpen={false}>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={control}
            name="driverLicense.registration"
            label="Registro"
            placeholder="Número do registro"
            disabled={loading}
          />
          <FormField
            control={control}
            name="driverLicense.expirationDate"
            label="Validade"
            type="text"
            placeholder="DD/MM/AAAA"
            disabled={loading}
          />
          <div className="sm:col-span-2">
            <FormFile
              control={control}
              name="driverLicense.file"
              label="Arquivo da CNH"
              disabled={loading}
            />
          </div>
        </div>
      </CollapsibleSection>

      <div className="flex justify-end gap-2">
        <Button type="submit" loading={isSubmitting || loading} size="lg">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
