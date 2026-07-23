import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { normalizeApiError } from "@/services/axios/error";
import {
  getAccessToken,
  refreshAccessToken,
  setAccessToken,
} from "@/services/axios/token";

function requestInterceptor(config: InternalAxiosRequestConfig) {
  config.headers.Accept = "application/json";
  config.withCredentials = true;

  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

export function applyInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(requestInterceptor);

  instance.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
      const apiError = normalizeApiError(error);
      const originalRequest = (
        error as {
          config?: InternalAxiosRequestConfig & { _retry?: boolean };
        }
      ).config;

      if (
        apiError.statusCode === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        !originalRequest.url?.includes("/auth/refresh") &&
        !originalRequest.url?.includes("/auth/login")
      ) {
        originalRequest._retry = true;
        const nextToken = await refreshAccessToken();

        if (nextToken) {
          setAccessToken(nextToken);
          originalRequest.headers.Authorization = `Bearer ${nextToken}`;
          return instance(originalRequest);
        }
      }

      return Promise.reject(apiError);
    },
  );

  return instance;
}
