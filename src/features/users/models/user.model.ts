import type { UserRole } from "../types/user.types";

export interface User {
  id: number;

  firstName: string;
  lastName: string;
  fullName: string;

  email: string;
  phone: string;

  age: number;

  role: UserRole;

  image: string;

  department: string;

  isLocal?: boolean;

  companyName: string;

  address: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
}