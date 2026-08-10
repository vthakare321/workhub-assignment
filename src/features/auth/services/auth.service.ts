import { authApi } from "../api/auth.api";
import { toAuthUser } from "../mapper/auth.mapper";

import type { LoginRequestDto } from "../dto/login-request.dto";

export const authService = {
  async login(payload: LoginRequestDto) {
    const { data: loginResponse } = await authApi.login(payload);

    const { data: userResponse } = await authApi.getUser(
      loginResponse.id
    );

    return {
      accessToken: loginResponse.accessToken,
      refreshToken: loginResponse.refreshToken,
      user: toAuthUser(userResponse),
    };
  },

   async getCurrentUser() {
    const { data } = await authApi.getCurrentUser();

    return toAuthUser(data);
  },
};