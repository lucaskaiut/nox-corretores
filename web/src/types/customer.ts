export interface CustomerVehicle {
  model: string;
  brand: string;
  plate: string;
  year: number;
}

export interface InsuranceCompany {
  name: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  document: string;
  insuranceCompany: InsuranceCompany;
  vehicle: CustomerVehicle;
}
