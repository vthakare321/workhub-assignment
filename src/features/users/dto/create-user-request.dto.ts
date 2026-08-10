import type { UserRole } from "../types/user.types";

export interface CreateUserRequestDto {
  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  age: number;

  role: UserRole;

  department: string;
}