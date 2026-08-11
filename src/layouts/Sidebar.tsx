import { NavLink } from "react-router-dom";

import { ROLE_PERMISSIONS } from "@/config/role-permissions";
import { NAVIGATION } from "@/config/navigation";

import { useAuthStore } from "@/stores/auth.store";
import { usePreferencesStore } from "@/stores/preferences.store";

import { ROUTES } from "@/shared/constants/routes";

export default function Sidebar() {
  const user = useAuthStore((state) => state.user);

  const sidebarCollapsed = usePreferencesStore(
    (state) => state.sidebarCollapsed
  );

  if (!user) {
    return null;
  }

  const allowedPermissions =
    ROLE_PERMISSIONS[user.role];

  return (
    <aside
      className={`flex h-full flex-col border-r bg-white transition-all duration-200 ${
        sidebarCollapsed
          ? "w-20"
          : "w-64"
      }`}
    >
      <div
        className={`border-b p-5 ${
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

      <nav
        className="flex flex-1 flex-col gap-2 p-4"
        aria-label="Main navigation"
      >
        {NAVIGATION.map((item) => {
          const hasPermission =
            allowedPermissions.includes(
              item.permission
            );

          if (!hasPermission) {
            return null;
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={
                item.path ===
                ROUTES.DASHBOARD
              }
              title={
                sidebarCollapsed
                  ? item.label
                  : undefined
              }
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                } ${
                  sidebarCollapsed
                    ? "text-center"
                    : ""
                }`
              }
            >
              {sidebarCollapsed
                ? item.label.charAt(0)
                : item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}