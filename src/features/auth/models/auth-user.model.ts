import type { Role } from "@/config/roles";
// import type { UserRole } from "../types/auth.types";

export interface AuthUser {
  id: number;

  username: string;

  email: string;

  fullName: string;

  image: string;

  role: Role;
}