import type { UserListParams } from "@/features/users/types/user-list-params";

export const QUERY_KEYS = {
  AUTH: ["auth"],

  USERS: {
    ALL: ["users"],

    LIST: (params: UserListParams) =>
      ["users", "list", params] as const,

    DETAIL: (id: number) =>
      ["users", "detail", id] as const,
  },

  WORK_ITEMS: {
    ALL: ["work-items"],
    DETAIL: (id: number) => ["work-items", id],
  },

  PROFILE: ["profile"],

  DASHBOARD: ["dashboard"],
} as const;