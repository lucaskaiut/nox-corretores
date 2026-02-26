export function getValueByPath<T = unknown>(
  obj: object,
  path: string
): T | undefined {
  if (!path || !obj) return undefined;

  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key] as unknown;
  }

  return current as T;
}
