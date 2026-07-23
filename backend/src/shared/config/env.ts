import { config } from "dotenv";

config();

function readEnv(name: string, fallback = "") {
  return process.env[name]?.trim() ?? fallback;
}

function readNumberEnv(name: string, fallback: number) {
  const value = Number(readEnv(name));

  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export const env = {
  nodeEnv: readEnv("NODE_ENV", "development"),
  port: readNumberEnv("PORT", 4000),
  apiPrefix: readEnv("API_PREFIX", "/api/v1"),
  mongodbUri: readEnv("MONGODB_URI", "mongodb://localhost:27017/gamesunite"),
  redisUrl: readEnv("REDIS_URL", "redis://localhost:6379"),
  jwtAccessSecret: readEnv("JWT_ACCESS_SECRET", "dev-access-secret-change-me"),
  jwtRefreshSecret: readEnv("JWT_REFRESH_SECRET", "dev-refresh-secret-change-me"),
  jwtAccessExpiresIn: readEnv("JWT_ACCESS_EXPIRES_IN", "15m"),
  jwtRefreshExpiresIn: readEnv("JWT_REFRESH_EXPIRES_IN", "7d"),
  clientUrl: readEnv("CLIENT_URL", "http://localhost:3000"),
  cookieDomain: readEnv("COOKIE_DOMAIN", "localhost"),
  cloudinaryCloudName: readEnv("CLOUDINARY_CLOUD_NAME"),
  cloudinaryApiKey: readEnv("CLOUDINARY_API_KEY"),
  cloudinaryApiSecret: readEnv("CLOUDINARY_API_SECRET"),
  isDevelopment: readEnv("NODE_ENV", "development") === "development",
  isProduction: readEnv("NODE_ENV") === "production",
} as const;
