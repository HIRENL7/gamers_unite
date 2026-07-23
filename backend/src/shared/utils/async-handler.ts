import type { NextFunction, Request, Response } from "express";

import { ApiError, isApiError } from "../utils/api-error.js";

type AsyncRouteHandler = (
  request: Request,
  response: Response,
  next: NextFunction,
) => Promise<void>;

export function asyncHandler(handler: AsyncRouteHandler) {
  return (request: Request, response: Response, next: NextFunction) => {
    void handler(request, response, next).catch(next);
  };
}
