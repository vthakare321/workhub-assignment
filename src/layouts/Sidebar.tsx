import { NavLink } from "react-router-dom";

import { ROLE_PERMISSIONS } from "@/config/role-permissions";

import { useAuthStore } from "@/stores/auth.store";


import { NAVIGATION } from "@/config/navigation";

import { ROUTES } from "@/shared/constants/routes";


export default function Sidebar() {
  const user = useAuthStore((state) => state.user);


  console.log("USER:", user);
  console.log("ROLE:", user?.role);

  if (!user) {
    return null;
  }

  const allowedPermissions = ROLE_PERMISSIONS[user.role];

console.log("ALLOWED:", allowedPermissions);

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-white">
      <div className="border-b p-5">
        <h2 className="text-lg font-bold text-blue-600">
          Navigation
        </h2>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-4">
       {NAVIGATION.map((item) => {
  const hasPermission = allowedPermissions.includes(item.permission);

  if (!hasPermission) {
    return null;
  }

  return (
    <NavLink
      key={item.path}
      to={item.path}
      end={item.path === ROUTES.DASHBOARD}
      className={({ isActive }) =>
        `rounded-lg px-4 py-3 transition ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      {item.label}
    </NavLink>
  );
})}

       
      </nav>
    </aside>
  );
}