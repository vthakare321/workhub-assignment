import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { ROUTES } from "@/shared/constants/routes";
import { useAuthStore } from "@/stores/auth.store";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = useAuthStore((state) => state.logout);

  return () => {
    queryClient.clear();

    logout();

    navigate(ROUTES.LOGIN, {
      replace: true,
    });
  };
}