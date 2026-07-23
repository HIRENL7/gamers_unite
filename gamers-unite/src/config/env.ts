const DEFAULT_API_TIMEOUT = 15_000;

function trimEnv(value: string | undefined) {
  return value?.trim() ?? "";
}

function readNumberEnv(value: string | undefined, fallback: number) {
  const parsed = Number(trimEnv(value));

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const env = {
  appEnv: trimEnv(process.env.NEXT_PUBLIC_APP_ENV) || "development",
  apiBaseUrl: trimEnv(process.env.NEXT_PUBLIC_API_BASE_URL),
  apiTimeout: readNumberEnv(process.env.NEXT_PUBLIC_API_TIMEOUT, DEFAULT_API_TIMEOUT),
  siteUrl: trimEnv(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:3000",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
} as const;
