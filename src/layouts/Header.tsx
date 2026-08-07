import { Button, StatusBadge } from "@/shared/components";

import { useLogout } from "@/features/auth/hooks";
import { useAuthStore } from "@/stores/auth.store";

const ROLE_LABELS = {
  admin: "Administrator",
  manager: "Manager",
  contributor: "Contributor",
} as const;

export default function Header() {
  const user = useAuthStore((state) => state.user);

  const logout = useLogout();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <div>
        <h1 className="text-xl font-bold text-blue-600">
          WorkHub Portal
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <img
          src={user?.image}
          alt={user?.fullName}
          className="h-10 w-10 rounded-full object-cover"
        />

        <div className="text-right">
          <p className="font-semibold">
            {user?.fullName}
          </p>

          <StatusBadge
            label={user ? ROLE_LABELS[user.role] : ""}
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
    </header>
  );
}