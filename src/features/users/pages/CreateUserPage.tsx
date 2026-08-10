import { useNavigate } from "react-router-dom";

import {
  Button,
  PageHeader,
} from "@/shared/components";

import { ROUTES } from "@/shared/constants/routes";

import { UserForm } from "../components/UserForm";
import { useCreateUser } from "../hooks/useCreateUser";

import type { UserFormValues } from "../schemas/user-form.schema";

export default function CreateUserPage() {
  const navigate = useNavigate();

  const {
    mutate: createUser,
    isPending,
  } = useCreateUser();

  const handleSubmit = (values: UserFormValues) => {
    createUser(values, {
      onSuccess: () => {
        navigate(ROUTES.USERS);
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create User"
        description="Add a new user to the system."
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
        <UserForm
          submitLabel="Create User"
          isSubmitting={isPending}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}