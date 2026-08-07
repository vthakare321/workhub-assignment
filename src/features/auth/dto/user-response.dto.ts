import type { UserRole } from "../types/auth.types";

export interface UserResponseDto {
  id: number;

  username: string;

  email: string;

  firstName: string;

  lastName: string;

  image: string;

  role: UserRole;
}