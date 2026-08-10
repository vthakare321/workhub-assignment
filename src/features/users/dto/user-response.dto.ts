import type { UserRole } from "../types/user.types";

export interface UserResponseDto {
  id: number;

  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  age: number;

  role: UserRole;

  image: string;

  company: {
    department: string;
    name: string;
  };

  address: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
}