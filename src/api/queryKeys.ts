export const QUERY_KEYS = {
  AUTH: ["auth"],

  USERS: {
    ALL: ["users"],
    DETAIL: (id: number) => ["users", id],
  },

  WORK_ITEMS: {
    ALL: ["work-items"],
    DETAIL: (id: number) => ["work-items", id],
  },

  PROFILE: ["profile"],

  DASHBOARD: ["dashboard"],
} as const;
