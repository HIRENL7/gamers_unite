const DEFAULT_API_TIMEOUT = 15_000;

function readPublicEnv(name: string) {
  return process.env[name]?.trim() ?? "";
}

function readNumberEnv(name: string, fallback: number) {
  const value = Number(readPublicEnv(name));

  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export const env = {
  appEnv: readPublicEnv("NEXT_PUBLIC_APP_ENV") || "development",
  apiBaseUrl: readPublicEnv("NEXT_PUBLIC_API_BASE_URL"),
  apiTimeout: readNumberEnv("NEXT_PUBLIC_API_TIMEOUT", DEFAULT_API_TIMEOUT),
  siteUrl: readPublicEnv("NEXT_PUBLIC_SITE_URL") || "http://localhost:3000",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
} as const;
