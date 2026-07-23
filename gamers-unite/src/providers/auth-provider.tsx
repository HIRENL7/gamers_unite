"use client";

import * as React from "react";

import { refreshSession } from "@/features/auth/services/auth-service";
import { useAuthStore } from "@/store/auth-store";
import { setRefreshHandler } from "@/services/axios/token";

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const hydrate = useAuthStore((state) => state.hydrate);
  const setSession = useAuthStore((state) => state.setSession);
  const clearSession = useAuthStore((state) => state.clearSession);

  React.useEffect(() => {
    setRefreshHandler(async () => {
      try {
        const data = await refreshSession();
        setSession(data.user, data.accessToken);
        return data.accessToken;
      } catch {
        clearSession();
        return null;
      }
    });

    void hydrate();
  }, [clearSession, hydrate, setSession]);

  return children;
}

export { AuthProvider };
