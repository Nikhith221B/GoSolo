const REDIRECT_BASE = "http://localhost";

export function getSafeNextPath(
  nextPath: string | null | undefined,
  fallback = "/dashboard"
) {
  if (!nextPath) {
    return fallback;
  }

  if (!nextPath.startsWith("/") || nextPath.startsWith("//")) {
    return fallback;
  }

  try {
    const parsed = new URL(nextPath, REDIRECT_BASE);
    if (parsed.origin !== REDIRECT_BASE) {
      return fallback;
    }

    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return fallback;
  }
}