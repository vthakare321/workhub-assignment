import { apiClient, ENDPOINTS } from "@/api";

import type { LoginRequestDto } from "../dto/login-request.dto";
import type { LoginResponseDto } from "../dto/login-response.dto";
import type { UserResponseDto } from "../dto/user-response.dto";

export const authApi = {
  login(payload: LoginRequestDto) {
    return apiClient.post<LoginResponseDto>(
      ENDPOINTS.AUTH.LOGIN,
      payload
    );
  },

  

   getUser(id: number) {
    return apiClient.get<UserResponseDto>(
      ENDPOINTS.USERS.DETAIL(id)
    );
  },

  getCurrentUser() {
    return apiClient.get<UserResponseDto>(
      ENDPOINTS.AUTH.ME
    );
  },
};