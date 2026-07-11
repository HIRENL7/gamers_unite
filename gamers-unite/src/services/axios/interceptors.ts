import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { normalizeApiError } from "@/services/axios/error";

function requestInterceptor(config: InternalAxiosRequestConfig) {
  config.headers.Accept = "application/json";

  return config;
}

export function applyInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(requestInterceptor);

  instance.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(normalizeApiError(error)),
  );

  return instance;
}
