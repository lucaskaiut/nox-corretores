import { MOCK_CUSTOMERS } from "@/data/mock-customers";
import { MOCK_INSURANCE_COMPANIES } from "@/data/mock-insurance-companies";
import type {
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  User,
} from "@/types/auth";
import type { Customer } from "@/types/customer";
import type { LaravelPaginatedResponse } from "@/types/grid";

const DELAY_MS = 800;

// ---------------------------------------------------------------------------
// Cache & deduplication (simula o comportamento do fetch do Next.js)
// ---------------------------------------------------------------------------

interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

type Revalidate = number | false;

interface FetchOptions {
  cache?: "force-cache" | "no-store";
  next?: { revalidate?: Revalidate; tags?: string[] };
}

const responseCache = new Map<string, CacheEntry<unknown>>();
const inflightRequests = new Map<string, Promise<unknown>>();
const tagToKeys = new Map<string, Set<string>>();

function buildCacheKey(endpoint: string, payload?: unknown): string {
  return JSON.stringify({ endpoint, payload });
}

function isCacheValid<T>(entry: CacheEntry<T>, revalidate: Revalidate): boolean {
  if (revalidate === false) return true;
  return Date.now() - entry.timestamp < revalidate * 1000;
}

function registerTags(key: string, tags: string[]): void {
  for (const tag of tags) {
    if (!tagToKeys.has(tag)) tagToKeys.set(tag, new Set());
    tagToKeys.get(tag)!.add(key);
  }
}

/**
 * Invalida todas as entradas de cache associadas às tags informadas.
 * Espelha o comportamento de `revalidateTag()` do Next.js.
 */
export function revalidateTag(...tags: string[]): void {
  for (const tag of tags) {
    const keys = tagToKeys.get(tag);
    if (!keys) continue;
    for (const key of keys) responseCache.delete(key);
    tagToKeys.delete(tag);
  }
}

/**
 * Invalida todas as entradas de cache de um path específico.
 * Espelha o comportamento de `revalidatePath()` do Next.js.
 */
export function revalidatePath(path: string): void {
  for (const key of responseCache.keys()) {
    try {
      const parsed = JSON.parse(key) as { endpoint: string };
      if (parsed.endpoint?.startsWith(path)) responseCache.delete(key);
    } catch {
      // ignora chaves malformadas
    }
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseQueryParams(endpoint: string): Record<string, string> {
  const queryIndex = endpoint.indexOf("?");
  if (queryIndex === -1) return {};
  const query = endpoint.slice(queryIndex + 1);
  const params: Record<string, string> = {};
  new URLSearchParams(query).forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

function getFilterParams(params: Record<string, string>): Record<string, string> {
  const filters: Record<string, string> = {};
  Object.entries(params).forEach(([key, value]) => {
    const match = key.match(/^filter\[(.+)\]$/);
    if (match) filters[match[1]] = value;
  });
  return filters;
}

function applyFilters(
  data: Customer[],
  filters: Record<string, string>
): Customer[] {
  if (Object.keys(filters).length === 0) return data;
  return data.filter((row) => {
    return Object.entries(filters).every(([path, filterValue]) => {
      const value = getNestedValue(row, path);
      const str = String(value ?? "").toLowerCase();
      return str.includes(filterValue.toLowerCase());
    });
  });
}

function getNestedValue(obj: object, path: string): unknown {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key] as unknown;
  }
  return current;
}

function applySort(
  data: Customer[],
  sortKey: string | undefined,
  order: "asc" | "desc"
): Customer[] {
  if (!sortKey) return data;
  return [...data].sort((a, b) => {
    const aVal = getNestedValue(a, sortKey);
    const bVal = getNestedValue(b, sortKey);
    const aStr = String(aVal ?? "").toLowerCase();
    const bStr = String(bVal ?? "").toLowerCase();
    const cmp = aStr.localeCompare(bStr, undefined, { numeric: true });
    return order === "asc" ? cmp : -cmp;
  });
}

function buildCustomersResponse(
  basePath: string,
  params: Record<string, string>
): LaravelPaginatedResponse<Customer> {
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const perPage = Math.min(50, Math.max(1, parseInt(params.per_page ?? "15", 10)));
  const sort = params.sort ?? "name";
  const order = (params.order ?? "asc") as "asc" | "desc";
  const filters = getFilterParams(params);

  let data = applyFilters(MOCK_CUSTOMERS, filters);
  data = applySort(data, sort, order);

  const total = data.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(page, lastPage);
  const from = total === 0 ? null : (currentPage - 1) * perPage + 1;
  const to = total === 0 ? null : Math.min(currentPage * perPage, total);

  const start = (currentPage - 1) * perPage;
  const paginatedData = data.slice(start, start + perPage);

  const buildUrl = (p: number) => {
    const u = new URLSearchParams(params);
    u.set("page", String(p));
    return `${basePath}?${u.toString()}`;
  };

  const links = [
    { url: null, label: "&laquo; Anterior", page: null, active: false },
    ...Array.from({ length: lastPage }, (_, i) => i + 1).map((p) => ({
      url: buildUrl(p),
      label: String(p),
      page: p,
      active: p === currentPage,
    })),
    { url: null, label: "Próximo &raquo;", page: null, active: false },
  ];

  return {
    data: paginatedData,
    links: {
      first: buildUrl(1),
      last: buildUrl(lastPage),
      prev: currentPage > 1 ? buildUrl(currentPage - 1) : null,
      next: currentPage < lastPage ? buildUrl(currentPage + 1) : null,
    },
    meta: {
      current_page: currentPage,
      from,
      last_page: lastPage,
      links,
      path: basePath,
      per_page: perPage,
      to,
      total,
    },
  };
}

// ---------------------------------------------------------------------------
// Auth state
// ---------------------------------------------------------------------------

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
const TOKEN_TO_USER = new Map<string, User>([["mock-jwt-token", MOCK_USER]]);

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Dispatcher (lógica de negócio pura, sem cache)
// ---------------------------------------------------------------------------

async function dispatch<T>(endpoint: string, payload?: unknown): Promise<T> {
  await delay(DELAY_MS);

  if (endpoint === "/login") {
    const data = (payload as { body?: { email: string; password: string } })
      ?.body ?? payload;
    const { email, password } = data as { email: string; password: string };
    if (
      email === VALID_CREDENTIALS.email &&
      password === VALID_CREDENTIALS.password
    ) {
      const response: LoginResponse = { user: MOCK_USER, token: "mock-jwt-token" };
      return response as T;
    }
    throw new Error("Credenciais inválidas");
  }

  if (endpoint === "/me") {
    const { headers = {} } = (payload ?? {}) as { headers?: Record<string, string> };
    const authHeader = headers?.Authorization ?? "";
    const token = authHeader.replace("Bearer ", "");
    const user = TOKEN_TO_USER.get(token);
    if (user) return user as T;
    throw new Error("Token inválido");
  }

  if (endpoint === "/register") {
    const data = (payload as { body?: RegisterPayload })?.body ?? payload;
    const { name, email, password } = data as RegisterPayload;

    if (!name?.trim()) throw new Error("Nome é obrigatório");
    if (!email?.trim()) throw new Error("E-mail é obrigatório");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("E-mail inválido");
    if (!password || password.length < 6)
      throw new Error("Senha deve ter no mínimo 6 caracteres");
    if (EXISTING_EMAILS.has(email.toLowerCase().trim()))
      throw new Error("Este e-mail já está cadastrado");

    const newUser: User = {
      id: EXISTING_EMAILS.size + 1,
      name: name.trim(),
      email: email.toLowerCase().trim(),
    };
    EXISTING_EMAILS.add(newUser.email);

    const token = `mock-jwt-token-${newUser.id}`;
    TOKEN_TO_USER.set(token, newUser);

    const response: RegisterResponse = { user: newUser, token };
    return response as T;
  }

  if (endpoint === "/logout") {
    return undefined as T;
  }

  if (endpoint.startsWith("/customers")) {
    const basePath = endpoint.split("?")[0];
    const params = parseQueryParams(endpoint);
    return buildCustomersResponse(basePath, params) as T;
  }

  if (endpoint === "/insurance-companies") {
    return MOCK_INSURANCE_COMPANIES as T;
  }

  throw new Error(`Endpoint não mockado: ${endpoint}`);
}

// ---------------------------------------------------------------------------
// Endpoints que nunca devem ser cacheados (mutações / sessão)
// ---------------------------------------------------------------------------

const MUTATION_ENDPOINTS = new Set(["/login", "/register", "/logout"]);

// ---------------------------------------------------------------------------
// API pública
// ---------------------------------------------------------------------------

export const mockService = {
  /**
   * Busca dados mockados com suporte a cache e deduplicação,
   * simulando o comportamento do `fetch` estendido do Next.js.
   *
   * @param endpoint  - Rota mockada (ex: "/customers?page=1")
   * @param payload   - Body, headers ou outros dados da requisição
   * @param options   - Opções de cache idênticas às do fetch do Next.js:
   *   - `cache: "no-store"`      → sempre ignora o cache
   *   - `cache: "force-cache"`   → cache permanente (sem expiração)
   *   - `next.revalidate: N`     → cache por N segundos
   *   - `next.revalidate: false` → cache permanente
   *   - `next.tags`              → associa a entrada a tags para `revalidateTag`
   *
   * Deduplicação: chamadas simultâneas com a mesma chave compartilham
   * uma única Promise em andamento, como a memoização de requests do Next.js.
   */
  async getData<T>(
    endpoint: string,
    payload?: unknown,
    options: FetchOptions = {}
  ): Promise<T> {
    const { cache, next } = options;
    const noStore = cache === "no-store";
    const isMutation = MUTATION_ENDPOINTS.has(endpoint);

    if (noStore || isMutation) {
      return dispatch<T>(endpoint, payload);
    }

    const revalidate: Revalidate =
      next?.revalidate !== undefined
        ? next.revalidate
        : cache === "force-cache"
          ? false
          : 30;

    const key = buildCacheKey(endpoint, payload);

    const cached = responseCache.get(key) as CacheEntry<T> | undefined;
    if (cached && isCacheValid(cached, revalidate)) {
      return cached.value;
    }

    if (inflightRequests.has(key)) {
      return inflightRequests.get(key) as Promise<T>;
    }

    const promise = dispatch<T>(endpoint, payload)
      .then((value) => {
        responseCache.set(key, { value, timestamp: Date.now() });
        if (next?.tags?.length) registerTags(key, next.tags);
        inflightRequests.delete(key);
        return value;
      })
      .catch((err) => {
        inflightRequests.delete(key);
        throw err;
      });

    inflightRequests.set(key, promise);
    return promise;
  },
};