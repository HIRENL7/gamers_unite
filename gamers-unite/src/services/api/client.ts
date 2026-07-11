import type { AxiosRequestConfig } from "axios";

import { axiosInstance } from "@/services/axios";
import type { ApiRequestConfig } from "@/types/api";

type RequestOptions = ApiRequestConfig & {
  config?: AxiosRequestConfig;
};

function buildRequestConfig(options?: RequestOptions): AxiosRequestConfig {
  return {
    ...options?.config,
    headers: {
      ...options?.config?.headers,
      ...options?.headers,
    },
    params: options?.params ?? options?.config?.params,
    signal: options?.signal ?? options?.config?.signal,
  };
}

export const apiClient = {
  async get<TData>(url: string, options?: RequestOptions) {
    const response = await axiosInstance.get<TData>(
      url,
      buildRequestConfig(options),
    );

    return response.data;
  },

  async post<TData, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: RequestOptions,
  ) {
    const response = await axiosInstance.post<TData>(
      url,
      body,
      buildRequestConfig(options),
    );

    return response.data;
  },

  async put<TData, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: RequestOptions,
  ) {
    const response = await axiosInstance.put<TData>(
      url,
      body,
      buildRequestConfig(options),
    );

    return response.data;
  },

  async patch<TData, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: RequestOptions,
  ) {
    const response = await axiosInstance.patch<TData>(
      url,
      body,
      buildRequestConfig(options),
    );

    return response.data;
  },

  async delete<TData>(url: string, options?: RequestOptions) {
    const response = await axiosInstance.delete<TData>(
      url,
      buildRequestConfig(options),
    );

    return response.data;
  },
};
