"use client";

import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FieldValues, Resolver } from "react-hook-form";
import { customerFormSchema } from "./schema";
import type { CustomerFormSchema } from "./schema";
import { defaultValues } from "./schema";
import { pickChangedFields } from "./utils";
import type { Customer } from "@/types/customer";

function customerToFormValues(c: Customer): CustomerFormSchema {
  return {
    name: c.name ?? "",
    email: c.email ?? "",
    document: c.document ?? "",
    phone: c.phone ?? "",
    insuranceCompanyId: String(c.insuranceCompany?.id ?? ""),
    vehicle: {
      model: c.vehicle?.model ?? "",
      brand: c.vehicle?.brand ?? "",
      year: c.vehicle?.year ? String(c.vehicle.year) : "",
      plate: c.vehicle?.plate ?? "",
      initialKm:
        c.vehicle?.initialKm != null ? String(c.vehicle.initialKm) : "",
      renavam: c.vehicle?.renavam ?? "",
      invoiceFile: (c.vehicle as { invoiceFile?: string | null })?.invoiceFile ?? null,
      crlvFile: (c.vehicle as { crlvFile?: string | null })?.crlvFile ?? null,
    },
    policy: {
      number: c.policy?.number ?? "",
      value: c.policy?.value != null ? String(c.policy.value) : "",
      file: c.policy?.file ?? null,
    },
    driverLicense: {
      registration: c.driverLicense?.registration ?? "",
      expirationDate: c.driverLicense?.expirationDate ?? "",
      file: c.driverLicense?.file ?? null,
    },
  };
}

function toPayload(values: CustomerFormSchema): Record<string, unknown> {
  const v = values.vehicle;
  const p = values.policy;
  const d = values.driverLicense;
  return {
    name: values.name,
    email: values.email,
    document: values.document,
    phone: values.phone,
    insuranceCompanyId: values.insuranceCompanyId ? Number(values.insuranceCompanyId) : undefined,
    vehicle: {
      model: v.model,
      brand: v.brand,
      year: v.year ? Number(v.year) : undefined,
      plate: v.plate,
      initialKm: v.initialKm ? Number(v.initialKm) : undefined,
      renavam: v.renavam || undefined,
      invoiceFile:
        v.invoiceFile instanceof File ? v.invoiceFile : undefined,
      crlvFile: v.crlvFile instanceof File ? v.crlvFile : undefined,
    },
    policy: {
      number: p.number || undefined,
      value: parsePolicyValue(p.value),
      file: p.file instanceof File ? p.file : undefined,
    },
    driverLicense: {
      registration: d.registration || undefined,
      expirationDate: d.expirationDate || undefined,
      file: d.file instanceof File ? d.file : undefined,
    },
  };
}

export interface UseCustomerFormOptions {
  mode: "create" | "edit";
  customerId?: number;
  initialData?: Customer | null;
  onSubmitSuccess?: () => void;
}

export function useCustomerForm({
  mode,
  customerId,
  initialData,
  onSubmitSuccess,
}: UseCustomerFormOptions) {
  const initial = useMemo(() => {
    if (mode === "edit" && initialData) {
      return customerToFormValues(initialData);
    }
    return defaultValues;
  }, [mode, initialData]);

  const form = useForm<CustomerFormSchema>({
    resolver: zodResolver(customerFormSchema) as Resolver<CustomerFormSchema>,
    defaultValues: initial,
    values: mode === "edit" && initialData ? customerToFormValues(initialData) : undefined,
    mode: "onTouched",
  });

  const dirtyFields = form.formState.dirtyFields;

  const getDirtyPaths = useCallback((): Set<string> => {
    const paths = new Set<string>();
    function collect(obj: FieldValues, prefix: string) {
      for (const [key, val] of Object.entries(obj)) {
        const path = prefix ? `${prefix}.${key}` : key;
        if (val === true) {
          paths.add(path);
        } else if (val && typeof val === "object" && !Array.isArray(val)) {
          collect(val as FieldValues, path);
        }
      }
    }
    collect(dirtyFields as FieldValues, "");
    return paths;
  }, [dirtyFields]);

  const buildSubmitPayload = useCallback(
    (values: CustomerFormSchema): Record<string, unknown> => {
      if (mode === "create") {
        return trimPayload(toPayload(values));
      }
      const dirty = getDirtyPaths();
      const current = toPayload(values);
      const original = initialData ? toPayload(customerToFormValues(initialData)) : {};
      const changed = pickChangedFields(
        current as Record<string, unknown>,
        original,
        dirty
      );
      return normalizePayload(changed);
    },
    [mode, initialData, getDirtyPaths]
  );

  return {
    form,
    mode,
    customerId,
    buildSubmitPayload,
    onSubmitSuccess,
  };
}

function trimPayload(p: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(p)) {
    if (v === undefined || v === null || v === "") continue;
    if (typeof v === "object" && v !== null && !(v instanceof File)) {
      const nested = trimPayload(v as Record<string, unknown>);
      if (Object.keys(nested).length > 0) out[k] = nested;
    } else {
      out[k] = v;
    }
  }
  return out;
}

function parsePolicyValue(s: string): number | undefined {
  if (!s || !s.trim()) return undefined;
  const cleaned = String(s).replace(/\./g, "").replace(",", ".").replace(/[^\d.-]/g, "");
  const n = parseFloat(cleaned);
  return Number.isNaN(n) ? undefined : n;
}

function normalizePayload(p: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(p)) {
    if (v === undefined || v === null) continue;
    if (typeof v === "object" && v !== null && !(v instanceof File)) {
      const nested = normalizePayload(v as Record<string, unknown>);
      if (Object.keys(nested).length > 0) out[k] = nested;
    } else {
      out[k] = v;
    }
  }
  return out;
}
