export const AUTH_COOKIE_NAME = "auth-token";

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
