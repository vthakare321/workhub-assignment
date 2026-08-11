import { useAuthStore } from "@/stores/auth.store";

const ROLE_LABELS = {
  admin: "Administrator",
  manager: "Manager",
  contributor: "Contributor",
} as const;

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">
          Profile
        </h1>

        <p className="text-sm text-gray-500">
          Unable to load profile information.
        </p>
      </div>
    );
  }

  const roleLabel =
    ROLE_LABELS[user.role] ?? user.role;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Profile
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View your account information.
        </p>
      </div>

      <div className="max-w-2xl rounded-lg border bg-white p-6">
        {/* Profile header */}
        <div className="flex items-center gap-4">
          <img
            src={user.image}
            alt={`${user.fullName} profile`}
            className="h-16 w-16 rounded-full object-cover"
          />

          <div>
            <h2 className="text-lg font-semibold">
              {user.fullName}
            </h2>

            <p className="text-sm text-gray-500">
              {user.email}
            </p>
          </div>
        </div>

        {/* User details */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase text-gray-500">
              Full Name
            </p>

            <p className="mt-1 text-sm">
              {user.fullName}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase text-gray-500">
              Username
            </p>

            <p className="mt-1 text-sm">
              {user.username}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase text-gray-500">
              Email
            </p>

            <p className="mt-1 text-sm">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase text-gray-500">
              Role
            </p>

            <p className="mt-1 text-sm">
              {roleLabel}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase text-gray-500">
              User ID
            </p>

            <p className="mt-1 text-sm">
              {user.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}