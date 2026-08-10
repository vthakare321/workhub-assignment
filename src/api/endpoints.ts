export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    ME: "/auth/me",
  },

  USERS: {
    LIST: "/users",
    DETAIL: (id: number) => `/users/${id}`,
    SEARCH: "/users/search",
    FILTER: "/users/filter",
    CREATE: "/users/add",
    UPDATE: (id: number) => `/users/${id}`,
    DELETE: (id: number) => `/users/${id}`,
  },

  WORK_ITEMS: {
    LIST: "/todos",
    DETAIL: (id: number) => `/todos/${id}`,
    CREATE: "/todos/add",
    UPDATE: (id: number) => `/todos/${id}`,
    DELETE: (id: number) => `/todos/${id}`,
    BY_USER: (userId: number) => `/todos/user/${userId}`,
  },
} as const;
