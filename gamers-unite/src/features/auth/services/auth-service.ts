import { apiClient } from "@/services/api/client";
import type {
  AuthResponse,
  MessageResponse,
  RefreshResponse,
} from "@/features/auth/types/api";
import type {
  ForgotPasswordFormValues,
  LoginFormValues,
  RegisterFormValues,
  ResetPasswordFormValues,
} from "@/features/auth/types/auth";

type ApiEnvelope<TData> = {
  success: boolean;
  data: TData;
};

export async function registerUser(values: RegisterFormValues) {
  const response = await apiClient.post<
    ApiEnvelope<AuthResponse>,
    Pick<RegisterFormValues, "name" | "email" | "password">
  >("/auth/register", {
    name: values.name,
    email: values.email,
    password: values.password,
  });

  return response.data;
}

export async function loginUser(values: LoginFormValues) {
  const response = await apiClient.post<ApiEnvelope<AuthResponse>, LoginFormValues>(
    "/auth/login",
    values,
  );

  return response.data;
}

export async function logoutUser() {
  await apiClient.post<MessageResponse>("/auth/logout");
}

export async function refreshSession() {
  const response = await apiClient.post<ApiEnvelope<RefreshResponse>>("/auth/refresh");
  return response.data;
}

export async function getCurrentUser() {
  const response = await apiClient.get<ApiEnvelope<{ user: AuthResponse["user"] }>>(
    "/auth/me",
  );

  return response.data.user;
}

export async function requestPasswordReset(values: ForgotPasswordFormValues) {
  const response = await apiClient.post<ApiEnvelope<MessageResponse>, ForgotPasswordFormValues>(
    "/auth/forgot-password",
    values,
  );

  return response.data;
}

export async function resetPassword(values: ResetPasswordFormValues, token: string) {
  const response = await apiClient.post<ApiEnvelope<MessageResponse>>(
    "/auth/reset-password",
    {
      password: values.password,
      token,
    },
  );

  return response.data;
}
