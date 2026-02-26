export function trimObject<T extends Record<string, unknown>>(
  obj: T
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined || value === "") continue;
    if (typeof value === "string") {
      const t = value.trim();
      if (t) result[key] = t;
    } else if (typeof value === "object" && !Array.isArray(value) && !(value instanceof File)) {
      const nested = trimObject(value as Record<string, unknown>);
      if (Object.keys(nested).length > 0) result[key] = nested;
    } else {
      result[key] = value;
    }
  }
  return result;
}

export function shallowEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null || b == null) return a === b;
  if (typeof a !== "object" || typeof b !== "object") return a === b;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keysA = Object.keys(a as object);
  const keysB = Object.keys(b as object);
  if (keysA.length !== keysB.length) return false;
  for (const k of keysA) {
    const vA = (a as Record<string, unknown>)[k];
    const vB = (b as Record<string, unknown>)[k];
    if (vA instanceof File || vB instanceof File) {
      if (vA !== vB) return false;
    } else if (
      typeof vA === "object" &&
      vA !== null &&
      typeof vB === "object" &&
      vB !== null
    ) {
      if (!shallowEqual(vA, vB)) return false;
    } else if (vA !== vB) {
      return false;
    }
  }
  return true;
}

export function pickChangedFields<T extends Record<string, unknown>>(
  current: T,
  original: Record<string, unknown>,
  dirtyPaths: Set<string>
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  function setNested(
    obj: Record<string, unknown>,
    path: string,
    value: unknown
  ): void {
    const parts = path.split(".");
    let target = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      const p = parts[i];
      if (!(p in target) || typeof target[p] !== "object") {
        target[p] = {};
      }
      target = target[p] as Record<string, unknown>;
    }
    target[parts[parts.length - 1]] = value;
  }

  function getNested(obj: Record<string, unknown>, path: string): unknown {
    return path.split(".").reduce((acc: unknown, p) => {
      if (acc == null) return undefined;
      return (acc as Record<string, unknown>)[p];
    }, obj);
  }

  for (const path of dirtyPaths) {
    const val = getNested(current as Record<string, unknown>, path);
    const orig = getNested(original, path);
    if (!shallowEqual(val, orig)) {
      setNested(result, path, val);
    }
  }
  return trimObject(result);
}

export function isFileValue(val: unknown): val is File {
  return val instanceof File;
}

export function isExistingFileRef(val: unknown): val is string {
  return typeof val === "string" && val.length > 0 && !val.startsWith("data:");
}
