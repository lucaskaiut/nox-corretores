import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const fileSchema = z
  .union([
    z.instanceof(File),
    z.string().min(1),
  ])
  .nullable()
  .optional()
  .refine(
    (val) => {
      if (val == null) return true;
      if (typeof val === "string") return true;
      return val.size <= MAX_FILE_SIZE && ACCEPTED_TYPES.includes(val.type);
    },
    { message: "Arquivo inválido (máx 5MB, PDF ou imagem)" }
  );

export const customerFormSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .transform((s) => s.trim()),
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("E-mail inválido")
    .transform((s) => s.trim().toLowerCase()),
  document: z
    .string()
    .min(1, "Documento é obrigatório")
    .transform((s) => s.trim()),
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .transform((s) => s.trim()),
  insuranceCompanyId: z
    .string()
    .min(1, "Seguradora é obrigatória")
    .transform((s) => s.trim()),
  vehicle: z.object({
    model: z.string().default("").transform((s) => s.trim()),
    brand: z.string().default("").transform((s) => s.trim()),
    year: z
      .string()
      .min(1, "Ano é obrigatório")
      .refine((s) => /^\d{4}$/.test(s) && +s >= 1900 && +s <= new Date().getFullYear() + 1, "Ano inválido")
      .transform((s) => s.trim()),
    plate: z.string().min(1, "Placa é obrigatória").transform((s) => s.trim().toUpperCase()),
    initialKm: z
      .string()
      .default("")
      .transform((s) => (s && s.trim() ? s.trim() : "")),
    renavam: z
      .string()
      .default("")
      .transform((s) => (s && s.trim() ? s.trim() : "")),
    invoiceFile: fileSchema,
    crlvFile: fileSchema,
  }),
  policy: z.object({
    number: z.string().default("").transform((s) => s.trim()),
    value: z
      .string()
      .default("")
      .transform((s) => (s && s.trim() ? s.trim() : "")),
    file: fileSchema,
  }),
  driverLicense: z.object({
    registration: z.string().default("").transform((s) => s.trim()),
    expirationDate: z
      .string()
      .default("")
      .transform((s) => (s && s.trim() ? s.trim() : "")),
    file: fileSchema,
  }),
});

export type CustomerFormSchema = z.infer<typeof customerFormSchema>;

export const defaultValues: CustomerFormSchema = {
  name: "",
  email: "",
  document: "",
  phone: "",
  insuranceCompanyId: "",
  vehicle: {
    model: "",
    brand: "",
    year: "",
    plate: "",
    initialKm: "",
    renavam: "",
    invoiceFile: null,
    crlvFile: null,
  },
  policy: {
    number: "",
    value: "",
    file: null,
  },
  driverLicense: {
    registration: "",
    expirationDate: "",
    file: null,
  },
};
