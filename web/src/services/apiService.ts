import { mockService } from "./mockService";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiRequestConfig {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
}

class ApiService {
  private baseUrl = "";

  private async request<T>(
    endpoint: string,
    config: ApiRequestConfig = {}
  ): Promise<T> {
    const { method = "GET", body } = config;
    const payload =
      body !== undefined
        ? { method, body, headers: config.headers }
        : { method, headers: config.headers };
    return mockService.getData<T>(endpoint, payload);
  }

  async get<T>(endpoint: string, config?: ApiRequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "GET" });
  }

  async post<T>(endpoint: string, body?: unknown, config?: ApiRequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "POST", body });
  }

  async put<T>(endpoint: string, body?: unknown, config?: ApiRequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "PUT", body });
  }

  async delete<T>(endpoint: string, config?: ApiRequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "DELETE" });
  }
}

export const apiService = new ApiService();
