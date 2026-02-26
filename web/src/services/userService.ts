import { apiService } from "./apiService";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  User,
} from "@/types/auth";

export const userService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    return apiService.post<LoginResponse>("/login", payload);
  },

  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    return apiService.post<RegisterResponse>("/register", payload);
  },

  async me(token: string): Promise<User> {
    return apiService.get<User>("/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async logout(): Promise<void> {
    return apiService.post("/logout");
  },
};
