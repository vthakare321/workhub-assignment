import { NavLink } from "react-router-dom";

import { ROLE_PERMISSIONS } from "@/config/role-permissions";
import { protectedRoutes } from "@/router/route.config";

import { useAuthStore } from "@/stores/auth.store";
import { usePreferencesStore } from "@/stores/preferences.store";

export default function Sidebar() {
  const user = useAuthStore((state) => state.user);

  const sidebarCollapsed = usePreferencesStore(
    (state) => state.sidebarCollapsed
  );

  if (!user) {
    return null;
  }

  const allowedPermissions =
    ROLE_PERMISSIONS[user.role] ?? [];

  const navigationRoutes = protectedRoutes.filter(
    (route) => route.navigation
  );

  return (
    <aside
      className={`flex h-full flex-col border-r bg-white transition-all duration-200 dark:border-gray-800 dark:bg-gray-900 ${
        sidebarCollapsed
          ? "w-20"
          : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div
        className={`border-b border-gray-200 p-5 dark:border-gray-800 ${
          sidebarCollapsed
            ? "flex justify-center"
            : ""
        }`}
      >
        {sidebarCollapsed ? (
          <span
            className="text-lg font-bold text-blue-600"
            aria-label="WorkHub"
          >
            W
          </span>
        ) : (
          <h2 className="text-lg font-bold text-blue-600">
            Navigation
          </h2>
        )}
      </div>

      {/* Navigation */}
      <nav
        className="flex flex-1 flex-col gap-2 p-4"
        aria-label="Main navigation"
      >
        {navigationRoutes.map((route) => {
          /*
           * route.permissions is Permission[]
           *
           * A navigation item is displayed when
           * the current user has at least one of
           * the route's required permissions.
           */
          const requiredPermissions =
            route.permissions ?? [];

          const hasPermission =
            requiredPermissions.some(
              (permission) =>
                allowedPermissions.includes(permission)
            );

          if (!hasPermission) {
            return null;
          }

          const label =
            route.navigation?.label ?? "";

          return (
            <NavLink
              key={route.path}
              to={route.path}
              end={route.path === "dashboard"}
              title={
                sidebarCollapsed
                  ? label
                  : undefined
              }
              className={({ isActive }) =>
                `relative rounded-lg px-4 py-3 font-medium transition ${
                  isActive
                    ? "bg-blue-600 font-semibold text-white before:absolute before:left-0 before:top-1/2 before:h-6 before:w-1 before:-translate-y-1/2 before:rounded-r"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                } ${
                  sidebarCollapsed
                    ? "text-center"
                    : ""
                }`
              }
            >
              {sidebarCollapsed
                ? label.charAt(0)
                : label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}