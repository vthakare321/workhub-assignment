import { PERMISSIONS } from "./permissions";

import { ROUTES } from "@/shared/constants/routes";

import type { Permission } from "./permissions";

export interface NavigationItem {
  label: string;
  path: string;
  permission: Permission;
}

export const NAVIGATION: NavigationItem[] = [
  {
    label: "Dashboard",
    path: ROUTES.DASHBOARD,
    permission: PERMISSIONS.DASHBOARD.READ,
  },

  {
    label: "Users",
    path: ROUTES.USERS,
    permission: PERMISSIONS.USERS.READ,
  },

  {
    label: "Work Items",
    path: ROUTES.WORK_ITEMS,
    permission: PERMISSIONS.WORK_ITEMS.READ,
  },

  {
    label: "Profile",
    path: ROUTES.PROFILE,
    permission: PERMISSIONS.PROFILE.READ,
  },

  {
    label: "Settings",
    path: ROUTES.SETTINGS,
    permission: PERMISSIONS.SETTINGS.READ,
  },
];