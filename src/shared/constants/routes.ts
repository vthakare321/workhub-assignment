export const ROUTES = {
  LOGIN: "/login",

  DASHBOARD: "/dashboard",

  USERS: "/users",

  USER_DETAIL: "/users/:id",

  CREATE_USER: "/users/create",

  EDIT_USER: "/users/:id/edit",

  WORK_ITEMS: "/work-items",

  CREATE_WORK_ITEM: "/work-items/create",

  WORK_ITEM_DETAIL: "/work-items/:id",

  EDIT_WORK_ITEM: "/work-items/:id/edit",

  PROFILE: "/profile",

  SETTINGS: "/settings",

  FORBIDDEN: "/403",

  NOT_FOUND: "*",
} as const;