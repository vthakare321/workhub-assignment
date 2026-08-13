import { useNavigate, useParams } from "react-router-dom";

import {
  Button,
  ErrorState,
  Loader,
  PageHeader,
  StatusBadge,
} from "@/shared/components";

import { useUser } from "../hooks/useUser";
import { ROUTES } from "@/shared/constants/routes";

const ROLE_LABELS = {
  admin: "Administrator",
  moderator: "Manager",
  user: "Contributor",
} as const;

export default function UserDetailPage() {
 const { userId: userIdParam } = useParams();
  const userId = Number(userIdParam);

  const navigate = useNavigate();


  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useUser(userId);

  if (isLoading) {
    return <Loader size="lg" />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to load user"
        description={error.message}
        action={
          <Button onClick={() => refetch()}>
            Try Again
          </Button>
        }
      />
    );
  }

  if (!user) {
    return (
      <ErrorState
        title="User not found"
        description="The requested user could not be found."
        action={
          <Button
            variant="outline"
            onClick={() => navigate(ROUTES.USERS)}
          >
            Back to Users
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Details"
        description="View detailed information about this user."
        rightContent={
          <Button
            variant="outline"
            onClick={() => navigate(ROUTES.USERS)}
          >
            Back to Users
          </Button>
        }
      />

      <div className="rounded-lg border p-6">
        <div className="flex items-center gap-4 border-b pb-6">
          <img
            src={user.image}
            alt={user.fullName}
            className="h-20 w-20 rounded-full object-cover"
          />

          <div>
            <h2 className="text-xl font-semibold">
              {user.fullName}
            </h2>

            <p className="text-sm text-gray-500">
              {user.email}
            </p>

            <div className="mt-2">
              <StatusBadge
                label={ROLE_LABELS[user.role]}
                variant="info"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 pt-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">
              Full Name
            </p>

            <p className="font-medium">
              {user.fullName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="font-medium">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Age
            </p>

            <p className="font-medium">
              {user.age}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Role
            </p>

            <StatusBadge
              label={ROLE_LABELS[user.role]}
              variant="info"
            />
          </div>
        </div>
      </div>
    </div>
  );
}