export const ROUTES = {
  LOGIN: "/login",

  DASHBOARD: "/dashboard",

  USERS: "/users",

  USER_DETAIL: "/users/:id",

  CREATE_USER: "/users/create",

  EDIT_USER: "/users/:id/edit",

  WORK_ITEMS: "/work-items",

  WORK_ITEM_DETAIL: "/work-items/:id",

  PROFILE: "/profile",

  SETTINGS: "/settings",

  FORBIDDEN: "/403",

  NOT_FOUND: "*",
} as const;