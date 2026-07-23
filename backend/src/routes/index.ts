import { Router } from "express";

import { authRouter } from "../features/auth/routes/auth.routes.js";
import { cafeRouter } from "../features/cafes/routes/cafe.routes.js";
import { healthRouter } from "../features/health/health.routes.js";
import { reviewRouter } from "../features/reviews/routes/review.routes.js";
import { searchRouter } from "../features/search/routes/search.routes.js";
import { uploadRouter } from "../features/uploads/routes/upload.routes.js";

export function createApiRouter() {
  const router = Router();

  router.use("/health", healthRouter);
  router.use("/auth", authRouter);
  router.use("/cafes", cafeRouter);
  router.use("/reviews", reviewRouter);
  router.use("/search", searchRouter);
  router.use("/uploads", uploadRouter);

  return router;
}
