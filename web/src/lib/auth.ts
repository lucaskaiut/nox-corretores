import { cookies } from "next/headers";
import { userService } from "@/services/userService";
import type { User } from "@/types/auth";
import { AUTH_COOKIE_NAME } from "./auth-cookie";

export async function getServerUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const user = await userService.me(token);
    return user;
  } catch {
    return null;
  }
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null;
}

export { AUTH_COOKIE_NAME, getAuthTokenFromHeaders } from "./auth-cookie";
