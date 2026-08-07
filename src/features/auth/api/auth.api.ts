import { apiClient } from "@/api";
import { ENDPOINTS } from "@/api";

import type { LoginRequestDto } from "../dto/login-request.dto";
import type { LoginResponseDto } from "../dto/login-response.dto";

export const authApi = {
  login(payload: LoginRequestDto) {
    return apiClient.post<LoginResponseDto>(
      ENDPOINTS.AUTH.LOGIN,
      payload
    );
  },
};