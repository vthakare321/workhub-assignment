import { ROUTES } from "@/shared/constants/routes";

import type { AppRoute } from "./types";

import {
  LoginPage,
  DashboardPage,
  UserListPage,
  UserDetailPage,
  CreateUserPage,
  EditUserPage,
  WorkItemsPage,
  ProfilePage,
  SettingsPage,
  ForbiddenPage,
  NotFoundPage,
} from "./lazy";

import { PERMISSIONS } from "@/config/permissions";

export const publicRoutes: AppRoute[] = [
  {
    path: ROUTES.LOGIN,
    component: LoginPage,
  },
];

export const protectedRoutes: AppRoute[] = [
  {
    path: ROUTES.DASHBOARD,
    component: DashboardPage,
  },

  {
    path: ROUTES.USERS,
    component: UserListPage,
    permissions: [PERMISSIONS.USERS.READ]
  },

  {
    path: ROUTES.USER_DETAIL,
    component: UserDetailPage,
   permissions: [PERMISSIONS.USERS.READ]
  },

  {
    path: ROUTES.CREATE_USER,
    component: CreateUserPage,
    permissions: [PERMISSIONS.USERS.CREATE],
  },

  {
    path: ROUTES.EDIT_USER,
    component: EditUserPage,
    permissions: [PERMISSIONS.USERS.UPDATE],
  },

  {
    path: ROUTES.WORK_ITEMS,
    component: WorkItemsPage,
    permissions: [PERMISSIONS.WORK_ITEMS.READ],
  },

  {
    path: ROUTES.PROFILE,
    component: ProfilePage,
    permissions: [PERMISSIONS.PROFILE.READ, PERMISSIONS.PROFILE.UPDATE],
  },

  {
    path: ROUTES.SETTINGS,
    component: SettingsPage,
    permissions: [PERMISSIONS.SETTINGS.READ, PERMISSIONS.SETTINGS.UPDATE],
  },
];

export const errorRoutes: AppRoute[] = [
  {
    path: ROUTES.FORBIDDEN,
    component: ForbiddenPage,
  },

  {
    path: ROUTES.NOT_FOUND,
    component: NotFoundPage,
  },
];