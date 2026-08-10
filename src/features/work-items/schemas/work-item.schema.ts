import { z } from "zod";

export const workItemSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Work item description must be at least 5 characters")
    .max(200, "Work item description must not exceed 200 characters"),

  userId: z
    .number({
      message: "Assignee is required",
    })
    .int()
    .positive("Please select a valid assignee"),

  completed: z.boolean(),
});