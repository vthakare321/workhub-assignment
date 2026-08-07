export const PERMISSIONS = {
  DASHBOARD: {
    READ: "dashboard.read",
  },

  USERS: {
    READ: "users.read",
    CREATE: "users.create",
    UPDATE: "users.update",
    DELETE: "users.delete",
  },

  WORK_ITEMS: {
    READ: "work-items.read",
    CREATE: "work-items.create",
    UPDATE: "work-items.update",
    DELETE: "work-items.delete",
  },

  PROFILE: {
    READ: "profile.read",
    UPDATE: "profile.update",
  },

  SETTINGS: {
    READ: "settings.read",
    UPDATE: "settings.update",
  },
} as const;