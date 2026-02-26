import { cookies } from "next/headers";
import { userService } from "@/services/userService";
import type { User } from "@/types/auth";

const AUTH_COOKIE_NAME = "auth-token";

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

export function getAuthTokenFromHeaders(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;

  const parsed = Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [key, ...v] = c.trim().split("=");
      return [key, v.join("=").trim()];
    })
  );

  return parsed[AUTH_COOKIE_NAME] ?? null;
}

export { AUTH_COOKIE_NAME };
