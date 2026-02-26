import { z } from "zod";

export const insuranceCompanyFormSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .transform((s) => s.trim()),
});

export type InsuranceCompanyFormSchema = z.infer<typeof insuranceCompanyFormSchema>;

export const defaultValues: InsuranceCompanyFormSchema = {
  name: "",
};
