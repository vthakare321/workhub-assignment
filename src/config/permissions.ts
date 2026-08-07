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



export type Permission =
  | typeof PERMISSIONS.DASHBOARD.READ

  | typeof PERMISSIONS.USERS.READ
  | typeof PERMISSIONS.USERS.CREATE
  | typeof PERMISSIONS.USERS.UPDATE
  | typeof PERMISSIONS.USERS.DELETE

  | typeof PERMISSIONS.WORK_ITEMS.READ
  | typeof PERMISSIONS.WORK_ITEMS.CREATE
  | typeof PERMISSIONS.WORK_ITEMS.UPDATE
  | typeof PERMISSIONS.WORK_ITEMS.DELETE

  | typeof PERMISSIONS.PROFILE.READ
  | typeof PERMISSIONS.PROFILE.UPDATE

  | typeof PERMISSIONS.SETTINGS.READ
  | typeof PERMISSIONS.SETTINGS.UPDATE;