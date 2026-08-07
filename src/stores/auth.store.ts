import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { AuthUser } from "@/features/auth/models/auth-user.model";

interface LoginPayload {
  accessToken: string;
  user: AuthUser;
}


interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;

  login: (payload: LoginPayload) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,

      login: ({ accessToken, user }) =>
        set({
          accessToken,
          user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
