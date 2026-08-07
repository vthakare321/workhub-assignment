import { authApi } from "../api/auth.api";
import { toAuthUser } from "../mapper/auth.mapper";

import type { LoginRequestDto } from "../dto/login-request.dto";

export const authService = {
  async login(payload: LoginRequestDto) {
    const { data } = await authApi.login(payload);

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      user: toAuthUser(data),
    };
  },
};