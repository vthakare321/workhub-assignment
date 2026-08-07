import { Outlet } from "react-router-dom";

import { Button, StatusBadge } from "@/shared/components";

import { useLogout } from "@/features/auth/hooks";
import { useAuthStore } from "@/stores/auth.store";

export default function AppLayout() {
  const user = useAuthStore((state) => state.user);

  const logout = useLogout();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 items-center justify-between px-6">
          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white">
              W
            </div>

            <h1 className="text-xl font-bold text-gray-900">
              WorkHub Portal
            </h1>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <img
              src={user?.image}
              alt={user?.fullName}
              className="h-10 w-10 rounded-full object-cover"
            />

            <div className="text-right">
              <p className="font-medium text-gray-900">
                {user?.fullName}
              </p>

              <StatusBadge
                label={user?.role ?? ""}
                variant="info"
              />
            </div>

            <Button
              variant="outline"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        <Outlet />
      </main>
    </div>
  );
}