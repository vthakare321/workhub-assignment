import { z } from "zod";

import type { UserRole } from "../types/user.types";

const USER_ROLES = [
  "admin",
  "moderator",
  "user",
] as const satisfies readonly UserRole[];

export const userFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name is required")
    .max(50, "name not exceed 50 caracter"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name is required")
    .max(50, "lastname not exceed 50 caracter"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .trim()
    .min(7, "Phone number is required")
    .max(20, "Phone number must not exceed 20 character"),

  age: z
    .number({
      message: "Age is required",
    })
    .int("Age must be a whole number")
    .min(18, "Age must be at least 18")
    .max(75, "Age must be less than or equal to 75"),

  role: z.enum(USER_ROLES, {
    message: "Role is required",
  }),

  department: z
    .string()
    .trim()
    .min(1, "Department is required")
    .max(60, "Department must not exceed 60 character")
});

export type UserFormValues = z.infer<
  typeof userFormSchema
>;