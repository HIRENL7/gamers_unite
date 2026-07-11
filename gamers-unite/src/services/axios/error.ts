import axios, { type AxiosError } from "axios";

import type { ApiErrorResponse } from "@/types/api";

const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again.";

export class ApiError extends Error {
  code?: string;
  errors?: Record<string, string[]>;
  statusCode?: number;

  constructor({
    message,
    code,
    errors,
    statusCode,
  }: {
    message: string;
    code?: string;
    errors?: Record<string, string[]>;
    statusCode?: number;
  }) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.errors = errors;
    this.statusCode = statusCode;
  }
}

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  return typeof value === "object" && value !== null;
}

export function normalizeApiError(error: unknown) {
  if (error instanceof ApiError) {
    return error;
  }

  if (!axios.isAxiosError(error)) {
    return new ApiError({
      message: error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE,
    });
  }

  const axiosError = error as AxiosError<ApiErrorResponse>;
  const response = axiosError.response;
  const responseData = response?.data;

  if (isApiErrorResponse(responseData)) {
    return new ApiError({
      message:
        responseData.message ||
        axiosError.message ||
        DEFAULT_ERROR_MESSAGE,
      code: responseData.code,
      errors: responseData.errors,
      statusCode: responseData.statusCode ?? response?.status,
    });
  }

  return new ApiError({
    message: axiosError.message || DEFAULT_ERROR_MESSAGE,
    statusCode: response?.status,
  });
}
