import type { ReactNode } from "react";

interface PermissionGuardProps {
  permissions?: string[];
  children: ReactNode;
}

export default function PermissionGuard({
  children,
}: PermissionGuardProps) {
  return <>{children}</>;
}