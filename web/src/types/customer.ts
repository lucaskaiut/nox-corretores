export interface CustomerVehicle {
  model: string;
  brand: string;
  plate: string;
  year: number;
  initialKm?: number;
  renavam?: string;
  invoiceFile?: File | string | null;
  crlvFile?: File | string | null;
}

export interface InsuranceCompany {
  id?: number;
  name: string;
}

export interface InsurancePolicy {
  number?: string;
  value?: number;
  file?: File | string | null;
}

export interface DriverLicense {
  registration?: string;
  expirationDate?: string;
  file?: File | string | null;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  document: string;
  insuranceCompany: InsuranceCompany;
  insuranceCompanyId?: number;
  vehicle: CustomerVehicle;
  policy?: InsurancePolicy;
  driverLicense?: DriverLicense;
}

export interface CustomerFormValues {
  name: string;
  email: string;
  document: string;
  phone: string;
  insuranceCompanyId: string;
  vehicle: {
    model: string;
    brand: string;
    year: string;
    plate: string;
    initialKm: string;
    renavam: string;
    invoiceFile: File | string | null;
    crlvFile: File | string | null;
  };
  policy: {
    number: string;
    value: string;
    file: File | string | null;
  };
  driverLicense: {
    registration: string;
    expirationDate: string;
    file: File | string | null;
  };
}

export type CustomerCreatePayload = Record<string, unknown>;

export type CustomerUpdatePayload = Record<string, unknown>;
