import type { LoginResponse, User } from "@/types/auth";

const DELAY_MS = 800;

const MOCK_USER: User = {
  id: 1,
  name: "John Doe",
  email: "john@email.com",
};

const VALID_CREDENTIALS = {
  email: "john@email.com",
  password: "123456",
};

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const mockService = {
  async getData<T>(endpoint: string, payload?: unknown): Promise<T> {
    await delay(DELAY_MS);

    if (endpoint === "/login") {
      const data = (payload as { body?: { email: string; password: string } })
        ?.body ?? payload;
      const { email, password } = data as { email: string; password: string };
      if (
        email === VALID_CREDENTIALS.email &&
        password === VALID_CREDENTIALS.password
      ) {
        const response: LoginResponse = {
          user: MOCK_USER,
          token: "mock-jwt-token",
        };
        return response as T;
      }
      throw new Error("Credenciais inválidas");
    }

    if (endpoint === "/me") {
      const { headers = {} } = (payload ?? {}) as { headers?: Record<string, string> };
      const authHeader = headers?.Authorization ?? "";
      const token = authHeader.replace("Bearer ", "");
      if (token === "mock-jwt-token") {
        return MOCK_USER as T;
      }
      throw new Error("Token inválido");
    }

    if (endpoint === "/logout") {
      return undefined as T;
    }

    throw new Error(`Endpoint não mockado: ${endpoint}`);
  },
};
