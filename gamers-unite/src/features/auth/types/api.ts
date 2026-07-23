export type UserRole = "user" | "creator" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
}

export interface RefreshResponse {
  user: AuthUser;
  accessToken: string;
}

export interface MessageResponse {
  message: string;
}
