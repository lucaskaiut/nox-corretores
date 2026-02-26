import { apiService } from "./apiService";
import type { LoginPayload, LoginResponse, User } from "@/types/auth";

export const userService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    return apiService.post<LoginResponse>("/login", payload);
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
