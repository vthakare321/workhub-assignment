import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import { ROUTES } from "@/shared/constants/routes";
import { useAuthStore } from "@/stores/auth.store";

import { ROLE_PERMISSIONS } from "@/config/role-permissions";

import type { Permission } from "@/config/permissions";

interface PermissionGuardProps {
  permissions?: Permission[];
  children: ReactNode;
}

export default function PermissionGuard({
  permissions = [],
  children,
}: PermissionGuardProps) {
  const user = useAuthStore((state) => state.user);
  
  if (permissions.length === 0) {
    return <>{children}</>;
  }


  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  const allowedPermissions =
    ROLE_PERMISSIONS[user.role] ?? [];

  const hasPermission = permissions.every((permission) =>
    allowedPermissions.includes(permission)
  );

  if (!hasPermission) {
    return <Navigate to={ROUTES.FORBIDDEN} replace />;
  }

  return <>{children}</>;
}