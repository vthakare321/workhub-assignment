import { useQuery } from "@tanstack/react-query";

import { authService } from "../services/auth.service";
import { useAuthStore } from "@/stores/auth.store";

export function useCurrentUser() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["auth", "current-user"],

    queryFn: authService.getCurrentUser,

    enabled: Boolean(accessToken),

    retry: false,
  });
}