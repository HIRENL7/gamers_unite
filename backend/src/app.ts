import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";

import { createApiRouter } from "./routes/index.js";
import { env } from "./shared/config/env.js";
import { authMiddleware } from "./shared/middleware/auth.js";
import { errorHandler, notFoundHandler } from "./shared/middleware/error-handler.js";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(
    cors({
      origin: env.clientUrl,
      credentials: true,
    }),
  );
  app.use(morgan(env.isDevelopment ? "dev" : "combined"));
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 300,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );
  app.use(authMiddleware);
  app.use(env.apiPrefix, createApiRouter());
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
