export type ApiSuccessResponse<TData> = {
  data: TData;
  message?: string;
  status?: string;
};

export type ApiErrorResponse = {
  message?: string;
  code?: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
};

export type ApiRequestConfig = {
  signal?: AbortSignal;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
};
