import type {
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  User,
} from "@/types/auth";

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

const EXISTING_EMAILS = new Set([VALID_CREDENTIALS.email]);
const TOKEN_TO_USER = new Map<string, User>([
  ["mock-jwt-token", MOCK_USER],
]);

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
      const user = TOKEN_TO_USER.get(token);
      if (user) {
        return user as T;
      }
      throw new Error("Token inválido");
    }

    if (endpoint === "/register") {
      const data = (payload as { body?: RegisterPayload })?.body ?? payload;
      const { name, email, password } = data as RegisterPayload;

      if (!name?.trim()) {
        throw new Error("Nome é obrigatório");
      }
      if (!email?.trim()) {
        throw new Error("E-mail é obrigatório");
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("E-mail inválido");
      }
      if (!password || password.length < 6) {
        throw new Error("Senha deve ter no mínimo 6 caracteres");
      }
      if (EXISTING_EMAILS.has(email.toLowerCase().trim())) {
        throw new Error("Este e-mail já está cadastrado");
      }

      const newUser: User = {
        id: EXISTING_EMAILS.size + 1,
        name: name.trim(),
        email: email.toLowerCase().trim(),
      };
      EXISTING_EMAILS.add(newUser.email);

      const token = `mock-jwt-token-${newUser.id}`;
      TOKEN_TO_USER.set(token, newUser);

      const response: RegisterResponse = {
        user: newUser,
        token,
      };
      return response as T;
    }

    if (endpoint === "/logout") {
      return undefined as T;
    }

    throw new Error(`Endpoint não mockado: ${endpoint}`);
  },
};
