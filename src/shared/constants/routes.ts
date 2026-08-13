export const ROUTES = {
 
  APP: "/app",

  LOGIN: "/login",

  
  DASHBOARD: "/app/dashboard",

  USERS: "/app/users",

  USER_DETAIL: "/app/users/:userId",

  CREATE_USER: "/app/users/new",

  EDIT_USER: "/app/users/:userId/edit",

  WORK_ITEMS: "/app/work-items",

  CREATE_WORK_ITEM: "/app/work-items/new",

  WORK_ITEM_DETAIL: "/app/work-items/:id",

  EDIT_WORK_ITEM: "/app/work-items/:id/edit",

  PROFILE: "/app/profile",

  SETTINGS: "/app/settings",

  FORBIDDEN: "/forbidden",

  NOT_FOUND: "*",
} as const;