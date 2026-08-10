import { useEffect, type ReactNode } from "react";

import { useCurrentUser } from "../hooks/useCurrentUser";
import { useAuthStore } from "@/stores/auth.store";

interface AuthInitializerProps {
  children: ReactNode;
}

export default function AuthInitializer({
  children,
}: AuthInitializerProps) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  const {
    data: user,
    isLoading,
    isError,
  } = useCurrentUser();

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    if (isError) {
      logout();
      return;
    }

    if (user) {
      login({
        accessToken,
        user,
      });
    }
  }, [accessToken, user, isError, login, logout]);

  if (accessToken && isLoading) {
    return <div>Checking session...</div>;
  }

  if (accessToken && isError) {
    return null;
  }

  return <>{children}</>;
}