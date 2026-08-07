import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { ROUTES } from "@/shared/constants/routes";
import { useAuthStore } from "@/stores/auth.store";

import { authService } from "../services/auth.service";
import type { LoginRequestDto } from "../dto/login-request.dto";

export function useLogin() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (payload: LoginRequestDto) =>
      authService.login(payload),

    onSuccess: (response) => {
      login(response.accessToken, response.user);

      toast.success("Login successful");

      navigate(ROUTES.DASHBOARD, {
        replace: true,
      });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}