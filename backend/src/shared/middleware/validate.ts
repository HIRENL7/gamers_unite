import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

import { ApiError } from "../utils/api-error.js";

type RequestSource = "body" | "query" | "params";

export function validateRequest<TSchema extends ZodType>(
  schema: TSchema,
  source: RequestSource = "body",
) {
  return (request: Request, _response: Response, next: NextFunction) => {
    const result = schema.safeParse(request[source]);

    if (!result.success) {
      next(result.error);
      return;
    }

    request[source] = result.data;
    next();
  };
}

export function requireAuth(request: Request, _response: Response, next: NextFunction) {
  if (!request.auth) {
    next(new ApiError(401, "Authentication required"));
    return;
  }

  next();
}
