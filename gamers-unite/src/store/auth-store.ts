import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from "@/features/auth/services/auth-service";
import type { AuthUser } from "@/features/auth/types/api";
import type { LoginFormValues, RegisterFormValues } from "@/features/auth/types/auth";
import { setAccessToken } from "@/services/axios/token";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (values: LoginFormValues) => Promise<void>;
  register: (values: RegisterFormValues) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
  setSession: (user: AuthUser, accessToken: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isHydrated: false,

      setSession(user, accessToken) {
        setAccessToken(accessToken);
        set({
          user,
          accessToken,
          isAuthenticated: true,
        });
      },

      clearSession() {
        setAccessToken(null);
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });
      },

      async login(values) {
        const data = await loginUser(values);
        get().setSession(data.user, data.accessToken);
      },

      async register(values) {
        const data = await registerUser(values);
        get().setSession(data.user, data.accessToken);
      },

      async logout() {
        try {
          await logoutUser();
        } finally {
          get().clearSession();
        }
      },

      async hydrate() {
        const { accessToken, user } = get();

        if (accessToken) {
          setAccessToken(accessToken);
        }

        try {
          if (!accessToken) {
            const refreshed = await refreshSession();
            get().setSession(refreshed.user, refreshed.accessToken);
            set({ isHydrated: true });
            return;
          }

          if (!user) {
            const currentUser = await getCurrentUser();
            set({ user: currentUser, isAuthenticated: true, isHydrated: true });
            return;
          }

          set({ isAuthenticated: true, isHydrated: true });
        } catch {
          get().clearSession();
          set({ isHydrated: true });
        }
      },
    }),
    {
      name: "gamesunite-auth",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.accessToken) {
          setAccessToken(state.accessToken);
        }
      },
    },
  ),
);
