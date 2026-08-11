import { useNavigate, useParams } from "react-router-dom";

import {
  Button,
  ErrorState,
  Loader,
  PageHeader,
} from "@/shared/components";

import { ROUTES } from "@/shared/constants/routes";

import { UserForm } from "../components/UserForm";
import { useUser } from "../hooks/useUser";
import { useUpdateUser } from "../hooks/useUpdateUser";

import type { UserFormValues } from "../schemas/user-form.schema";

export default function EditUserPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const userId = Number(id);

  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useUser(userId);

  const {
    mutate: updateUser,
    isPending,
  } = useUpdateUser();

  const handleSubmit = (
    values: UserFormValues
  ) => {
    updateUser(
      {
        id: userId,
        payload: values,
      },
      {
        onSuccess: () => {
          navigate(
           ROUTES.USER_DETAIL.replace(
  ":userId",
  String(userId)
)
          );
        },
      }
    );
  };

  const handleBack = () => {
    navigate(
      ROUTES.USER_DETAIL.replace(
        ":id",
        String(userId)
      )
    );
  };

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
        title="Edit User"
        description={`Update information for ${user.fullName}.`}
        rightContent={
          <Button
            variant="outline"
            onClick={handleBack}
          >
            Cancel
          </Button>
        }
      />

      <div className="rounded-lg border p-6">
        <UserForm
          defaultValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            age: user.age,
            role: user.role,
            department: user.department,
          }}
          submitLabel="Save Changes"
          isSubmitting={isPending}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}