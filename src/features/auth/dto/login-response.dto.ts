import type { UserRole } from "../types/auth.types";

export interface LoginResponseDto {
  id: number;
  username: string;
  email: string;

  firstName: string;
  lastName: string;

  image: string;

  role: UserRole;

  accessToken: string;
  refreshToken: string;
}