export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  CONTRIBUTOR: "contributor",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];