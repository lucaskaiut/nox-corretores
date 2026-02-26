import type { Customer } from "@/types/customer";
import { MOCK_INSURANCE_COMPANIES } from "./mock-insurance-companies";

const BY_NAME: Record<string, number> = Object.fromEntries(
  MOCK_INSURANCE_COMPANIES.map((c) => [c.name, c.id])
);

function withInsuranceId(
  c: Omit<Customer, "insuranceCompany"> & { insuranceCompany: { name: string } }
): Customer {
  const id = BY_NAME[c.insuranceCompany.name] ?? 1;
  return {
    ...c,
    insuranceCompany: { id, name: c.insuranceCompany.name },
    vehicle: {
      ...c.vehicle,
      initialKm: c.vehicle.initialKm ?? 0,
      renavam: c.vehicle.renavam ?? "",
    },
    policy: c.policy ?? { number: "", value: 0, file: null },
    driverLicense: c.driverLicense ?? {
      registration: "",
      expirationDate: "",
      file: null,
    },
  };
}

export const MOCK_CUSTOMERS: Customer[] = [
  withInsuranceId({
    id: 1,
    name: "Ana Silva",
    email: "ana.silva@email.com",
    phone: "(11) 98765-4321",
    document: "123.456.789-00",
    insuranceCompany: { name: "Porto Seguro" },
    vehicle: { model: "Civic", brand: "Honda", plate: "ABC1D23", year: 2022 },
  }),
  withInsuranceId({
    id: 2,
    name: "Bruno Oliveira",
    email: "bruno.oliveira@email.com",
    phone: "(21) 99876-5432",
    document: "234.567.890-11",
    insuranceCompany: { name: "SulAmérica" },
    vehicle: { model: "Corolla", brand: "Toyota", plate: "DEF2E34", year: 2021 },
  }),
  withInsuranceId({
    id: 3,
    name: "Carla Santos",
    email: "carla.santos@email.com",
    phone: "(31) 97654-3210",
    document: "345.678.901-22",
    insuranceCompany: { name: "Porto Seguro" },
    vehicle: { model: "Gol", brand: "Volkswagen", plate: "GHI3F45", year: 2020 },
  }),
  withInsuranceId({
    id: 4,
    name: "Diego Ferreira",
    email: "diego.ferreira@email.com",
    phone: "(41) 96543-2109",
    document: "456.789.012-33",
    insuranceCompany: { name: "Itaú Seguros" },
    vehicle: { model: "Onix", brand: "Chevrolet", plate: "JKL4G56", year: 2023 },
  }),
  withInsuranceId({
    id: 5,
    name: "Elena Costa",
    email: "elena.costa@email.com",
    phone: "(51) 95432-1098",
    document: "567.890.123-44",
    insuranceCompany: { name: "Bradesco Seguros" },
    vehicle: { model: "Compass", brand: "Jeep", plate: "MNO5H67", year: 2022 },
  }),
  withInsuranceId({
    id: 6,
    name: "Felipe Mendes",
    email: "felipe.mendes@email.com",
    phone: "(61) 94321-0987",
    document: "678.901.234-55",
    insuranceCompany: { name: "Porto Seguro" },
    vehicle: { model: "HB20", brand: "Hyundai", plate: "PQR6I78", year: 2021 },
  }),
  withInsuranceId({
    id: 7,
    name: "Gabriela Lima",
    email: "gabriela.lima@email.com",
    phone: "(71) 93210-9876",
    document: "789.012.345-66",
    insuranceCompany: { name: "SulAmérica" },
    vehicle: { model: "T-Cross", brand: "Volkswagen", plate: "STU7J89", year: 2023 },
  }),
  withInsuranceId({
    id: 8,
    name: "Henrique Alves",
    email: "henrique.alves@email.com",
    phone: "(81) 92109-8765",
    document: "890.123.456-77",
    insuranceCompany: { name: "Itaú Seguros" },
    vehicle: { model: "Argo", brand: "Fiat", plate: "VWX8K90", year: 2020 },
  }),
  withInsuranceId({
    id: 9,
    name: "Isabela Rocha",
    email: "isabela.rocha@email.com",
    phone: "(11) 91098-7654",
    document: "901.234.567-88",
    insuranceCompany: { name: "Bradesco Seguros" },
    vehicle: { model: "Kicks", brand: "Nissan", plate: "YZA9L01", year: 2022 },
  }),
  withInsuranceId({
    id: 10,
    name: "João Pedro Souza",
    email: "joao.souza@email.com",
    phone: "(21) 90987-6543",
    document: "012.345.678-99",
    insuranceCompany: { name: "Porto Seguro" },
    vehicle: { model: "Tracker", brand: "Chevrolet", plate: "BCD0M12", year: 2023 },
  }),
  withInsuranceId({
    id: 11,
    name: "Larissa Martins",
    email: "larissa.martins@email.com",
    phone: "(31) 89876-5432",
    document: "111.222.333-44",
    insuranceCompany: { name: "SulAmérica" },
    vehicle: { model: "Renegade", brand: "Jeep", plate: "EFG1N23", year: 2021 },
  }),
  withInsuranceId({
    id: 12,
    name: "Marcos Pereira",
    email: "marcos.pereira@email.com",
    phone: "(41) 88765-4321",
    document: "222.333.444-55",
    insuranceCompany: { name: "Itaú Seguros" },
    vehicle: { model: "CR-V", brand: "Honda", plate: "HIJ2O34", year: 2020 },
  }),
];
