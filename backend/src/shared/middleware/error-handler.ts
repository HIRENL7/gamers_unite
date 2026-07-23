import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { ApiError, isApiError } from "../utils/api-error.js";

export function notFoundHandler(_request: Request, _response: Response, next: NextFunction) {
  next(new ApiError(404, "Route not found"));
}

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    response.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.flatten(),
    });
    return;
  }

  if (isApiError(error)) {
    response.status(error.statusCode).json({
      success: false,
      message: error.message,
      details: error.details,
    });
    return;
  }

  console.error(error);

  response.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
