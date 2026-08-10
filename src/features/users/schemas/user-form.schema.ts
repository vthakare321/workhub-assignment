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
    .min(1, "First name is required"),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required"),

  age: z
    .number({
      message: "Age is required",
    })
    .int("Age must be a whole number")
    .min(1, "Age must be at least 1")
    .max(120, "Age must be less than or equal to 120"),

  role: z.enum(USER_ROLES, {
    message: "Role is required",
  }),

  department: z
    .string()
    .trim()
    .min(1, "Department is required"),
});

export type UserFormValues = z.infer<
  typeof userFormSchema
>;