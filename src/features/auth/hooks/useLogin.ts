import { useMutation } from "@tanstack/react-query";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-hot-toast";

import { ROUTES } from "@/shared/constants/routes";
import { useAuthStore } from "@/stores/auth.store";

import { authService } from "../services/auth.service";
import type { LoginRequestDto } from "../dto/login-request.dto";

interface LoginLocationState {
  from?: {
    pathname?: string;
    search?: string;
    hash?: string;
  };
}

export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (payload: LoginRequestDto) =>
      authService.login(payload),

    onSuccess: (response) => {
      login({
        accessToken: response.accessToken,
        user: response.user,
      });

      toast.success("Login successful");

      const state =
        location.state as LoginLocationState | null;

      const from = state?.from;

      const destination = from
        ? `${from.pathname ?? ""}${from.search ?? ""}${from.hash ?? ""}`
        : ROUTES.DASHBOARD;

      navigate(destination, {
        replace: true,
      });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}